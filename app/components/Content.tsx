import type { PortableTextTypeComponentProps, PortableTextMarkComponentProps, PortableTextBlockComponent } from "next-sanity";
import { PortableText, type PortableTextReactComponents } from "next-sanity";
import ContentParagraph from "./ContentParagraph";
import ContentLink from "./ContentLink";
import ContentImage from "./ContentImage";

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
      image: (props: PortableTextTypeComponentProps<any>) => <ContentImage {...props} />,
    },
    marks: {
      link: (props: PortableTextMarkComponentProps<any>) => <ContentLink {...props} />,
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