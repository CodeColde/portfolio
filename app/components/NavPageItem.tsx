"use client";
import Link from "next/link";
import {
  linkStyle,
  activeSpanStyle,
  pageSectionStyle,
  spanStyle,
  nonAnimatingPageHoverStyles,
} from "../styles/NavMenu.styles";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import pageIndex, { type PageKeys } from "../constants/pageIndex";
import { MOVE_S } from "../constants/motion";
import { usePageTransition } from "../contexts/PageTransitionContext";

interface Props {
  isOpen: boolean;
  holdNavOpen: () => void;
  closeNav: () => void;
  page: PageKeys;
}

const SWEEP_FALLBACK_MS = MOVE_S * 1000 + 100;
// Slightly past the furthest screen edge, so the sweep lands there just before it ends.
const SWEEP_OVERSHOOT = 1.1;

// Sized from the item outward to cover the viewport, so the whole sweep plays on screen rather than mostly past its edges.
const sweepSizeFrom = (bar: HTMLElement) => {
  const rect = bar.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return {
    width: 2 * Math.max(centerX, window.innerWidth - centerX) * SWEEP_OVERSHOOT,
    height: 2 * Math.max(centerY, window.innerHeight - centerY) * SWEEP_OVERSHOOT,
  };
};

const NavPageItem = ({ isOpen, holdNavOpen, closeNav, page }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSweeping, setIsSweeping] = useState(false);
  const [sweepSize, setSweepSize] = useState<{ width: number; height: number } | null>(null);
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

    if (barRef.current) {
      setSweepSize(sweepSizeFrom(barRef.current));
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
      cover(bg);

      setIsSweeping(false);
      startNavigation(() => {
        router.push(slug);
      });
    };

    const fallback = setTimeout(navigate, SWEEP_FALLBACK_MS);
    barRef.current?.addEventListener("transitionend", navigate, { once: true });
  };

  const spanClasses = `${spanStyle} ${isOpen && isAnimating ? activeSpanStyle : ""} ${isAnimating ? bg : ""}`;

  const parentClasses = `${pageSectionStyle} ${!isAnimating ? `${textHover} ${bgHover} ${nonAnimatingPageHoverStyles}` : ""}`;

  const labelClasses = `${linkStyle}` + `${isAnimating ? text : ""}`;

  return (
    <Link href={slug} prefetch onClick={handleClick} inert={!isOpen} className={parentClasses}>
      <h3 className={labelClasses}>{label}</h3>
      <span ref={barRef} className={spanClasses} style={isAnimating && sweepSize ? sweepSize : undefined} />
    </Link>
  );
};

export default NavPageItem;
