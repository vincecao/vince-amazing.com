import React, { memo, useLayoutEffect, useState } from "react";
import type { ReactElement } from "react";
import classNames from "classnames";
import gsap from "gsap";
import { motion } from "framer-motion";

import { BlurBackground } from "./Photos";
import useStyles from "./hooks/useStyles";
import BACKDROP_IMAGE_IDS from "./consts/backdrop-image-ids.json";

import avatarSource from "url:/assets/imgs/avatar.png?as=webp";

const Avatar = memo(({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter: () => void; onMouseLeave: () => void }) => {
  const { boxShadow } = useStyles();
  return (
    <motion.button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ x: 0, y: 0, boxShadow: boxShadow.INITIAL }}
      whileHover={{
        x: 2,
        y: 2,
        boxShadow: boxShadow.HOVER,
        transition: { duration: 0.04 },
      }}
      whileTap={{
        x: 3.5,
        y: 3.5,
        boxShadow: boxShadow.TAP,
        transition: { duration: 0.02 },
        opacity: 0.8,
      }}
      className={classNames("rounded-full", className)}
    >
      <img src={avatarSource} alt="avatar" className="w-12 h-12 rounded-full" onClick={() => window.open("https://github.com/vincecao")} />
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
        clipPath: "circle(150% at 10% 90%)",
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
          clipPath: "circle(0% at 10% 90%)",
          duration: 1,
        });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <BlurBackground url={showBg ? `/assets/preserved/imgs/backdrops/${showBg.replace(/\//g, "-")}.jpg` : undefined} />
      <div id="profile-div" className="space-x-5 flex items-center self-center">
        <Avatar onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
        <span id="profile-name" className="text-3xl font-englishname">
          Lineng <b>Cao</b>
        </span>
      </div>
    </>
  );
}

export default memo(Welcome);
