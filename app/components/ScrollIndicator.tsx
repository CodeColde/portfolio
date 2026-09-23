"use client";

import { motion, useScroll, useTransform } from "motion/react";

const FADE_IN_DELAY_S = 2;
const FADE_OUT_SCROLL_PX = 100;

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
        <p className="text-white font-light mb-4 text-center text-sm">Scroll</p>
        <div className="w-[26px] h-[44px] rounded-full border-2 border-white flex justify-center pt-2">
          <span className="block w-[4px] h-[8px] rounded-full bg-white animate-scroll-wheel motion-reduce:animate-none" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
