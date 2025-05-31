'use client';

import React, { memo } from 'react';

import Button from '@/presentation/components/ui/Button';
import useAppearance from '@/shared/hooks/use-appearance';
import classNames from 'classnames';

function ThemeToggle() {
  const { appearance, toggleAppearance } = useAppearance();
  return (
    <span
      id="theme-mode-btn-span"
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 mix-blend-difference text-white text-invert"
    >
      <Button
        onClick={toggleAppearance}
        className={classNames("font-['Mansalva'] text-sm md:text-lg link-text p-1 -m-1")}
        text={`${appearance !== 'dark' ? 'dark' : 'light'} mode`}
      />
    </span>
  );
}

export default memo(ThemeToggle);
