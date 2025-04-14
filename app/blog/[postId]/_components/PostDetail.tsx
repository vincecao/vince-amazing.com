'use client';

import type { ReactElement } from 'react';
import { memo, useMemo } from 'react';

import useAppearance from '@/shared/hooks/use-appearance';
import { AnimatedGsapDiv } from '@vincecao/animated-in-view';
import { format, isValid } from 'date-fns';

import { getCategoryColor } from '../../_utils/client';
import { PostEntry } from '../../_utils/server';

function PostDetail({
  date,
  categories,
}: {
  date: PostEntry['date'];
  categories: PostEntry['categories'];
}): ReactElement {
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

export default memo(PostDetail);
