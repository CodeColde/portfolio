import { createClient } from 'next-sanity'

import { apiVersion, } from '../env'

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation,
  token: process.env.SANITY_API_TOKEN
})
