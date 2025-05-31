import { Photo } from '../domain/entities/Photo';
import { PhotoRepository } from '../domain/interfaces/PhotoRepository';
import { CacheService } from '../../../shared/infra/services/CacheService';

export class GetPhotosUseCase {
  private readonly CACHE_KEY = 'flickr:publicPhotos';

  constructor(
    private photoRepository: PhotoRepository,
    private cacheService: CacheService
  ) {}

  async execute(): Promise<Photo[]> {
    try {
      // Business decision: try cache first
      const cachedPhotos = await this.cacheService.get<Photo[]>(this.CACHE_KEY);
      if (cachedPhotos) {
        return cachedPhotos;
      }

      // Get fresh data from repository
      const photos = await this.photoRepository.getPublicPhotos();

      // Business decision: cache the result
      await this.cacheService.set(this.CACHE_KEY, photos, { ttl: 3600 });

      return photos;
    } catch (error) {
      console.error('Failed to get photos:', error);
      throw new Error('Unable to retrieve photos');
    }
  }
} 