"use client";
import { type ReactNode, useEffect } from "react";
import Lenis from "lenis";

interface Props {
  children: ReactNode;
}

const SmoothScrollProvider = ({ children }: Props) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    }
  }, []);

  return (
    <>{children}</>
  );
}

export default SmoothScrollProvider;