import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type StreamType = 'blog' | 'projects' | 'tools';

export type StreamItem = {
  type: StreamType;
  entry:
    | CollectionEntry<'blog'>
    | CollectionEntry<'projects'>
    | CollectionEntry<'tools'>;
};

export async function getAllItems(): Promise<StreamItem[]> {
  const [blog, projects, tools] = await Promise.all([
    getCollection('blog'),
    getCollection('projects'),
    getCollection('tools'),
  ]);

  const items: StreamItem[] = [
    ...blog.map((entry) => ({ type: 'blog' as const, entry })),
    ...projects.map((entry) => ({ type: 'projects' as const, entry })),
    ...tools.map((entry) => ({ type: 'tools' as const, entry })),
  ];

  items.sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime());
  return items;
}

export async function getAllTags(): Promise<Map<string, StreamItem[]>> {
  const items = await getAllItems();
  const tagMap = new Map<string, StreamItem[]>();
  for (const item of items) {
    for (const tag of item.entry.data.tags) {
      if (!tagMap.has(tag)) tagMap.set(tag, []);
      tagMap.get(tag)!.push(item);
    }
  }
  return tagMap;
}
