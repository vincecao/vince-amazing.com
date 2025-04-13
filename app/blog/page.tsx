import { getAllPosts } from '@/app/blog/_util.server';
import Posts from './_posts';

export default async function Blog() {
  const posts = await getAllPosts();
  return !posts ? null : <Posts posts={posts} />;
}
