import React from "react";
import Button from "./components/Button";
import { useAppearance } from '@vincecao/use-tools';
import classNames from "classnames";

import { Outlet, useNavigate } from "react-router-dom";
import useStyles from "./hooks/useStyles";



function Root(): React.ReactElement {
  const { toggleAppearance } = useAppearance();
  const { isDark} = useStyles();

  const navigate = useNavigate();
  return (
    <div className={classNames()}>
      <span className="fixed bottom-5 right-5">
        <Button onClick={toggleAppearance} className="font-mono text-sm" text={ !isDark ? 'dark' : 'light' } />
      </span>
      <span className="fixed top-8 right-8 text-2xl [writing-mode:vertical-lr] space-y-5">
        <span className="font-chinese cursor-pointer" onClick={() => navigate('/')}><b>曹</b> 立能</span>
        <span className="overline cursor-pointer" onClick={() => navigate('/photos')}>/photos</span>
        <span className="overline cursor-pointer" onClick={() => navigate('/blog')}>/blog</span>
      </span>
      
      <Outlet />
      
    </div>
  );
}

export default Root;