import { PortableText, type PortableTextReactComponents } from "next-sanity";
import BodyParagraph from "./BodyParagraph";

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
    block: {
      normal: ({ children }) => {
        return (
          <BodyParagraph>{children}</BodyParagraph>
        )
      },
    }
  }
  return (
    <div className="prose-a:text-blue-800 prose-a:hover:text-red-800 prose-a:underline">
      <PortableText value={children} components={components} />
    </div>
  )
}

export default Content;