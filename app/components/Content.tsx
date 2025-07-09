import type { PortableTextTypeComponentProps, PortableTextMarkComponentProps, PortableTextBlockComponent } from "next-sanity";
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
      normal: ((props) => (
        <ContentParagraph>{props.children}</ContentParagraph>
      )) as PortableTextBlockComponent,
    },
  };

  return (
    <PortableText value={children} components={components} />
  );
}

export default Content;