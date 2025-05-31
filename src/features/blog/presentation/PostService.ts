import { Post } from '../domain/entities/Post';
import BlogContainer from '../infra/BlogContainer';

export default class PostService {
  private blogContainer: BlogContainer;

  constructor() {
    this.blogContainer = BlogContainer.getInstance();
  }

  async getPosts(): Promise<Post[]> {
    const getPostsUseCase = this.blogContainer.getPostsUseCase();
    return await getPostsUseCase.execute();
  }

  async getPostById(id: string): Promise<Post | null> {
    const getPostByIdUseCase = this.blogContainer.getPostByIdUseCase();
    return await getPostByIdUseCase.execute(id);
  }
} 