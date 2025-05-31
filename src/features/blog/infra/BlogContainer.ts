import { DIContainer } from '@/shared/container/DIContainer';
import { CacheService } from '@/shared/infra/services/CacheService';
import { PostRepository } from '../domain/interfaces/PostRepository';
import { GetPostsUseCase, GetPostByIdUseCase } from '../application/usecases';
import FilePostRepo from './FilePostRepo';

export default class BlogContainer {
  private static instance: BlogContainer;
  private diContainer: DIContainer;

  private constructor() {
    this.diContainer = DIContainer.getInstance();
    this.initializeBlogServices();
  }

  static getInstance(): BlogContainer {
    if (!BlogContainer.instance) {
      BlogContainer.instance = new BlogContainer();
    }
    return BlogContainer.instance;
  }

  private initializeBlogServices(): void {
    // Initialize blog-specific repository
    const postRepository: PostRepository = new FilePostRepo();
    this.diContainer.set('PostRepository', postRepository);

    // Initialize blog use cases
    const cacheService = this.diContainer.get<CacheService>('CacheService');
    const getPostsUseCase = new GetPostsUseCase(postRepository, cacheService);
    const getPostByIdUseCase = new GetPostByIdUseCase(postRepository, cacheService);

    this.diContainer.set('GetPostsUseCase', getPostsUseCase);
    this.diContainer.set('GetPostByIdUseCase', getPostByIdUseCase);
  }

  getPostsUseCase(): GetPostsUseCase {
    return this.diContainer.get<GetPostsUseCase>('GetPostsUseCase');
  }

  getPostByIdUseCase(): GetPostByIdUseCase {
    return this.diContainer.get<GetPostByIdUseCase>('GetPostByIdUseCase');
  }
} 