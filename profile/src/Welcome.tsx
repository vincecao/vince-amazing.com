import classNames from 'classnames';
import { motion } from 'framer-motion';
import { memo } from 'react';
import useStyles from './hooks/useStyles';
import avatarSource from 'url:/assets/imgs/avatar.png';

const Avatar = memo(({ className }: { className?: string }) => {
  const { boxShadow } = useStyles();
  return (
    <motion.button
      style={{ x: 0, y: 0, boxShadow: boxShadow.INITIAL }}
      whileHover={{ x: 2, y: 2, boxShadow: boxShadow.HOVER, transition: { duration: 0.04 } }}
      whileTap={{ x: 3.5, y: 3.5, boxShadow: boxShadow.TAP, transition: { duration: 0.02 }, opacity: 0.8 }}
      className={classNames('rounded-full', className)}
    >
      <img src={avatarSource} alt="avatar" className="w-12 h-12 rounded-full" onClick={() => window.open('https://github.com/vincecao')} />
    </motion.button>
  );
});

function Welcome(): React.ReactElement {
  return (
    <div className="space-x-5 flex items-center">
      <Avatar />
      <span className="text-xl">
        Lineng <b>Cao</b>
      </span>
    </div>
  );
}

export default memo(Welcome);