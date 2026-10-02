import type { CasesResponse } from "@/app/types/cases.types";
import { client } from "@/sanity/lib/client";

const caseBySlugQuery = `
    *[_type == "cases" && slug.current == $slug] | order(year desc) {
  _id,
  client,
  coverImage,
  coverImageMobile,
  "coverVideo": coverVideo.asset->url,
  excerpt,
  liveLink,
  purpose,
  responsibilities,
  slug,
  title,
  year
}
  `;

const caseSlugsQuery = `*[_type == "cases" && defined(slug.current)].slug.current`;

export async function getCaseBySlug(slug: string) {
  const data: CasesResponse = await client.fetch(caseBySlugQuery, { slug });
  return data?.[0];
}

export async function getCaseSlugs() {
  const slugs: string[] = await client.fetch(caseSlugsQuery);
  return slugs;
}
