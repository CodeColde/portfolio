import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_SANITY_DATASET;
const studioHost = process.env.SANITY_STUDIO_HOST;

if (!projectId || !dataset) {
  throw new Error("Sanity projectId or dataset is not set in environment variables.");
}

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost,
  deployment: { appId: "r5ml1hv3b75s7f8r0z4qgzp2" },
  // The studio build must not pick up the Next.js postcss.config.mjs (Tailwind),
  // whose string-array plugin format Vite cannot load.
  vite: config => ({ ...config, css: { ...config.css, postcss: {} } }),
});
