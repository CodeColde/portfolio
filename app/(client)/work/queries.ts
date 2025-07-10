import type { CasesResponse } from "@/app/types/cases.types";
import { client } from "@/sanity/lib/client";

const casesQuery = `*[_type == "cases"] | order(year desc) {
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
}`;

export async function getCases() {
  const data: CasesResponse = await client.fetch(casesQuery);
  return data;
}