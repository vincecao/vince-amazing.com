'use client';

import React, { memo, useMemo, useLayoutEffect } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

import { useBackgroundActions } from '@/helpers/background-store';
import ThemeToggle from './_theme_toggle';

function Nav() {
  const { setRandomBackground, setBackground } = useBackgroundActions();
  const pathname = usePathname();

  const itemClassNames = useMemo(
    () => (link?: string) =>
      classNames("font-['Mansalva'] cursor-pointer link-text inline-block", {
        'dark:text-red-300 text-red-800': link ? pathname.startsWith(link) : false,
      }),
    [pathname]
  );

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
        });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <span id="theme-mode-btn-span" className="fixed bottom-5 right-5 z-50">
        <ThemeToggle />
      </span>

      <span
        id="side-nav"
        className={classNames('fixed top-8 right-8 md:text-2xl [writing-mode:vertical-lr] space-y-5 z-50 p-1 -m-1', {
          'rounded-full backdrop-blur-sm': !pathname.startsWith('/blog'),
        })}
        onMouseEnter={pathname === '/' ? setRandomBackground : () => {}}
        onMouseLeave={() => setBackground(null)}
      >
        <Link href="/" className="font-chinese cursor-pointer text-xl md:text-3xl">
          <b>曹</b> 立能
        </Link>
        {['/photos', '/blog'].map((link) => (
          <Link key={link} className={itemClassNames(link)} href={link}>
            {link}
          </Link>
        ))}
        <a
          className={itemClassNames()}
          href="/resume/Resume_02_23_2025.pdf"
          download="Resume_02_23_2025.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          /resume
        </a>
        <Link className={itemClassNames()} href="//instagram.com/__viiiince/" target="_blank">
          /insta
        </Link>
        <Link className={itemClassNames()} href="//github.com/vincecao" target="_blank">
          /github
        </Link>
      </span>
    </>
  );
}

export default memo(Nav);
