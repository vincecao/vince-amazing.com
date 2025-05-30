import { GetPhotosUseCase } from '../../application/usecases/GetPhotosUseCase';
import { GetPostByIdUseCase, GetPostsUseCase } from '../../application/usecases/GetPostsUseCase';
import { FilePostRepo } from '../repos/FilePostRepo';
import { FlickrPhotoRepo } from '../repos/FlickrPhotoRepo';
import { RedisCacheService } from '../services/CacheService';

export class Container {
  private static instance: Container;
  private _photosUseCase: GetPhotosUseCase | null = null;
  private _postsUseCase: GetPostsUseCase | null = null;
  private _postByIdUseCase: GetPostByIdUseCase | null = null;
  private _cacheService: RedisCacheService | null = null;

  // Repository singletons
  private _photoRepo: FlickrPhotoRepo | null = null;
  private _postRepo: FilePostRepo | null = null;

  private constructor() {}

  static getInstance(): Container {
    return (Container.instance ??= new Container());
  }

  private get cacheService(): RedisCacheService {
    return (this._cacheService ??= new RedisCacheService(
      process.env.REDIS_URL,
      Number(process.env.REDIS_CACHE_EXPIRATION) || 3600
    ));
  }

  private get photoRepo(): FlickrPhotoRepo {
    return (this._photoRepo ??= new FlickrPhotoRepo());
  }

  private get postRepo(): FilePostRepo {
    return (this._postRepo ??= new FilePostRepo());
  }

  get photosUseCase(): GetPhotosUseCase {
    return (this._photosUseCase ??= new GetPhotosUseCase(this.photoRepo, this.cacheService));
  }

  get postsUseCase(): GetPostsUseCase {
    return (this._postsUseCase ??= new GetPostsUseCase(this.postRepo, this.cacheService));
  }

  get postByIdUseCase(): GetPostByIdUseCase {
    return (this._postByIdUseCase ??= new GetPostByIdUseCase(this.postRepo, this.cacheService));
  }
}
