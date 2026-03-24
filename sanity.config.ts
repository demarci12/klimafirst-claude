import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { siteConfig, homepage, rolunk, referenciak, pricing } from './sanity/schemas';

const singletons = ['siteConfig', 'homepage', 'rolunk', 'referenciak', 'pricing'];

export default defineConfig({
  name: 'klima-first',
  title: 'KlimaFirst CMS',
  projectId: 'f0xpfxf2',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Tartalom')
          .items([
            S.listItem()
              .title('Weboldal Beállítások')
              .id('siteConfig')
              .child(S.document().schemaType('siteConfig').documentId('siteConfig')),
            S.listItem()
              .title('Főoldal')
              .id('homepage')
              .child(S.document().schemaType('homepage').documentId('homepage')),
            S.listItem()
              .title('Rólunk oldal')
              .id('rolunk')
              .child(S.document().schemaType('rolunk').documentId('rolunk')),
            S.listItem()
              .title('Referenciák oldal')
              .id('referenciak')
              .child(S.document().schemaType('referenciak').documentId('referenciak')),
            S.listItem()
              .title('Árak oldal')
              .id('pricing')
              .child(S.document().schemaType('pricing').documentId('pricing')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: [siteConfig, homepage, rolunk, referenciak, pricing],
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletons.includes(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletons.includes(context.schemaType)
        ? input.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
});
