import { defineType, defineField } from 'sanity';

export const siteConfig = defineType({
  name: 'siteConfig',
  title: 'Weboldal Beállítások',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'name', title: 'Cégnév', type: 'string' }),
    defineField({ name: 'legalName', title: 'Jogi név', type: 'string' }),
    defineField({ name: 'tagline', title: 'Szlogen', type: 'string' }),
    defineField({ name: 'phone', title: 'Telefonszám (megjelenített)', type: 'string' }),
    defineField({ name: 'phoneTel', title: 'Telefonszám (tel: link)', type: 'string' }),
    defineField({ name: 'email', title: 'E-mail cím', type: 'string' }),
    defineField({ name: 'owner', title: 'Tulajdonos neve', type: 'string' }),
    defineField({ name: 'description', title: 'Meta leírás', type: 'text', rows: 3 }),
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url' }),
    defineField({
      name: 'stats',
      title: 'Statisztikák',
      type: 'object',
      fields: [
        defineField({ name: 'references', title: 'Referenciák száma', type: 'string' }),
        defineField({ name: 'experience', title: 'Tapasztalat (év)', type: 'string' }),
        defineField({ name: 'warranty', title: 'Garancia', type: 'string' }),
        defineField({ name: 'districts', title: 'Kerületek száma', type: 'string' }),
      ],
    }),
  ],
});
