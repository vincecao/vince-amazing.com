import React, { memo, useState } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";
import useStyles from "./hooks/useStyles";

import avatarSource from "url:/assets/imgs/avatar.png";
import { BlurBackground } from "./Photos";

const BACKDROP_IMAGE_IDS = ["5685/23720401109_1916bb5aa3_b", "1477/23918418946_37e35c86d9_b", "65535/50781255093_2687684b9a_b", "65535/48123511421_bf60f2180e_b", "65535/51122522399_f09d9f8acd_b", "8871/29515305772_9a44846458_b", "4578/24457291578_9fd78d9de3_b", "5758/31002355376_473b102320_b"] as const;

const Avatar = memo(({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter: () => void; onMouseLeave: () => void }) => {
  const { boxShadow } = useStyles();
  return (
    <motion.button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ x: 0, y: 0, boxShadow: boxShadow.INITIAL }} whileHover={{ x: 2, y: 2, boxShadow: boxShadow.HOVER, transition: { duration: 0.04 } }} whileTap={{ x: 3.5, y: 3.5, boxShadow: boxShadow.TAP, transition: { duration: 0.02 }, opacity: 0.8 }} className={classNames("rounded-full", className)}>
      <img src={avatarSource} alt="avatar" className="w-12 h-12 rounded-full" onClick={() => window.open("https://github.com/vincecao")} />
    </motion.button>
  );
});

function Welcome(): React.ReactElement {
  const [showBg, setShowBg] = useState<false | string>(false);
  return (
    <>
      {showBg && <BlurBackground url={`https://live.staticflickr.com/${showBg}.jpg`} />}
      <div className="space-x-5 flex items-center self-center">
        <Avatar onMouseEnter={() => setShowBg(BACKDROP_IMAGE_IDS[Math.floor(Math.random() * BACKDROP_IMAGE_IDS.length)])} onMouseLeave={() => setShowBg(false)} />
        <span className="text-3xl font-englishname">
          Lineng <b>Cao</b>
        </span>
      </div>
    </>
  );
}

export default memo(Welcome);
