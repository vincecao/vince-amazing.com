'use client';

import React, { memo, useLayoutEffect } from 'react';
import type { ReactElement } from 'react';

import { useBackgroundActions } from '@/shared/helpers/background-store';
import gsap from 'gsap';

function NameElement({ avatar }: { avatar: ReactElement }): ReactElement {
  const { setRandomBackground, setBackground } = useBackgroundActions();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set('#name', {
        clipPath: 'circle(150% at 10% 50%)',
      });
      gsap
        .timeline({
          default: {
            ease: 'power2',
          },
        })
        .from('#profile', {
          y: 35,
          duration: 0.4,
          autoAlpha: 0,
        })
        .from('#name', {
          clipPath: 'circle(0% at 10% 50%)',
          duration: 1.5,
        });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      onMouseEnter={setRandomBackground}
      onMouseLeave={() => setBackground(null)}
      id="profile"
      className="space-x-5 flex items-center self-center cursor-pointer"
      onClick={() => window.open('https://github.com/vincecao', '_blank')}
    >
      {avatar}
      <span id="name" className="text-3xl font-english">
        Lineng <b>Cao</b>
      </span>
    </div>
  );
}

export default memo(NameElement);
