import { defineType, defineField } from 'sanity';

export const homepage = defineType({
  name: 'homepage',
  title: 'Főoldal',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    // Hero
    defineField({ name: 'heroTitle', title: 'Hero cím', type: 'text', rows: 2 }),
    defineField({ name: 'heroSubtitle', title: 'Hero alcím', type: 'text', rows: 3 }),
    defineField({ name: 'heroBadgeText', title: 'Hero badge szöveg', type: 'string' }),
    defineField({ name: 'heroCtaPrimary', title: 'Hero CTA gomb (elsődleges)', type: 'string' }),
    defineField({ name: 'heroCtaSecondary', title: 'Hero CTA (telefonszám)', type: 'string' }),
    defineField({ name: 'heroImageUrl', title: 'Hero kép URL', type: 'url' }),
    defineField({ name: 'heroImageAlt', title: 'Hero kép alt szöveg', type: 'string' }),
    // Services section
    defineField({ name: 'servicesSectionTitle', title: 'Szolgáltatások szekció cím', type: 'string' }),
    defineField({ name: 'servicesSectionSubtitle', title: 'Szolgáltatások szekció alcím', type: 'text', rows: 2 }),
    defineField({
      name: 'services',
      title: 'Szolgáltatások',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Cím', type: 'string' }),
            defineField({ name: 'description', title: 'Leírás', type: 'text', rows: 3 }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
            defineField({ name: 'icon', title: 'Ikon (heroicons:...)', type: 'string' }),
            defineField({ name: 'image', title: 'Kép útvonal', type: 'string' }),
            defineField({ name: 'imageAlt', title: 'Kép alt szöveg', type: 'string' }),
            defineField({ name: 'highlight', title: 'Kiemelt?', type: 'boolean' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'processSteps',
      title: 'Folyamat lépései',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Lépés száma', type: 'string' }),
            defineField({ name: 'title', title: 'Cím', type: 'string' }),
            defineField({ name: 'desc', title: 'Leírás', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'brands',
      title: 'Márkák',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Márka neve', type: 'string' }),
            defineField({ name: 'desc', title: 'Rövid leírás', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'GYIK',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Kérdés', type: 'string' }),
            defineField({ name: 'answer', title: 'Válasz', type: 'text', rows: 4 }),
          ],
        },
      ],
    }),
  ],
});
