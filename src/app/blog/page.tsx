import { PostAdapter, Posts, PostService } from '@/features/blog';

export default async function BlogPage() {
  const postService = new PostService();
  const posts = await postService.getPosts();
  const postEls = PostAdapter.toPostElements(posts);

  return !postEls ? null : (
    <div className="p-5 pr-12 md:p-10 md:pr-16 font-sans font-extralight w-full pb-16">
      <Posts posts={postEls} />
    </div>
  );
}
