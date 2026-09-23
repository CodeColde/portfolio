import type { Rule } from "sanity";

export const cv = {
  name: "cv",
  title: "CV / Resume",
  type: "document",

  fields: [
    {
      name: "file",
      title: "CV (PDF)",
      description:
        "Upload your CV as a PDF. The most recently updated CV document is offered for download on the About page.",
      type: "file",
      options: {
        accept: "application/pdf,.pdf",
      },
      validation: (Rule: Rule) => Rule.required().error("A PDF file is required"),
    },
    {
      name: "label",
      title: "Button label",
      description: 'Optional. Defaults to "Download my CV".',
      type: "string",
      validation: (Rule: Rule) => Rule.max(40).warning("Keep the label short so it fits the button"),
    },
  ],

  preview: {
    select: {
      label: "label",
      filename: "file.asset.originalFilename",
    },
    prepare({ label, filename }: { label?: string; filename?: string }) {
      return {
        title: label || "Download my CV",
        subtitle: filename,
      };
    },
  },
};
