import React, { memo, useLayoutEffect, useState } from "react";
import type { ReactElement } from "react";
import classNames from "classnames";
import gsap from "gsap";
import { motion } from "framer-motion";

import { BlurBackground } from "./Photos";
import useStyles from "./hooks/useStyles";
import BACKDROP_IMAGE_IDS from "./consts/backdrop-image-ids.json";

import avatarSource from "url:/assets/imgs/avatar.png?as=webp";

const Avatar = memo(({ className }: { className?: string }) => {
  const { boxShadow } = useStyles();
  const [disableYoyo, setDisableYoyo] = useState(false);
  return (
    <motion.button
      style={{ x: 0, y: 0, boxShadow: boxShadow.INITIAL, background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)" }}
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
              duration: 2.5,
              repeat: Infinity,
              type: "spring",
              bounce: 0.5,
            }
      }
      whileHover={{
        x: 2,
        y: 2,
        boxShadow: boxShadow.HOVER,
        transition: {
          type: "spring",
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
      className={classNames("rounded-full", className)}
      onHoverStart={() => setDisableYoyo(true)}
      onHoverEnd={() => setDisableYoyo(false)}
    >
      <img src={avatarSource} alt="avatar" className="w-12 h-12 rounded-full" />
    </motion.button>
  );
});

function Welcome(): ReactElement {
  const [showBg, setShowBg] = useState<false | string>(false);
  const onMouseEnter = () => setShowBg(BACKDROP_IMAGE_IDS[Math.floor(Math.random() * BACKDROP_IMAGE_IDS.length)]);
  const onMouseLeave = () => setShowBg(false);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set("#profile-name", {
        clipPath: "circle(150% at 10% 50%)",
      });
      gsap
        .timeline({
          default: {
            ease: "power2",
          },
        })
        .from("#profile-div", {
          y: 35,
          duration: 0.4,
          autoAlpha: 0,
        })
        .from("#profile-name", {
          clipPath: "circle(0% at 10% 50%)",
          duration: 1.5,
        });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <BlurBackground url={showBg ? `/assets/preserved/imgs/backdrops/${showBg.replace(/\//g, "-")}.jpg` : undefined} />
      <button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} type="button" id="profile-div" className="space-x-5 flex items-center self-center cursor-pointer" onClick={() => window.open("https://github.com/vincecao", "_blank")}>
        <Avatar />
        <span id="profile-name" className="text-3xl font-englishname">
          Lineng <b>Cao</b>
        </span>
      </button>
    </>
  );
}

export default memo(Welcome);
