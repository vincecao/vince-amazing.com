import { DIContainer } from '@/shared/container/DIContainer';
import { CacheService } from '@/shared/infra/services/CacheService';
import { PhotoRepository } from '../domain/interfaces/PhotoRepository';
import { GetPhotosUseCase } from '../application/usecases';
import FlickrPhotoRepo from './FlickrPhotoRepo';

export default class PhotosContainer {
  private static instance: PhotosContainer;
  private diContainer: DIContainer;

  private constructor() {
    this.diContainer = DIContainer.getInstance();
    this.initializePhotosServices();
  }

  static getInstance(): PhotosContainer {
    if (!PhotosContainer.instance) {
      PhotosContainer.instance = new PhotosContainer();
    }
    return PhotosContainer.instance;
  }

  private initializePhotosServices(): void {
    // Initialize photos-specific repository
    const photoRepository: PhotoRepository = new FlickrPhotoRepo();
    this.diContainer.set('PhotoRepository', photoRepository);

    // Initialize photos use cases
    const cacheService = this.diContainer.get<CacheService>('CacheService');
    const getPhotosUseCase = new GetPhotosUseCase(photoRepository, cacheService);

    this.diContainer.set('GetPhotosUseCase', getPhotosUseCase);
  }

  getPhotosUseCase(): GetPhotosUseCase {
    return this.diContainer.get<GetPhotosUseCase>('GetPhotosUseCase');
  }
} 