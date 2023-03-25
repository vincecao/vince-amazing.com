import React, { useMemo } from "react";
import Button from "./commons/Button";
import { useAppearance } from '@vincecao/use-tools';
import classNames from "classnames";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useStyles from "./hooks/useStyles";

function Root(): React.ReactElement {
  const { toggleAppearance } = useAppearance();
  const { isDark } = useStyles();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const itemClassNames = "font-['Mansalva'] cursor-pointer link-text duration-75 transition";

  return (
    <div className={classNames()}>
      <span className="fixed bottom-5 right-5 z-50">
        <Button onClick={toggleAppearance} className="font-['Mansalva'] text-lg link-text" text={ !isDark ? 'dark mode' : 'light mode' } />
      </span>

      <span className="fixed top-8 right-8 text-2xl [writing-mode:vertical-lr] space-y-5 z-50">
        <span className="font-chinesename cursor-pointer text-3xl" onClick={() => navigate('/')}><b>曹</b> 立能</span>
        <span className={classNames(itemClassNames, { 'dark:text-red-300 text-red-800': pathname.startsWith('/photos') })} onClick={() => navigate('/photos')}>/photos</span>
        <span className={classNames(itemClassNames, { 'dark:text-red-300 text-red-800': pathname.startsWith('/blog') })} onClick={() => navigate('/blog')}>/blog</span>
        <span className={classNames(itemClassNames, { 'dark:text-red-300 text-red-800': pathname.startsWith('/resume') })} onClick={() => navigate('/resume')}>/resume</span>
      </span>
      
      <Outlet />
      
    </div>
  );
}

export default Root;