"use client";
import { getImageProps } from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityImageLoader, urlFor } from "@/sanity/lib/image";
import CaseCoverVideo from "./CaseCoverVideo";

const MOBILE_MAX_WIDTH_PX = 890;

interface Props {
  coverImage: SanityImageSource;
  coverImageMobile?: SanityImageSource | null;
  coverVideo?: string | null;
  priority?: boolean;
}

const CaseCoverMedia = ({ coverImage, coverImageMobile, coverVideo, priority = false }: Props) => {
  const imageOptions = {
    alt: "",
    fill: true,
    sizes: "100vw",
    quality: 80,
    priority,
    loader: sanityImageLoader,
  } as const;
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...imageOptions,
    src: urlFor(coverImage).url(),
  });
  const mobileImageSource = coverImageMobile ?? coverImage;
  const { props: mobileImgProps } = getImageProps({
    ...imageOptions,
    src: urlFor(mobileImageSource).url(),
  });

  return (
    <>
      <picture>
        <source media={`(min-width: ${MOBILE_MAX_WIDTH_PX + 1}px)`} srcSet={desktopSrcSet} sizes="100vw" />
        <img
          {...mobileImgProps}
          alt=""
          className="object-cover object-center"
          data-intro-critical={priority || undefined}
        />
      </picture>
      {coverVideo && <CaseCoverVideo src={coverVideo} critical={priority} />}
    </>
  );
};

export default CaseCoverMedia;
