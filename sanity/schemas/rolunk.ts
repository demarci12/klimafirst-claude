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
    defineField({ name: 'heroImageSrc', title: 'Hero kép útvonal', type: 'string' }),
    defineField({ name: 'heroImageAlt', title: 'Hero kép alt szöveg', type: 'string' }),
    defineField({ name: 'profileImageSrc', title: 'Profil kép útvonal', type: 'string' }),
    defineField({ name: 'profileImageAlt', title: 'Profil kép alt szöveg', type: 'string' }),
    defineField({
      name: 'actionPhotos',
      title: 'Akció fotók',
      type: 'array',
      of: [photoField],
    }),
  ],
});
