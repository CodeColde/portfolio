import type { Rule } from "sanity";

export const coverAssets = {
  name: "coverAssets",
  title: "Cover Assets",
  type: "document",

  fields: [
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required().error("Image is required"),
    },
    {
      name: "altText",
      title: "Alt Text",
      type: "string",
      validation: (Rule: Rule) => Rule.max(200).warning("Alt text should be less than 200 characters"),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "About", value: "about" },
          { title: "Work", value: "work" },
          { title: "Blog", value: "blog" },
        ]
      }
    },
  ]
}