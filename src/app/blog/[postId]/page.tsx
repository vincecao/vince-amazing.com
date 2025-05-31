import React from 'react';

import { PostAdapter, Post, PostService } from '@/features/blog';

interface PageProps {
  params: {
    postId: string;
  };
}

async function PostPage({ params }: PageProps) {
  const { postId } = params;
  const postService = new PostService();
  const post = await postService.getPostById(postId);

  if (!post) return null;

  const [, postEntry] = PostAdapter.toPostElement(post);

  return (
    <>
      <Post.Title title={postEntry.title} />
      <Post.Detail date={postEntry.date} categories={postEntry.categories} />
      <Post.Body body={postEntry.body} />
    </>
  );
}

export default PostPage;
