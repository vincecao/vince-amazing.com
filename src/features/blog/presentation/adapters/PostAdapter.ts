import { Post } from '../../domain/entities/Post';

export interface PostEntry {
  title: string;
  date: Date;
  body: string;
  tags: string[];
  categories: string[];
}

export type PostElement = [string, PostEntry];

export default class PostAdapter {
  static toPostElement(post: Post): PostElement {
    const postEntry: PostEntry = {
      title: post.title,
      date: post.publishedAt,
      body: post.content,
      tags: post.tags || [],
      categories: post.categories || [],
    };

    return [post.id, postEntry];
  }

  static toPostElements(posts: Post[]): PostElement[] {
    return posts.map(this.toPostElement);
  }
} 