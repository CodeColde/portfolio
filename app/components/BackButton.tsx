"use client";
import { useRef, useState } from "react";
import useSmartBack from "../utils/useSmartBack";
import useIsOverDarkBackdrop from "../utils/useIsOverDarkBackdrop";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { usePageTransition } from "../contexts/PageTransitionContext";
import { motion, useReducedMotion } from "motion/react";
import { BASE_S, FAST_S, HOLD_S, MOVE_S } from "../constants/motion";

const BackButton = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  const isBlogSection = pathname.startsWith("/blog");
  const sectionBg = isBlogSection ? "bg-yellow-900" : "bg-red-800";
  const sectionHoverBg = isBlogSection ? "hover:bg-yellow-900" : "hover:bg-red-800";
  const handleBack = useSmartBack(isBlogSection ? "/blog/" : "/");
  const { cover } = usePageTransition();
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isOverDark = useIsOverDarkBackdrop(containerRef);

  const handleClick = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);

    setTimeout(() => {
      cover(sectionBg);
      handleBack();
    }, MOVE_S * 1000);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduceMotion ? 0 : BASE_S,
        delay: reduceMotion ? 0 : HOLD_S,
        ease: "easeOut",
      }}
      className={`${buttonStyles} ${sectionHoverBg}${isAnimating ? ` top-[0%] left-[0%] h-full w-full ${sectionBg} rounded-none` : " top-[2%] left-[2%] hover:rounded-[56px]"}`}
      style={{
        transition: `background-color ${FAST_S}s ease-in-out, border-radius ${FAST_S}s ease-in, top ${MOVE_S}s ease-in-out, left ${MOVE_S}s ease-in-out, width ${MOVE_S}s ease-in-out, height ${MOVE_S}s ease-in-out`,
      }}
    >
      <button type="button" onClick={handleClick} className="cursor-pointer h-full w-full p-3">
        <Image
          src="/back.png"
          alt="Back to my work"
          width={50}
          height={50}
          className={`${isAnimating ? "opacity-0" : "opacity-100"} ${isOverDark ? "" : "invert group-hover:invert-0"} transition-[opacity,filter] duration-(--motion-fast) ease-in-out`}
        />
        <span className="sr-only">Back</span>
      </button>
    </motion.div>
  );
};
export default BackButton;

const buttonStyles = `
  group
  z-3
  fixed
  h-[56px]
  w-[56px]
  rounded-[0px]
  cursor-pointer
`;
