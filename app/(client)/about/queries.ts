import type { CoverAssetType } from "@/app/types/coverAssets.types";
import type { CvType } from "@/app/types/cv.types";
import type { EducationType } from "@/app/types/education.types";
import type { ExperienceType } from "@/app/types/experience.types";
import type { ExtraType } from "@/app/types/extras.types";
import type { AboutOpeningType } from "@/app/types/opening.types";
import { client } from "@/sanity/lib/client";

interface AboutData {
  first: AboutOpeningType;
  second: CoverAssetType;
  third: ExperienceType;
  fourth: EducationType;
  fifth: ExtraType;
  sixth: CvType;
}

const aboutOpeningQuery = `*[_type == "openings"] {
	about
}`;
const coverAssetQuery = `*[_type == "coverAssets" && location == "about"] {
	coverImage,
	altText
}`;
const experienceQuery = `*[_type == "experience"] | order(startDate desc) {
	company,
	companyUrl,
	details,
	role,
	startDate,
	endDate,
}`;
const educationQuery = `*[_type == "education"] | order(startDate desc) {
	degree,
	school,
	schoolUrl,
	details,
	startDate,
	endDate,
}`;
const extrasQuery = `*[_type == "extras"] | order(year desc) {
	certification,
	company,
	companyUrl,
	location,
	year,
	details
}`;
const cvQuery = `*[_type == "cv" && defined(file.asset)] | order(_updatedAt desc)[0] {
	"url": file.asset->url,
	"filename": file.asset->originalFilename,
	label
}`;

export async function getAboutData() {
  const query = `{
		"first" : ${aboutOpeningQuery},
		"second": ${coverAssetQuery},
		"third": ${experienceQuery},
		"fourth": ${educationQuery},
		"fifth": ${extrasQuery},
		"sixth": ${cvQuery}
	}`;
  const data: AboutData = await client.fetch(query);
  return data;
}
