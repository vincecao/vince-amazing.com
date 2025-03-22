'use client';

import React, { memo } from 'react';
import useStyles from '@/hooks/use-styles';
import Button from '@/components/Button';
import classNames from 'classnames';
import useAppearance from '@/hooks/use-appearance';

function ThemeToggle() {
  const { toggleAppearance } = useAppearance();
  const { isDark } = useStyles();
  return (
    <Button
      onClick={toggleAppearance}
      className={classNames("font-['Mansalva'] text-lg link-text p-1 -m-1", {
        'rounded-full backdrop-blur-sm': true,
      })}
      text={!isDark ? 'dark mode' : 'light mode'}
    />
  );
}

export default memo(ThemeToggle);
