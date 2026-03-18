import { defineCollection, z } from 'astro:content';

const tudastar = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Juhász Balázs'),
    tags: z.array(z.string()),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    keywords: z.array(z.string()),
  }),
});

export const collections = { tudastar };
