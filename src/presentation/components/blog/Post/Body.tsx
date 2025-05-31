'use client';

import type { ReactElement } from 'react';
import { memo, useLayoutEffect, useMemo, useRef } from 'react';

import { type PostEntry } from '@/presentation/adapters/PostAdapter';
import { AnimatedGsapDiv } from '@vincecao/animated-in-view';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-typescript';

function Body({ body }: { body: PostEntry['body'] }): ReactElement {
  const html = useMemo(
    () => DOMPurify.sanitize(marked.parse(body.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''))),
    [body]
  );

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
    <AnimatedGsapDiv
      type="slide-bottom-to-top"
      distance={25}
      delay={550}
      className="prose prose-sm md:prose-base lg:prose-lg prose-zinc dark:prose-invert prose-h1:text-3xl prose-h1:my-8 prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-base prose-h5:font-bold"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default memo(Body);
