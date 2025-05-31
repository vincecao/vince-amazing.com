import React from 'react';

import { PostAdapter, PostDetail, BlogContainer } from '@/features/blog';

interface PageProps {
  params: {
    postId: string;
  };
}

async function PostPage({ params }: PageProps) {
  const { postId } = params;
  const blogContainer = BlogContainer.getInstance();
  const getPostByIdUseCase = blogContainer.getPostByIdUseCase();
  const post = await getPostByIdUseCase.execute(postId);

  if (!post) return null;

  const [, postEntry] = PostAdapter.toPostElement(post);

  return (
    <article className="p-5 pr-12 md:p-10 md:pr-16 font-sans font-extralight w-full pb-16">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{postEntry.title}</h1>
      <PostDetail date={postEntry.date} categories={postEntry.categories} />
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: postEntry.body }} 
      />
    </article>
  );
}

export default PostPage;
