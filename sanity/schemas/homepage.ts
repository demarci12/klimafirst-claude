import { defineType, defineField } from 'sanity';

export const homepage = defineType({
  name: 'homepage',
  title: 'Főoldal',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    // Hero szekció
    defineField({ name: 'heroBadgeText', title: 'Hero badge szöveg', type: 'string' }),
    defineField({ name: 'heroTitle', title: 'Hero főcím (h1)', type: 'text', rows: 2 }),
    defineField({ name: 'heroSubtitle', title: 'Hero alcím', type: 'text', rows: 3 }),
    defineField({ name: 'heroCtaPrimary', title: 'Hero CTA gomb (elsődleges)', type: 'string' }),
    defineField({ name: 'heroCtaSecondary', title: 'Hero CTA (telefonszám)', type: 'string' }),
    defineField({
      name: 'heroTrustBadges',
      title: 'Hero trust jelvények',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // JB fotó csík szekció
    defineField({ name: 'jbStripLabel', title: 'JB szekció felirat', type: 'string' }),
    defineField({ name: 'jbStripTitle', title: 'JB szekció cím', type: 'string' }),
    defineField({ name: 'jbStripText', title: 'JB szekció szöveg', type: 'text', rows: 3 }),
    defineField({ name: 'jbStripLinkText', title: 'JB szekció link szöveg', type: 'string' }),
    defineField({
      name: 'jbPhotos',
      title: 'JB fotók (3 db)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'src', title: 'Kép útvonal', type: 'string' }),
          defineField({ name: 'alt', title: 'Alt szöveg', type: 'string' }),
        ],
      }],
    }),

    // Szolgáltatások szekció
    defineField({ name: 'servicesSectionTitle', title: 'Szolgáltatások szekció cím', type: 'string' }),
    defineField({ name: 'servicesSectionSubtitle', title: 'Szolgáltatások szekció alcím', type: 'text', rows: 2 }),
    defineField({
      name: 'services',
      title: 'Szolgáltatások',
      type: 'array',
      of: [{
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
      }],
    }),

    // Folyamat lépései
    defineField({ name: 'processSectionTitle', title: 'Folyamat szekció cím', type: 'string' }),
    defineField({ name: 'processSectionSubtitle', title: 'Folyamat szekció alcím', type: 'string' }),
    defineField({
      name: 'processSteps',
      title: 'Folyamat lépései',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'step', title: 'Lépés száma', type: 'string' }),
          defineField({ name: 'title', title: 'Cím', type: 'string' }),
          defineField({ name: 'desc', title: 'Leírás', type: 'text', rows: 2 }),
        ],
      }],
    }),

    // Márkák szekció
    defineField({ name: 'brandsSectionTitle', title: 'Márkák szekció cím', type: 'string' }),
    defineField({ name: 'brandsSectionSubtitle', title: 'Márkák szekció alcím', type: 'string' }),
    defineField({
      name: 'brands',
      title: 'Márkák',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Márka neve', type: 'string' }),
          defineField({ name: 'desc', title: 'Rövid leírás', type: 'string' }),
          defineField({ name: 'href', title: 'Link', type: 'string' }),
        ],
      }],
    }),

    // CTA szekció
    defineField({ name: 'ctaTitle', title: 'Záró CTA cím', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'Záró CTA alcím', type: 'string' }),

    // GYIK
    defineField({
      name: 'faqs',
      title: 'GYIK',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Kérdés', type: 'string' }),
          defineField({ name: 'answer', title: 'Válasz', type: 'text', rows: 4 }),
        ],
      }],
    }),
  ],
});
