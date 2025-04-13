'use client';

import { getCategoryColor } from '@/app/blog/_util';
import { PostEntry } from '@/app/blog/_util.server';
import { AnimatedGsapDiv } from '@vincecao/animated-in-view';
import { format, isValid } from 'date-fns';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-css';
import { useMemo, memo, useLayoutEffect, useRef } from 'react';
import useAppearance from '@/hooks/use-appearance';

const Post = ({ post }: { post: PostEntry }) => {
  const { appearance } = useAppearance();
  const date = useMemo(() => (isValid(new Date(post.date)) ? format(post.date, 'Pp') : undefined), [post.date]);
  const html = useMemo(
    () => DOMPurify.sanitize(marked.parse(post.body.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''))),
    [post.body]
  );
  const categoryColor = useMemo(() => getCategoryColor(post.categories, appearance), [post.categories, appearance]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    const highlightCode = () => {
      const els = document.querySelectorAll('pre code');
      if (els.length > 0) {
        els.forEach((el) => Prism.highlightElement(el));
      }
    };
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    highlightCode();
    timeoutRef.current = setTimeout(highlightCode, 600);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [html]);

  return (
    <>
      <AnimatedGsapDiv type="slide-top-to-bottom" distance={25}>
        <h1 className="text-3xl mb-5">{post.title}</h1>
      </AnimatedGsapDiv>
      <AnimatedGsapDiv type="slide-right-to-left" distance={25} delay={250}>
        <div className="flex justify-end items-center mb-5 space-x-2">
          <div className="flex space-x-2">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="inline-block py-0.5 px-1 text-xs text-white rounded-sm"
                style={{ backgroundColor: categoryColor }}
              >
                {category}
              </span>
            ))}
          </div>
          {date && <p className="opacity-50">{date}</p>}
        </div>
      </AnimatedGsapDiv>
      <AnimatedGsapDiv
        type="slide-bottom-to-top"
        distance={25}
        delay={550}
        className="prose prose-sm md:prose-base lg:prose-lg prose-zinc dark:prose-invert prose-h1:text-3xl prose-h1:my-8 prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-base prose-h5:font-bold"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
};

export default memo(Post);
