import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'Ron0312/RG-Detailing'
  },
  collections: {
    'homepage-services': collection({
      label: 'Homepage Services',
      slugField: 'title',
      path: 'src/content/homepage-services/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        shortDescription: fields.text({ label: 'Short Description' }),
        icon: fields.select({
          label: 'Icon',
          options: [
            { label: 'Shield', value: 'shield' },
            { label: 'Sparkles', value: 'sparkles' },
            { label: 'Bus', value: 'bus' },
            { label: 'File Check', value: 'file-check' },
            { label: 'Droplet', value: 'droplet' },
            { label: 'Hammer', value: 'hammer' },
            { label: 'Star', value: 'star' },
          ],
          defaultValue: 'sparkles',
        }),
        link: fields.text({ label: 'Link' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Lack & Keramik', value: 'Lack & Keramik' },
            { label: 'Spezial & Reparatur', value: 'Spezial & Reparatur' },
            { label: 'Innen & Sonstiges', value: 'Innen & Sonstiges' },
          ],
          defaultValue: 'Lack & Keramik',
        }),
      },
    }),
    reviews: collection({
      label: 'Reviews',
      slugField: 'name',
      path: 'src/content/reviews/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        date: fields.text({ label: 'Date' }),
        stars: fields.integer({ label: 'Stars', validation: { min: 1, max: 5 } }),
        text: fields.text({ label: 'Review Text', multiline: true }),
      },
    }),
  },
});
