import React from "react";
import Button from "./commons/Button";
import { useAppearance } from "@vincecao/use-tools";
import classNames from "classnames";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useStyles from "./hooks/useStyles";

import resumeSource from "url:/assets/resources/resume/Resume_10_22_2022.pdf";

function Root(): React.ReactElement {
  const { toggleAppearance } = useAppearance();
  const { isDark } = useStyles();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const itemClassNames = "font-['Mansalva'] cursor-pointer link-text duration-75 transition";

  return (
    <div className={classNames()}>
      <span className="fixed bottom-5 right-5 z-50">
        <Button onClick={toggleAppearance} className="font-['Mansalva'] text-lg link-text" text={!isDark ? "dark mode" : "light mode"} />
      </span>

      <span className="fixed top-8 right-8 md:text-2xl [writing-mode:vertical-lr] space-y-5 z-50">
        <span className="font-chinesename cursor-pointer text-xl md:text-3xl" onClick={() => navigate("/")}>
          <b>曹</b> 立能
        </span>
        <Link className={classNames(itemClassNames, { "dark:text-red-300 text-red-800": pathname.startsWith("/photos") })} to="/photos">
          /photos
        </Link>
        <Link className={classNames(itemClassNames, { "dark:text-red-300 text-red-800": pathname.startsWith("/blog") })} to="/blog">
          /blog
        </Link>
        <Link className={classNames(itemClassNames, { "dark:text-red-300 text-red-800": pathname.startsWith("/resume") })} to={resumeSource} download target="_blank">
          /resume
        </Link>
      </span>

      <Outlet />
    </div>
  );
}

export default Root;
