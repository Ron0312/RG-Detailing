import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const citiesCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/cities' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(), // e.g. 'fahrzeugaufbereitung-bad-segeberg'
    distance: z.string(),
    metaDescription: z.string(),
    heroImage: z.string().optional(),
    geo: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    zip: z.string(),
    introText: z.string(),
  }),
});

const servicesCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    shortDescription: z.string(),
    fullDescription: z.string(),
    icon: z.string().optional(),
    priceRange: z.string(), // e.g. "$$-$$$"
  }),
});

const glossaryCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
  }),
});

export const collections = {
  'cities': citiesCollection,
  'services': servicesCollection,
  'glossary': glossaryCollection,
};
