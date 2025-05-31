import { PropsWithChildren, memo } from 'react';

import { Back } from '@/presentation/components/ui';

function layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="p-5 pr-12 md:p-10 md:pr-16 font-sans font-extralight w-full py-14">
      <div className="w-full md:w-2/3 space-y-3 mx-auto">{children}</div>
      <Back />
    </div>
  );
}

export default memo(layout);
