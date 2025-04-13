'use client';

import React, { useLayoutEffect, type ReactElement } from 'react';
import { memo } from 'react';
import gsap from 'gsap';
import { type PostElement } from '@/app/blog/_util.server';
import BlogLink from './_blog-link';

function Blog({ posts }: { posts: PostElement[] }): ReactElement {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline({
          default: {
            ease: 'power2',
          },
        })
        .from('#posts-list a.link-text', {
          y: '10px',
          autoAlpha: 0,
          stagger: 0.02,
          delay: 0.3,
        });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="p-10 pr-16 font-sans font-extralight w-full">
      <div id="posts-list" className="w-full md:w-2/3 space-y-3 mx-auto">
        {posts.map((element) => (
          <BlogLink key={element[0]} element={element} />
        ))}
      </div>
    </div>
  );
}

export default memo(Blog);
