import React from 'react';

import PostAdapter from '@/presentation/adapters/PostAdapter';
import { Post } from '@/presentation/components/blog';
import PostService from '@/presentation/services/PostService';

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
