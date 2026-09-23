import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { MotionValue } from "motion/react";
import animateCaseTransition from "../utils/animateCaseTransition";
import { useLenis } from "../contexts/LenisContext";
import formatId from "../utils/formatId";

interface Props {
  slug: string;
  label: string;
  settleParallax: MotionValue<number>;
}

const CaseLinkDesktop = ({ slug, label, settleParallax }: Props) => {
  const router = useRouter();
  const lenis = useLenis();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSettling, setIsSettling] = useState(false);
  const caseItemId = formatId(label);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);

    animateCaseTransition({
      caseItemId,
      slug,
      router,
      lenis,
      settleParallax,
      onSettle: () => setIsSettling(true),
      onComplete: () => {
        setIsAnimating(false);
        setIsSettling(false);
      },
    });
  };

  return (
    <Link
      href={`/${slug}`}
      prefetch
      onClick={handleClick}
      aria-label={`Go to project: ${label}`}
      className={`${linkClasses} ${isAnimating ? "" : staticLinkClasses}`}
    >
      <h2
        className={`${labelClasses} ${isAnimating && !isSettling ? "-skew-x-20" : ""} ${isAnimating ? "text-white" : ""}`}
      >
        {label}
      </h2>
      <span className={`${spanClasses} ${isAnimating ? "bg-red-800" : "bg-white"}`} />
    </Link>
  );
};

export default CaseLinkDesktop;

const linkClasses = `
  text-white
  cursor-pointer
  relative
  hover:[&>h2]:-skew-x-20
  hover:[&>h2]:text-red-800
`;

const staticLinkClasses = `
  hover:[&>span]:w-[110%]
  hover:[&>span]:z-1
  hover:[&>span]:bg-red-800
`;

const labelClasses = `
  text-8xl
  max-md:text-6xl
  max-sm:text-5xl
  max-xs:text-4xl
  font-bold
  italic
  text-shadow-sm
  mb-[24px]
  transition-[transform,color]
  duration-500
  ease-in-out
`;

const spanClasses = `
  w-[0]
  h-[12px]
  absolute
  top-1/2
  left-1/2
  -translate-x-1/2
  -translate-y-[80%]
  transition-[width,background-color]
  duration-300
  ease-in-out
`;
