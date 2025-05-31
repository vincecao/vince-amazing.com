'use client';

import type { ReactElement } from 'react';
import { memo } from 'react';

import { type PostEntry } from '@/presentation/adapters/PostAdapter';
import { AnimatedGsapDiv } from '@vincecao/animated-in-view';

function Title({ title }: { title: PostEntry['title'] }): ReactElement {
  return (
    <AnimatedGsapDiv type="slide-top-to-bottom" distance={25}>
      <h1 className="text-3xl mb-5">{title}</h1>
    </AnimatedGsapDiv>
  );
}

export default memo(Title);
