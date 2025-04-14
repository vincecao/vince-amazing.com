import type { ReactElement } from 'react';

import Avatar from './_components/Avatar';
import NameElement from './_components/NameElement';

export default function IndexPage(): ReactElement {
  return <NameElement avatar={<Avatar />} />;
}
