import { PostElement } from '@/helpers/markdown';
import { format, isValid } from 'date-fns';
import Link from 'next/link';
import { useMemo, memo } from 'react';

const BlogLink = ({ element: [postId, postEntry] }: { element: PostElement }) => {
  const link = useMemo(() => `/blog/${postId}`, [postId]);
  const date = useMemo(() => (isValid(postEntry.date) ? `${format(postEntry.date, 'P')}` : undefined), [postEntry]);
  return (
    <Link href={link} className="link-text w-full flex justify-between space-x-2">
      <span>{postEntry.title}</span>
      {date && <i className="opacity-70 whitespace-nowrap hidden md:block">{date}</i>}
    </Link>
  );
};

export default memo(BlogLink);
