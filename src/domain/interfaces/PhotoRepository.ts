import { Photo } from '../entities/Photo';

export interface PhotoRepository {
  getPublicPhotos(): Promise<Photo[]>;
}
