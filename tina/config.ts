import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.HEAD || 'main',
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      // ─── Blog posts ───────────────────────────────────────────────
      {
        name: 'tudastar',
        label: 'Tudástár (Blog)',
        path: 'src/content/tudastar',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Cím',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Meta leírás (max 160 karakter)',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'datetime',
            name: 'pubDate',
            label: 'Megjelenés dátuma',
            required: true,
          },
          {
            type: 'datetime',
            name: 'updatedDate',
            label: 'Frissítés dátuma',
          },
          {
            type: 'string',
            name: 'author',
            label: 'Szerző',
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Címkék',
            list: true,
          },
          {
            type: 'image',
            name: 'image',
            label: 'Kiemelt kép',
          },
          {
            type: 'string',
            name: 'imageAlt',
            label: 'Kép szöveges leírása',
          },
          {
            type: 'string',
            name: 'keywords',
            label: 'SEO kulcsszavak',
            list: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Tartalom',
            isBody: true,
          },
        ],
      },

      // ─── Global site config ───────────────────────────────────────
      {
        name: 'siteConfig',
        label: 'Weboldal Beállítások',
        path: 'src/data',
        match: { include: 'site-config' },
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          { type: 'string', name: 'name', label: 'Cégnév' },
          { type: 'string', name: 'legalName', label: 'Jogi cégnév' },
          { type: 'string', name: 'tagline', label: 'Szlogen' },
          { type: 'string', name: 'phone', label: 'Telefonszám (megjelenített, pl. +36 20 339 4164)' },
          { type: 'string', name: 'phoneTel', label: 'Telefonszám (tel: link, szóköz nélkül)' },
          { type: 'string', name: 'email', label: 'Email cím' },
          { type: 'string', name: 'owner', label: 'Tulajdonos neve' },
          {
            type: 'string',
            name: 'description',
            label: 'Weboldal leírása (SEO)',
            ui: { component: 'textarea' },
          },
          { type: 'string', name: 'facebookUrl', label: 'Facebook oldal URL' },
          {
            type: 'object',
            name: 'stats',
            label: 'Statisztikák (trust bar)',
            fields: [
              { type: 'string', name: 'references', label: 'Referenciák száma (pl. 5000+)' },
              { type: 'string', name: 'experience', label: 'Tapasztalat évei (pl. 10+)' },
              { type: 'string', name: 'warranty', label: 'Garancia (pl. 2 év)' },
              { type: 'string', name: 'districts', label: 'Kiszolgált kerületek száma (pl. 23)' },
            ],
          },
        ],
      },

      // ─── Homepage content ─────────────────────────────────────────
      {
        name: 'homepage',
        label: 'Főoldal Tartalom',
        path: 'src/data',
        match: { include: 'homepage' },
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          { type: 'string', name: 'heroTitle', label: 'Hero cím', ui: { component: 'textarea' } },
          { type: 'string', name: 'heroSubtitle', label: 'Hero alcím', ui: { component: 'textarea' } },
          { type: 'string', name: 'heroBadgeText', label: 'Hero jelvény szövege' },
          { type: 'string', name: 'heroCtaPrimary', label: 'Elsődleges gomb szövege' },
          { type: 'string', name: 'heroCtaSecondary', label: 'Másodlagos gomb szövege' },
          { type: 'string', name: 'heroImageUrl', label: 'Hero kép URL' },
          { type: 'string', name: 'heroImageAlt', label: 'Hero kép leírása' },
          { type: 'string', name: 'servicesSectionTitle', label: 'Szolgáltatások szekció cím' },
          { type: 'string', name: 'servicesSectionSubtitle', label: 'Szolgáltatások szekció alcím' },
          {
            type: 'object',
            name: 'services',
            label: 'Szolgáltatás kártyák',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: 'string', name: 'title', label: 'Cím' },
              { type: 'string', name: 'description', label: 'Leírás', ui: { component: 'textarea' } },
              { type: 'string', name: 'href', label: 'Link (pl. /szolgaltatasok/klima-telepites)' },
              { type: 'string', name: 'icon', label: 'Ikon (emoji)' },
              { type: 'string', name: 'image', label: 'Kép URL' },
              { type: 'string', name: 'imageAlt', label: 'Kép leírása' },
              { type: 'boolean', name: 'highlight', label: 'Kiemelt kártya' },
            ],
          },
          {
            type: 'object',
            name: 'processSteps',
            label: 'Folyamat lépések',
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.step}. ${item?.title}` }) },
            fields: [
              { type: 'string', name: 'step', label: 'Sorszám' },
              { type: 'string', name: 'title', label: 'Cím' },
              { type: 'string', name: 'desc', label: 'Leírás' },
            ],
          },
          {
            type: 'object',
            name: 'brands',
            label: 'Márkák',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name }) },
            fields: [
              { type: 'string', name: 'name', label: 'Márka neve' },
              { type: 'string', name: 'desc', label: 'Rövid leírás' },
              { type: 'string', name: 'href', label: 'Link' },
            ],
          },
          {
            type: 'object',
            name: 'faqs',
            label: 'GYIK (Főoldal)',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.question }) },
            fields: [
              { type: 'string', name: 'question', label: 'Kérdés' },
              { type: 'string', name: 'answer', label: 'Válasz', ui: { component: 'textarea' } },
            ],
          },
        ],
      },

      // ─── Pricing data ─────────────────────────────────────────────
      {
        name: 'pricing',
        label: 'Árlista',
        path: 'src/data',
        match: { include: 'pricing' },
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          {
            type: 'object',
            name: 'installPrices',
            label: 'Telepítési munkadíjak',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.service }) },
            fields: [
              { type: 'string', name: 'service', label: 'Megnevezés' },
              { type: 'string', name: 'description', label: 'Leírás' },
              { type: 'string', name: 'price', label: 'Ár (Ft)' },
              { type: 'string', name: 'note', label: 'Megjegyzés' },
              { type: 'boolean', name: 'highlight', label: 'Kiemelt sor' },
            ],
          },
          {
            type: 'object',
            name: 'devicePrices',
            label: 'Készülék árak',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.service }) },
            fields: [
              { type: 'string', name: 'service', label: 'Megnevezés' },
              { type: 'string', name: 'description', label: 'Leírás' },
              { type: 'string', name: 'price', label: 'Ár (Ft)' },
              { type: 'boolean', name: 'highlight', label: 'Kiemelt sor' },
            ],
          },
          {
            type: 'object',
            name: 'servicePrices',
            label: 'Szerviz és karbantartás árak',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.service }) },
            fields: [
              { type: 'string', name: 'service', label: 'Megnevezés' },
              { type: 'string', name: 'description', label: 'Leírás' },
              { type: 'string', name: 'price', label: 'Ár (Ft)' },
              { type: 'boolean', name: 'highlight', label: 'Kiemelt sor' },
            ],
          },
          {
            type: 'object',
            name: 'faqs',
            label: 'GYIK (Ároldal)',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.question }) },
            fields: [
              { type: 'string', name: 'question', label: 'Kérdés' },
              { type: 'string', name: 'answer', label: 'Válasz', ui: { component: 'textarea' } },
            ],
          },
        ],
      },
    ],
  },
});
