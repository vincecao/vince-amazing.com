import React from 'react';
import { getPostById } from '@/app/blog/_util.server';
import Post from './_post';

interface PageProps {
  params: {
    postId: string;
  };
}

async function PostPage({ params }: PageProps) {
  const { postId } = params;
  const post = await getPostById(postId);

  if (!post) return null;
  return <Post post={post} />;
}

export default PostPage;
