import type { AnchorHTMLAttributes, ReactElement, ReactNode } from 'react';
import { memo, useMemo } from 'react';

import classNames from 'classnames';
import Link from 'next/link';

interface LinkExtensionProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  className?: string;
  activePath?: string;
}

function NavigationLink({ href, children, className, activePath, ...rest }: LinkExtensionProps): ReactElement {
  const defaultItemClassNames = useMemo(() => {
    const isActive = activePath?.startsWith(href || '');
    return classNames("font-['Mansalva'] cursor-pointer link-text inline-block", {
      'dark:text-red-300 text-red-800': isActive,
    });
  }, [activePath, href]);

  return (
    <Link href={href} className={className ?? defaultItemClassNames} {...rest}>
      {children}
    </Link>
  );
}

export default memo(NavigationLink); 