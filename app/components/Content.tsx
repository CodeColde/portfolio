import type {
  PortableTextTypeComponentProps,
  PortableTextMarkComponentProps,
  PortableTextBlockComponent,
} from "next-sanity";
import { PortableText, type PortableTextReactComponents } from "next-sanity";
import ContentParagraph from "./ContentParagraph";
import ContentLink, { type SanityLinkValue } from "./ContentLink";
import ContentImage, { type SanityImageValue } from "./ContentImage";

interface ContentProps {
  children: Array<{
    _key: string;
    _type: string;
    children: Array<{
      _key: string;
      _type: string;
      text: string;
    }>;
    markDefs: [];
    style: string;
  }>;
}

const Content = ({ children }: ContentProps) => {
  const components: Partial<PortableTextReactComponents> = {
    types: {
      image: (props: PortableTextTypeComponentProps<SanityImageValue>) => <ContentImage {...props} />,
    },
    marks: {
      link: (props: PortableTextMarkComponentProps<SanityLinkValue>) => <ContentLink {...props} />,
    },
    block: {
      normal: (props => <ContentParagraph>{props.children}</ContentParagraph>) as PortableTextBlockComponent,
    },
    list: {
      bullet: ({ children }) => <ul className={`${listStyle} list-disc`}>{children}</ul>,
      number: ({ children }) => <ol className={`${listStyle} list-decimal`}>{children}</ol>,
    },
    listItem: ({ children }) => <li className="pl-1">{children}</li>,
  };

  return <PortableText value={children} components={components} />;
};

export default Content;

const listStyle = "text-xl max-sm:text-lg leading-7 mb-6 pl-6 space-y-2";
