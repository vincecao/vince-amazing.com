import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const POSTS_DIR = path.join(process.cwd(), 'app/blog/_posts');

export async function GET() {
  try {
    const files = fs.readdirSync(POSTS_DIR);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const posts = markdownFiles.map(file => {
      const filePath = path.join(POSTS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const key = file.replace('.md', '');
      return { key, content };
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error loading posts:', error);
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 });
  }
} 