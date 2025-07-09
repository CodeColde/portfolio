import type { SchemaTypeDefinition } from 'sanity'
import { blog } from '../schemas/blog'
import { experience } from '../schemas/experience'
import { extras } from '../schemas/extras'
import { education } from '../schemas/education'
import { cases } from '../schemas/cases'
import { openings } from '../schemas/opening'
import { coverAssets } from '../schemas/coverAssets'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    coverAssets,
    openings,
    experience,
    education,
    extras,
    cases,
    blog,
  ],
}
