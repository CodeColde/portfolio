import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import type { HomeOpeningType } from "../types/opening.types";
import type { CoverAssetType } from "../types/coverAssets.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface HomepageData {
  first: HomeOpeningType;
  second: CoverAssetType;
}

async function getHomepageData() {
	const query = `
    {
      "first" : *[_type == "openings"] {
        home
      },
      "second": *[_type == "coverAssets" && location == "home"] {
        coverImage,
        altText
      }
    }
  `;

	const data: HomepageData = await client.fetch(query);
	return data;
}

export default async function Home() {
	const homepageData = await getHomepageData();
  const openingText = homepageData.first[0].home;
  const coverImage = homepageData.second[0].coverImage;
  const altText = homepageData.second[0].altText;

	return (
		<main className="flex relative w-full h-screen bg-blue-800">
			<article className={richTextStyles}>
				<h1 className={welcomeTextStyles}>
					Hayo Friese
				</h1>
				<PortableText value={openingText} />
			</article>
      {coverImage ? (
        <article className={imageWrapperStyles}>
          <Image
            src={urlFor(coverImage).width(720).height(960).dpr(2).url()}
            alt={altText}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={urlFor(coverImage).width(720).height(960).dpr(2).blur(10).url()}
            priority
          />
        </article>
      ) : undefined}
		</main>
	);
}

const richTextStyles = `
  relative
  float-left
  w-[50%]
  max-md:w-[100%]
  h-full
  z-2
  overflow-hidden
  px-8
  opacity-0
  animate-load-in
  prose-h5:text-3xl
  prose-h5:max-lg:text-2xl
  prose-h5:max-sm:text-xl
  prose-h5:font-bold
  prose-h5:text-white
  prose-h5:absolute
  prose-h5:bottom-[14%]
  prose-h5:w-[85%]
  prose-h5:max-md:w-[70%]
  prose-h5:left-full
  prose-h5:animate-load-sub-header
  prose-strong:text-blue-400
  prose-strong:font-bold
`;

const welcomeTextStyles = `
  text-[16rem]
  max-xl:text-[12rem]
  max-lg:text-[9rem]
  max-md:text-[10rem]
  max-sm:text-[6rem]
  font-bold
  uppercase
  text-white
  leading-none
  absolute
  left-full
  top-[35%]
  animate-load-main-header
  -translate-y-[35%]
`;

const imageWrapperStyles = `
  relative
  w-1/2
  h-screen
  animate-load-home-image
  opacity-0
  max-md:w-0
  max-md:hidden
`;