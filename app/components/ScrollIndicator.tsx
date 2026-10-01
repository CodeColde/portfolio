"use client";

import { motion, useScroll, useTransform } from "motion/react";

const FADE_IN_DELAY_S = 2;
const FADE_OUT_SCROLL_PX = 100;

const MouseScroll = () => (
  <div className="w-6.5 h-11 rounded-full border-2 border-white flex justify-center pt-2 pointer-coarse:hidden">
    <span className="block w-1 h-2 rounded-full bg-white animate-scroll-wheel motion-reduce:animate-none" />
  </div>
);

const FingerSwipe = () => (
  <div className="hidden pointer-coarse:flex w-8 h-11 justify-center pt-1">
    <div className="relative size-7 origin-[33%_8%] animate-swipe-finger motion-reduce:animate-none">
      <span className="absolute left-1/3 top-[15%] size-3.5 -translate-1/2 rounded-full bg-white/30 animate-swipe-touch motion-reduce:hidden" />
      {/* Lucide "pointer" icon (ISC) */}
      <svg
        aria-hidden
        className="relative"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 14a8 8 0 0 1-8 8" />
        <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
        <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
        <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
        <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    </div>
  </div>
);

const ScrollIndicator = () => {
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, FADE_OUT_SCROLL_PX], [1, 0]);

  return (
    <motion.div
      id="scroll-indicator"
      className="absolute bottom-[4%] left-1/2 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: FADE_IN_DELAY_S, duration: 0.3, ease: "easeInOut" }}
      aria-hidden
    >
      <motion.div style={{ opacity: scrollOpacity }} className="flex flex-col items-center">
        <p className="text-white font-light mb-4 text-center text-sm">
          <span className="pointer-coarse:hidden">Scroll</span>
          <span className="hidden pointer-coarse:inline">Swipe</span>
        </p>
        <MouseScroll />
        <FingerSwipe />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
