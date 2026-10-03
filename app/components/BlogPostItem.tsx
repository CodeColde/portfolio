"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import type { BlogSummaryEntry } from "../types/blog.types";
import formatPostDate from "../utils/formatPostDate";
import BlogPostTransition from "./BlogPostTransition";

interface Props {
  post: BlogSummaryEntry;
  idx: number;
}

const STAGGER_MS = 60;

const BlogPostItem = ({ post, idx }: Props) => {
  const date = formatPostDate(post.publishedAt);
  const readingMinutes = Math.max(1, post.readingMinutes ?? 1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const rowRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const excerptRef = useRef<HTMLParagraphElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    setIsTransitioning(true);
  };

  const fadeOnTransition = `transition-opacity duration-(--motion-fast) ease-in-out ${isTransitioning ? "opacity-0" : ""}`;

  return (
    <li className="opacity-0 animate-load-in" style={{ animationDelay: `${idx * STAGGER_MS}ms` }}>
      <Link
        ref={rowRef}
        href={`/blog/${post.slug}`}
        prefetch
        onClick={handleClick}
        aria-disabled={isTransitioning || undefined}
        className={`${linkClasses} ${isTransitioning ? "pointer-events-none" : ""}`}
      >
        <span aria-hidden className={`${fillClasses} ${isTransitioning ? "w-full" : "w-0"}`} />
        <div className={gridClasses}>
          <div className={`${metaClasses} ${fadeOnTransition}`}>
            {date && <time dateTime={post.publishedAt ?? undefined}>{date}</time>}
            <span className="md:hidden" aria-hidden>
              /
            </span>
            <span className="md:hidden">{readingMinutes} min read</span>
          </div>
          <div>
            <h2 ref={titleRef} className={titleClasses}>
              {post.title}
            </h2>
            {post.excerpt && (
              <p ref={excerptRef} className={excerptClasses}>
                {post.excerpt}
              </p>
            )}
            <span className={`${metaClasses} ${fadeOnTransition} mt-6 max-md:hidden`}>{readingMinutes} min read</span>
          </div>
          <span aria-hidden className={`${arrowClasses} ${isTransitioning ? "opacity-0" : ""}`}>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-6 w-6 max-sm:h-4 max-sm:w-4"
              fill="none"
              stroke="currentColor"
            >
              <path d="M4 12h15M13 5l7 7-7 7" strokeWidth="2.5" strokeLinecap="square" />
            </svg>
          </span>
        </div>
      </Link>
      {isTransitioning && (
        <BlogPostTransition post={post} rowRef={rowRef} titleRef={titleRef} excerptRef={excerptRef} />
      )}
    </li>
  );
};

export default BlogPostItem;

const linkClasses = `
  group
  relative
  block
  overflow-hidden
  border-t
  border-white/20
  px-[8vw]
  py-14
  max-md:py-10
  focus-visible:outline-none
`;

const fillClasses = `
  absolute
  inset-y-0
  left-0
  bg-yellow-800
  transition-[width]
  duration-(--motion-base)
  ease-in-out
  group-hover:w-full
  group-focus-visible:w-full
`;

const gridClasses = `
  relative
  z-1
  grid
  grid-cols-[12rem_1fr_auto]
  max-lg:grid-cols-[9rem_1fr_auto]
  max-md:grid-cols-[1fr_auto]
  gap-x-12
  max-md:gap-x-6
  gap-y-3
  items-start
`;

const metaClasses = `
  flex
  gap-2
  pt-3
  max-md:pt-0
  max-md:col-span-2
  text-white/70
  text-sm
  uppercase
  italic
`;

const titleClasses = `
  text-white
  text-5xl
  max-lg:text-4xl
  max-sm:text-3xl
  max-xs:text-2xl
  font-bold
  leading-tight
`;

// Same measure and weight as the post header excerpt, so it keeps its line breaks when it moves there.
const excerptClasses = `
  mt-4
  max-w-[56ch]
  font-light
  leading-relaxed
  text-white/80
  text-lg
  max-sm:text-base
`;

const arrowClasses = `
  flex
  items-center
  justify-center
  h-14
  w-14
  max-sm:h-10
  max-sm:w-10
  mt-1
  rounded-full
  border-2
  max-sm:border
  border-white
  text-white
  transition-[background-color,color,translate,opacity]
  duration-(--motion-base)
  ease-in-out
  group-hover:bg-white
  group-hover:text-yellow-800
  group-hover:translate-x-2
  group-focus-visible:bg-white
  group-focus-visible:text-yellow-800
  group-focus-visible:translate-x-2
`;
