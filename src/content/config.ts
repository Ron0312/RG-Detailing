import { defineCollection, z } from 'astro:content';

const citiesCollection = defineCollection({
  type: 'data',
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
  type: 'data',
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
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.string(),
    image: z.string().optional(),
    author: z.string().default('Remo Gerhardt'),
  }),
});

export const collections = {
  'cities': citiesCollection,
  'services': servicesCollection,
  'glossary': glossaryCollection,
  'blog': blogCollection,
};
