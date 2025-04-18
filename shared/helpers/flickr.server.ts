'use server';

import { ofetch } from 'ofetch';
import { getRedisClient } from './redis.server';

const FILTER_REST_URL = 'https://www.flickr.com/services/rest/' as string;

export type PhotoSrc = {
  id: string;
  h: PhotoSpec;
  l: PhotoSpec;
  c: PhotoSpec;
};

export type PhotoSpec = {
  height: number;
  width: number;
  url: string;
};

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

type Response = { photos: { photo: FlickrPhoto[] } };

async function getAllPhotos(key: string, limitedNumPages?: number) {
  let page = 0;
  let totalImgs: FlickrPhoto[] = [];
  let totalPages;
  do {
    page++;
    const imgs = await getPhotos(page);
    const { photo, pages } = (imgs as any)[key] as { photo: FlickrPhoto[]; pages: number };
    totalImgs = totalImgs.concat(photo);
    totalPages = pages;
  } while (page < (limitedNumPages || totalPages));
  return totalImgs;
}

// https://www.flickr.com/services/api/flickr.people.getPublicPhotos.htm
async function getPhotos(page: number) {
  const method = 'flickr.people.getPublicPhotos';
  const extras = 'url_h, url_l, url_c';
  const format = 'json';
  const nojsoncallback = 1;
  const params = {
    method,
    api_key: process.env.FLICKR_API_KEY,
    user_id: process.env.FLICKR_USER_ID,
    extras,
    format,
    nojsoncallback,
    page,
  };
  const fetchData = await ofetch<Response>(FILTER_REST_URL, { params });
  return fetchData;
}

function imageMapper(photo: FlickrPhoto) {
  const { id, url_h, height_h, width_h, url_l, height_l, width_l, url_c, height_c, width_c } = photo;
  const h = { height: height_h, width: width_h, url: url_h };
  const l = { height: height_l, width: width_l, url: url_l };
  const c = { height: height_c, width: width_c, url: url_c };
  return { id, h, l, c };
}

const CACHE_KEY = 'flickr:publicPhotos' as const;

export async function getPublicPhotos(): Promise<PhotoSrc[]> {
  try {
    const redisClient = await getRedisClient();

    // Try to get cached photos
    const cachedPhotos = await redisClient.get(CACHE_KEY);
    if (cachedPhotos) {
      return JSON.parse(cachedPhotos);
    }

    // If no cache, fetch from Flickr
    const totalImgs = await getAllPhotos('photos', undefined);
    const photos = totalImgs.map(imageMapper);

    // Cache the photos with custom expiration
    await redisClient.set(CACHE_KEY, JSON.stringify(photos), {
      EX: Number(process.env.REDIS_CACHE_EXPIRATION),
    });

    return photos;
  } catch (e) {
    console.error(e);
    throw new Error(`Get Photos failed ${String(e)}`);
  }
}
