"use client";
import { useCallback, useRef, useState } from "react";
import NavButton from "./NavButton";
import { sendGAEvent } from "@next/third-parties/google";
import {
  bodyCloseStyle,
  bodyOpenStyle,
  bodyStyle,
  closeWrapperAnimateStyle,
  navContainerCloseStyle,
  navContainerOpenStyle,
  navContainerStyle,
  navWrapperStyle,
  openWrapperAnimateStyle,
  closeWrapperNoAnimateStyle,
  settledNavStyle,
  unsettledNavStyle,
} from "../styles/NavMenu.styles";
import NavPageItem from "./NavPageItem";
import pageIndex from "../constants/pageIndex";
import type { PageKeys } from "../constants/pageIndex";
import { usePathname } from "next/navigation";
import SocialContainer from "./SocialContainer";
import ContactContainer from "./ContactContainer";
import { FAST_S, MOVE_S } from "../constants/motion";

const NavMenu = () => {
  const pathName = usePathname();
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const [animateOn, setAnimateOn] = useState<string | null>(null);
  const [hasSettled, setHasSettled] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [prevPathName, setPrevPathName] = useState(pathName);

  if (prevPathName !== pathName) {
    setPrevPathName(pathName);
    setOpenedOn(null);
    setAnimateOn(null);
  }

  const isOpen = openedOn === pathName;
  const shouldAnimate = animateOn === pathName;

  const toggleNavigation = () => {
    sendGAEvent("event", "navigationMenuToggled", {});
    setAnimateOn(pathName);
    if (isOpen) {
      setHasSettled(false);
      setTimeout(() => setHasSettled(true), (FAST_S + MOVE_S) * 1000);
      setIsFadingOut(true);
      clearTimeout(fadeTimeout.current);
      fadeTimeout.current = setTimeout(() => setIsFadingOut(false), FAST_S * 1000);
      setOpenedOn(null);
    } else {
      setOpenedOn(pathName);
    }
  };

  const holdNavOpen = useCallback(() => {
    setAnimateOn(null);
  }, []);

  const pages = Object.keys(pageIndex) as PageKeys[];
  return (
    <nav
      className={`${navWrapperStyle} ${
        isOpen ? openWrapperAnimateStyle : !shouldAnimate ? closeWrapperNoAnimateStyle : closeWrapperAnimateStyle
      } ${hasSettled ? settledNavStyle : unsettledNavStyle}`}
      aria-label="Primary"
    >
      <button
        type="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls="primary-nav"
        onClick={toggleNavigation}
        className={`${navContainerStyle} ${
          isOpen
            ? shouldAnimate
              ? `${navContainerOpenStyle} bg-transparent`
              : `${navContainerCloseStyle} bg-transparent`
            : navContainerCloseStyle
        }`}
        style={{
          transition: `background-color ${isOpen ? MOVE_S : FAST_S}s ease-in-out, border-radius ${isOpen ? MOVE_S : FAST_S}s ease-in-out`,
        }}
      >
        <NavButton open={isOpen} />
        <span className="sr-only">{isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}</span>
      </button>
      <div
        className={`${bodyStyle} ${isOpen ? bodyOpenStyle : isFadingOut && shouldAnimate ? bodyCloseStyle : "hidden"}`}
      >
        {pages.map(pageName => {
          return (
            <NavPageItem
              key={pageName}
              holdNavOpen={holdNavOpen}
              closeNav={toggleNavigation}
              page={pageName}
              isOpen={isOpen}
            />
          );
        })}
      </div>
      <ContactContainer isOpen={isOpen} />
      <SocialContainer isOpen={isOpen} />
    </nav>
  );
};

export default NavMenu;
