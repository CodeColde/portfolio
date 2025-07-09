
import Image from "next/image";
import { getCaseBySlug } from "./queries";
import BackButton from "@/app/components/BackButton";
import { urlFor } from "@/sanity/lib/image";
import { Orbitron, } from "next/font/google";
import Content from "@/app/components/Content";
import BodySectionHeader from "@/app/components/BodySectionHeader";
import ProjectLink from "@/app/components/ProjectLink";
import ContentParagraph from "@/app/components/ContentParagraph";

interface PageProps {
  params: {
    slug: string;
  };
}

const excerptFont = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const page = async ({ params }: PageProps) => {
  const { slug } = await params;

  const caseDetails = await getCaseBySlug(slug);

  return (
    <main className="relative h-auto w-full pb-28 opacity-100">
      <BackButton />
      <section className="h-[45vh] relative bg-black">
        <Image
          src={urlFor(caseDetails.coverImage).width(1920).height(1200).url()}
          alt={caseDetails.title}
          fill
          className="object-cover object-center z-1 opacity-70 absolute"
        />
        <div className="absolute z-2 top-1/2 left-1/2 translate-x-[-50%] text-center text-white">
          <h1 className="text-8xl font-bold italic">{caseDetails.title}</h1>
          {caseDetails.liveLink && (
            <ProjectLink href={caseDetails.liveLink} />
          )}
        </div>
      </section>
      <section className="w-1/2 max-lg:w-[60%] max-md:w-3/4 max-sm:w-[95%] mx-auto mt-16">
        <h4 className="italic uppercase mb-2">{caseDetails.client}</h4>
        <h3 className={`${excerptFont.className} antialiased font-extrabold text-4xl`}>{caseDetails.excerpt}</h3>
        <hr className="w-[24px] mt-16" />
        <BodySectionHeader>Purpose</BodySectionHeader>
        <ContentParagraph>{caseDetails.purpose}</ContentParagraph>
        <BodySectionHeader>Responsibilities</BodySectionHeader>
        <Content>{caseDetails.responsibilities}</Content>
      </section>
    </main>
  )
}

export default page;