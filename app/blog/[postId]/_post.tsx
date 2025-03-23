'use client';

import { PostEntry } from '@/app/blog/_util';
import { AnimatedGsapDiv } from '@vincecao/animated-in-view';
import { format, isValid } from 'date-fns';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-css';
import { useMemo, memo, useLayoutEffect } from 'react';

const Post = ({ post }: { post: PostEntry }) => {
  const date = useMemo(() => (isValid(post.date) ? format(post.date, 'Pp') : undefined), [post.date]);
  const html = useMemo(
    () => DOMPurify.sanitize(marked.parse(post.body.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''))),
    [post.body]
  );

  useLayoutEffect(() => {
    const els = document.querySelectorAll('pre code');
    els.forEach((el) => Prism.highlightElement(el));
  }, [html]);

  return (
    <>
      <AnimatedGsapDiv type="slide-top-to-bottom" distance={25}>
        <h1 className="text-3xl mb-5">{post.title}</h1>
      </AnimatedGsapDiv>
      <AnimatedGsapDiv type="slide-right-to-left" distance={20} delay={2500}>
        {date && <p className="italic text-right opacity-50">{date}</p>}
      </AnimatedGsapDiv>
      <AnimatedGsapDiv
        type="slide-bottom-to-top"
        distance={25}
        delay={700}
        className="prose prose-sm md:prose-base lg:prose-lg prose-zinc dark:prose-invert prose-h1:text-3xl prose-h1:my-8 prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-base prose-h5:font-bold"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
};

export default memo(Post);
