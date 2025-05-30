'use client';

import { memo } from 'react';

import { AnimatedGsapDiv } from '@vincecao/animated-in-view';
import Link from 'next/link';

const BackButton = () => (
  <AnimatedGsapDiv type="slide-left-to-right" distance={20} delay={500} className="fixed left-5 top-5 link-text mix-blend-difference text-white text-invert">
    <Link href="/blog">Back</Link>
  </AnimatedGsapDiv>
);

export default memo(BackButton);
