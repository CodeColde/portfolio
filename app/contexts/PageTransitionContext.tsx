"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

const EASE: [number, number, number, number] = [0.45, 0, 0.55, 1];
const REVEAL_DURATION_S = 0.5;
const STUCK_FALLBACK_MS = 5000;

interface Cover {
  bgClass: string;
  fromPathname: string;
}

interface PageTransitionContextValue {
  cover: (bgClass: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue>({ cover: () => {} });

export const usePageTransition = () => useContext(PageTransitionContext);

export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [cover, setCover] = useState<Cover | null>(null);

  const requestCover = useCallback((bgClass: string) => setCover({ bgClass, fromPathname: pathname }), [pathname]);
  const value = useMemo(() => ({ cover: requestCover }), [requestCover]);

  useEffect(() => {
    if (!cover) {
      return;
    }
    const timeout = setTimeout(() => setCover(null), STUCK_FALLBACK_MS);
    return () => clearTimeout(timeout);
  }, [cover]);

  const isCovered = cover !== null && cover.fromPathname === pathname;

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      <AnimatePresence onExitComplete={() => setCover(null)}>
        {isCovered && (
          <motion.div
            key="page-transition-cover"
            aria-hidden
            className={`fixed inset-0 z-4 pointer-events-none ${cover.bgClass}`}
            initial={false}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : REVEAL_DURATION_S, ease: EASE }}
          />
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
};
