import type { CoverAssetType } from "@/app/types/coverAssets.types";
import type { ExperienceType } from "@/app/types/experience.types";
import type { ExtraType } from "@/app/types/extras.types";
import type { AboutOpeningType } from "@/app/types/opening.types";
import { client } from "@/sanity/lib/client";

interface AboutData {
	first: AboutOpeningType;
	second: CoverAssetType;
	third: ExperienceType;
	fourth: ExtraType;
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
	details,
	role,
	startDate,
	endDate,
}`;
const extrasQuery = `*[_type == "extras"] | order(year desc) {
	certification,
	company,
	location,
	year,
	details
}`;

export async function getAboutData() {
	const query = `{
		"first" : ${aboutOpeningQuery},
		"second": ${coverAssetQuery},
		"third": ${experienceQuery},
		"fourth": ${extrasQuery}
	}`;
	const data: AboutData = await client.fetch(query);
	return data;
}