'use client';

import { memo } from 'react';

import { useBackground } from '@/shared/helpers/background-store';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const BlurBackground = memo(({ lowTransition }: { lowTransition?: boolean }) => {
  const background = useBackground();

  return (
    <AnimatePresence mode="wait">
      {background && (
        <motion.div
          key={background}
          className="fixed inset-0 z-[-1] w-screen h-screen top-0 left-0 overflow-hidden bg-no-repeat bg-cover blur-[80px] bg-center"
          style={{ backgroundImage: `url(${background})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: lowTransition ? 0.1 : 0.6 }}
        />
      )}
    </AnimatePresence>
  );
});

function BlurBackgroundWrapper() {
  const pathname = usePathname();
  return ['/', '/photos'].includes(pathname) ? <BlurBackground lowTransition={pathname === '/photos'} /> : null;
}

export default memo(BlurBackgroundWrapper);
