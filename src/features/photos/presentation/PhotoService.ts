import { Photo } from '../domain/entities/Photo';
import PhotosContainer from '../infra/PhotosContainer';

export default class PhotoService {
  private photosContainer: PhotosContainer;

  constructor() {
    this.photosContainer = PhotosContainer.getInstance();
  }

  async getPhotos(): Promise<Photo[]> {
    const getPhotosUseCase = this.photosContainer.getPhotosUseCase();
    return await getPhotosUseCase.execute();
  }
} 