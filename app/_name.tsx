'use client';

import React, { memo, useLayoutEffect, useState } from 'react';
import type { ReactElement } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import { motion } from 'framer-motion';

import BlurBackground from './photos/_bg';
import useStyles from '@/hooks/use-styles';
import { useBackgroundActions } from '@/helpers/background-store';

import avatarSource from '@/assets/imgs/avatar.png';
import Image from 'next/image';

const Avatar = ({ className }: { className?: string }) => {
  const { boxShadow } = useStyles();
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
      className={classNames('rounded-full', className)}
      onHoverStart={() => setDisableYoyo(true)}
      onHoverEnd={() => setDisableYoyo(false)}
    >
      <Image src={avatarSource} alt="avatar" width={48} height={48} className="rounded-full" />
    </motion.button>
  );
};

function Name(): ReactElement {
  const { setRandomBackground, setBackground } = useBackgroundActions();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set('#profile-name', {
        clipPath: 'circle(150% at 10% 50%)',
      });
      gsap
        .timeline({
          default: {
            ease: 'power2',
          },
        })
        .from('#profile-div', {
          y: 35,
          duration: 0.4,
          autoAlpha: 0,
        })
        .from('#profile-name', {
          clipPath: 'circle(0% at 10% 50%)',
          duration: 1.5,
        });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <BlurBackground />
      <div
        onMouseEnter={setRandomBackground}
        onMouseLeave={() => setBackground(null)}
        id="profile-div"
        className="space-x-5 flex items-center self-center cursor-pointer"
        onClick={() => window.open('https://github.com/vincecao', '_blank')}
      >
        <Avatar />
        <span id="profile-name" className="text-3xl font-english">
          Lineng <b>Cao</b>
        </span>
      </div>
    </>
  );
}

export default memo(Name);
