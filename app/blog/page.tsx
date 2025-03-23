import { getAllPosts } from '@/app/blog/_util';
import Posts from './_posts';

export default async function Blog() {
  const posts = await getAllPosts();
  return !posts ? null : <Posts posts={posts} />;
}
