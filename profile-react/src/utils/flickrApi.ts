import axios from 'axios';
import { PhotoSrc } from '../types';


const API_KEY = process.env.REACT_APP_API_KEY;
const USER_ID = process.env.REACT_APP_USER_ID;
const PHOTOSETS_ID = process.env.REACT_APP_PHOTOSETS_ID;

const FILTER_REST_URL = 'https://www.flickr.com/services/rest/';

export async function getPublicPhotosPromise(): Promise<PhotoSrc[]> {
  try {
    const imgs = await axios
      .get(FILTER_REST_URL, {
        params: {
          method: 'flickr.people.getPublicPhotos',
          api_key: API_KEY,
          user_id: USER_ID,
          format: 'json',
          nojsoncallback: 1,
        },
      })
      .then((response) => response.data);
    if (imgs.photos.photo) {
      const images: PhotoSrc[] = imgs.data.photos.photo.map(
        (photo: { farm: string; server: string; id: string; secret: string }) =>
          'https://farm' +
          photo.farm +
          '.staticflickr.com/' +
          photo.server +
          '/' +
          photo.id +
          '_' +
          photo.secret +
          '_b.jpg'
      );

      return images;
    }
    return [];
  } catch (e) {
    throw new Error(`GetPublicPhotosPromise failed ${e}`);
  }
}

export async function getPhotoSetsPromise(): Promise<PhotoSrc[]> {
  try {
    const imgs = await axios
      .get(FILTER_REST_URL, {
        params: {
          method: 'flickr.photosets.getPhotos',
          api_key: API_KEY,
          user_id: USER_ID,
          photoset_id: PHOTOSETS_ID,
          extras: 'url_h',
          format: 'json',
          nojsoncallback: 1,
        },
      })
      .then((response) => response.data);

    if (imgs.photoset.photo) {
      let images = imgs.data.photoset.photo.map((photo: { url_h: string }) => photo.url_h);
      return images;
    }
    return [];
  } catch (e) {
    throw new Error(`GetPhotoSetsPromise failed ${e}`);
  }
}
