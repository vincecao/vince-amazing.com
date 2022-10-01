import axios from 'axios';
import { PhotoSrc } from '../types';

const API_KEY = process.env.REACT_APP_FLICKR_API_KEY;
const USER_ID = process.env.REACT_APP_FLICKR_USER_ID;
const PHOTOSETS_ID = process.env.REACT_APP_FLICKR_PHOTOSETS_ID;

const FILTER_REST_URL = '//www.flickr.com/services/rest/';

type FlickrPhoto = {
  description: string;
  path_alias: string;
  id: string;
  owner: string;
  secret: string;
  url_h: string; // Large 1600
  url_l: string; // Large 1024
  url_c: string; // Medium 800
};

async function getAllPhotos<T>(promise: (page: number) => Promise<T>, key: string, limitedNumPages?: number) {
  let page = 0;
  let totalImgs: FlickrPhoto[] = [];
  let totalPages;
  do {
    page++;
    const imgs = await promise(page);
    const { photo, pages } = (imgs as any)[key];
    totalImgs = totalImgs.concat(photo);
    totalPages = pages;
  } while (page < (limitedNumPages || totalPages));
  return totalImgs;
}

// https://www.flickr.com/services/api/flickr.people.getPublicPhotos.htm
export async function getPublicPhotos(): Promise<PhotoSrc[]> {
  try {
    const totalImgs = await getAllPhotos<{ photos: { photo: FlickrPhoto[] } }>(
      (page) =>
        axios
          .get(FILTER_REST_URL, {
            params: {
              method: 'flickr.people.getPublicPhotos',
              api_key: API_KEY,
              user_id: USER_ID,
              extras: 'url_h, url_l, url_c',
              format: 'json',
              nojsoncallback: 1,
              page,
            },
          })
          .then((response) => response.data),
      'photos'
    );
    return totalImgs.map(({ url_h, url_l, url_c }: FlickrPhoto) => url_h || url_l || url_c);
  } catch (e) {
    throw new Error(`GetPublicPhotosPromise failed ${e}`);
  }
}

// https://www.flickr.com/services/api/flickr.photos.getRecent.htm
export async function getRecent(): Promise<PhotoSrc[]> {
  try {
    const totalImgs = await getAllPhotos<{ photos: { photo: FlickrPhoto[] } }>(
      (page) =>
        axios
          .get(FILTER_REST_URL, {
            params: {
              method: 'flickr.photos.getRecent',
              api_key: API_KEY,
              extras: 'url_h, url_l, url_c',
              page,
              format: 'json',
              nojsoncallback: 1,
            },
          })
          .then((response) => response.data),
      'photos'
    );
    return totalImgs.map(({ url_h, url_l, url_c }: FlickrPhoto) => url_h || url_l || url_c);
  } catch (e) {
    throw new Error(`GetRecentPromise failed ${e}`);
  }
}

// https://www.flickr.com/services/api/flickr.photosets.getPhotos.htm
export async function getPhotoSets(): Promise<PhotoSrc[]> {
  try {
    const totalImgs = await getAllPhotos<{ photoset: { photo: FlickrPhoto[] } }>(
      (page) =>
        axios
          .get(FILTER_REST_URL, {
            params: {
              method: 'flickr.photosets.getPhotos',
              api_key: API_KEY,
              user_id: USER_ID,
              photoset_id: PHOTOSETS_ID,
              extras: 'url_h, url_l, url_c',
              format: 'json',
              nojsoncallback: 1,
              page,
            },
          })
          .then((response) => response.data),
      'photoset'
    );
    return totalImgs.map(({ url_h, url_l, url_c }: FlickrPhoto) => url_h || url_l || url_c);
  } catch (e) {
    throw new Error(`GetPhotoSetsPromise failed ${e}`);
  }
}
