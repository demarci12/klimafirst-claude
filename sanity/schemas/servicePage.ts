import { defineType, defineField } from 'sanity';

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Szolgáltatás oldal',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug (azonosító)', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'title', title: 'Oldal cím (h1)', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Alcím', type: 'text', rows: 2 }),
    defineField({
      name: 'priceItems',
      title: 'Ársorok',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'service', title: 'Szolgáltatás', type: 'string' }),
          defineField({ name: 'description', title: 'Leírás', type: 'string' }),
          defineField({ name: 'price', title: 'Ár (Ft)', type: 'string' }),
          defineField({ name: 'note', title: 'Megjegyzés', type: 'string' }),
          defineField({ name: 'highlight', title: 'Kiemelt?', type: 'boolean' }),
        ],
      }],
    }),
    defineField({
      name: 'faqs',
      title: 'GYIK',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Kérdés', type: 'string' }),
          defineField({ name: 'answer', title: 'Válasz', type: 'text', rows: 3 }),
        ],
      }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
});
