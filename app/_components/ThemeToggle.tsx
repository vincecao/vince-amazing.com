'use client';

import React, { memo } from 'react';

import Button from '@/shared/components/Button';
import useAppearance from '@/shared/hooks/use-appearance';
import classNames from 'classnames';

function ThemeToggle() {
  const { appearance, toggleAppearance } = useAppearance();
  return (
    <span id="theme-mode-btn-span" className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
      <Button
        onClick={toggleAppearance}
        className={classNames("font-['Mansalva'] text-sm md:text-lg link-text p-1 -m-1", {
          'rounded-full backdrop-blur-sm': true,
        })}
        text={`${appearance !== 'dark' ? 'dark' : 'light'} mode`}
      />
    </span>
  );
}

export default memo(ThemeToggle);
