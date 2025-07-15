"use client";
import type { CaseIntroEntry } from "../types/cases.types";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import ScrollIndicator from "./ScrollIndicator";
import CaseLink from "./CaseLink";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  caseDetails: CaseIntroEntry;
  idx: number;
}

const CaseSummaryItem = ({ caseDetails, idx }: Props) => {
  const bgRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className={`relative ${idx === 0 ? "h-[90vh]" : "h-[800px]"} w-full overflow-hidden bg-gray-500`}>
      <div
        ref={bgRef}
        className={`absolute top-0 left-0 will-change-transform bg-cover bg-center bg-grey-800 opacity-90 w-full ${
          idx === 0
          ? "h-[150%] max-md:h-[140%] max-sm:h-[139%]"
          : "h-[160%] max-md:h-[150%] max:sm:h-[142%]"
        }`}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          backgroundImage: `url(${urlFor(caseDetails.coverImage).url()})`,
        }}
      />

      <div className="hidden min-sm:flex relative flex-col justify-center items-center h-full text-white px-6 text-center">
        <Link
          href={`/work/${caseDetails.slug.current}`}
          className="text-white cursor-pointer hover:[&>h2]:-skew-x-20 hover:[&>h2]:text-red-800"
        >
          <h2
            className="text-8xl max-md:text-6xl max-sm:text-5xl max-xs:text-4xl font-bold italic mb-[24px] transition-[transform,color] transition-duration-500 ease-in-out"
          >
            {caseDetails.title}
          </h2>
          <p className="uppercase text-xl max-sm:text-sm italic">{caseDetails.client}</p>
        </Link>
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