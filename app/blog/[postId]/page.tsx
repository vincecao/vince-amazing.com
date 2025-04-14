import React from 'react';

import { getPostById } from '@/app/blog/_utils/server';

import Post from './_components/Main';

interface PageProps {
  params: {
    postId: string;
  };
}

async function PostPage({ params }: PageProps) {
  const { postId } = params;
  const post = await getPostById(postId);

  if (!post) return null;
  
  return (
    <>
      <Post.Title title={post.title} />
      <Post.Detail date={post.date} categories={post.categories} />
      <Post.Body body={post.body} />
    </>
  );
}

export default PostPage;
