import { notFound } from "next/navigation";
import { getCaseBySlug } from "./queries";
import BackButton from "@/app/components/BackButton";
import CaseCoverMedia from "@/app/components/CaseCoverMedia";
import { Orbitron } from "next/font/google";
import Content from "@/app/components/Content";
import BodySectionHeader from "@/app/components/BodySectionHeader";
import ProjectLink from "@/app/components/ProjectLink";
import ContentParagraph from "@/app/components/ContentParagraph";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const excerptFont = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const page = async ({ params }: PageProps) => {
  const { slug } = await params;

  const caseDetails = await getCaseBySlug(slug);

  if (!caseDetails) {
    notFound();
  }

  return (
    <main className="relative h-auto w-full pb-28 opacity-100">
      <BackButton />
      <section className="h-[45vh] relative bg-black">
        <div className="absolute inset-0 z-1 opacity-70">
          <CaseCoverMedia
            coverImage={caseDetails.coverImage}
            coverImageMobile={caseDetails.coverImageMobile}
            coverVideo={caseDetails.coverVideo}
            priority
          />
        </div>
        <div className="absolute z-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 text-center text-white">
          <h1 className="text-8xl max-md:text-6xl max-sm:text-5xl max-xs:text-4xl font-bold italic text-shadow-sm mb-[24px]">
            {caseDetails.title}
          </h1>
          {caseDetails.liveLink && (
            <div className="absolute top-full left-0 right-0">
              <ProjectLink href={caseDetails.liveLink} />
            </div>
          )}
        </div>
      </section>
      <section className="w-1/2 max-lg:w-[60%] max-md:w-3/4 max-sm:w-[90%] mx-auto mt-16">
        <h4 className="italic uppercase mb-2 text-md max-md:text-sm">{caseDetails.client}</h4>
        <h3 className={`${excerptFont.className} antialiased font-extrabold text-3xl max-lg:text-3xl max-md:text-2xl`}>
          {caseDetails.excerpt}
        </h3>
        <hr className="w-[24px] mt-14" />
        <BodySectionHeader>Purpose</BodySectionHeader>
        <ContentParagraph>{caseDetails.purpose}</ContentParagraph>
        <BodySectionHeader>Responsibilities</BodySectionHeader>
        <Content>{caseDetails.responsibilities}</Content>
      </section>
    </main>
  );
};

export default page;
