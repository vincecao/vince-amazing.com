'use client';

import { usePathname } from 'next/navigation';
import BlurBackground from './_bg';

export default function BackgroundWrapper() {
  const pathname = usePathname();
  const isRoot = pathname === '/';
  const isPhotos = pathname === '/photos';

  return isRoot || isPhotos ? <BlurBackground lowTransition={isPhotos} /> : null;
}
