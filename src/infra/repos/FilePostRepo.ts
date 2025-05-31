import { readFile, readdir } from 'fs/promises';
import matter from 'gray-matter';
import { join } from 'path';

import { Post, PostEntity } from '../../domain/entities/Post';
import { PostRepository } from '../../domain/interfaces/PostRepository';

export class FilePostRepo implements PostRepository {
  private readonly postsDirectory: string;

  constructor(postsDirectory: string = join(process.cwd(), '/src/app/blog/_posts')) {
    if (!postsDirectory) {
      throw new Error('Posts directory is required');
    }
    this.postsDirectory = postsDirectory;
  }

  async getAllPosts(): Promise<Post[]> {
    try {
      const filenames = await readdir(this.postsDirectory);
      const postFiles = filenames.filter((name) => name.endsWith('.md'));

      const posts = await Promise.all(
        postFiles.map(async (filename) => {
          const postId = filename.replace(/\.md$/, '');
          return await this.getPostById(postId);
        })
      );

      // Filter out null results and return valid posts
      return posts.filter((post): post is Post => post !== null);
    } catch (error) {
      console.error('Error reading posts directory:', error);
      return [];
    }
  }

  async getPostById(id: string): Promise<Post | null> {
    try {
      const fullPath = join(this.postsDirectory, `${id}.md`);
      const fileContents = await readFile(fullPath, 'utf8');

      const { data: frontMatter, content } = matter(fileContents);
      // Store raw markdown content, not HTML - this will be processed in the UI layer
      const rawMarkdownContent = content;

      return PostEntity.fromMarkdown(id, frontMatter, rawMarkdownContent);
    } catch (error) {
      console.error(`Error reading post ${id}:`, error);
      return null;
    }
  }
}
