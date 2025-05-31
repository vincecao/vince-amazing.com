'use client';

import React, { memo, useLayoutEffect } from 'react';

import { useBackgroundActions } from '@/shared/helpers/background-store';
import classNames from 'classnames';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

import Link from './Link';

function Navigation() {
  const { setRandomBackground, setBackground } = useBackgroundActions();
  const pathname = usePathname();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline({
          default: {
            ease: 'power2',
          },
        })
        .from(['#side-nav span', '#side-nav a'], {
          x: '10px',
          autoAlpha: 0,
          stagger: 0.02,
          delay: 0.5,
        })
        .from('#theme-mode-btn-span', {
          x: '10px',
          autoAlpha: 0,
          duration: 0.5,
        })
        .from('#source-code-span', {
          x: '-10px',
          autoAlpha: 0,
          duration: 0.5,
        });
    });
    return () => ctx.revert();
  }, []);

  return (
    <span
      id="side-nav"
      className={classNames(
        'fixed top-4 right-4 md:top-8 md:right-8 md:text-2xl [writing-mode:vertical-lr] space-y-3 md:space-y-5 z-50 p-1 -m-1',
        { 'mix-blend-difference text-white text-invert': pathname.startsWith('/photos') }
      )}
      onMouseEnter={pathname === '/' ? setRandomBackground : () => {}}
      onMouseLeave={() => setBackground(null)}
    >
      <Link href="/" className="font-chinese cursor-pointer text-lg md:text-3xl">
        <b>曹</b> 立能
      </Link>
      {['/photos', '/blog'].map((link) => (
        <Link key={link} href={link}>
          {link}
        </Link>
      ))}
      <Link
        href="/resume/Resume_02_23_2025_2.pdf"
        download="Resume_02_23_2025_2.pdf"
        target="_blank"
        title="Resume"
        rel="noopener noreferrer"
      >
        /resume
      </Link>
      <Link href="//instagram.com/__viiiince/" target="_blank" title="Instagram">
        /insta
      </Link>
      <Link href="//github.com/vincecao" target="_blank" title="GitHub">
        /github
      </Link>
    </span>
  );
}

export default memo(Navigation);
