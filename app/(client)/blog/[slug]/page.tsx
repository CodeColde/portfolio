import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "@/app/components/BackButton";
import BlogContent from "@/app/components/BlogContent";
import BlogPostHeader, { blogColumnClasses } from "@/app/components/BlogPostHeader";
import NextEntryButton from "@/app/components/NextEntryButton";
import { getBlogPostBySlug, getBlogSlugs, getNextBlogPost } from "./queries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Hayo Friese`,
    description: post.excerpt ?? undefined,
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const [post, nextPost] = await Promise.all([getBlogPostBySlug(slug), getNextBlogPost(slug)]);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative h-auto w-full pb-28 opacity-100">
      <BackButton />
      <BlogPostHeader post={post} />
      <article className={`${blogColumnClasses} mt-16 opacity-0 animate-load-in`}>
        {post.body && <BlogContent value={post.body} />}
      </article>
      {nextPost && (
        <NextEntryButton
          href={`/blog/${nextPost.slug}`}
          title={nextPost.title}
          label="Next post"
          bgClass="bg-yellow-800"
        />
      )}
    </main>
  );
};

export default page;
