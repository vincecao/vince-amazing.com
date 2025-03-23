'use client';

import { useBackground, useBackgroundLoading } from '@/helpers/background-store';
import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';

const BlurBackground = ({ lowTransition }: { lowTransition?: boolean }) => {
  const background = useBackground();
  const isLoading = useBackgroundLoading();

  return (
    <div className="fixed inset-0 z-[-1] w-screen h-screen top-0 left-0 overflow-hidden">
      <AnimatePresence mode="wait">
        {background && (
          <motion.div
            key={background}
            className="absolute inset-0 bg-no-repeat bg-cover blur-[80px] bg-center"
            style={{ backgroundImage: `url(${background})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: lowTransition ? 0.1 : 0.6 }}
          />
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white/50 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default memo(BlurBackground);
