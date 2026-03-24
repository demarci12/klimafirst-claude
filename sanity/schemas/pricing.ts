import { defineType, defineField } from 'sanity';

const priceRowField = {
  type: 'object' as const,
  fields: [
    defineField({ name: 'service', title: 'Szolgáltatás', type: 'string' }),
    defineField({ name: 'description', title: 'Leírás', type: 'string' }),
    defineField({ name: 'price', title: 'Ár (Ft)', type: 'string' }),
    defineField({ name: 'note', title: 'Megjegyzés', type: 'string' }),
    defineField({ name: 'highlight', title: 'Kiemelt?', type: 'boolean' }),
  ],
};

export const pricing = defineType({
  name: 'pricing',
  title: 'Árak oldal',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'installPrices', title: 'Telepítési munkadíjak', type: 'array', of: [priceRowField] }),
    defineField({ name: 'devicePrices', title: 'Készülékárak', type: 'array', of: [priceRowField] }),
    defineField({ name: 'servicePrices', title: 'Szerviz díjak', type: 'array', of: [priceRowField] }),
    defineField({
      name: 'faqs',
      title: 'GYIK',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Kérdés', type: 'string' }),
            defineField({ name: 'answer', title: 'Válasz', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),
  ],
});
