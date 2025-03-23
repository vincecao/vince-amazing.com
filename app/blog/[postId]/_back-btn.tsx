'use client'

import { AnimatedGsapDiv } from '@vincecao/animated-in-view';
import Link from 'next/link';
import { memo } from 'react';

const BackButton = () => (
  <AnimatedGsapDiv type="slide-left-to-right" distance={25} delay={2500} className="fixed left-5 top-5 link-text">
    <Link href="/blog">Back</Link>
  </AnimatedGsapDiv>
);

export default memo(BackButton);
