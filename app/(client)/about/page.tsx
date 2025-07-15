import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { getAboutData } from "./queries";
import Experience from "@/app/components/Experience";
import Subheader from "@/app/components/Subheader";

const page = async () => {
	const aboutData = await getAboutData();

  const openingText = aboutData.first[0].about;
  const coverImage = aboutData.second[0].coverImage;
  const altText = aboutData.second[0].altText;
	const experienceData = aboutData.third;
	const extrasData = aboutData.fourth;

	return (
		<main className="flex bg-blue-800 flex-row">
			<section className="sticky top-0 left-0 h-screen w-[25vw] opacity-75 max-md:hidden">
				<Image
					src={urlFor(coverImage).width(1200).height(1600).dpr(2).url()}
					alt={altText}
					fill
					className="object-cover"
					placeholder="blur"
					blurDataURL={urlFor(coverImage).width(1200).height(1600).dpr(2).blur(10).url()}
					priority
				/>
			</section>
			<section className="w-[75vw] overflow-y-auto max-md:w-screen">
				<article className={richTextStyles}>
					<h1 className="text-[12rem] max-xl:text-[10rem] max-lg:text-[7rem] max-md:text-[10rem] max-sm:text-[6rem] font-bold uppercase text-white leading-none mb-16">
						Let&apos;s build!
					</h1>
					<PortableText value={openingText} />
				</article>
				<article className="px-[8vw] pt-[8vh] pb-[5vh] w-full bg-blue-900">
					<Subheader>Experience</Subheader>
					{experienceData.map((exp) => (
						<Experience key={exp.startDate} experience={exp} />
					))}
				</article>
				<article className="px-[8vw] pt-[8vh] pb-[5vh] w-full bg-blue-900">
					<Subheader>Extras</Subheader>
					{extrasData.map((entry) => (
						<Experience key={entry.year} extra={entry} />
					))}
				</article>
			</section>
		</main>
	);
};

export default page;

const richTextStyles = `
  relative
  flex
  flex-col
  justify-between
  z-2
  px-[8vw]
  pt-[15vh]
  pb-[5vh]
  opacity-0
  animate-load-in
  prose-p:text-2xl
  prose-p:max-lg:text-xl
  prose-p:max-md:text-lg
  prose-p:max-xs:text-md
  prose-p:font-bold
  prose-p:text-white
  prose-p:w-[90%]
  prose-p:max-md:w-full
  prose-p:mb-8
  prose-strong:text-blue-400
  prose-strong:font-bold
`;