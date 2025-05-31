'use client';

import type { ReactElement } from 'react';
import { memo, useMemo } from 'react';

import useAppearance from '@/shared/hooks/use-appearance';
import { AnimatedGsapDiv } from '@vincecao/animated-in-view';
import { format, isValid } from 'date-fns';

import { PostEntry } from '../../adapters/PostAdapter';

export function getCategoryColor(categories: string[], appearance: string): string {
  const hash = categories.reduce((acc, cat) => {
    return acc + Array.from(cat).reduce((catAcc, char) => catAcc + char.charCodeAt(0), 0) * cat.length;
  }, 0);

  const lightness = appearance === 'dark' ? 30 : 70;
  return `hsl(${hash % 270}, 15%, ${lightness}%)`;
}

function Detail({ date, categories }: { date: PostEntry['date']; categories: PostEntry['categories'] }): ReactElement {
  const { appearance } = useAppearance();
  const displayDate = useMemo(() => (isValid(new Date(date)) ? format(date, 'Pp') : undefined), [date]);

  const categoryColor = useMemo(() => getCategoryColor(categories, appearance), [categories, appearance]);

  return (
    <AnimatedGsapDiv type="slide-right-to-left" distance={25} delay={250}>
      <div className="flex justify-end items-center mb-5 space-x-2">
        <div className="flex space-x-2">
          {categories.map((category, index) => (
            <span
              key={index}
              className="inline-block py-0.5 px-1 text-xs text-white rounded-sm"
              style={{ backgroundColor: categoryColor }}
            >
              {category}
            </span>
          ))}
        </div>
        {date && <p className="opacity-50">{displayDate}</p>}
      </div>
    </AnimatedGsapDiv>
  );
}

export default memo(Detail);
