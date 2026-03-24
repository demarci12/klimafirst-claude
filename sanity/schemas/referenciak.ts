import { defineType, defineField } from 'sanity';

export const referenciak = defineType({
  name: 'referenciak',
  title: 'Referenciák oldal',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'testimonials',
      title: 'Vélemények',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Név', type: 'string' }),
            defineField({ name: 'location', title: 'Helyszín', type: 'string' }),
            defineField({ name: 'rating', title: 'Értékelés (1–5)', type: 'number' }),
            defineField({ name: 'text', title: 'Szöveg', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'photos',
      title: 'Referencia fotók',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'src', title: 'Kép útvonal', type: 'string' }),
            defineField({ name: 'alt', title: 'Alt szöveg', type: 'string' }),
          ],
        },
      ],
    }),
  ],
});
