import type { Rule } from "sanity";

export const experience = {
  name: "experience",
  title: "Experience - About",
  type: "document",

  fields: [
    {
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Role is required"),
    },
    {
      name: "company",
      title: "Company",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Company is required"),
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
      title: "Details",
      type: "string",
      validation: (Rule: Rule) => [
        Rule.max(200).warning("Details should be less than 200 characters"),
        Rule.required().error("Details are required"),
      ],
    },
  ]
}