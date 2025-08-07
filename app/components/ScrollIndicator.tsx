"use client";

// ratio of gif is 0.56:1 (width 168 height 300);

import { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [opacity, setOpacity] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadIn = setTimeout(() => {
      setMounted(true);
    }, 2000);
    return () => clearTimeout(loadIn);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setOpacity(scrollY < 100 ? 1 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run on mount in case already scrolled
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  return (
    <div
      id="scroll-indicator"
      className="absolute bottom-[4%] left-1/2 -translate-x-1/2 flex items-center flex-col transition-opacity duration-300 ease-in-out"
      style={{ opacity: mounted ? opacity : 0 }}
    >
      <p className="text-white font-light mb-4 text-center text-sm">Scroll</p>
      <img
        src="/ScrollIndicator.gif" alt="Scroll Indicator" height="60px" width="33px" />
    </div>
  );
};

export default ScrollIndicator;
