'use client';

import type { ReactElement } from 'react';
import { memo } from 'react';

import { AnimatedGsapDiv } from '@vincecao/animated-in-view';

import { PostEntry } from '../../_utils/server';

function PostTitle({ title }: { title: PostEntry['title'] }): ReactElement {
  return (
    <AnimatedGsapDiv type="slide-top-to-bottom" distance={25}>
      <h1 className="text-3xl mb-5">{title}</h1>
    </AnimatedGsapDiv>
  );
}

export default memo(PostTitle);
