import { useRouter } from "next/navigation";
import { useState } from "react";
import type { MotionValue } from "motion/react";
import { useLenis } from "../contexts/LenisContext";
import animateCaseTransition from "./animateCaseTransition";
import formatId from "./formatId";

interface Options {
  slug: string;
  label: string;
  settleParallax: MotionValue<number>;
}

const useCaseTransition = ({ slug, label, settleParallax }: Options) => {
  const router = useRouter();
  const lenis = useLenis();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSettling, setIsSettling] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isTransitioning) {
      return;
    }
    setIsTransitioning(true);

    animateCaseTransition({
      caseItemId: formatId(label),
      slug,
      router,
      lenis,
      settleParallax,
      onSettle: () => setIsSettling(true),
    });
  };

  return { isTransitioning, isSettling, handleClick };
};

export default useCaseTransition;
