/**
 * Sanity brand seed script
 * Futtatás: node scripts/seed-brands.mjs
 *
 * Előfeltétel: SANITY_WRITE_TOKEN env változó szükséges.
 * Generálás: https://www.sanity.io/manage → project → API → Tokens → Add API Token (Editor)
 * Majd: SANITY_WRITE_TOKEN=skXXX node scripts/seed-brands.mjs
 */

import { createClient } from '@sanity/client';

const PROJECT_ID = 'f0xpfxf2';
const DATASET = 'production';
const API_VERSION = '2024-01-01';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error('Hiányzó SANITY_WRITE_TOKEN környezeti változó.');
  console.error('Generálj egy Editor tokent: https://www.sanity.io/manage');
  console.error('Majd futtasd: SANITY_WRITE_TOKEN=skXXX node scripts/seed-brands.mjs');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token,
  useCdn: false,
});

const brands = [
  {
    name: 'Gree',
    slug: 'gree-klima',
    description: 'Kategóriák: Lakossági modellek, Prestige széria, Kereskedelmi klímák. Széles választék minden igényre.',
    pros: ['Lakossági modellek', 'Prestige széria', 'Kereskedelmi klímák', 'Kiváló ár-érték arány'],
    priceRange: 'Már 250 000 Ft-tól',
    icon: '🟣',
    logoUrl: 'https://logo.clearbit.com/gree.com',
  },
  {
    name: 'Midea',
    slug: 'midea-klima',
    description: 'Kategóriák: Lakossági klímák, Multisplit klímák – egyetlen kültéri egységgel akár 5 beltéri is csatlakoztatható.',
    pros: ['Lakossági klímák', 'Multisplit rendszer', 'Akár 5 beltéri egy kültérihez', 'Megfizethető árak'],
    priceRange: 'Már 220 000 Ft-tól',
    icon: '🔵',
    logoUrl: 'https://logo.clearbit.com/midea.com',
  },
  {
    name: 'Daikin',
    slug: 'daikin-klima',
    description: 'Korszerű és energiahatékony megoldások otthonra. A világ klímapiaci vezető márkája, páratlan megbízhatósággal.',
    pros: ['Világ piacvezető', 'Kiemelkedő megbízhatóság', '-25°C fűtési teljesítmény', 'A++++ energiaosztály'],
    priceRange: 'Már 320 000 Ft-tól',
    icon: '🟡',
    logoUrl: 'https://logo.clearbit.com/daikin.com',
  },
  {
    name: 'Syen',
    slug: 'syen-klima',
    description: 'Teljes lakossági termékpaletta. Megbízható és megfizethető klímák minden otthonba.',
    pros: ['Teljes lakossági paletta', 'Megfizethető árak', 'Megbízható minőség', 'Kiváló ár-érték arány'],
    priceRange: 'Már 230 000 Ft-tól',
    icon: '🟤',
    logoUrl: 'https://logo.clearbit.com/syen.hu',
  },
  {
    name: 'Fisher',
    slug: 'fisher-klima',
    description: 'Lakossági légkondicionálók, innovatív és extra funkciókkal rendelkező modellek széles választékban.',
    pros: ['Kiváló ár-érték arány', 'Innovatív funkciók', 'Megbízható alkatrészek', 'Könnyű kezelhetőség'],
    priceRange: 'Már 260 000 Ft-tól',
    icon: '🔵',
    logoUrl: 'https://logo.clearbit.com/fisherklima.hu',
  },
  {
    name: 'Toshiba',
    slug: 'toshiba-klima',
    description: 'Japán minőség és megbízhatóság, prémium és magas energiahatékonyságú lakossági modellek.',
    pros: ['Japán minőség', 'Prémium energiahatékonyság', 'Megbízható tartósság', 'Beépített Wi-Fi'],
    priceRange: 'Már 300 000 Ft-tól',
    icon: '🔴',
    logoUrl: 'https://logo.clearbit.com/toshiba-climate.com',
  },
  {
    name: 'Fujitsu',
    slug: 'fujitsu-klima',
    description: 'Kiemelkedően halk működés, japán technológia és megbízható lakossági hűtési és fűtési megoldások.',
    pros: ['Rendkívül csendes működés', 'Japán technológia', 'A+++ energiaosztály', 'Hosszú élettartam'],
    priceRange: 'Már 290 000 Ft-tól',
    icon: '🟢',
    logoUrl: 'https://logo.clearbit.com/fujitsu.com',
  },
  {
    name: 'LG',
    slug: 'lg-klima',
    description: 'Letisztult dizájn, fejlett okosotthon funkciók és csendes, Dual Inverter technológia.',
    pros: ['Dual Inverter technológia', 'Okosotthon integráció', 'Csendes működés', 'Letisztult dizájn'],
    priceRange: 'Már 280 000 Ft-tól',
    icon: '🔴',
    logoUrl: 'https://logo.clearbit.com/lg.com',
  },
  {
    name: 'Samsung',
    slug: 'samsung-klima',
    description: 'Innovatív WindFree™ technológia a huzatmentes hűtésért és kiemelkedő okos vezérlés.',
    pros: ['WindFree™ technológia', 'Huzatmentes hűtés', 'Okos vezérlés', 'Energiahatékony'],
    priceRange: 'Már 270 000 Ft-tól',
    icon: '🔵',
    logoUrl: 'https://logo.clearbit.com/samsung.com',
  },
  {
    name: 'Panasonic',
    slug: 'panasonic-klima',
    description: 'Fejlett nanoe™ X légtisztító rendszer és maximális energiahatékonyság egészségesebb légkörért.',
    pros: ['nanoe™ X légtisztítás', 'Maximális energiahatékonyság', 'Japán megbízhatóság', 'Egészséges levegő'],
    priceRange: 'Már 300 000 Ft-tól',
    icon: '🔵',
    logoUrl: 'https://logo.clearbit.com/panasonic.com',
  },
  {
    name: 'Mitsubishi Electric',
    slug: 'mitsubishi-electric-klima',
    description: 'Csúcskategóriás japán prémium minőség, extrém tartósság és rendkívül csendes üzem.',
    pros: ['Csúcskategóriás minőség', 'Extrém tartósság', 'Rendkívül csendes üzem', 'Japán prémium'],
    priceRange: 'Már 330 000 Ft-tól',
    icon: '🔴',
    logoUrl: 'https://logo.clearbit.com/mitsubishielectric.com',
  },
  {
    name: 'Polar',
    slug: 'polar-klima',
    description: 'Pénztárcabarát, megbízható hűtési és fűtési megoldások, kiváló ár-érték aránnyal.',
    pros: ['Legjobb ár-érték', 'Pénztárcabarát', 'Megbízható minőség', 'Ideális belépő klíma'],
    priceRange: 'Már 210 000 Ft-tól',
    icon: '⚪',
    logoUrl: 'https://logo.clearbit.com/polarklima.hu',
  },
];

async function seedBrands() {
  console.log(`${brands.length} márka feltöltése a Sanity-ba...`);

  for (const brand of brands) {
    const doc = {
      _type: 'brandPage',
      _id: `brand-${brand.slug}`,
      name: brand.name,
      slug: { _type: 'slug', current: brand.slug },
      description: brand.description,
      pros: brand.pros,
      priceRange: brand.priceRange,
      icon: brand.icon,
      logoUrl: brand.logoUrl,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`✓ ${brand.name} (${brand.slug})`);
    } catch (err) {
      console.error(`✗ ${brand.name}: ${err.message}`);
    }
  }

  console.log('\nKész! A márkák elérhetők a Sanity Stúdióban.');
}

seedBrands();
