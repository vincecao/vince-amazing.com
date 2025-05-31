import { ofetch } from 'ofetch';

import { Photo, PhotoEntity, PhotoSpec } from '../domain/entities/Photo';
import { PhotoRepository } from '../domain/interfaces/PhotoRepository';

type FlickrPhoto = {
  id: string;
  url_h: string;
  height_h: number;
  width_h: number;
  url_l: string;
  height_l: number;
  width_l: number;
  url_c: string;
  height_c: number;
  width_c: number;
};

type FlickrResponse = {
  photos: {
    photo: FlickrPhoto[];
    pages: number;
  };
};

export default class FlickrPhotoRepo implements PhotoRepository {
  private readonly FILTER_REST_URL = 'https://www.flickr.com/services/rest/';
  private readonly apiKey: string;
  private readonly userId: string;

  constructor(apiKey: string = process.env.FLICKR_API_KEY!, userId: string = process.env.FLICKR_USER_ID!) {
    if (!apiKey) {
      throw new Error('Flickr API key is required');
    }
    if (!userId) {
      throw new Error('Flickr User ID is required');
    }

    this.apiKey = apiKey;
    this.userId = userId;
  }

  async getPublicPhotos(): Promise<Photo[]> {
    try {
      // Pure data access - no caching logic
      const totalImgs = await this.getAllPhotos();
      return totalImgs.map(this.mapFlickrPhotoToEntity);
    } catch (error) {
      console.error('FlickrPhotoRepository error:', error);
      throw new Error('Failed to fetch photos from Flickr');
    }
  }

  private async getAllPhotos(limitedNumPages?: number): Promise<FlickrPhoto[]> {
    let page = 0;
    let totalImgs: FlickrPhoto[] = [];
    let totalPages: number;

    do {
      page++;
      const response = await this.getPhotosPage(page);
      const { photo, pages } = response.photos;
      totalImgs = totalImgs.concat(photo);
      totalPages = pages;
    } while (page < (limitedNumPages || totalPages));

    return totalImgs;
  }

  private async getPhotosPage(page: number): Promise<FlickrResponse> {
    const params = {
      method: 'flickr.people.getPublicPhotos',
      api_key: this.apiKey,
      user_id: this.userId,
      extras: 'url_h, url_l, url_c',
      format: 'json',
      nojsoncallback: 1,
      page,
    };

    return await ofetch<FlickrResponse>(this.FILTER_REST_URL, { params });
  }

  private mapFlickrPhotoToEntity(flickrPhoto: FlickrPhoto): PhotoEntity {
    const { id, url_h, height_h, width_h, url_l, height_l, width_l, url_c, height_c, width_c } = flickrPhoto;

    const h: PhotoSpec = { height: height_h, width: width_h, url: url_h };
    const l: PhotoSpec = { height: height_l, width: width_l, url: url_l };
    const c: PhotoSpec = { height: height_c, width: width_c, url: url_c };

    return PhotoEntity.fromRaw({ id, h, l, c });
  }
} 