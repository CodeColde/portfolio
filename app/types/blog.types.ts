import type { PortableTextBlock } from "next-sanity";

export interface BlogSummaryEntry {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  readingMinutes?: number | null;
}

export type BlogSummaryResponse = BlogSummaryEntry[];

export interface BlogPostEntry extends BlogSummaryEntry {
  body?: PortableTextBlock[] | null;
}
