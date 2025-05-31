'use client';

import React, { memo, useMemo } from 'react';

import useAppearance from '@/shared/hooks/use-appearance';
import { format, isValid } from 'date-fns';
import Link from 'next/link';

import { type PostElement } from '../../adapters/PostAdapter';
import { getCategoryColor } from '../Post/Detail';

interface PostEntryProps {
  element: PostElement;
}

const Entry = ({ element: [postId, postEntry] }: PostEntryProps) => {
  const { appearance } = useAppearance();
  const link = useMemo(() => `/blog/${postId}`, [postId]);
  const date = useMemo(
    () => (isValid(new Date(postEntry.date)) ? `${format(postEntry.date, 'P')}` : undefined),
    [postEntry]
  );

  const categoryColor = useMemo(
    () => getCategoryColor(postEntry.categories, appearance),
    [postEntry.categories, appearance]
  );

  return (
    <Link
      href={link}
      className="link-text w-full flex flex-col sm:flex-row sm:justify-between sm:items-center hover:underline underline-offset-4"
    >
      <span className="text-base sm:text-lg bg-gradient-to-br from-gray-900 to-gray-900/40 dark:from-gray-100 dark:to-gray-100/40 bg-clip-text text-transparent">
        {postEntry.title}
      </span>
      <div className="flex items-center justify-between sm:justify-normal space-x-2 mt-1 sm:mt-0 sm:ml-5">
        <div className="flex space-x-1">
          {postEntry.categories.map((category, index) => (
            <span
              key={index}
              className="inline-block py-0.5 px-1 text-[10px] sm:text-xs text-white rounded-sm"
              style={{ backgroundColor: categoryColor }}
            >
              {category}
            </span>
          ))}
        </div>
        {date && (
          <span className="text-xs sm:text-sm whitespace-nowrap bg-gradient-to-tl from-black to-gray-800/40 dark:from-white dark:to-gray-200/40 bg-clip-text text-transparent">
            {date}
          </span>
        )}
      </div>
    </Link>
  );
};

export default memo(Entry); 