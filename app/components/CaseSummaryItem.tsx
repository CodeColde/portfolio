"use client";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { CaseIntroEntry } from "../types/cases.types";
import ScrollIndicator from "./ScrollIndicator";
import CaseCoverMedia from "./CaseCoverMedia";
import CaseLink from "./CaseLink";
import CaseLinkDesktop from "./CaseLinkDesktop";
import formatId from "../utils/formatId";

const PARALLAX_DISTANCE_VH = -30;

interface Props {
  caseDetails: CaseIntroEntry;
  idx: number;
}

const CaseSummaryItem = ({ caseDetails, idx }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isFirst = idx === 0;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxVh = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : PARALLAX_DISTANCE_VH]);
  const settleParallax = useMotionValue(0);
  const y = useTransform(() => `${parallaxVh.get() * (1 - settleParallax.get())}vh`);

  const caseItemId = formatId(caseDetails.title);

  return (
    <section
      id={caseItemId}
      ref={sectionRef}
      className={`relative ${isFirst ? "h-[90vh]" : "h-200 max-sm:h-screen"} w-full overflow-hidden bg-gray-500`}
    >
      <motion.div
        data-cover-layer
        style={{ y }}
        className={`absolute top-0 left-0 w-full will-change-transform opacity-80 ${
          isFirst ? "h-[150%] max-md:h-[139%]" : "h-[160%] max-md:h-[142%]"
        }`}
      >
        <CaseCoverMedia
          coverImage={caseDetails.coverImage}
          coverImageMobile={caseDetails.coverImageMobile}
          coverVideo={caseDetails.coverVideo}
          priority={isFirst}
        />
      </motion.div>

      <div className="hidden sm:flex relative z-2 flex-col justify-center items-center h-full text-white px-6 text-center">
        <CaseLinkDesktop slug={caseDetails.slug.current} label={caseDetails.title} settleParallax={settleParallax} />
      </div>
      <div className="sm:hidden flex relative z-2 flex-col justify-center items-center h-full text-white px-6 text-center">
        <h2 className="text-8xl max-md:text-6xl max-sm:text-5xl max-xs:text-4xl font-bold italic mb-6">
          {caseDetails.title}
        </h2>
        <CaseLink slug={caseDetails.slug.current} label={caseDetails.title} settleParallax={settleParallax} />
      </div>
      {isFirst && <ScrollIndicator />}
    </section>
  );
};

export default CaseSummaryItem;
