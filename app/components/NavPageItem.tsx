"use client";
import Link from "next/link";
import {
  linkStyle,
  openSpanStyle,
  activeSpanStyle,
  pageSectionStyle,
  spanStyle,
  nonAnimatingPageHoverStyles,
} from "../styles/NavMenu.styles";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import storeNavBg from "../utils/storeNavBg";
import pageIndex, { type PageKeys } from "../constants/pageIndex";
import { usePageTransition } from "../contexts/PageTransitionContext";

interface Props {
  isOpen: boolean;
  holdNavOpen: () => void;
  closeNav: () => void;
  page: PageKeys;
}

const SWEEP_FALLBACK_MS = 500;

const NavPageItem = ({ isOpen, holdNavOpen, closeNav, page }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSweeping, setIsSweeping] = useState(false);
  const [isNavigating, startNavigation] = useTransition();
  const barRef = useRef<HTMLSpanElement | null>(null);
  const { cover } = usePageTransition();

  const { slug, bg, bgHover, text, textHover, label } = pageIndex[page];

  const isAnimating = isSweeping || isNavigating;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isAnimating) {
      return;
    }

    if (pathname === slug) {
      closeNav();
      return;
    }

    setIsSweeping(true);
    holdNavOpen();

    let started = false;
    const navigate = () => {
      if (started) {
        return;
      }
      started = true;
      clearTimeout(fallback);

      const main = document.querySelector("main");
      if (main) {
        main.style.transition = "none";
        main.style.opacity = "0";
      }
      storeNavBg(false);
      cover(bg);

      setIsSweeping(false);
      startNavigation(() => {
        router.push(slug);
      });
    };

    const fallback = setTimeout(navigate, SWEEP_FALLBACK_MS);
    barRef.current?.addEventListener("transitionend", navigate, { once: true });
  };

  const spanClasses =
    `${spanStyle}` +
    `${isOpen && isAnimating ? activeSpanStyle : ""}` +
    `${isAnimating ? `${openSpanStyle} ${bg}` : ""}`;

  const parentClasses = `${pageSectionStyle} ${!isAnimating ? `${textHover} ${bgHover} ${nonAnimatingPageHoverStyles}` : ""}`;

  const labelClasses = `${linkStyle}` + `${isAnimating ? text : ""}`;

  return (
    <Link
      href={slug}
      prefetch
      onClick={handleClick}
      aria-hidden={isOpen ? undefined : true}
      tabIndex={isOpen ? 0 : -1}
      className={parentClasses}
    >
      <h3 className={labelClasses}>{label}</h3>
      <span ref={barRef} className={spanClasses} />
    </Link>
  );
};

export default NavPageItem;
