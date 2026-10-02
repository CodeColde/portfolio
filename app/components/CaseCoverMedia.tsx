"use client";
import { getImageProps } from "next/image";
import { preload } from "react-dom";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityImageLoader, urlFor } from "@/sanity/lib/image";
import CaseCoverVideo from "./CaseCoverVideo";

const MOBILE_MAX_WIDTH_PX = 890;
const DESKTOP_MEDIA = `(min-width: ${MOBILE_MAX_WIDTH_PX + 1}px)`;
const MOBILE_MEDIA = `not all and ${DESKTOP_MEDIA}`;
const SIZES = "100vw";

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
    sizes: SIZES,
    quality: 80,
    loading: priority ? "eager" : "lazy",
    fetchPriority: priority ? "high" : undefined,
    loader: sanityImageLoader,
  } as const;
  const { props: desktopImgProps } = getImageProps({
    ...imageOptions,
    src: urlFor(coverImage).url(),
  });
  const mobileImageSource = coverImageMobile ?? coverImage;
  const { props: mobileImgProps } = getImageProps({
    ...imageOptions,
    src: urlFor(mobileImageSource).url(),
  });

  if (priority) {
    const preloadOptions = { as: "image", imageSizes: SIZES, fetchPriority: "high" } as const;
    preload(desktopImgProps.src, { ...preloadOptions, imageSrcSet: desktopImgProps.srcSet, media: DESKTOP_MEDIA });
    preload(mobileImgProps.src, { ...preloadOptions, imageSrcSet: mobileImgProps.srcSet, media: MOBILE_MEDIA });
  }

  return (
    <>
      <picture>
        <source media={DESKTOP_MEDIA} srcSet={desktopImgProps.srcSet} sizes={SIZES} />
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
