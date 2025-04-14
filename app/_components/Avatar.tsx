'use client';

import type { ReactElement } from 'react';
import { memo, useState } from 'react';

import avatarSource from '@/assets/imgs/avatar.png';
import useAppearance from '@/shared/hooks/use-appearance';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { zinc } from 'tailwindcss/colors';

function Avatar(): ReactElement {
  const { appearance } = useAppearance();
  const isDark = appearance === 'dark';

  const boxShadow = {
    INITIAL: !isDark ? `5px 5px ${zinc[600]}` : `5px 5px ${zinc[400]}`,
    HOVER: !isDark ? `3px 3px ${zinc[600]}` : `3px 3px ${zinc[400]}`,
    TAP: !isDark ? `1.5px 1.5px ${zinc[600]}` : `1.5px 1.5px ${zinc[400]}`,
  };

  const [disableYoyo, setDisableYoyo] = useState(false);
  return (
    <motion.button
      style={{
        x: 0,
        y: 0,
        boxShadow: boxShadow.INITIAL,
        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
      }}
      animate={
        disableYoyo
          ? {}
          : {
              scale: [1, 1.05, 1],
              y: [0, -8, 0],
              rotate: [-3, 3, -3],
            }
      }
      transition={
        disableYoyo
          ? {}
          : {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
      whileHover={{
        x: 2,
        y: 2,
        boxShadow: boxShadow.HOVER,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 10,
        },
      }}
      whileTap={{
        x: 3.5,
        y: 3.5,
        boxShadow: boxShadow.TAP,
        transition: { duration: 0.02 },
        opacity: 0.8,
      }}
      className="rounded-full"
      onHoverStart={() => setDisableYoyo(true)}
      onHoverEnd={() => setDisableYoyo(false)}
    >
      <Image src={avatarSource} alt="avatar" width={48} height={48} className="rounded-full" />
    </motion.button>
  );
}

export default memo(Avatar);
