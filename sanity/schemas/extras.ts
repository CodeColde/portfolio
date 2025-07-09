import type { Rule } from "sanity";

export const extras = {
  name: "extras",
  title: "Extras - About",
  type: "document",

  fields: [
    {
      name: "certification",
      title: "Certification or Experience",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("This field is required"),
    },
    {
      name: "company",
      title: "Company / Organization",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Company is required"),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "year",
      title: "Year",
      type: "date",
      format: "YYYY",
      validation: (Rule: Rule) => Rule.required().error("Start date is required"),
    },
    {
      name: "details",
      title: "Details",
      type: "string",
      validation: (Rule: Rule) => [
        Rule.max(200).warning("Details should be less than 200 characters"),
        Rule.required().error("Details are required"),
      ],
    },
  ]
}