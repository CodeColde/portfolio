"use client";
import { useState } from "react";
import useSmartBack from "../utils/useSmartBack";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { usePageTransition } from "../contexts/PageTransitionContext";
import { motion, useReducedMotion } from "motion/react";

const SECTION_BG = "bg-red-800";
const GROW_MS = 500;
const FADE_IN_S = 0.4;
const FADE_IN_DELAY_S = 0.15;

const BackButton = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  const isBlogSection = pathname.startsWith("/blog");
  const handleBack = useSmartBack(isBlogSection ? "/blog/" : "/");
  const { cover } = usePageTransition();
  const reduceMotion = useReducedMotion();

  const handleClick = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);

    setTimeout(() => {
      cover(SECTION_BG);
      handleBack();
    }, GROW_MS);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduceMotion ? 0 : FADE_IN_S,
        delay: reduceMotion ? 0 : FADE_IN_DELAY_S,
        ease: "easeOut",
      }}
      className={`${buttonStyles}${isAnimating ? ` top-[0%] left-[0%] h-full w-full ${SECTION_BG} rounded-[0px]` : " top-[2%] left-[2%] hover:rounded-[56px]"}`}
      style={{
        transition:
          "background-color 0.1s ease-in-out, border-radius 0.15s ease-in, top 0.2s ease-in-out, left 0.2s ease-in-out, width 0.4s ease-in-out, height 0.4s ease-in-out",
      }}
    >
      <button type="button" onClick={handleClick} className="cursor-pointer h-full w-full p-[12px]">
        <Image
          src="/back.png"
          alt="Back to my work"
          width={50}
          height={50}
          className={`${isAnimating ? "opacity-0" : "opacity-100"} transition-[opacity] duration-100 ease-in-out`}
        />
        <span className="sr-only">Back</span>
      </button>
    </motion.div>
  );
};
export default BackButton;

const buttonStyles = `
  z-3
  fixed
  h-[56px]
  w-[56px]
  rounded-[0px]
  cursor-pointer
  hover:bg-red-800
`;
