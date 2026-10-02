import { getImageDimensions } from "@sanity/asset-utils";
import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { sanityImageLoader, urlFor } from "@/sanity/lib/image";
import type { CoverAsset } from "../types/coverAssets.types";

const DESKTOP_MEDIA = "(min-width: 890px)";

interface Props {
  portrait: CoverAsset;
}

const AboutPortrait = ({ portrait: { coverImage, altText, lqip } }: Props) => {
  const { aspectRatio } = getImageDimensions(coverImage);
  const sizes = `max(${Math.round(aspectRatio * 100)}vh, 25vw)`;
  const {
    props: { srcSet, ...imgProps },
  } = getImageProps({
    src: urlFor(coverImage).url(),
    alt: altText,
    fill: true,
    sizes,
    loading: "eager",
    fetchPriority: "high",
    placeholder: "blur",
    blurDataURL: lqip,
    style: { objectFit: "cover" },
    loader: sanityImageLoader,
  });

  preload(imgProps.src, {
    as: "image",
    imageSrcSet: srcSet,
    imageSizes: sizes,
    fetchPriority: "high",
    media: DESKTOP_MEDIA,
  });

  return (
    <picture>
      <source media={DESKTOP_MEDIA} srcSet={srcSet} sizes={sizes} />
      <img {...imgProps} src={lqip} alt={altText} data-intro-critical />
    </picture>
  );
};

export default AboutPortrait;
