"use client";
import type { CaseIntroEntry } from "../types/cases.types";
import { urlFor } from "@/sanity/lib/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import ScrollIndicator from "./ScrollIndicator";
import CaseLink from "./CaseLink";
import useIsMobile from "../utils/useIsMobile";
import CaseLinkDesktop from "./CaseLinkDesktop";
import formatId from "../utils/formatId";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  caseDetails: CaseIntroEntry;
  idx: number;
}

const CaseSummaryItem = ({ caseDetails, idx }: Props) => {
  const bgRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!bgRef.current) {
        return;
      }

      gsap.fromTo(
        bgRef.current,
        { y: 0},
        {
        y: () => -window.innerHeight * 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: bgRef.current.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, bgRef)

    return () => ctx.revert();
  }, []);

  const backgroundImageUrl = urlFor(
    isMobile ? caseDetails.coverImageMobile : caseDetails.coverImage
  ).url();

  const caseItemId = formatId(caseDetails.title);

  return (
    <section id={caseItemId} className={`relative ${idx === 0 ? "h-[90vh]" : "h-[800px] max-sm:h-screen"} w-full overflow-hidden bg-gray-500 transition-[height] transition-duration-800 ease-in-out`}>
      <div
        ref={bgRef}
        className={`absolute top-0 left-0 will-change-transform bg-cover bg-center bg-grey-800 opacity-80 w-full max-sm:hidden ${
          idx === 0
          ? "h-[150%] max-md:h-[139%]"
          : "h-[160%] max-md:h-[142%]"
        }`}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      />

      <div className="hidden min-sm:flex relative flex-col justify-center items-center h-full text-white px-6 text-center">
        <CaseLinkDesktop
          slug={caseDetails.slug.current}
          label={caseDetails.title}
        />
      </div>
      <div className="min-sm:hidden flex relative flex-col justify-center items-center h-full text-white px-6 text-center">
        <h2 className="text-8xl max-md:text-6xl max-sm:text-5xl max-xs:text-4xl font-bold italic mb-6">
          {caseDetails.title}
        </h2>
        <CaseLink href={`/work/${caseDetails.slug.current}`} />
    </div>
      {idx === 0 && <ScrollIndicator />}
    </section>
  )
}

export default CaseSummaryItem;