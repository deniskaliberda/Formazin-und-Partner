import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    category: z.enum(['Öffentlich', 'Wohnen', 'Sanierung', 'Gewerbe']),
    year: z.number(),
    location: z.string(),
    description: z.string(),
    image: z.string(),
    size: z.enum(['small', 'medium', 'large']).optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
