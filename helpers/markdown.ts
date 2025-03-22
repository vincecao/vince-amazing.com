'use server';

import fs from 'fs';
import path from 'path';

export interface PostEntry {
  title: string;
  date: Date;
  body: string;
}

export type PostElement = [string, PostEntry];

function createPostEntry(str: string): PostEntry {
  let [, meta, ...bodies] = str.split('---');
  const metas = meta.split('\n');
  const body = bodies.join('---');
  const title = metas.find((meta) => meta.startsWith('title: '))?.replace('title: ', '') || 'Untitled';
  const dateStr = metas.find((meta) => meta.startsWith('date: '))?.replace('date: ', '');
  const date = dateStr ? new Date(dateStr) : new Date();
  return { title, date, body };
}

const POSTS_DIR = path.join(process.cwd(), 'app/blog/_posts');

function getPost(postId: string) {
  try {
    const filePath = path.join(POSTS_DIR, `${postId}.md`);
    if (!fs.existsSync(filePath)) {
      throw new Error('Post not found');
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    throw new Error('Failed to load post');
  }
}

function getPosts() {
  try {
    const files = fs.readdirSync(POSTS_DIR);
    const markdownFiles = files.filter((file) => file.endsWith('.md'));

    const posts = markdownFiles.map((file) => {
      const filePath = path.join(POSTS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const key = file.replace('.md', '');
      return { key, content };
    });

    return posts;
  } catch (error) {
    throw new Error('Failed to load posts');
  }
}

export async function getAllPosts(): Promise<PostElement[]> {
  try {
    const rawPosts = getPosts();
    return rawPosts
      .map((post) => [post.key, createPostEntry(post.content)] as PostElement)
      .sort((a: PostElement, b: PostElement) => {
        const [, postOne] = a;
        const [, postTwo] = b;
        return postTwo.date.getTime() - postOne.date.getTime() || postOne.title.localeCompare(postTwo.title);
      });
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

export async function getPostById(postId: string): Promise<PostEntry | null> {
  try {
    const content = getPost(postId);
    return createPostEntry(content);
  } catch (error) {
    console.error('Error loading post:', error);
    return null;
  }
}
