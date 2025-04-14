'use server';

import fs from 'fs';
import path from 'path';
import { createClient } from 'redis';

const POSTS_DIR = path.join(process.cwd(), 'app/blog/_posts');
const CACHE_TTL = 60 * 60 * 24 * 5; // 5 days in seconds

// Initialize Redis client
const redis = createClient({ url: process.env.REDIS_URL });

// Connect to Redis
redis.connect().catch(console.error);

export interface PostEntry {
  title: string;
  date: Date;
  body: string;
  tags: string[];
  categories: string[];
}

export type PostElement = [string, PostEntry];

function createPostEntry(str: string): PostEntry {
  let [, meta, ...bodies] = str.split('---');
  const metas = meta.split('\n');
  const body = bodies.join('---');
  const title = metas.find((meta) => meta.startsWith('title: '))?.replace('title: ', '') || 'Untitled';
  const dateStr = metas.find((meta) => meta.startsWith('date: '))?.replace('date: ', '');
  const date = dateStr ? new Date(dateStr) : new Date();
  const tags =
    metas
      .find((meta) => meta.startsWith('tags: '))
      ?.replace('tags: ', '')
      .split(',')
      .map((tag) => tag.trim()) || [];
  const categories =
    metas
      .find((meta) => meta.startsWith('categories: '))
      ?.replace('categories: ', '')
      .split(',')
      .map((cat) => cat.trim()) || [];
  return { title, date, body, tags, categories };
}

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
    // Try to get posts from Redis cache first
    const cacheKey = 'blog:all_posts';
    const cachedPosts = await redis.get(cacheKey);
    if (cachedPosts) {
      return JSON.parse(cachedPosts);
    }

    // If not in cache, get from filesystem
    const rawPosts = getPosts();
    const posts = rawPosts
      .map((post) => [post.key, createPostEntry(post.content)] as PostElement)
      .sort((a: PostElement, b: PostElement) => {
        const [, postOne] = a;
        const [, postTwo] = b;
        return postTwo.date.getTime() - postOne.date.getTime() || postOne.title.localeCompare(postTwo.title);
      });

    // Cache the results in Redis
    await redis.set(cacheKey, JSON.stringify(posts), {
      EX: CACHE_TTL,
    });

    return posts;
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

export async function getPostById(postId: string): Promise<PostEntry | null> {
  try {
    // Try to get post from Redis cache first
    const cacheKey = `blog:post:${postId}`;
    const cachedPost = await redis.get(cacheKey);
    if (cachedPost) {
      return JSON.parse(cachedPost);
    }

    // If not in cache, get from filesystem
    const content = getPost(postId);
    const post = createPostEntry(content);

    // Cache the result in Redis
    await redis.set(cacheKey, JSON.stringify(post), {
      EX: CACHE_TTL,
    });

    return post;
  } catch (error) {
    console.error('Error loading post:', error);
    return null;
  }
}
