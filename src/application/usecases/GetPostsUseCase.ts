import { Post } from '../../domain/entities/Post';
import { PostRepository } from '../../domain/interfaces/PostRepository';
import { CacheService } from '../../infra/services/CacheService';

export class GetPostsUseCase {
  private readonly CACHE_KEY = 'blog:all_posts';

  constructor(
    private postRepository: PostRepository,
    private cacheService: CacheService
  ) {}

  async execute(): Promise<Post[]> {
    try {
      // Business decision: try cache first
      const cachedPosts = await this.cacheService.get<Post[]>(this.CACHE_KEY);
      if (cachedPosts) {
        return cachedPosts;
      }

      // Get fresh data from repository
      const posts = await this.postRepository.getAllPosts();
      
      // Apply business logic: sort by date, newest first
      const sortedPosts = posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

      // Business decision: cache the result
      await this.cacheService.set(this.CACHE_KEY, sortedPosts, { ttl: 3600 });

      return sortedPosts;
    } catch (error) {
      console.error('Failed to get posts:', error);
      throw new Error('Unable to retrieve posts');
    }
  }
}

export class GetPostByIdUseCase {
  constructor(
    private postRepository: PostRepository,
    private cacheService: CacheService
  ) {}

  async execute(id: string): Promise<Post | null> {
    try {
      // Business validation
      if (!id || id.trim() === '') {
        throw new Error('Post ID is required');
      }

      // Business decision: try cache first
      const cacheKey = `blog:post:${id}`;
      const cachedPost = await this.cacheService.get<Post>(cacheKey);
      if (cachedPost) {
        return cachedPost;
      }

      // Get fresh data from repository
      const post = await this.postRepository.getPostById(id);

      // Business decision: cache the result if post exists
      if (post) {
        await this.cacheService.set(cacheKey, post, { ttl: 3600 });
      }

      return post;
    } catch (error) {
      console.error('Failed to get post by id:', error);
      throw new Error('Unable to retrieve post');
    }
  }
} 