import type { Rule } from "sanity";

export const education = {
  name: "education",
  title: "Education - About",
  type: "document",

  fields: [
    {
      name: "degree",
      title: "Degree",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Degree is required"),
    },
    {
      name: "school",
      title: "School",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("School is required"),
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
      format: "YYYY",
      validation: (Rule: Rule) => Rule.required().error("Start date is required"),
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
      format: "YYYY",
    },
    {
      name: "details",
      title: "Extra details",
      type: "string",
      validation: (Rule: Rule) => [
        Rule.max(200).warning("Details should be less than 200 characters"),
        Rule.required().error("Details are required"),
      ],
    },
  ]
}