import type { CasesResponse } from "@/app/types/cases.types";
import { client } from "@/sanity/lib/client";

export async function getCaseBySlug(slug: string) {
  const casesQuery = `
    *[_type == "cases" && slug.current == "${slug}"] | order(year desc) {
  _id,
  client,
  coverImage,
  excerpt,
  liveLink,
  purpose,
  responsibilities,
  slug,
  title,
  year
}
  `
  const data: CasesResponse = await client.fetch(casesQuery);
  return data?.[0];
}