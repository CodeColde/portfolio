import { urlFor } from "@/sanity/lib/image";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";

import type { PortableTextTypeComponentProps } from "next-sanity";

type SanityImageValue = {
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
  [key: string]: any;
};

const ContentImage = ({ value }: PortableTextTypeComponentProps<SanityImageValue>) => {
  const { width, height } = getImageDimensions(value);
  return (
    <Image
      src={urlFor(value).fit("max").auto("format").url()}
      width={width}
      height={height}
      loading="lazy"
      alt={value.alt || ''}
      className="block my-8 mx-auto"
      style={{
        aspectRatio: width / height
      }}
    />
  );
};

export default ContentImage;