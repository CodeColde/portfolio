import { createClient } from "next-sanity";

import { apiVersion } from "../env";

export const client = createClient({
  projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_SANITY_DATASET,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
