import { getAllPosts } from '@/app/blog/_utils/server';

import PostList from './_components/PostList';

export default async function BlogPage() {
  const posts = await getAllPosts();
  return !posts ? null : (
    <div className="p-10 pr-16 font-sans font-extralight w-full">
      <PostList posts={posts} />
    </div>
  );
}
