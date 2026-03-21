// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.HEAD || "main",
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ─── Blog posts ───────────────────────────────────────────────
      {
        name: "tudastar",
        label: "Tud\xE1st\xE1r (Blog)",
        path: "src/content/tudastar",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "C\xEDm",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Meta le\xEDr\xE1s (max 160 karakter)",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Megjelen\xE9s d\xE1tuma",
            required: true
          },
          {
            type: "datetime",
            name: "updatedDate",
            label: "Friss\xEDt\xE9s d\xE1tuma"
          },
          {
            type: "string",
            name: "author",
            label: "Szerz\u0151"
          },
          {
            type: "string",
            name: "tags",
            label: "C\xEDmk\xE9k",
            list: true
          },
          {
            type: "image",
            name: "image",
            label: "Kiemelt k\xE9p"
          },
          {
            type: "string",
            name: "imageAlt",
            label: "K\xE9p sz\xF6veges le\xEDr\xE1sa"
          },
          {
            type: "string",
            name: "keywords",
            label: "SEO kulcsszavak",
            list: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Tartalom",
            isBody: true
          }
        ]
      },
      // ─── Global site config ───────────────────────────────────────
      {
        name: "siteConfig",
        label: "Weboldal Be\xE1ll\xEDt\xE1sok",
        path: "src/data",
        match: { include: "site-config" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true
        },
        fields: [
          { type: "string", name: "name", label: "C\xE9gn\xE9v" },
          { type: "string", name: "legalName", label: "Jogi c\xE9gn\xE9v" },
          { type: "string", name: "tagline", label: "Szlogen" },
          { type: "string", name: "phone", label: "Telefonsz\xE1m (megjelen\xEDtett, pl. +36 20 339 4164)" },
          { type: "string", name: "phoneTel", label: "Telefonsz\xE1m (tel: link, sz\xF3k\xF6z n\xE9lk\xFCl)" },
          { type: "string", name: "email", label: "Email c\xEDm" },
          { type: "string", name: "owner", label: "Tulajdonos neve" },
          {
            type: "string",
            name: "description",
            label: "Weboldal le\xEDr\xE1sa (SEO)",
            ui: { component: "textarea" }
          },
          { type: "string", name: "facebookUrl", label: "Facebook oldal URL" },
          {
            type: "object",
            name: "stats",
            label: "Statisztik\xE1k (trust bar)",
            fields: [
              { type: "string", name: "references", label: "Referenci\xE1k sz\xE1ma (pl. 5000+)" },
              { type: "string", name: "experience", label: "Tapasztalat \xE9vei (pl. 10+)" },
              { type: "string", name: "warranty", label: "Garancia (pl. 2 \xE9v)" },
              { type: "string", name: "districts", label: "Kiszolg\xE1lt ker\xFCletek sz\xE1ma (pl. 23)" }
            ]
          }
        ]
      },
      // ─── Homepage content ─────────────────────────────────────────
      {
        name: "homepage",
        label: "F\u0151oldal Tartalom",
        path: "src/data",
        match: { include: "homepage" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true
        },
        fields: [
          { type: "string", name: "heroTitle", label: "Hero c\xEDm", ui: { component: "textarea" } },
          { type: "string", name: "heroSubtitle", label: "Hero alc\xEDm", ui: { component: "textarea" } },
          { type: "string", name: "heroBadgeText", label: "Hero jelv\xE9ny sz\xF6vege" },
          { type: "string", name: "heroCtaPrimary", label: "Els\u0151dleges gomb sz\xF6vege" },
          { type: "string", name: "heroCtaSecondary", label: "M\xE1sodlagos gomb sz\xF6vege" },
          { type: "string", name: "heroImageUrl", label: "Hero k\xE9p URL" },
          { type: "string", name: "heroImageAlt", label: "Hero k\xE9p le\xEDr\xE1sa" },
          { type: "string", name: "servicesSectionTitle", label: "Szolg\xE1ltat\xE1sok szekci\xF3 c\xEDm" },
          { type: "string", name: "servicesSectionSubtitle", label: "Szolg\xE1ltat\xE1sok szekci\xF3 alc\xEDm" },
          {
            type: "object",
            name: "services",
            label: "Szolg\xE1ltat\xE1s k\xE1rty\xE1k",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: "string", name: "title", label: "C\xEDm" },
              { type: "string", name: "description", label: "Le\xEDr\xE1s", ui: { component: "textarea" } },
              { type: "string", name: "href", label: "Link (pl. /szolgaltatasok/klima-telepites)" },
              { type: "string", name: "icon", label: "Ikon (emoji)" },
              { type: "string", name: "image", label: "K\xE9p URL" },
              { type: "string", name: "imageAlt", label: "K\xE9p le\xEDr\xE1sa" },
              { type: "boolean", name: "highlight", label: "Kiemelt k\xE1rtya" }
            ]
          },
          {
            type: "object",
            name: "processSteps",
            label: "Folyamat l\xE9p\xE9sek",
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.step}. ${item?.title}` }) },
            fields: [
              { type: "string", name: "step", label: "Sorsz\xE1m" },
              { type: "string", name: "title", label: "C\xEDm" },
              { type: "string", name: "desc", label: "Le\xEDr\xE1s" }
            ]
          },
          {
            type: "object",
            name: "brands",
            label: "M\xE1rk\xE1k",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name }) },
            fields: [
              { type: "string", name: "name", label: "M\xE1rka neve" },
              { type: "string", name: "desc", label: "R\xF6vid le\xEDr\xE1s" },
              { type: "string", name: "href", label: "Link" }
            ]
          },
          {
            type: "object",
            name: "faqs",
            label: "GYIK (F\u0151oldal)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.question }) },
            fields: [
              { type: "string", name: "question", label: "K\xE9rd\xE9s" },
              { type: "string", name: "answer", label: "V\xE1lasz", ui: { component: "textarea" } }
            ]
          }
        ]
      },
      // ─── Rólunk oldal ─────────────────────────────────────────────
      {
        name: "rolunk",
        label: "R\xF3lunk Oldal",
        path: "src/data",
        match: { include: "rolunk" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true
        },
        fields: [
          { type: "image", name: "heroImageSrc", label: "Hero k\xE9p (fejl\xE9c jobb oldal)" },
          { type: "string", name: "heroImageAlt", label: "Hero k\xE9p le\xEDr\xE1sa" },
          { type: "image", name: "profileImageSrc", label: "Profilk\xE1rtya k\xE9p" },
          { type: "string", name: "profileImageAlt", label: "Profilk\xE1rtya k\xE9p le\xEDr\xE1sa" },
          {
            type: "object",
            name: "actionPhotos",
            label: "Munkafot\xF3k (filmszalag)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.alt || "Fot\xF3" }) },
            fields: [
              { type: "image", name: "src", label: "K\xE9p" },
              { type: "string", name: "alt", label: "K\xE9p le\xEDr\xE1sa (SEO)" }
            ]
          }
        ]
      },
      // ─── Referenciák oldal ────────────────────────────────────────
      {
        name: "referenciak",
        label: "Referenci\xE1k Oldal",
        path: "src/data",
        match: { include: "referenciak" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true
        },
        fields: [
          {
            type: "object",
            name: "testimonials",
            label: "V\xE1s\xE1rl\xF3i v\xE9lem\xE9nyek",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name || "V\xE9lem\xE9ny" }) },
            fields: [
              { type: "string", name: "name", label: "N\xE9v" },
              { type: "string", name: "location", label: "Helysz\xEDn (pl. Budapest, XI. ker\xFClet)" },
              { type: "number", name: "rating", label: "\xC9rt\xE9kel\xE9s (1\u20135 csillag)" },
              { type: "string", name: "text", label: "V\xE9lem\xE9ny sz\xF6vege", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "photos",
            label: "Fot\xF3gal\xE9ria",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.alt || "Fot\xF3" }) },
            fields: [
              { type: "image", name: "src", label: "K\xE9p" },
              { type: "string", name: "alt", label: "K\xE9p le\xEDr\xE1sa (SEO)" }
            ]
          }
        ]
      },
      // ─── Pricing data ─────────────────────────────────────────────
      {
        name: "pricing",
        label: "\xC1rlista",
        path: "src/data",
        match: { include: "pricing" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true
        },
        fields: [
          {
            type: "object",
            name: "installPrices",
            label: "Telep\xEDt\xE9si munkad\xEDjak",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.service }) },
            fields: [
              { type: "string", name: "service", label: "Megnevez\xE9s" },
              { type: "string", name: "description", label: "Le\xEDr\xE1s" },
              { type: "string", name: "price", label: "\xC1r (Ft)" },
              { type: "string", name: "note", label: "Megjegyz\xE9s" },
              { type: "boolean", name: "highlight", label: "Kiemelt sor" }
            ]
          },
          {
            type: "object",
            name: "devicePrices",
            label: "K\xE9sz\xFCl\xE9k \xE1rak",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.service }) },
            fields: [
              { type: "string", name: "service", label: "Megnevez\xE9s" },
              { type: "string", name: "description", label: "Le\xEDr\xE1s" },
              { type: "string", name: "price", label: "\xC1r (Ft)" },
              { type: "boolean", name: "highlight", label: "Kiemelt sor" }
            ]
          },
          {
            type: "object",
            name: "servicePrices",
            label: "Szerviz \xE9s karbantart\xE1s \xE1rak",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.service }) },
            fields: [
              { type: "string", name: "service", label: "Megnevez\xE9s" },
              { type: "string", name: "description", label: "Le\xEDr\xE1s" },
              { type: "string", name: "price", label: "\xC1r (Ft)" },
              { type: "boolean", name: "highlight", label: "Kiemelt sor" }
            ]
          },
          {
            type: "object",
            name: "faqs",
            label: "GYIK (\xC1roldal)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.question }) },
            fields: [
              { type: "string", name: "question", label: "K\xE9rd\xE9s" },
              { type: "string", name: "answer", label: "V\xE1lasz", ui: { component: "textarea" } }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
