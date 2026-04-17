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

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    ...base,
    repo: z.string().url().optional(),
    url: z.string().url().optional(),
    status: z.enum(['active', 'paused', 'archived', 'shipped']).optional(),
    screenshot: z.string().optional(),
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
    ...base,
    url: z.string().url(),
  }),
});

export const collections = { blog, projects, tools };
