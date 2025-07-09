"use client";
import Link from "next/link";
import {
  linkStyle,
  openSpanStyle,
  activeSpanStyle,
  pageSectionStyle,
  spanStyle,
  nonAnimatingPageHoverStyles
} from "../styles/NavMenu.styles"
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import storeNavBg from "../utils/storeNavBg";
import pageIndex, { type PageKeys } from "../constants/pageIndex";

interface Props {
  isOpen: boolean;
  holdNavOpen: () => void;
  page: PageKeys;
}

const NavPageItem = ({
  isOpen,
  holdNavOpen,
  page
}: Props) => {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const barRef = useRef<HTMLSpanElement | null>(null);

  const { slug, bg, bgHover, text, textHover, label } = pageIndex[page];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isAnimating) {
      return
    };

    setIsAnimating(true);
    holdNavOpen();

    barRef.current?.addEventListener(
      "transitionend",
      () => {
        document.body.style.backgroundColor = pageIndex[page].bg;
        const main = document.querySelector("main");
        if (main) {
          main.style.transition = "none";
          main.style.opacity = "0";
        }
        storeNavBg(false);
        router.push(pageIndex[page].slug);
        setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      },
      { once: true }
    )
  };

  const spanClasses =
    `${spanStyle}` +
    `${isOpen && isAnimating ? activeSpanStyle : ""}` +
    `${isAnimating ? `${openSpanStyle} ${bg}` : ""}`;

  const parentClasses = `${pageSectionStyle} ${!isAnimating ? `${textHover} ${bgHover} ${nonAnimatingPageHoverStyles}` : ""}`;

  const labelClasses =
   `${linkStyle}` +
   `${isAnimating ? text : ""}`;

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
}

export default NavPageItem;