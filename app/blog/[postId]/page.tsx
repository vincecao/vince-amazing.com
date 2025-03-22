'use client';

import React, { useMemo, memo, useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Prism from 'prismjs';
import { format, isValid } from 'date-fns';
import { marked } from 'marked';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { getPostById, type PostEntry } from '@/helpers/markdown';
import { AnimatedGsapDiv } from '@vincecao/animated-in-view';

const Post = memo(({ post }: { post: PostEntry }) => {
  const date = useMemo(() => (isValid(post.date) ? format(post.date, 'Pp') : undefined), [post.date]);

  return (
    <>
      <AnimatedGsapDiv type="slide-top-to-bottom" distance={25}><h1 className="text-3xl mb-5">{post.title}</h1></AnimatedGsapDiv>
      <AnimatedGsapDiv type="slide-right-to-left" distance={20} delay={2500}>{date && <p className="italic text-right opacity-50">{date}</p>}</AnimatedGsapDiv>
      <AnimatedGsapDiv type="slide-bottom-to-top" distance={25} delay={700} className="prose prose-sm md:prose-base lg:prose-lg prose-zinc dark:prose-invert prose-h1:text-3xl prose-h1:my-8 prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-base prose-h5:font-bold" dangerouslySetInnerHTML={{ __html: marked.parse(post.body) }} />
    </>
  );
});

const BackButton = memo(() => (
  <AnimatedGsapDiv type="slide-left-to-right" distance={25} delay={2500} className="fixed left-5 top-5 link-text">
    <Link href="/blog">Back</Link>
  </AnimatedGsapDiv>
));

function BlogPost(): ReactElement | null {
  const params = useParams();
  const postId = params?.postId as string | undefined;
  const [post, setPost] = useState<PostEntry | null>(null);

  /** @todo: Refine below */
  useEffect(() => {
    if (postId) {
      getPostById(postId).then(setPost);
    }
  }, [postId]);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  if (!postId || !post) return null;
  return (
    <div className="p-10 pr-16 font-sans font-extralight w-full">
      <div id="posts-list" className="w-full md:w-2/3 space-y-3 mx-auto">
        <BackButton />
        <Post post={post} />
      </div>
    </div>
  );
}

export default memo(BlogPost);
