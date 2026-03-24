# KlimaFirst Website — Full Rebuild Prompt for Claude Code

## OVERVIEW

Build a complete, production-ready static website for **KlimaFirst**, a Budapest-based HVAC service company owned by **Juhász Balázs**. The site is in **Hungarian**, targets the **Budapest local market**, and must be fully SEO-optimized.

---

## TECH STACK

- **Astro 4.8.6** — static site generator (`output: 'static'`)
- **Tailwind CSS 3.4.3** — via `@astrojs/tailwind@^5.1.0`
- **TinaCMS 3.6.3** — headless CMS with `@tinacms/cli@^2.1.11`
- **astro-icon 1.1.0** — SVG icons via `@iconify-json/heroicons` and `@iconify-json/lucide`
- **@astrojs/sitemap 3.2.1** — ⚠️ MUST pin to exactly `3.2.1` (v3.7.1+ crashes with Astro 4.16)
- **TypeScript** — all data files, component props
- **Sharp** — image optimization (Astro built-in)

**package.json scripts:**
```json
{
  "dev": "astro dev",
  "start": "astro dev",
  "build": "tinacms build --skip-cloud-checks && astro build",
  "preview": "astro preview"
}
```

---

## BUSINESS INFORMATION

```
Company name:    KlimaFirst
Legal name:      Juhász Solutions Kft.
Owner:           Juhász Balázs
Phone display:   +36 20 339 4164
Phone tel link:  +36203394164
Email:           info@klimafirst.hu
Facebook:        https://www.facebook.com/klimafirst
Address:         Budapest, Magyarország
Tagline:         Budapest #1 klíma specialistája
Stats:           5000+ referencia | 10+ év tapasztalat | 2 év garancia | 23 kerület
```

---

## DESIGN SYSTEM

### Colors (extend Tailwind theme)
```js
colors: {
  'brand-blue': {
    50:  '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  'brand-orange': {
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
  },
}
```

### Typography
- Font: **Inter** (Google Fonts) — weights 400, 500, 600, 700, 800
- Fallback: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### Custom Tailwind utilities
```js
boxShadow: {
  'card':       '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.06)',
  'card-hover': '0 10px 25px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
},
animation: {
  'fade-in':  'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.4s ease-out',
},
keyframes: {
  fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
  slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
}
```

### Custom CSS class `.prose-klima`
Tailwind-based styling for blog content: styled h2, h3, p, ul/ol, links (brand-blue-700), blockquotes (left border brand-blue-500), tables.

---

## ASTRO CONFIG (`astro.config.mjs`)

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'http://localhost:4321', // change to 'https://klimafirst.hu' for production
  output: 'static',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      customPages: [],
      serialize(item) {
        // Homepage
        if (item.url === 'http://localhost:4321/') {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        // Service & pricing pages
        if (item.url.includes('/szolgaltatasok') || item.url.includes('/arak')) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        // District pages
        if (item.url.includes('/budapest/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }
        // Blog posts
        if (item.url.includes('/tudastar/')) {
          return { ...item, priority: 0.6, changefreq: 'monthly' };
        }
        return { ...item, priority: 0.7, changefreq: 'weekly' };
      },
    }),
    icon({ include: { heroicons: ['*'], lucide: ['*'] } }),
  ],
  image: {
    domains: ['images.unsplash.com'],
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  vite: { build: { cssMinify: true } },
});
```

---

## PROJECT STRUCTURE

```
/
├── src/
│   ├── components/
│   │   ├── SEO.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Breadcrumb.astro
│   │   ├── ServiceCard.astro
│   │   ├── DistrictGrid.astro
│   │   ├── FAQ.astro
│   │   ├── PriceTable.astro
│   │   ├── ContactForm.astro
│   │   ├── FloatingContact.astro
│   │   ├── KlimaCalculator.astro
│   │   ├── RelatedPosts.astro
│   │   └── TrustBar.astro
│   ├── content/
│   │   ├── config.ts
│   │   └── tudastar/        (10 .md blog posts)
│   ├── data/
│   │   ├── site.ts
│   │   ├── districts.ts
│   │   ├── site-config.json
│   │   ├── homepage.json
│   │   ├── pricing.json
│   │   ├── referenciak.json
│   │   └── rolunk.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       ├── index.astro
│       ├── 404.astro
│       ├── rolunk.astro
│       ├── referenciak.astro
│       ├── arak.astro
│       ├── ajanlatkeres.astro
│       ├── kapcsolat.astro
│       ├── klima-meretezo-kalkulator.astro
│       ├── szolgaltatasok/
│       │   ├── klima-telepites.astro
│       │   ├── klima-javitas.astro
│       │   ├── klima-tisztitas.astro
│       │   └── futes-klimaval.astro
│       ├── keszulekek/
│       │   ├── index.astro
│       │   ├── fisher-klima.astro
│       │   ├── fujitsu-klima.astro
│       │   └── toshiba-klima.astro
│       ├── tudastar/
│       │   ├── index.astro
│       │   └── [slug].astro
│       └── budapest/
│           └── [kerulet].astro
├── tina/
│   └── config.ts
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
│       ├── juhasz-balazs/   (owner photos)
│       └── referenciak/     (work reference photos)
├── api/
│   └── contact.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── vercel.json
```

---

## DATA FILES

### `src/data/site.ts`
Imports `site-config.json` and exports a `SITE` constant with all business data plus static arrays for services and brands:

**Services array (4 items):**
```ts
{ slug: 'klima-telepites', name: 'Klíma Telepítés', description: 'Professzionális klíma telepítés és értékesítés Budapesten. Split, multi-split rendszerek.', icon: 'heroicons:wrench-screwdriver', href: '/szolgaltatasok/klima-telepites' },
{ slug: 'klima-javitas', name: 'Klíma Javítás', description: 'Gyors és megbízható klímajavítás. Minden márkájú készülékhez.', icon: 'heroicons:cog-6-tooth', href: '/szolgaltatasok/klima-javitas' },
{ slug: 'klima-tisztitas', name: 'Klíma Tisztítás', description: 'Éves karbantartás és mélytisztítás. Hosszabb élettartam, alacsonyabb energiaköltség.', icon: 'heroicons:sparkles', href: '/szolgaltatasok/klima-tisztitas' },
{ slug: 'futes-klimaval', name: 'Fűtés Klímával', description: 'Energiatakarékos fűtési megoldás inverteres klímával. H-tarifa és geo-tarifa előnyök.', icon: 'heroicons:fire', href: '/szolgaltatasok/futes-klimaval' },
```

**Brands array (4 items):**
```ts
{ slug: 'fisher-klima', name: 'Fisher', desc: 'Kiváló ár-érték arány', href: '/keszulekek/fisher-klima' },
{ slug: 'fujitsu-klima', name: 'Fujitsu', desc: 'Japán minőség', href: '/keszulekek/fujitsu-klima' },
{ slug: 'toshiba-klima', name: 'Toshiba', desc: 'Megbízható teljesítmény', href: '/keszulekek/toshiba-klima' },
{ slug: 'daikin-klima', name: 'Daikin', desc: 'Prémium kategória', href: '#' },
```

### `src/data/districts.ts`
Array of 23 Budapest district objects with this shape:
```ts
interface District {
  slug: string;       // e.g. 'i-kerulet'
  name: string;       // e.g. 'I. kerület'
  roman: string;      // e.g. 'I'
  description: string;
  neighborhoods: string[];
  lat: number;
  lng: number;
}
```

All 23 Budapest districts from I. to XXIII. kerület. Each has 3–6 neighborhood names. Coordinates are actual GPS coordinates of each district center in Budapest.

### `src/data/site-config.json`
```json
{
  "name": "KlimaFirst",
  "legalName": "Juhász Solutions Kft.",
  "tagline": "Budapest #1 klíma specialistája",
  "phone": "+36 20 339 4164",
  "phoneTel": "+36203394164",
  "email": "info@klimafirst.hu",
  "owner": "Juhász Balázs",
  "description": "Professzionális klíma telepítés, javítás és karbantartás Budapesten. 10+ év tapasztalat, 5000+ elvégzett munka, 2 év garancia.",
  "facebookUrl": "https://www.facebook.com/klimafirst",
  "stats": {
    "references": "5000+",
    "experience": "10+",
    "warranty": "2 év",
    "districts": "23"
  }
}
```

### `src/data/pricing.json`
Three price list sections + FAQs:

**installPrices** (installation labor):
- 1x1 split klíma szerelés: 45 000 Ft – standard egységek, 5 m cső
- Multi-split 2x1 szerelés: 75 000 Ft – két belső egység
- Cső hosszabbítás (m): 3 500 Ft/m – 5 m felett
- Elektromos bekötés: 15 000 Ft – ha szükséges
- Helyszíni felmérés: ingyenes

**devicePrices** (equipment):
- Fisher 2,5 kW split: 185 000 Ft
- Fisher 3,5 kW split: 215 000 Ft
- Fujitsu 2,5 kW: 245 000 Ft
- Toshiba 2,5 kW: 235 000 Ft
- Daikin 2,5 kW: 285 000 Ft

**servicePrices** (maintenance & repair):
- Éves karbantartás: 25 000 Ft – belső + külső egység
- Mélytisztítás: 35 000 Ft – vegyszeres mosás
- Hűtőközeg töltés: 15 000 Ft + anyag
- Diagnosztika: 12 000 Ft – helyszíni hibakeresés

**faqs** (4 items about pricing)

### `src/data/homepage.json`
Hero section, service cards (4), process steps (4 steps: Kapcsolat → Felmérés → Telepítés → Átadás), brands list, FAQs (6 items about installation, pricing, timing, warranty, brands, maintenance).

### `src/data/referenciak.json`
- **testimonials**: 6 customer reviews, 5-star ratings, with Hungarian names and Budapest district locations
- **photos**: array of `{ src, alt }` — paths to reference work photos in `public/images/referenciak/`

### `src/data/rolunk.json`
```json
{
  "heroImageSrc": "/images/juhasz-balazs/jb-gree-beszereles-letran-1.jpeg",
  "heroImageAlt": "Juhász Balázs klíma szerelés közben",
  "profileImageSrc": "/images/juhasz-balazs/jb-belso-egyseg-telepites-mosoly.jpeg",
  "profileImageAlt": "Juhász Balázs, KlimaFirst tulajdonos",
  "actionPhotos": [
    { "src": "/images/juhasz-balazs/jb-manifold-gree-napsutes.jpeg", "alt": "..." },
    ...13 photos total
  ]
}
```

---

## COMPONENTS

### `BaseLayout.astro`
Props: `title`, `description`, `image?`, `canonicalUrl?`, `type?` ('website'|'article'), `breadcrumbs?`

Renders:
- `<SEO />` in `<head>`
- Inter Google Font preconnect + stylesheet
- `<Header />`
- `<slot />`
- `<Footer />`
- `<FloatingContact />`
- Skip-to-content link for accessibility

### `SEO.astro`
Props: `title`, `description`, `image?`, `canonicalUrl?`, `type?`, `breadcrumbs?`

Outputs:
- `<meta charset="UTF-8">`, viewport, title, description, author (Juhász Balázs), robots (index, follow, max-snippet:-1, max-image-preview:large)
- Geo tags: `region: HU-BU`, `placename: Budapest`, `position: 47.4979;19.0402`, ICBM
- Canonical `<link>`
- Hreflang: `hu-HU`, `hu`, `x-default`
- Open Graph: type, title, description, url, image (1200x630), locale: hu_HU, site_name: KlimaFirst
- Twitter card: summary_large_image
- Preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com`
- Favicon links: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`

### `Header.astro`
- Top bar: phone number (tel link), email, "Ingyenes felmérés" CTA button → `/ajanlatkeres`
- Main nav (desktop): Logo left, nav links right:
  - Szolgáltatások (dropdown): Telepítés, Javítás, Tisztítás, Fűtés
  - Készülékek (dropdown): Fisher, Fujitsu, Toshiba, Daikin
  - Árak → `/arak`
  - Rólunk → `/rolunk`
  - Blog → `/tudastar`
  - Kapcsolat → `/kapcsolat`
- Mobile: hamburger menu with same links
- Sticky on scroll, background white/blur

### `Footer.astro`
Four columns:
1. Logo + tagline + phone + email + address
2. Szolgáltatások links (4 services)
3. Készülékek links (4 brands)
4. Cég links (Rólunk, Árak, Referenciák, Blog, Kapcsolat, Kalkulátor)
Bottom bar: copyright, legal name

### `TrustBar.astro`
Horizontal bar with 4 stats from `site-config.json`:
- 5000+ referencia
- 10+ év tapasztalat
- 2 év garancia
- 23 kerület

### `ServiceCard.astro`
Props: `title`, `description`, `href`, `icon`, `image?`, `imageAlt?`, `highlight?`
Card with Heroicon, title, description, "Részletek →" link. Optional highlight styling (brand-blue-900 background).

### `Breadcrumb.astro`
Props: `items: Array<{ label: string, href?: string }>`
Renders breadcrumb nav + JSON-LD BreadcrumbList schema.

### `FAQ.astro`
Props: `items: Array<{ question: string, answer: string }>`
Accordion with smooth expand/collapse. Includes FAQ JSON-LD schema.

### `PriceTable.astro`
Props: `rows: Array<{ service, description, price, note?, highlight? }>`
Table with optional row highlighting.

### `ContactForm.astro`
Fields: name (required), phone (required), email (required), service (select: 4 options), message (textarea), honeypot `website` hidden field.
Submits POST to `/api/contact`. Success/error state display.

### `FloatingContact.astro`
Fixed bottom-right button linking to `/ajanlatkeres`. Visible on all pages. Phone icon + "Ajánlatot kérek" text.

### `KlimaCalculator.astro`
Interactive calculator:
- Inputs: room area (m²), insulation quality (select), sun exposure (select), floor (ground/middle/top)
- Output: recommended kW range
- Formula: base = area × 0.07 kW, adjusted for insulation/sun/floor
- Shows result with recommended AC model range

### `DistrictGrid.astro`
Props: `districts` array
Renders a responsive grid of links to all 23 Budapest district pages.

### `RelatedPosts.astro`
Props: `currentSlug`, `tags`
Shows 2–3 related blog posts based on matching tags.

---

## PAGES

### `src/pages/index.astro` — Homepage
Sections in order:
1. **Hero** — headline from `homepage.json`, badge (e.g. "Budapest #1"), subtitle, two CTA buttons (Ajánlatot kérek + Áraink), background image (jb photo)
2. **TrustBar** — 4 stats
3. **Services** — section title from json, 4 `<ServiceCard>` components in grid
4. **Process** — "Hogyan dolgozunk?" — 4 numbered steps from json
5. **Brands** — grid of 4 brand cards with logo/name/desc
6. **FAQ** — 6 FAQs from `homepage.json`
7. **Recent blog posts** — last 3 from tudastar collection
8. **CTA banner** — "Kérjen ingyenes felmérést!" with phone + button

JSON-LD: `HVACBusiness` + `WebSite` with `SearchAction`

### Service Pages (4) — e.g. `klima-telepites.astro`
Structure: Hero with service title/description → What's included (list) → Pricing section → FAQ (service-specific) → CTA → `<DistrictGrid>`

JSON-LD: `Service` schema

### `keszulekek/index.astro` — Brand Hub
Grid of 4 brand cards with name, description, link to brand page.

### Brand Pages (3) — e.g. `fisher-klima.astro`
Content: Brand hero → Key features (bullet list) → Available models + prices → Why choose this brand → CTA

### `rolunk.astro` — About Us
- Hero with Juhász Balázs photo (from `rolunk.json`)
- Profile card: photo, name, title, short bio
- Experience stats (same as TrustBar)
- Action photos filmstrip/grid (13 photos from `rolunk.json`)
- Why choose us (bullet points)
- CTA

### `referenciak.astro` — References
- 6 testimonial cards (stars, name, location, text — from `referenciak.json`)
- Photo gallery with lightbox (60+ photos from `referenciak.json`)
- CTA

Lightbox: vanilla JS — clicking a photo opens it full-screen with prev/next navigation. ESC closes.

### `arak.astro` — Pricing
- Intro text
- 3 `<PriceTable>` sections (installation, devices, service)
- FAQ section (pricing FAQs from `pricing.json`)
- CTA

### `ajanlatkeres.astro` — Quote Request
- Intro text
- `<ContactForm>` component
- Contact info sidebar (phone, email)

### `kapcsolat.astro` — Contact
- Contact details card (phone, email, address, Facebook)
- `<ContactForm>` component
- Map embed placeholder or static map image

### `klima-meretezo-kalkulator.astro` — Calculator
- Intro: what the calculator does
- `<KlimaCalculator>` component
- Explainer text below about kW sizing rules
- CTA → ajanlatkeres

### `tudastar/index.astro` — Blog Index
- Grid of all blog posts (title, date, description, tags, cover image)
- Sorted by date descending

### `tudastar/[slug].astro` — Blog Post
- `getStaticPaths()` from content collection
- `<Breadcrumb>` navigation
- Article: title, date, author, tags, cover image, body (`<Content />`)
- `.prose-klima` class for styling
- `<RelatedPosts>` at bottom
- JSON-LD: `Article` schema

### `budapest/[kerulet].astro` — District Pages
- `getStaticPaths()` from `districts.ts`
- H1: "Klíma szerelés [kerület neve], Budapest"
- Local description using district neighborhoods
- Services offered (4 service cards)
- Pricing table (same as main)
- Local FAQ (3–4 questions mentioning the specific district/neighborhoods)
- `<Breadcrumb>`: Főoldal → Budapest → [kerület]
- Internal link to neighboring districts
- JSON-LD: `HVACBusiness` with location-specific geo coordinates

### `404.astro`
Custom 404 page with navigation links back to main sections.

---

## CONTENT COLLECTION CONFIG (`src/content/config.ts`)

```ts
import { defineCollection, z } from 'astro:content';

const tudastar = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Juhász Balázs'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    keywords: z.array(z.string()).default([]),
  }),
});

export const collections = { tudastar };
```

---

## BLOG POSTS (10 Markdown files in `src/content/tudastar/`)

Each file has frontmatter + 600–1000 word body in Hungarian. Topics:

1. **`klima-telepites-menete.md`** — "A klímaszerelés menete lépésről lépésre" — 5-step guide
2. **`klima-szereles-ar-budapest-2025.md`** — "Klímaszerelés ár Budapest 2025" — pricing breakdown
3. **`milyen-klimat-vegyek.md`** — "Milyen klímát vegyek? Útmutató 2025" — buying guide
4. **`inverteres-klima-elonyei.md`** — "Az inverteres klíma előnyei" — inverter AC benefits
5. **`klima-karbantartas-fontossaga.md`** — "Miért fontos az éves klíma karbantartás?" — maintenance
6. **`klima-hibak-megoldasok.md`** — "Klíma hibák és megoldásaik" — troubleshooting
7. **`klima-kulteri-egyseg-engedely.md`** — "Klíma külső egység engedély" — permit guide
8. **`mikor-erdemes-klimat-szerelni.md`** — "Mikor érdemes klímát szereltetni?" — timing advice
9. **`h-tarifa-geo-tarifa-klima.md`** — "H-tarifa és geo-tarifa klímával" — tariff info
10. **`futes-klimaval-gazdasagos-e.md`** — "Gazdaságos-e a fűtés klímával?" — cost analysis

All authored by "Juhász Balázs", tagged appropriately (telepítés, karbantartás, árak, etc.), with pubDate in 2024–2025.

---

## API ENDPOINT (`api/contact.ts`)
Handles contact form POST. Validates required fields, ignores honeypot. Returns JSON `{ success: true }` or error.

---

## TINACMS CONFIG (`tina/config.ts`)

```ts
import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.HEAD || 'main',
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'images', publicFolder: 'public' } },
  schema: {
    collections: [
      // 1. tudastar — Blog posts (path: src/content/tudastar, format: md)
      // 2. siteConfig — Global config (path: src/data, match: site-config, format: json, global)
      // 3. homepage — Homepage content (path: src/data, match: homepage, format: json, global)
      // 4. rolunk — About page (path: src/data, match: rolunk, format: json, global)
      // 5. referenciak — References (path: src/data, match: referenciak, format: json, global)
      // 6. pricing — Pricing (path: src/data, match: pricing, format: json, global)
    ]
  }
});
```

Implement all 6 collections with full field definitions matching the JSON structure.

---

## SEO REQUIREMENTS

Every page must have:
- Unique `<title>` — format: `[Page Topic] | KlimaFirst Budapest`
- Unique meta description (120–160 chars, Hungarian)
- Canonical URL
- Hreflang: `hu-HU`, `hu`, `x-default`
- Open Graph tags
- Breadcrumb JSON-LD (all non-home pages)

**Structured data by page type:**
- Homepage: `HVACBusiness` + `WebSite` with `SearchAction`
- Service pages: `Service` with `OfferCatalog`
- District pages: `HVACBusiness` with local `geo` coordinates
- Blog posts: `Article`
- All: `BreadcrumbList`

**HVACBusiness schema data:**
```json
{
  "@type": "HVACBusiness",
  "name": "KlimaFirst",
  "legalName": "Juhász Solutions Kft.",
  "telephone": "+36203394164",
  "email": "info@klimafirst.hu",
  "url": "https://klimafirst.hu",
  "address": { "@type": "PostalAddress", "addressLocality": "Budapest", "addressCountry": "HU" },
  "geo": { "@type": "GeoCoordinates", "latitude": 47.4979, "longitude": 19.0402 },
  "openingHours": "Mo-Fr 08:00-18:00, Sa 08:00-14:00",
  "priceRange": "$$",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127" }
}
```

---

## ROBOTS.TXT

```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://klimafirst.hu/sitemap-index.xml
```

Note: use `http://localhost:4321/sitemap-index.xml` during development.

---

## VERCEL DEPLOYMENT (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

---

## ENVIRONMENT VARIABLES (`.env.example`)

```
# TinaCloud
TINA_CLIENT_ID=your-tina-client-id
TINA_TOKEN=your-tina-token
GITHUB_BRANCH=main
```

`.env` is git-ignored. `.env.example` is committed.

---

## IMPORTANT NOTES FOR IMPLEMENTATION

1. **Language**: All UI text is in Hungarian. Do not translate to English.
2. **Sitemap version**: MUST use `@astrojs/sitemap@3.2.1`. Never upgrade — v3.7.1+ crashes with Astro 4.16.
3. **Static output**: `output: 'static'` — no server-side rendering.
4. **TinaCMS admin**: After building, run `npx tinacms build --skip-cloud-checks` to generate `public/admin/`. Commit the built admin assets. The `public/admin/.gitignore` must NOT ignore `assets/` — remove that line.
5. **Production URL**: Change `site` in `astro.config.mjs` from `'http://localhost:4321'` to `'https://klimafirst.hu'` before final deploy.
6. **Images**: Owner photos are in `public/images/juhasz-balazs/`, reference photos in `public/images/referenciak/`. Use these paths in JSON data files.
7. **District pages**: Generate all 23 with `getStaticPaths()` from `districts.ts`. Each must have unique meta description mentioning the district name and neighborhoods.
8. **Lightbox**: Reference photo gallery uses vanilla JS lightbox (no external library) with prev/next and ESC close.
9. **Honeypot**: Contact form includes hidden `website` field for spam protection.
10. **Inter font**: Load from Google Fonts with `display=swap`. Preconnect in `<head>`.
