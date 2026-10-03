import type { BlogSummaryEntry } from "../types/blog.types";
import formatPostDate from "../utils/formatPostDate";

interface Props {
  post: Pick<BlogSummaryEntry, "title" | "excerpt" | "publishedAt" | "readingMinutes">;
  isBackdrop?: boolean;
}

// Shared by the post page and the list-to-post transition overlay, so the transition lands on identical layout.
const BlogPostHeader = ({ post, isBackdrop = true }: Props) => {
  const date = formatPostDate(post.publishedAt);
  const readingMinutes = Math.max(1, post.readingMinutes ?? 1);

  return (
    <header
      className={`${headerClasses} ${isBackdrop ? "bg-yellow-800" : ""}`}
      data-dark-backdrop={isBackdrop ? true : undefined}
    >
      <div className={blogColumnClasses}>
        <div data-post-meta className="flex gap-2 text-white/70 text-sm uppercase italic">
          {date && <time dateTime={post.publishedAt ?? undefined}>{date}</time>}
          <span aria-hidden>/</span>
          <span>{readingMinutes} min read</span>
        </div>
        <h1 data-post-title className={titleClasses}>
          {post.title}
        </h1>
        {post.excerpt && (
          <>
            <hr data-post-rule className="w-6 my-10 max-sm:my-8 border-white/70" />
            <p data-post-excerpt className={excerptClasses}>
              {post.excerpt}
            </p>
          </>
        )}
      </div>
    </header>
  );
};

export default BlogPostHeader;

export const blogColumnClasses = `
  w-1/2
  max-lg:w-[60%]
  max-md:w-3/4
  max-sm:w-[90%]
  mx-auto
`;

const headerClasses = `
  pt-[22vh]
  max-md:pt-[18vh]
  pb-[8vh]
  text-white
`;

const titleClasses = `
  mt-4
  text-7xl
  max-lg:text-6xl
  max-md:text-5xl
  max-sm:text-4xl
  font-bold
  leading-tight
  text-balance
`;

const excerptClasses = `
  max-w-[56ch]
  font-light
  text-lg
  max-sm:text-base
  leading-relaxed
  text-white/70
`;
