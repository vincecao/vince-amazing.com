import { Post } from '../entities/Post';

export interface PostRepository {
  getAllPosts(): Promise<Post[]>;
  getPostById(id: string): Promise<Post | null>;
} 