import axios from 'axios';
import { PhotoSrc } from '../types';

const API_KEY = process.env.REACT_APP_FLICKR_API_KEY;
const USER_ID = process.env.REACT_APP_FLICKR_USER_ID;

const FILTER_REST_URL = '//www.flickr.com/services/rest/';

type FlickrPhoto = {
  description: string;
  path_alias: string;
  id: string;
  owner: string;
  secret: string;

  url_h: string; // Large 1600,
  height_h: number;
  width_h: number;

  url_l: string; // Large 1024
  height_l: number;
  width_l: number;

  url_c: string; // Medium 800
  height_c: number;
  width_c: number;
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
    return totalImgs.map(
      ({ url_h, height_h, width_h, url_l, height_l, width_l, url_c, height_c, width_c }: FlickrPhoto) => ({
        h: {
          height: height_h,
          width: width_h,
          url: url_h,
        },
        l: {
          height: height_l,
          width: width_l,
          url: url_l,
        },
        c: {
          height: height_c,
          width: width_c,
          url: url_c,
        },
      })
    );
  } catch (e) {
    throw new Error(`GetPublicPhotosPromise failed ${e}`);
  }
}
