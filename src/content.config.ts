import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const base = {
  title: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  description: z.string().optional(),
};

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({ ...base }),
});

const links = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/links' }),
  schema: z.object({
    ...base,
    url: z.string().url(),
    via: z.object({ name: z.string(), url: z.string().url().optional() }).optional(),
    authors: z.array(z.string()).optional(),
    quote: z.string().optional(),
  }),
});

export const collections = { blog, links };
