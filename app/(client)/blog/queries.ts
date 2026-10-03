import type { BlogSummaryResponse } from "@/app/types/blog.types";
import { client } from "@/sanity/lib/client";

// ~5 characters per word at ~200 words per minute.
const blogSummaryQuery = `*[_type == "blog" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "readingMinutes": round(length(pt::text(body)) / 1000)
}`;

export async function getBlogPosts() {
  const data: BlogSummaryResponse = await client.fetch(blogSummaryQuery);
  return data;
}
