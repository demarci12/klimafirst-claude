import { defineType, defineField } from 'sanity';

const photoField = {
  type: 'object' as const,
  fields: [
    defineField({ name: 'src', title: 'Kép útvonal', type: 'string' }),
    defineField({ name: 'alt', title: 'Alt szöveg', type: 'string' }),
  ],
};

export const rolunk = defineType({
  name: 'rolunk',
  title: 'Rólunk oldal',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    // Hero szekció
    defineField({ name: 'heroLabel', title: 'Hero felirat (kis betűs, narancssárga)', type: 'string' }),
    defineField({ name: 'heroTitle', title: 'Hero főcím (h1)', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero alcím', type: 'text', rows: 2 }),
    defineField({ name: 'heroImageSrc', title: 'Hero kép útvonal', type: 'string' }),
    defineField({ name: 'heroImageAlt', title: 'Hero kép alt szöveg', type: 'string' }),

    // Statisztikák
    defineField({
      name: 'stats',
      title: 'Statisztikák (pl. 10+, 5000+)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Érték (pl. 10+)', type: 'string' }),
          defineField({ name: 'label', title: 'Felirat (pl. Év tapasztalat)', type: 'string' }),
        ],
      }],
    }),

    // Film csík fotók
    defineField({ name: 'filmStripTitle', title: 'Film csík cím', type: 'string' }),
    defineField({ name: 'filmStripSubtitle', title: 'Film csík alcím', type: 'string' }),
    defineField({
      name: 'actionPhotos',
      title: 'Akció fotók (film csík)',
      type: 'array',
      of: [photoField],
    }),

    // Rólunk szöveg szekció
    defineField({ name: 'aboutTitle', title: 'Rólunk szekció cím', type: 'string' }),
    defineField({ name: 'aboutBody', title: 'Rólunk szöveg (gazdag szöveg)', type: 'blockContent' }),

    // Tulajdonos kártya
    defineField({ name: 'ownerName', title: 'Tulajdonos neve', type: 'string' }),
    defineField({ name: 'ownerRole', title: 'Szerepkör (pl. Tulajdonos · Főszerelő)', type: 'string' }),
    defineField({ name: 'ownerQuote', title: 'Idézet', type: 'text', rows: 4 }),
    defineField({ name: 'profileImageSrc', title: 'Profil kép útvonal', type: 'string' }),
    defineField({ name: 'profileImageAlt', title: 'Profil kép alt szöveg', type: 'string' }),

    // Kapcsolat adatok a kártyán
    defineField({ name: 'companyName', title: 'Cég neve', type: 'string' }),
    defineField({ name: 'location', title: 'Telephely', type: 'string' }),
  ],
});
