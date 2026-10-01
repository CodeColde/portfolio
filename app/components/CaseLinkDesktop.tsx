import Link from "next/link";
import type { MotionValue } from "motion/react";
import useCaseTransition from "../utils/useCaseTransition";

interface Props {
  slug: string;
  label: string;
  settleParallax: MotionValue<number>;
}

const CaseLinkDesktop = ({ slug, label, settleParallax }: Props) => {
  const { isTransitioning, isSettling, handleClick } = useCaseTransition({ slug, label, settleParallax });

  return (
    <Link
      href={`/${slug}`}
      prefetch
      onClick={handleClick}
      aria-label={`Go to project: ${label}`}
      className={`${linkClasses} ${isTransitioning ? "" : staticLinkClasses}`}
    >
      <h2
        className={`${labelClasses} ${isTransitioning && !isSettling ? "-skew-x-20" : ""} ${isTransitioning ? "text-white" : ""}`}
      >
        {label}
      </h2>
      <span className={`${spanClasses} ${isTransitioning ? "bg-red-800" : "bg-white"}`} />
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
