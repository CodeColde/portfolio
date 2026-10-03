import type { BlogPostEntry } from "@/app/types/blog.types";
import { client } from "@/sanity/lib/client";

// ~5 characters per word at ~200 words per minute.
const blogPostBySlugQuery = `*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "readingMinutes": round(length(pt::text(body)) / 1000),
  body
}`;

const blogSlugsQuery = `*[_type == "blog" && defined(slug.current)].slug.current`;

export async function getBlogPostBySlug(slug: string) {
  const data: BlogPostEntry | null = await client.fetch(blogPostBySlugQuery, { slug });
  return data;
}

export async function getBlogSlugs() {
  const slugs: string[] = await client.fetch(blogSlugsQuery);
  return slugs;
}

const blogOrderQuery = `*[_type == "blog" && defined(slug.current)] | order(publishedAt desc) {
  "slug": slug.current,
  title
}`;

export async function getNextBlogPost(slug: string) {
  const posts: { slug: string; title: string }[] = await client.fetch(blogOrderQuery);
  if (posts.length < 2) {
    return null;
  }

  const index = posts.findIndex(entry => entry.slug === slug);
  if (index === -1) {
    return null;
  }

  return posts[(index + 1) % posts.length];
}
