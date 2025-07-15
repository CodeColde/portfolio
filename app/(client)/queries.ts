import type { CaseSummaryResponse } from "@/app/types/cases.types";
import { client } from "@/sanity/lib/client";

const caseSummaryQuery = `*[_type == "cases"] | order(year desc) {
    _id,
    client,
    title,
    slug,
    coverImage
  }
`;

export async function getHomepageData() {
	const data: CaseSummaryResponse = await client.fetch(caseSummaryQuery);
	return data;
}