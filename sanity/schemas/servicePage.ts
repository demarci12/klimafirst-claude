import { defineType, defineField } from 'sanity';

const photoField = {
  type: 'object' as const,
  fields: [
    defineField({ name: 'src', title: 'Kép útvonal', type: 'string' }),
    defineField({ name: 'alt', title: 'Alt szöveg', type: 'string' }),
  ],
};

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Szolgáltatás oldal',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug (azonosító)', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'title', title: 'Oldal cím (h1)', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Hero alcím', type: 'text', rows: 3 }),
    defineField({ name: 'heroIcon', title: 'Hero emoji ikon (pl. ❄️)', type: 'string' }),
    defineField({
      name: 'photo1',
      title: 'Szerelő fotó 1',
      type: 'object',
      fields: [
        defineField({ name: 'src', title: 'Kép útvonal', type: 'string' }),
        defineField({ name: 'alt', title: 'Alt szöveg', type: 'string' }),
      ],
    }),
    defineField({
      name: 'photo2',
      title: 'Szerelő fotó 2',
      type: 'object',
      fields: [
        defineField({ name: 'src', title: 'Kép útvonal', type: 'string' }),
        defineField({ name: 'alt', title: 'Alt szöveg', type: 'string' }),
      ],
    }),
    defineField({ name: 'photoSectionLabel', title: 'Fotó szekció felirat', type: 'string' }),
    defineField({ name: 'photoSectionTitle', title: 'Fotó szekció cím', type: 'string' }),
    defineField({ name: 'photoSectionText', title: 'Fotó szekció szöveg', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Oldal tartalma (gazdag szöveg)', type: 'blockContent' }),
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
