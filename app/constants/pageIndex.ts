const pageIndex = {
  home: {
    slug: "/",
    textHover: "hover:text-blue-800",
    text: "text-blue-800",
    bgHover: "hover:[&>span]:bg-blue-800",
    bg: "bg-blue-800",
    label: "Home"
  },
  about: {
    slug: "/about",
    textHover: "hover:text-green-800",
    text: "text-green-800",
    bgHover: "hover:[&>span]:bg-green-800",
    bg: "bg-green-800",
    label: "About"
  },
  work: {
    slug: "/work",
    textHover: "hover:text-red-800",
    text: "text-red-800",
    bgHover: "hover:[&>span]:bg-red-800",
    bg: "bg-red-800",
    label: "Work"
  },
  blog: {
    slug: "/blog",
    textHover: "hover:text-yellow-800",
    text: "text-yellow-800",
    bgHover: "hover:[&>span]:bg-yellow-800",
    bg: "bg-yellow-800",
    label: "Blog"
  },
};

export type PageKeys = keyof typeof pageIndex;

export default pageIndex;