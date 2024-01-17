import React, { useLayoutEffect } from "react";
import { useAppearance } from "@vincecao/use-tools";
import classNames from "classnames";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

import Button from "./commons/Button";
import useStyles from "./hooks/useStyles";
import usePathnameWithTop from "./hooks/usePathnameWithTop";

import resumeSource from "url:/assets/resources/resume/Resume_12_04_2023_trimmed.pdf";

function Root(): React.ReactElement {
  const { toggleAppearance } = useAppearance();
  const { isDark } = useStyles();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const itemClassNames = "font-['Mansalva'] cursor-pointer link-text inline-block";

  usePathnameWithTop();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline({
          default: {
            ease: "power2",
          },
        })
        .from(["#side-nav span", "#side-nav a"], {
          x: "10px",
          autoAlpha: 0,
          stagger: 0.1,
          delay: 1.4,
        })
        .from("#theme-mode-btn-span", {
          x: "10px",
          autoAlpha: 0,
          duration: 0.7,
        });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <span id="theme-mode-btn-span" className="fixed bottom-5 right-5 z-50">
        <Button onClick={toggleAppearance} className="font-['Mansalva'] text-lg link-text" text={!isDark ? "dark mode" : "light mode"} />
      </span>

      <span id="side-nav" className="fixed top-8 right-8 md:text-2xl [writing-mode:vertical-lr] space-y-5 z-50">
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
    </>
  );
}

export default Root;
