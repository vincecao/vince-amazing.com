import { PostAdapter, Posts, BlogContainer } from '@/features/blog';

export default async function BlogPage() {
  const blogContainer = BlogContainer.getInstance();
  const getPostsUseCase = blogContainer.getPostsUseCase();
  const posts = await getPostsUseCase.execute();
  const postEls = PostAdapter.toPostElements(posts);

  return !postEls ? null : (
    <div className="p-5 pr-12 md:p-10 md:pr-16 font-sans font-extralight w-full pb-16">
      <Posts posts={postEls} />
    </div>
  );
}
