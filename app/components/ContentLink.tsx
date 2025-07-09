import Link from "next/link";

import type { PortableTextMarkComponentProps } from "next-sanity";

type SanityLinkValue = {
  href: string;
  _key: string;
  _type: string;
  [key: string]: any;
};

const ContentLink = ({ children, value }: PortableTextMarkComponentProps<SanityLinkValue>) => {
  const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
  const rel = target === "_blank" ? "noindex nofollow" : "";
  const classes = "text-blue-800 hover:text-red-800 underline";

  if (!value?.href) {
    return <>{children}</>;
  }

  return target === "_blank" ? (
    <a
      href={value.href}
      target={target}
      rel={rel}
      className={classes}
    >
      {children}
    </a>
  ) : (
    <Link
      href={value.href}
      className={classes}
    >
      {children}
    </Link>
  );
};

export default ContentLink;