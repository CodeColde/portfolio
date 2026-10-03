import Link from "next/link";
import type { MotionValue } from "motion/react";
import useCaseTransition from "../utils/useCaseTransition";

interface Props {
  slug: string;
  label: string;
  settleParallax: MotionValue<number>;
}

const CaseLink = ({ slug, label, settleParallax }: Props) => {
  const { isTransitioning, handleClick } = useCaseTransition({ slug, label, settleParallax });

  return (
    <div className={`${collapseClasses} ${isTransitioning ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr]"}`}>
      <div className="min-h-0 overflow-hidden">
        <Link
          href={`/${slug}`}
          prefetch
          onClick={handleClick}
          className={`${linkClasses} ${isTransitioning ? "bg-red-800 border-red-800" : "border-white"}`}
        >
          View Case
        </Link>
      </div>
    </div>
  );
};

export default CaseLink;

const collapseClasses = `
  grid
  transition-[grid-template-rows,opacity]
  duration-(--motion-base)
  ease-in-out
`;

const linkClasses = `
  border-2
  max-sm:border
  px-6
  py-3
  max-md:px-5
  max-md:py-2
  font-bold
  rounded-4xl
  text-md
  max-md:text-sm
  max-sm:text-xs
  uppercase
  inline-block
  hover:bg-red-800
  hover:text-white
  hover:border-red-800
  transition-[background,color,border,transform]
  duration-(--motion-fast)
  ease-in-out
`;
