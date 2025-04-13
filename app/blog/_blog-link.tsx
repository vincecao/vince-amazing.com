import { getCategoryColor } from '@/app/blog/_util';
import { PostElement } from '@/app/blog/_util.server';
import useAppearance from '@/hooks/use-appearance';
import { format, isValid } from 'date-fns';
import Link from 'next/link';
import { useMemo, memo } from 'react';

const BlogLink = ({ element: [postId, postEntry] }: { element: PostElement }) => {
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
    <Link href={link} className="link-text w-full flex justify-between items-center hover:underline underline-offset-4">
      <span className="text-lg text-gray-900 dark:text-gray-100">{postEntry.title}</span>
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          {postEntry.categories.map((category, index) => (
            <span
              key={index}
              className="inline-block py-0.5 px-1 text-xs text-white rounded-sm"
              style={{ backgroundColor: categoryColor }}
            >
              {category}
            </span>
          ))}
        </div>
        {date && <span className="text-sm whitespace-nowrap opacity-50">{date}</span>}
      </div>
    </Link>
  );
};

export default memo(BlogLink);
