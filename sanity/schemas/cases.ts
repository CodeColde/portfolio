
import type { Rule } from "sanity";

export const cases = {
  name: "cases",
  title: "Cases",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Title is required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "client",
      title: "Client",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Client name is required"),
    },
    {
      name: "year",
      title: "Completion Year",
      type: "date",
      format: "YYYY",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required().error("Cover image is required"),
    },
    {
      name: "coverImageMobile",
      title: "Cover Image - Mobile",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "liveLink",
      title: "Live Link",
      type: "url",
      validation: (Rule: Rule) => Rule.uri().warning("Please enter a valid URL"),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (Rule: Rule) => Rule.max(200).warning("Excerpt should be less than 200 characters"),
    },
    {
      name: "purpose",
      title: "Purpose",
      type: "text",
      validation: (Rule: Rule) => Rule.max(700).warning("Purpose should be less than 700 characters")
    },
    {
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text"
            }
          ]
        },
      ],
    },
    {
      name: "awards",
      title: "Awards and Accolades",
      type: "array",
      of: [
        { type: "block" },
      ]
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ]
}