import { defineType, defineField } from 'sanity';

export const brandPage = defineType({
  name: 'brandPage',
  title: 'Márka oldal',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug (pl. fisher-klima)', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'name', title: 'Márka neve', type: 'string' }),
    defineField({ name: 'description', title: 'Rövid leírás (brand hub)', type: 'text', rows: 3 }),
    defineField({ name: 'pros', title: 'Előnyök', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'priceRange', title: 'Árkategória (pl. 130.000 Ft-tól)', type: 'string' }),
    defineField({ name: 'icon', title: 'Emoji ikon', type: 'string' }),
    defineField({ name: 'logoUrl', title: 'Logó URL (pl. https://logo.clearbit.com/gree.com)', type: 'url' }),
    defineField({ name: 'body', title: 'Oldal tartalma', type: 'blockContent' }),
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
    select: { title: 'name', subtitle: 'slug.current' },
  },
});
