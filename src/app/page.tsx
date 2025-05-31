import type { ReactElement } from 'react';

import { Avatar, Name } from '@/shared/components/ui';

export default function IndexPage(): ReactElement {
  return <Name avatar={<Avatar />} />;
}
