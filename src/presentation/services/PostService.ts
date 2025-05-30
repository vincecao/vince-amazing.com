import { Post } from '../../domain/entities/Post';
import { Container } from '../../infra/container/Container';

export class PostService {
  private container = Container.getInstance();

  async getPosts(): Promise<Post[]> {
    return await this.container.postsUseCase.execute();
  }

  async getPostById(id: string): Promise<Post | null> {
    return await this.container.postByIdUseCase.execute(id);
  }
}
