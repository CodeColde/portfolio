import type {
  PortableTextBlock,
  PortableTextComponents,
  PortableTextMarkComponentProps,
  PortableTextTypeComponentProps,
} from "next-sanity";
import { PortableText } from "next-sanity";
import BlogCodeBlock from "./BlogCodeBlock";
import ContentImage, { type SanityImageValue } from "./ContentImage";
import ContentLink, { type SanityLinkValue } from "./ContentLink";

interface BlogImageValue extends SanityImageValue {
  caption?: string;
}

interface Span {
  _type: string;
  text?: string;
  marks?: string[];
}

const getSpans = (block: PortableTextBlock) => block.children as Span[];

const getBlockText = (block: PortableTextBlock) =>
  getSpans(block)
    .map(span => span.text ?? "")
    .join("");

// Code samples pasted into the editor arrive as a normal block whose spans are all marked as inline code.
const isCodeParagraph = (block: PortableTextBlock) => {
  const spans = getSpans(block);
  return spans.length > 0 && spans.every(span => span._type === "span" && span.marks?.includes("code"));
};

const isEmptyParagraph = (block: PortableTextBlock) =>
  getSpans(block).every(span => span._type === "span" && !span.text?.trim());

const components: PortableTextComponents = {
  block: {
    normal: ({ value, children }) => {
      if (isEmptyParagraph(value)) {
        return null;
      }
      if (isCodeParagraph(value)) {
        return <BlogCodeBlock code={getBlockText(value)} />;
      }
      return <p className={paragraphClasses}>{children}</p>;
    },
    h1: ({ children }) => <h2 className={`${headingClasses} text-5xl max-sm:text-4xl mt-20 mb-8`}>{children}</h2>,
    h2: ({ children }) => <h2 className={`${headingClasses} text-4xl max-sm:text-3xl mt-16 mb-6`}>{children}</h2>,
    h3: ({ children }) => <h3 className={`${headingClasses} text-3xl max-sm:text-2xl mt-14 mb-6`}>{children}</h3>,
    h4: ({ children }) => <h4 className={`${headingClasses} text-2xl max-sm:text-xl mt-12 mb-4`}>{children}</h4>,
    h5: ({ children }) => (
      <h5 className={`${headingClasses} text-xl uppercase tracking-wide mt-10 mb-4`}>{children}</h5>
    ),
    h6: ({ children }) => <h6 className={`${headingClasses} text-lg uppercase italic mt-10 mb-4`}>{children}</h6>,
    blockquote: ({ children }) => <blockquote className={blockquoteClasses}>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className={`${listClasses} list-disc [li_&]:list-[circle]`}>{children}</ul>,
    number: ({ children }) => <ol className={`${listClasses} list-decimal [li_&]:list-[lower-alpha]`}>{children}</ol>,
  },
  listItem: ({ children }) => <li className="pl-2 marker:text-yellow-800">{children}</li>,
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-4">{children}</span>,
    "strike-through": ({ children }) => <s>{children}</s>,
    code: ({ children }) => <code className={inlineCodeClasses}>{children}</code>,
    link: (props: PortableTextMarkComponentProps<SanityLinkValue>) => (
      <ContentLink {...props} className={linkClasses} />
    ),
  },
  types: {
    image: (props: PortableTextTypeComponentProps<BlogImageValue>) => (
      <figure className="my-12">
        <ContentImage {...props} />
        {props.value.caption && <figcaption className={captionClasses}>{props.value.caption}</figcaption>}
      </figure>
    ),
  },
};

const BlogContent = ({ value }: { value: PortableTextBlock[] }) => {
  return <PortableText value={value} components={components} />;
};

export default BlogContent;

const paragraphClasses = `
  text-xl
  max-sm:text-lg
  leading-8
  max-sm:leading-7
  mb-7
`;

const headingClasses = `
  font-bold
  leading-tight
  first:mt-0
`;

const blockquoteClasses = `
  my-12
  border-l-4
  border-yellow-800
  pl-6
  max-sm:pl-4
  text-2xl
  max-sm:text-xl
  leading-9
  max-sm:leading-8
  italic
`;

const listClasses = `
  text-xl
  max-sm:text-lg
  leading-8
  max-sm:leading-7
  mb-7
  pl-6
  space-y-2
  [li_&]:mt-2
  [li_&]:mb-0
`;

const inlineCodeClasses = `
  rounded-md
  bg-yellow-800/10
  px-1.5
  py-0.5
  font-mono
  text-[0.85em]
  text-yellow-900
`;

const linkClasses = `
  font-bold
  text-yellow-800
  underline
  underline-offset-4
  decoration-2
  hover:text-yellow-950
  transition-colors
  duration-(--motion-fast)
  ease-in-out
`;

const captionClasses = `
  -mt-4
  text-center
  text-sm
  italic
  text-black/60
`;
