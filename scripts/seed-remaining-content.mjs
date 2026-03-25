/**
 * Seed: siteConfig, pricing, referenciak, 10 blogPost documents
 * Run: SANITY_WRITE_TOKEN=xxx node scripts/seed-remaining-content.mjs
 */
import { createClient } from '@sanity/client';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const client = createClient({
  projectId: 'f0xpfxf2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// ─── Portable Text helpers ──────────────────────────────────────────────────
let _k = 0;
const k = () => `k${++_k}`;
const span = (text, marks = []) => ({ _type: 'span', _key: k(), text, marks });
const block = (style, children, listItem = undefined, level = undefined) => {
  const b = { _type: 'block', _key: k(), style, children, markDefs: [] };
  if (listItem) { b.listItem = listItem; b.level = level ?? 1; }
  return b;
};
const p = (...texts) => block('normal', texts.map(t => span(t)));
const h2 = (text) => block('h2', [span(text)]);
const h3 = (text) => block('h3', [span(text)]);
const li = (text) => block('normal', [span(text)], 'bullet', 1);

// ─── Markdown → Portable Text converter ────────────────────────────────────
function mdToPortableText(md) {
  const blocks = [];
  const lines = md.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // h2
    if (line.startsWith('## ')) {
      blocks.push(h2(line.slice(3).trim()));
      i++; continue;
    }
    // h3
    if (line.startsWith('### ')) {
      blocks.push(h3(line.slice(4).trim()));
      i++; continue;
    }
    // h4
    if (line.startsWith('#### ')) {
      blocks.push(h3(line.slice(5).trim()));
      i++; continue;
    }
    // bullet list
    if (line.match(/^[-*] /)) {
      const text = line.replace(/^[-*] /, '').replace(/\*\*(.+?)\*\*/g, '$1').trim();
      blocks.push(li(text));
      i++; continue;
    }
    // numbered list
    if (line.match(/^\d+\. /)) {
      const text = line.replace(/^\d+\. /, '').replace(/\*\*(.+?)\*\*/g, '$1').trim();
      blocks.push(li(text));
      i++; continue;
    }
    // skip table rows, horizontal rules, empty
    if (line.startsWith('|') || line.startsWith('---') || line.trim() === '') {
      i++; continue;
    }
    // paragraph — parse inline bold
    const trimmed = line.trim();
    if (trimmed) {
      const children = [];
      const parts = trimmed.split(/\*\*(.+?)\*\*/);
      parts.forEach((part, idx) => {
        if (part) children.push(span(part, idx % 2 === 1 ? ['strong'] : []));
      });
      if (children.length) blocks.push(block('normal', children));
    }
    i++;
  }
  return blocks;
}

// ─── Parse markdown frontmatter ─────────────────────────────────────────────
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };
  const meta = {};
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (!key) return;
    let val = rest.join(':').trim().replace(/^"|"$/g, '');
    // arrays like ["a", "b"]
    if (val.startsWith('[')) {
      try { val = JSON.parse(val.replace(/'/g, '"')); } catch { val = []; }
    }
    meta[key.trim()] = val;
  });
  return { meta, body: match[2].trim() };
}

// ─── 1. siteConfig ───────────────────────────────────────────────────────────
async function seedSiteConfig() {
  await client.createOrReplace({
    _id: 'siteConfig',
    _type: 'siteConfig',
    name: 'Klímaépítő.hu',
    legalName: 'Juhász Solutions Kft.',
    tagline: 'Budapest #1 klímaszerelője',
    phone: '+36 20 339 4164',
    phoneTel: '+36203394164',
    email: 'info@klimaepito.hu',
    owner: 'Juhász Balázs',
    description: 'Professzionális klímaszerelés, javítás és karbantartás Budapesten. Ingyenes helyszíni felmérés, kiszállási díj nélkül. 5000+ referencia, gyors kiszállás mind a 23 kerületbe.',
    facebookUrl: 'https://www.facebook.com/klimaepito',
    statsReferences: '5000+',
    statsExperience: '10+',
    statsWarranty: '2 év',
    statsDistricts: '23',
  });
  console.log('✓ siteConfig');
}

// ─── 2. pricing ──────────────────────────────────────────────────────────────
async function seedPricing() {
  const addKeys = (arr) => arr.map(item => ({ ...item, _key: k() }));

  await client.createOrReplace({
    _id: 'pricing',
    _type: 'pricing',
    installPrices: addKeys([
      { service: 'Split klíma telepítés (2.5 kW)', description: 'Normál falvastagság, max 3m rézcső', price: '35.000', note: 'Munkadíj', highlight: false },
      { service: 'Split klíma telepítés (3.5 kW)', description: 'Normál falvastagság, max 3m rézcső', price: '38.000', note: 'Munkadíj', highlight: false },
      { service: 'Split klíma telepítés (5.0 kW)', description: 'Nagy teljesítmény, normál falvastagság', price: '42.000', note: 'Munkadíj', highlight: false },
      { service: 'Multi-split 2 beltéri egység', description: '1 kültéri + 2 beltéri, max 5m rézcső/ág', price: '65.000', note: 'Munkadíj', highlight: true },
      { service: 'Multi-split 3 beltéri egység', description: '1 kültéri + 3 beltéri, max 5m rézcső/ág', price: '85.000', note: 'Munkadíj', highlight: false },
      { service: 'Rézcső pár (méterenkénti)', description: '3/8" + 1/4" standard rézcső pár', price: '3.500', note: '/fm', highlight: false },
      { service: 'Extra falátvezetés', description: 'Vastag fal, lépcsős fal, stb.', price: '3.000–8.000', note: 'Eseti díjszabás', highlight: false },
    ]),
    devicePrices: addKeys([
      { service: 'Fisher split klíma (2.5 kW)', description: 'Beltéri + kültéri egység, távirányítóval', price: '130.000', highlight: false },
      { service: 'Fisher split klíma (3.5 kW)', description: 'Beltéri + kültéri egység, távirányítóval', price: '155.000', highlight: false },
      { service: 'Fujitsu split klíma (2.5 kW)', description: 'Japán minőség, A++++ energiaosztály', price: '180.000', highlight: true },
      { service: 'Toshiba split klíma (2.5 kW)', description: 'Prémium, Wi-Fi vezérlés, self-cleaning', price: '185.000', highlight: false },
      { service: 'Daikin split klíma (2.5 kW)', description: 'Piacvezető, maximális megbízhatóság', price: '200.000', highlight: false },
    ]),
    servicePrices: addKeys([
      { service: 'Helyszíni diagnosztika', description: 'Hiba azonosítás, hibakód kiolvasás', price: '8.000', highlight: false },
      { service: 'Hűtőközeg utántöltés (R32)', description: 'per 100g + munkadíj', price: '5.000', highlight: false },
      { service: 'Vákuum + töltés', description: 'Teljes rendszer feltöltés', price: '25.000', highlight: false },
      { service: 'Split klíma karbantartás', description: 'Beltéri egység tisztítás, ellenőrzés', price: '15.000', highlight: false },
      { service: 'Split klíma karbantartás (teljes)', description: 'Beltéri + kültéri, rendszerellenőrzés', price: '25.000', highlight: true },
      { service: 'Mélytisztítás + fertőtlenítés', description: 'Professzionális klímatisztítás', price: '30.000', highlight: false },
    ]),
    faqs: addKeys([
      { question: 'Tartalmaz-e az ár ÁFÁ-t?', answer: 'Az árlistán szereplő munkadíjak nettó árak. Magánszemélyeknek és vállalkozásoknak egyaránt pontosítjuk az árajánlatban, hogy az bruttó vagy nettó-e.' },
      { question: 'Van-e egyéb rejtett költség?', answer: 'Nem. Az összes tételt az írásos árajánlatban rögzítjük. Amit az ajánlat tartalmaz, azt számlázunk – nem számítunk fel meglepetés pótdíjakat.' },
      { question: 'Készülékárat tartalmaz a telepítési díj?', answer: 'Nem, a telepítési munkadíj és a készülékár külön kezeljük. Lehetőség van csomagajánlatra is, ahol a készülékkel együtt adjuk meg a végső árat.' },
      { question: 'Fizethetünk részletben?', answer: 'Igen, nagyobb összegű megrendelések esetén rugalmas fizetési feltételekről is egyezhetünk. Elfogadunk készpénzt és banki átutalást.' },
    ]),
  });
  console.log('✓ pricing');
}

// ─── 3. referenciak ──────────────────────────────────────────────────────────
async function seedReferenciak() {
  const testimonials = [
    { name: 'Kovács Péter', location: 'Budapest, XI. kerület', rating: 5, text: 'Kiváló munkát végeztek! Pontosan érkeztek, precízen dolgoztak, és a klíma azóta tökéletesen működik. Ajánlom mindenkinek.' },
    { name: 'Szabó Mária', location: 'Budapest, II. kerület', rating: 5, text: 'Ingyenes helyszíni felmérés, gyors munka, tisztán hagyott munkaterület – mindennel elégedett vagyok. Fujitsu klíma, remekül működik!' },
    { name: 'Horváth László', location: 'Budapest, XIII. kerület', rating: 5, text: 'Multi-split rendszert szereltek 3 szobába. Precíz munka, mindenre felhívták a figyelmem. Már a második klímámat szerelik.' },
    { name: 'Nagy Eszter', location: 'Budapest, XIV. kerület', rating: 5, text: 'Régi klímánk meghalt, Klímaépítő.hu 2 napon belül kiszállt, javítás helyett cserét javasolt – becsületes és átlátható.' },
    { name: 'Fekete Zoltán', location: 'Iroda, Budapest V. kerület', rating: 5, text: 'Irodai klímarendszert szereltek – 4 egység, profin elvégezve. Kiszállási díj nélkül, pontosan a megbeszélt áron.' },
    { name: 'Varga Katalin', location: 'Budapest, I. kerület', rating: 5, text: 'Karbantartást kértem, alapos munkát végeztek. Elmagyarázták, mit és miért csináltak. Megbízható csapat!' },
  ];

  const photos = [
    { src: '/images/juhasz-balazs/jb-gree-beszereles-letran-1.jpeg', alt: 'Juhász Balázs Gree kültéri klíma beszerelése létráról – Klímaépítő.hu Budapest' },
    { src: '/images/referenciak/PXL_20250204_132429954.jpg', alt: 'Telepített kültéri klíma egység ház falán – Klímaépítő.hu referencia Budapest' },
    { src: '/images/referenciak/PXL_20250324_124012586.jpg', alt: 'AUX kültéri klíma tetőn – Klímaépítő.hu telepítési referencia Budapest' },
    { src: '/images/juhasz-balazs/jb-vacuum-pumpa-bekoltes.jpeg', alt: 'Klíma hűtőkör bekötése vákuumszivattyúval – Klímaépítő.hu' },
    { src: '/images/referenciak/PXL_20250430_131133208.jpg', alt: 'Kültéri klíma egység téglaházon – Klímaépítő.hu referencia Budapest' },
    { src: '/images/referenciak/PXL_20250731_110846396.jpg', alt: 'Juhász Balázs selfie tetőről Budapest panorámával – Klímaépítő.hu' },
    { src: '/images/juhasz-balazs/jb-manifold-letran-1.jpeg', alt: 'Manifold mérősorral hűtőközeg ellenőrzés – Klímaépítő.hu szerviz' },
    { src: '/images/referenciak/PXL_20250618_082351422.jpg', alt: 'Klíma telepítési referencia Budapest – Klímaépítő.hu elvégzett munka' },
    { src: '/images/juhasz-balazs/jb-teto-munka-heveder.jpeg', alt: 'Tetőn végzett klímaszerelés biztonsági hevederrel – Klímaépítő.hu' },
    { src: '/images/referenciak/PXL_20250627_101928501.jpg', alt: 'Klíma referencia Budapest – Klímaépítő.hu elvégzett munka' },
    { src: '/images/juhasz-balazs/jb-belso-egyseg-szerviz.jpeg', alt: 'Beltéri klíma szervizálása szűrőtisztítással – Klímaépítő.hu Budapest' },
    { src: '/images/referenciak/PXL_20250512_115153611.jpg', alt: 'Klíma telepítési referencia Budapest – Klímaépítő.hu' },
    { src: '/images/juhasz-balazs/jb-hikoki-furo-1.jpeg', alt: 'Falvésés HiKoki kalapáccsal klíma csővezetékhez – Klímaépítő.hu' },
    { src: '/images/referenciak/PXL_20250804_104924276.jpg', alt: 'Klímaépítő.hu klíma telepítési referencia Budapest' },
    { src: '/images/juhasz-balazs/jb-gree-egyseg-vallon-1.jpeg', alt: 'Juhász Balázs Gree kültéri egységgel – Klímaépítő.hu Budapest' },
    { src: '/images/referenciak/PXL_20250310_124603664.jpg', alt: 'Klíma referencia Budapest – Klímaépítő.hu elvégzett munka' },
    { src: '/images/referenciak/PXL_20250618_090715343.jpg', alt: 'Klímaépítő.hu klíma telepítési referencia Budapest' },
    { src: '/images/referenciak/PXL_20241202_163524660.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/juhasz-balazs/jb-manifold-gree-napsutes.jpeg', alt: 'Klíma nyomáspróba manifolddal napsütésben – Klímaépítő.hu' },
    { src: '/images/referenciak/PXL_20250324_131518689.jpg', alt: 'Klímaépítő.hu elvégzett klíma telepítési munka Budapest' },
    { src: '/images/referenciak/PXL_20250507_131319099.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/juhasz-balazs/jb-panelhaz-teto-tavol.jpeg', alt: 'Klímaépítő.hu szerelő panelház tetőn klímaszerelés után' },
    { src: '/images/referenciak/PXL_20250516_112719329.jpg', alt: 'Klímaépítő.hu klíma telepítés referencia Budapest' },
    { src: '/images/referenciak/PXL_20250620_141404319.jpg', alt: 'Klíma referencia Budapest – Klímaépítő.hu elvégzett munka' },
    { src: '/images/juhasz-balazs/jb-belso-egyseg-telepites-mosoly.jpeg', alt: 'Juhász Balázs beltéri klíma felszerelése – Klímaépítő.hu Budapest' },
    { src: '/images/referenciak/PXL_20250627_101930778.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250709_145544364.jpg', alt: 'Klímaépítő.hu klíma telepítési referencia Budapest' },
    { src: '/images/referenciak/PXL_20250724_102311551.jpg', alt: 'Klímaépítő.hu elvégzett klíma munka referencia Budapest' },
    { src: '/images/juhasz-balazs/jb-gree-pozicionalas-hatul.jpeg', alt: 'Gree kültéri egység pozicionálása konzolra – Klímaépítő.hu' },
    { src: '/images/referenciak/PXL_20250731_120824727.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250808_101557822.jpg', alt: 'Klímaépítő.hu klíma telepítési referencia Budapest' },
    { src: '/images/referenciak/PXL_20250902_093211723.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250902_094046791.jpg', alt: 'Klímaépítő.hu elvégzett klíma munka Budapest' },
    { src: '/images/referenciak/PXL_20250914_103618258.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20260320_132828953.jpg', alt: 'Klímaépítő.hu klíma telepítési referencia Budapest' },
    { src: '/images/referenciak/PXL_20241202_164403571.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20241217_131014148.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250204_130020447.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250310_125338430.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250320_110851754.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250324_124032899.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250414_142232939.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250414_142519281.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250416_163810237.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250416_163818214.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250428_105104424.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250430_131205779.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250507_125335754.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250512_122150120.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250516_112703703.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250516_173054164.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250521_143532025.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250526_125117796.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250526_125128814.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250603_150212726.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250603_150322010.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250610_181638877.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250610_181654147.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250618_085935008.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250618_092933282.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250618_092934691.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250620_145155759.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250620_145200807.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250627_100511639.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250709_145645592.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250715_061908537.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250724_102303379.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250724_102337673.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250731_110846939.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250731_122333040.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250804_105139838.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250808_101535172.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
    { src: '/images/referenciak/PXL_20250812_103632036.jpg', alt: 'Klímaépítő.hu klíma referencia Budapest' },
  ];

  await client.createOrReplace({
    _id: 'referenciak',
    _type: 'referenciak',
    testimonials: testimonials.map(t => ({ ...t, _key: k() })),
    photos: photos.map(p => ({ ...p, _key: k() })),
  });
  console.log('✓ referenciak (6 vélemény + 70 fotó)');
}

// ─── 4. Blog posts ───────────────────────────────────────────────────────────
async function seedBlogPosts() {
  const dir = join(root, 'src/content/tudastar');
  const files = readdirSync(dir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const content = readFileSync(join(dir, file), 'utf-8');
    const { meta, body } = parseFrontmatter(content);

    const slug = file.replace('.md', '');
    const bodyBlocks = mdToPortableText(body);

    // Parse tags/keywords safely
    let tags = meta.tags ?? [];
    let keywords = meta.keywords ?? [];
    if (typeof tags === 'string') tags = [tags];
    if (typeof keywords === 'string') keywords = [keywords];

    const doc = {
      _id: `blogPost-${slug}`,
      _type: 'blogPost',
      title: meta.title ?? slug,
      slug: { _type: 'slug', current: slug },
      description: meta.description ?? '',
      pubDate: meta.pubDate ?? '2025-01-01',
      author: meta.author ?? 'Juhász Balázs',
      tags,
      keywords,
      image: meta.image ?? '',
      imageAlt: meta.imageAlt ?? '',
      body: bodyBlocks,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ Blog: ${meta.title ?? slug}`);
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ SANITY_WRITE_TOKEN hiányzik');
    process.exit(1);
  }

  console.log('Feltöltés Sanity-ra...\n');

  await seedSiteConfig();
  await seedPricing();
  await seedReferenciak();

  console.log('\nBlog bejegyzések feltöltése...');
  await seedBlogPosts();

  console.log('\n✅ Minden kész! Sanity Studio: https://klimaepito.sanity.studio');
}

main().catch(err => { console.error(err); process.exit(1); });
