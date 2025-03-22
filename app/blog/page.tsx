import { getAllPosts } from '@/helpers/markdown';
import Posts from './_posts';

async function loader() {
  const posts = await getAllPosts();
  return posts;
}

export default async function RootLayout() {
  const posts = await loader();
  return !posts ? null : <Posts posts={posts} />;
}
