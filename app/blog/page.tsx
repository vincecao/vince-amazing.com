import { getAllPosts } from '@/app/blog/_utils/server';

import PostList from './_components/PostList';

export default async function BlogPage() {
  const posts = await getAllPosts();
  return !posts ? null : (
    <div className="p-5 pr-12 md:p-10 md:pr-16 font-sans font-extralight w-full pb-16">
      <PostList posts={posts} />
    </div>
  );
}
