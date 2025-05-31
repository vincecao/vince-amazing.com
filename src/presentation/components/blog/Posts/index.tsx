'use client';

import React, { type ReactElement, memo, useLayoutEffect } from 'react';

import gsap from 'gsap';

import { type PostElement } from '../../../adapters/PostAdapter';
import Entry from './Entry';

interface PostListProps {
  posts: PostElement[];
}

function PostList({ posts }: PostListProps): ReactElement {
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
    <div id="posts-list" className="w-full md:w-2/3 space-y-3 mx-auto">
      {posts.map((element) => (
        <Entry key={element[0]} element={element} />
      ))}
    </div>
  );
}

export default memo(PostList);
