import { PropsWithChildren, memo } from 'react';

import BackButton from './_components/BackButton';

function layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="p-10 pr-16 font-sans font-extralight w-full">
      <div className="w-full md:w-2/3 space-y-3 mx-auto">
        <BackButton />
        {children}
      </div>
    </div>
  );
}

export default memo(layout);
