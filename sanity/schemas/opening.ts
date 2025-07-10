export const openings = {
  name: "openings",
  title: "Openings",
  type: "document",

  fields: [
    {
      name: "home",
      title: "Homepage Blurb",
      type: "array",
      of: [
        { type: "block" },
      ],
    },
    {
      name: "about",
      title: "About Page Blurb",
      type: "array",
      of: [
        { type: "block" },
      ],
    },
  ]
}