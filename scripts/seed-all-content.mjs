/**
 * Teljes tartalom seed szkript – minden oldal, minden mező
 * Futtatás: SANITY_WRITE_TOKEN=skXXX node scripts/seed-all-content.mjs
 */

import { createClient } from '@sanity/client';

const PROJECT_ID = 'f0xpfxf2';
const DATASET = 'production';
const API_VERSION = '2024-01-01';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error('Hiányzó SANITY_WRITE_TOKEN!');
  process.exit(1);
}

const client = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: API_VERSION, token, useCdn: false });

// ─── Portable Text segédfüggvények ──────────────────────────────────────────
let _k = 0;
const k = () => `k${++_k}`;
const span = (text, marks = []) => ({ _type: 'span', _key: k(), text, marks });
const block = (style, children, listItem, level) => {
  const b = { _type: 'block', _key: k(), style, children, markDefs: [] };
  if (listItem) { b.listItem = listItem; b.level = level ?? 1; }
  return b;
};
const h2 = (text) => block('h2', [span(text)]);
const h3 = (text) => block('h3', [span(text)]);
const p = (text) => block('normal', [span(text)]);
const li = (...spans) => block('normal', spans, 'bullet');
const liS = (bold, rest = '') => li(span(bold, ['strong']), span(rest));
const oli = (...spans) => block('normal', spans, 'number');
const oliS = (bold, rest = '') => oli(span(bold, ['strong']), span(rest));

// ─── FŐOLDAL (homepage) ─────────────────────────────────────────────────────
const homepageDoc = {
  _type: 'homepage',
  _id: 'homepage',
  heroBadgeText: '5000+ elvégzett referencia Budapesten',
  heroTitle: 'Klímaszerelés Budapest –\nProfi, Gyors, Megbízható',
  heroSubtitle: 'Fisher, Fujitsu, Toshiba és Daikin klímarendszerek telepítése, javítása és karbantartása. <strong class="text-white">Ingyenes helyszíni felmérés, kiszállási díj nélkül</strong> Budapest mind a 23 kerületében.',
  heroCtaPrimary: 'Ingyenes Árajánlat Kérése',
  heroCtaSecondary: '+36 20 339 4164',
  heroTrustBadges: ['Kiszállási díj nélkül', '2 év garancia', 'Ingyenes helyszíni felmérés'],
  jbStripLabel: 'A mester maga is kiszáll',
  jbStripTitle: 'Juhász Balázs – Tulajdonos és Főszerelő',
  jbStripText: 'Nem call centert, hanem tapasztalt szakembert kap. Juhász Balázs 10+ éve személyesen végzi és felügyeli Budapest egész területén az összes klímaszerelési munkát.',
  jbStripLinkText: 'Ismerjen meg minket',
  jbPhotos: [
    { _key: k(), src: '/images/juhasz-balazs/jb-gree-beszereles-letran-1.jpeg', alt: 'Juhász Balázs kültéri klíma beszerelése – Klímaépítő.hu Budapest' },
    { _key: k(), src: '/images/juhasz-balazs/jb-belso-egyseg-telepites-mosoly.jpeg', alt: 'Juhász Balázs beltéri klíma telepítés – Klímaépítő.hu Budapest' },
    { _key: k(), src: '/images/juhasz-balazs/jb-teto-munka-heveder.jpeg', alt: 'Klímaépítő.hu szerelő tetőn biztonsági hevederrel – Budapest' },
  ],
  servicesSectionTitle: 'Klímaszerelési Szolgáltatásaink Budapesten',
  servicesSectionSubtitle: 'Teljes körű klímaszolgáltatás – a telepítéstől a karbantartásig. Minden munkára 2 év garanciát vállalunk.',
  services: [
    { _key: k(), title: 'Klíma Telepítés és Értékesítés', description: 'Fisher, Fujitsu, Toshiba és Daikin split klímarendszerek telepítése ingyenes helyszíni felméréssel. Kiszállási díj nélkül, Budapesten belül.', href: '/szolgaltatasok/klima-telepites', icon: 'heroicons:bolt', image: '/images/juhasz-balazs/jb-gree-beszereles-letran-1.jpeg', imageAlt: 'Juhász Balázs Gree kültéri klíma egység beszerelése létráról', highlight: false },
    { _key: k(), title: 'Klíma Javítás', description: 'Gyors és megbízható klímajavítás Budapest egész területén. Minden márkát javítunk, eredeti alkatrészekkel, garanciával.', href: '/szolgaltatasok/klima-javitas', icon: 'heroicons:wrench', image: '/images/juhasz-balazs/jb-manifold-letran-1.jpeg', imageAlt: 'Juhász Balázs manifold mérősorral hűtőközeg ellenőrzés', highlight: false },
    { _key: k(), title: 'Klíma Tisztítás és Karbantartás', description: 'Éves klíma karbantartással meghosszabbítja készüléke élettartamát és csökkenti energiafogyasztását.', href: '/szolgaltatasok/klima-tisztitas', icon: 'heroicons:sparkles', image: '/images/juhasz-balazs/jb-belso-egyseg-szerviz.jpeg', imageAlt: 'Beltéri klíma szűrő tisztítása', highlight: true },
    { _key: k(), title: 'Fűtés Klímával', description: 'Inverteres klíma hőszivattyúként: 3-4x hatékonyabb, mint az elektromos fűtés. Akár -15°C-ig megbízható fűtés.', href: '/szolgaltatasok/futes-klimaval', icon: 'heroicons:fire', image: '/images/juhasz-balazs/jb-vacuum-pumpa-bekoltes.jpeg', imageAlt: 'Klíma hűtőkör bekötése vákuumszivattyúval', highlight: false },
  ],
  processSectionTitle: 'Hogyan Dolgozunk? – 5 Egyszerű Lépés',
  processSectionSubtitle: 'Átlátható folyamat, meglepetések nélkül.',
  processSteps: [
    { _key: k(), step: '1', title: 'Kapcsolatfelvétel', desc: 'Hívjon minket vagy töltse ki az online árajánlatkérő űrlapot.' },
    { _key: k(), step: '2', title: 'Ingyenes Felmérés', desc: 'Kiszállunk és felmérjük a helyszínt – kiszállási díj nélkül.' },
    { _key: k(), step: '3', title: 'Árajánlat', desc: 'Írásos, tételes ajánlatot küldünk 24 órán belül.' },
    { _key: k(), step: '4', title: 'Telepítés', desc: 'Precíz munkavégzés, tisztán hagyott munkaterület.' },
    { _key: k(), step: '5', title: 'Átadás + Garancia', desc: 'Betanítás, dokumentáció átadása, 2 év garancia.' },
  ],
  brandsSectionTitle: 'Forgalmazott Klíma Márkák',
  brandsSectionSubtitle: 'Csak elismert, megbízható gyártók termékeit értékesítjük és szervizeljük.',
  brands: [
    { _key: k(), name: 'Fisher', desc: 'Kiváló ár-érték', href: '/keszulekek/fisher-klima' },
    { _key: k(), name: 'Fujitsu', desc: 'Japán precizitás', href: '/keszulekek/fujitsu-klima' },
    { _key: k(), name: 'Toshiba', desc: 'Prémium tech', href: '/keszulekek/toshiba-klima' },
    { _key: k(), name: 'Daikin', desc: 'Világ piacvezető', href: '/keszulekek/daikin-klima' },
    { _key: k(), name: 'Gree', desc: 'Prestige széria', href: '/keszulekek/gree-klima' },
    { _key: k(), name: 'LG', desc: 'Dual Inverter', href: '/keszulekek/lg-klima' },
    { _key: k(), name: 'Samsung', desc: 'WindFree™', href: '/keszulekek/samsung-klima' },
    { _key: k(), name: 'Mitsubishi', desc: 'Csúcskategória', href: '/keszulekek/mitsubishi-electric-klima' },
  ],
  ctaTitle: 'Kész a Klímaszerelésre? Hívjon Minket Most!',
  ctaSubtitle: 'Ingyenes helyszíni felmérés, kötelezettségmentes árajánlat. Kiszállási díj nélkül Budapest egész területén.',
  faqs: [
    { _key: k(), question: 'Mennyi idő alatt szerelik fel a klímát?', answer: 'Egy split klíma telepítése általában 3–6 óra alatt elvégezhető. Multi-split rendszereknél 1–2 nap is lehet.' },
    { _key: k(), question: 'Van-e kiszállási díj?', answer: 'Nem. Budapest mind a 23 kerületébe kiszállási díj nélkül érkezünk.' },
    { _key: k(), question: 'Milyen garanciát vállalnak?', answer: 'Az elvégzett munkára 2 év garanciát vállalunk. A készülékre a gyártói garancia érvényes.' },
    { _key: k(), question: 'Kell-e engedély a klíma telepítéséhez?', answer: 'Önálló lakóháznál nem. Társasháznál esetenként szükséges a közös képviselő engedélye.' },
    { _key: k(), question: 'Milyen márkákat forgalmaznak?', answer: 'Fisher, Fujitsu, Toshiba, Daikin, Gree, Midea, LG, Samsung, Panasonic, Mitsubishi Electric, Syen, Polar.' },
  ],
};

// ─── RÓLUNK OLDAL ───────────────────────────────────────────────────────────
const aboutBody = [
  p('A Klímaépítő.hu (Juhász Solutions Kft.) Budapesten tevékenykedő, professzionális klímaszerelési vállalkozás. Alapítója és tulajdonosa Juhász Balázs, aki 10+ év iparági tapasztalattal rendelkezik.'),
  p('Mottónk: „Elsők a Megoldásban" – ez nem csupán szlogen, hanem minden munkánkat meghatározó elv. Gyorsan reagálunk, pontosan dolgozunk, és minden esetben az ügyfél érdekeit tartjuk szem előtt.'),
  h3('Szakterületeink'),
  li(span('Split és multi-split klímarendszerek telepítése')),
  li(span('Fisher, Fujitsu, Toshiba, Daikin, Gree készülékek')),
  li(span('Klímarendszerek javítása és karbantartása')),
  li(span('Hőszivattyús fűtési rendszerek tervezése és kivitelezése')),
  h3('Miért Vagyunk Mások?'),
  liS('Ingyenes helyszíni felmérés ', '– kiszállási díj nélkül'),
  liS('Személyre szabott árak ', '– nem sablonos ajánlatok'),
  liS('Precíz munkavégzés ', '– minőségi eszközök, tiszta munkaterület'),
  liS('Gyors kiszállás ', '– 1–3 napon belül Budapest egész területén'),
  liS('2 év garancia ', '– minden elvégzett munkára'),
];

const rolunkDoc = {
  _type: 'rolunk',
  _id: 'rolunk',
  heroLabel: 'Ismerjük meg egymást',
  heroTitle: 'Juhász Balázs',
  heroSubtitle: '10+ év szakmai tapasztalat, 5000+ elvégzett munka, Budapest mind a 23 kerületében. Tulajdonos-vezető, aki maga is kiszáll és dolgozik.',
  heroImageSrc: '/images/juhasz-balazs/jb-gree-egyseg-vallon-1.jpeg',
  heroImageAlt: 'Juhász Balázs tulajdonos-szerelő Gree kültéri klíma egységgel – Klímaépítő.hu Budapest',
  stats: [
    { _key: k(), value: '10+', label: 'Év tapasztalat' },
    { _key: k(), value: '5000+', label: 'Elvégzett munka' },
    { _key: k(), value: '23', label: 'Budapest kerület' },
    { _key: k(), value: '2 év', label: 'Garancia' },
  ],
  filmStripTitle: 'Munkában – minden nap Budapesten',
  filmStripSubtitle: 'Valódi helyszínek, valódi szerelések',
  actionPhotos: [
    { _key: k(), src: '/images/juhasz-balazs/jb-gree-beszereles-letran-1.jpeg', alt: 'Juhász Balázs Gree kültéri klíma beszerelése létráról' },
    { _key: k(), src: '/images/juhasz-balazs/jb-belso-egyseg-telepites-mosoly.jpeg', alt: 'Juhász Balázs beltéri klíma telepítés' },
    { _key: k(), src: '/images/juhasz-balazs/jb-teto-munka-heveder.jpeg', alt: 'Szerelő tetőn biztonsági hevederrel' },
    { _key: k(), src: '/images/juhasz-balazs/jb-manifold-letran-1.jpeg', alt: 'Manifold mérősorral hűtőközeg ellenőrzés' },
    { _key: k(), src: '/images/juhasz-balazs/jb-manifold-gree-napsutes.jpeg', alt: 'Klíma hűtőközeg töltés manifolddal' },
    { _key: k(), src: '/images/juhasz-balazs/jb-vacuum-pumpa-bekoltes.jpeg', alt: 'Klíma hűtőkör bekötése vákuumszivattyúval' },
    { _key: k(), src: '/images/juhasz-balazs/jb-gree-pozicionalas-hatul.jpeg', alt: 'Kültéri klíma egység konzolra szerelése' },
    { _key: k(), src: '/images/juhasz-balazs/jb-belso-egyseg-szerviz.jpeg', alt: 'Beltéri klíma szűrő tisztítása' },
  ],
  aboutTitle: 'A Klímaépítő.hu Csapata',
  aboutBody,
  ownerName: 'Juhász Balázs',
  ownerRole: 'Tulajdonos · Főszerelő',
  ownerQuote: 'Számomra minden egyes ügyfél más és más. Nem sablonos megoldásokat kínálok, hanem az adott ház, az adott igény alapján szabott javaslatot – ez a különbség a Klímaépítő.hu és a többi vállalkozás között.',
  profileImageSrc: '/images/juhasz-balazs/jb-belso-egyseg-telepites-mosoly.jpeg',
  profileImageAlt: 'Juhász Balázs tulajdonos-szerelő portré – Klímaépítő.hu Budapest',
  companyName: 'Juhász Solutions Kft.',
  location: 'Budapest',
};

// ─── SZOLGÁLTATÁS OLDALAK ───────────────────────────────────────────────────
const servicePages = [
  {
    _id: 'servicePage-klima-telepites',
    slug: 'klima-telepites',
    title: 'Klíma Telepítés és Értékesítés Budapest',
    subtitle: 'Fisher, Fujitsu, Toshiba és Daikin split és multi-split klímarendszerek professzionális telepítése. Ingyenes helyszíni felmérés, kiszállási díj nélkül mind a 23 kerületben.',
    heroIcon: '❄️',
    photo1: { src: '/images/juhasz-balazs/jb-gree-beszereles-letran-1.jpeg', alt: 'Juhász Balázs Gree kültéri klíma beszerelése létráról – Klímaépítő.hu Budapest klímaszerelő' },
    photo2: { src: '/images/juhasz-balazs/jb-gree-egyseg-vallon-1.jpeg', alt: 'Juhász Balázs telepített Gree kültéri klíma egységgel – Klímaépítő.hu Budapest' },
    photoSectionLabel: 'Tulajdonos-szerelő',
    photoSectionTitle: 'Juhász Balázs személyesen végzi a telepítést',
    photoSectionText: '10+ év tapasztalat, 5000+ elvégzett klíma telepítés Budapesten. Minden munkára 2 év garanciát vállalunk.',
    body: [
      h2('Miért Válassza a Klímaépítő.hu Klíma Telepítési Szolgáltatását?'),
      p('A Klímaépítő.hu csapata 10+ év tapasztalattal rendelkezik Budapesten. Minden telepítési munkát precízen, magas minőségű eszközökkel végzünk el, és 2 év garanciát vállalunk az elvégzett munkára. Kiszállási díjat nem számítunk fel Budapest területén.'),
      h2('Milyen Klímarendszereket Szerelünk?'),
      liS('Split klíma: ', '1 kültéri + 1 beltéri egység – ideális egy szobához vagy kisebb helyiséghez'),
      liS('Multi-split klíma: ', '1 kültéri + 2–5 beltéri egység – több helyiség egyidejű klimatizálása'),
      liS('Kazettás klíma: ', 'Mennyezetbe süllyesztett, irodai alkalmazáshoz'),
      liS('Inverteres klíma: ', 'Energiatakarékos, 30–50%-kal alacsonyabb villanyszámla'),
      h2('A Telepítés Menete – 5 Lépés'),
      oliS('Ingyenes helyszíni felmérés: ', 'Kiszállunk, felmérjük a helyiséget és meghatározzuk az optimális teljesítményt'),
      oliS('Árajánlat: ', 'Írásban, tételes bontásban küldjük az ajánlatot'),
      oliS('Időpontegyeztetés: ', 'Rugalmasan alkalmazkodunk az Ön időbeosztásához'),
      oliS('Telepítés: ', 'Precíz munkavégzés, tisztán hagyott munkaterület'),
      oliS('Átadás + Betanítás: ', 'Megmutatjuk a kezelési funkciókat, átadjuk a dokumentációt'),
      h2('Forgalmazott Márkák'),
      p('Kizárólag elismert, megbízható gyártók termékeit értékesítjük:'),
      liS('Fisher klíma ', '– Kiváló ár-érték arány, megbízható minőség'),
      liS('Fujitsu klíma ', '– Japán precizitás, csendes működés, magas hatékonyság'),
      liS('Toshiba klíma ', '– Innovatív technológia, prémium kategória'),
      liS('Daikin klíma ', '– A világ piacvezetője, kiemelkedő megbízhatóság'),
    ],
    priceItems: [
      { _key: k(), service: 'Split klíma telepítés (2.5 kW)', description: 'Beltéri + kültéri egység, szokásos falvastagság', price: '35.000', note: 'Munkadíj' },
      { _key: k(), service: 'Split klíma telepítés (3.5 kW)', description: 'Beltéri + kültéri egység, szokásos falvastagság', price: '38.000', note: 'Munkadíj' },
      { _key: k(), service: 'Split klíma telepítés (5.0 kW+)', description: 'Nagy teljesítményű egységek, irodai felhasználás', price: '45.000', note: 'Munkadíj' },
      { _key: k(), service: 'Multi-split 2 beltéri egység', description: '1 kültéri + 2 beltéri egység telepítése', price: '65.000', note: 'Munkadíj' },
      { _key: k(), service: 'Multi-split 3 beltéri egység', description: '1 kültéri + 3 beltéri egység telepítése', price: '85.000', note: 'Munkadíj' },
      { _key: k(), service: 'Rézcső hosszabbítás (méterenkénti)', description: 'Standard 3/8" + 1/4" rézcső pár', price: '3.500', note: '/fm' },
      { _key: k(), service: 'Klíma készülék ár (2.5–3.5 kW)', description: 'Fisher, Fujitsu vagy Toshiba split klíma', price: '130.000', highlight: true, note: 'Készülékár' },
    ],
    faqs: [
      { _key: k(), question: 'Mennyi idő alatt szerelik fel a klímát?', answer: 'Egy split klíma telepítése általában 3–6 óra alatt elvégezhető. Multi-split rendszereknél ez 1–2 napot vehet igénybe, a beltéri egységek számától függően.' },
      { _key: k(), question: 'Hol helyezik el a kültéri egységet?', answer: 'A kültéri egységet általában az erkélyen, homlokzaton, tetőn vagy az épület oldalán helyezzük el. Minden esetben figyelünk a szabályos elhelyezésre, a megfelelő áramlásra és a zaj minimalizálására.' },
      { _key: k(), question: 'Kell-e engedély a klíma telepítéséhez?', answer: 'Önálló lakóháznál általában nem kell engedély. Társasházi lakásoknál a kültéri egység elhelyezéséhez esetenként a közös képviselő vagy az önkormányzat engedélye szükséges.' },
      { _key: k(), question: 'Milyen típusú klímákat szerelnek?', answer: 'Split, multi-split és kazettás klímarendszereket szerelünk. Forgalmazott márkák: Fisher, Fujitsu, Toshiba, Daikin. Más márkák szervizét is elvégezzük.' },
      { _key: k(), question: 'Mi az ingyenes helyszíni felmérés menete?', answer: 'Szerelőink kiszállnak (kiszállási díj nélkül), felmérjük a helyiséget és az épületet, meghatározzuk a szükséges teljesítményt, javaslatot teszünk a telepítési helyre, majd írásos, tételes árajánlatot küldünk.' },
    ],
  },
  {
    _id: 'servicePage-klima-javitas',
    slug: 'klima-javitas',
    title: 'Klíma Javítás Budapest',
    subtitle: 'Gyors, megbízható klímajavítás minden márkára. Helyszíni diagnosztika, eredeti alkatrészek, 6 hónap garancia. Kiszállási díj nélkül Budapest egész területén.',
    heroIcon: '🔧',
    photo1: { src: '/images/juhasz-balazs/jb-manifold-letran-1.jpeg', alt: 'Juhász Balázs manifold mérősorral hűtőközeg ellenőrzés – Klímaépítő.hu klíma javítás Budapest' },
    photo2: { src: '/images/juhasz-balazs/jb-manifold-gree-napsutes.jpeg', alt: 'Klíma hűtőközeg töltés manifolddal – Klímaépítő.hu szerviz Budapest' },
    photoSectionLabel: 'Diagnosztika helyszínen',
    photoSectionTitle: 'Profi szerviz eszközökkel, gyorsan',
    photoSectionText: 'Manifold mérősor, vákuumszivattyú, diagnosztikai eszközök – minden szükséges felszerelés nálunk van. Nincs felesleges visszajárás.',
    body: [
      h2('Klímajavítás – Minden Hibát Megoldunk'),
      p('Ha a klímája nem hűt megfelelően, furcsán zúg, csöpög, vagy hibakódot jelez, ne halassza tovább a javítást! A késedelmes szerviz súlyosabb és drágább meghibásodáshoz vezethet.'),
      h2('Leggyakoribb Klíma Hibák és Megoldásaink'),
      liS('Nem hűt / nem fűt: ', 'Alacsony hűtőközeg szint, szivárgás diagnosztika és töltés'),
      liS('Csöpög a beltéri egység: ', 'Eltömött kondenzvíz elvezető cső tisztítása'),
      liS('Szokatlan zajok: ', 'Laza alkatrészek, ventilátor hiba javítása'),
      liS('Hibakód jelzés: ', 'Hibakód kiolvasás, elektronikai javítás'),
      liS('Nem indul be: ', 'Elektromos hiba diagnosztika és javítás'),
      liS('Kellemetlen szag: ', 'Mélytisztítás, fertőtlenítés'),
      h2('Szervizelt Márkák'),
      p('Szervizeljük az összes elterjedt márkát: Fisher, Fujitsu, Toshiba, Daikin, Samsung, LG, Mitsubishi Electric, Midea, Gree, Panasonic, és más gyártók termékeit.'),
    ],
    priceItems: [
      { _key: k(), service: 'Helyszíni diagnosztika', description: 'Hiba azonosítása, hibakód kiolvasás', price: '8.000', note: 'Munkadíj' },
      { _key: k(), service: 'Hűtőközeg utántöltés (R32)', description: '250g töltőgáz és munkadíj', price: '15.000', note: 'anyag+munka' },
      { _key: k(), service: 'Hűtőközeg utántöltés (R410A)', description: '250g töltőgáz és munkadíj', price: '14.000', note: 'anyag+munka' },
      { _key: k(), service: 'Vákuumszivattyúzás és töltés', description: 'Teljes körű rendszer feltöltés', price: '25.000', note: 'Munkadíj' },
      { _key: k(), service: 'Vezérlőpanel csere', description: 'Beltéri egység vezérlő csere', price: '18.000', note: 'Munkadíj (+alkatrész)' },
      { _key: k(), service: 'Ventilátor motor csere', description: 'Beltéri vagy kültéri ventilátormotor', price: '15.000', note: 'Munkadíj (+alkatrész)', highlight: true },
    ],
    faqs: [
      { _key: k(), question: 'Miért nem hűt a klímám?', answer: 'A leggyakoribb okok: alacsony hűtőközeg szint (szivárgás), eltömött szűrő, hibás kompresszor, vagy problémás vezérlő. Helyszíni diagnosztikával gyorsan azonosítjuk a hibát.' },
      { _key: k(), question: 'Meddig tart egy klímajavítás?', answer: 'Egyszerűbb hibák (pl. hűtőközeg utántöltés, szűrő csere) 1–2 óra alatt elvégezhetők. Komplex javítások 3–8 óra munkaidőt igényelnek.' },
      { _key: k(), question: 'Van garancia a javításra?', answer: 'Igen, minden elvégzett javítási munkára 6 hónap garanciát vállalunk. Beépített alkatrészekre az alkatrész gyártói garanciája érvényes.' },
      { _key: k(), question: 'Minden klíma márkát javítanak?', answer: 'Igen, szervizeljük az összes elterjedt klíma márkát: Samsung, LG, Mitsubishi, Panasonic, Gree, Midea, Fisher, Fujitsu, Toshiba, Daikin és más márkákat is.' },
    ],
  },
  {
    _id: 'servicePage-klima-tisztitas',
    slug: 'klima-tisztitas',
    title: 'Klíma Tisztítás és Karbantartás Budapest',
    subtitle: 'Éves klíma karbantartással meghosszabbítja készüléke élettartamát, csökkenti energiafogyasztását és egészségesebb levegőt biztosít otthonában.',
    heroIcon: '✨',
    photo1: { src: '/images/juhasz-balazs/jb-belso-egyseg-szerviz.jpeg', alt: 'Juhász Balázs beltéri klíma szűrő tisztítása – Klímaépítő.hu karbantartás Budapest' },
    photo2: { src: '/images/juhasz-balazs/jb-belso-egyseg-telepites-mosoly.jpeg', alt: 'Juhász Balázs beltéri klíma egység szerelése – Klímaépítő.hu Budapest' },
    photoSectionLabel: 'Alapos, precíz munka',
    photoSectionTitle: 'Beltéri és kültéri tisztítás egy látogatással',
    photoSectionText: 'Szűrő, evaporátor, kondenzátor, kondenzvíz elvezető – mindent átvizsgálunk és megtisztítunk. Hatékonyabb hűtés, kisebb villanyszámla.',
    body: [
      h2('Mit Tartalmaz a Klíma Karbantartás?'),
      li(span('Beltéri szűrők tisztítása vagy cseréje')),
      li(span('Beltéri hőcserélő (evaporátor) mosása')),
      li(span('Kültéri kondenzátor egység tisztítása')),
      li(span('Kondenzvíz elvezető cső ellenőrzése és átmosása')),
      li(span('Elektromos kapcsolatok ellenőrzése')),
      li(span('Hűtőközeg nyomás ellenőrzése')),
      li(span('Működési tesztek elvégzése')),
      h2('Mélytisztítás + Fertőtlenítés'),
      p('Prémium szolgáltatásunkban professzionális tisztítószerekkel és nagynyomású mosóval eltávolítjuk az összes szennyeződést, baktériumot, gombát és penészt. A karbantartás után a klíma olyan hatékonyan és higiénikusan üzemel, mint az új korában.'),
      h2('Mikor Érdemes Karbantartást Végeztetni?'),
      p('A legoptimálisabb időpontok:'),
      liS('Tavasszal (március–április): ', 'Nyári szezon előtt – optimális hűtési teljesítmény garantálva'),
      liS('Ősszel (szeptember–október): ', 'Fűtési szezon előtt – hatékony téli fűtés biztosítva'),
    ],
    priceItems: [
      { _key: k(), service: 'Split klíma karbantartás', description: 'Szűrő tisztítás, hőcserélő mosás, rendszer ellenőrzés', price: '15.000', note: 'Beltéri egység' },
      { _key: k(), service: 'Split klíma + kültéri karbantartás', description: 'Teljes körű karbantartás, mindkét egység', price: '25.000', note: 'Teljes rendszer', highlight: true },
      { _key: k(), service: 'Mélytisztítás + fertőtlenítés', description: 'Professzionális tisztítás baktérium- és gombamentesítéssel', price: '30.000', note: 'Teljes rendszer' },
      { _key: k(), service: 'Multi-split karbantartás (2 beltéri)', description: '2 beltéri + 1 kültéri egység karbantartása', price: '38.000', note: 'Munkadíj' },
      { _key: k(), service: 'Kondenzvíz elvezető tisztítás', description: 'Csővezeték átmosás, lerakódás eltávolítása', price: '5.000', note: 'Munkadíj' },
    ],
    faqs: [
      { _key: k(), question: 'Milyen gyakran kell klímát karbantartani?', answer: 'Évenként egyszer ajánlott, lehetőleg a hűtési szezon előtt (tavasszal) vagy után.' },
      { _key: k(), question: 'Mi történik, ha nem tartom karban a klímát?', answer: 'Eltömödnek a szűrők, csökken a hatékonyság (akár 30%-kal), nő az energiafogyasztás, baktériumok és gombák szaporodhatnak el.' },
      { _key: k(), question: 'Mennyi ideig tart a karbantartás?', answer: 'Egy split klíma karbantartása 1–2 óra alatt elvégezhető. Mélytisztítással és fertőtlenítéssel együtt 2–3 órát vesz igénybe.' },
      { _key: k(), question: 'Egészséges-e a be nem tartott klíma?', answer: 'Nem. A piszkos klíma szűrőkben baktériumok, gombák és poratka tartózkodhatnak, amelyeket a klíma a levegőbe juttat.' },
    ],
  },
  {
    _id: 'servicePage-futes-klimaval',
    slug: 'futes-klimaval',
    title: 'Fűtés Klímával Budapest',
    subtitle: 'A modern inverteres klíma nem csak hűt – hőszivattyúként is funkcionál. 3-4x hatékonyabb, mint az elektromos fűtés, és akár -15°C külső hőmérsékleten is garantált teljesítménnyel fűt.',
    heroIcon: '🌡️',
    photo1: { src: '/images/juhasz-balazs/jb-vacuum-pumpa-bekoltes.jpeg', alt: 'Klíma hűtőkör bekötése vákuumszivattyúval – Klímaépítő.hu fűtés klímával Budapest' },
    photo2: { src: '/images/juhasz-balazs/jb-gree-pozicionalas-hatul.jpeg', alt: 'Kültéri klíma egység konzolra szerelése – Klímaépítő.hu Budapest' },
    photoSectionLabel: 'Hőszivattyú specialista',
    photoSectionTitle: 'Inverteres fűtés – profi bekötéssel',
    photoSectionText: 'A hűtőkör tökéletes bekötése kulcs a hatékony fűtési teljesítményhez. Vákuumolás, nyomáspróba, hűtőközeg töltés – mind a szabályok szerint.',
    body: [
      h2('Hogyan Fűt a Klíma? – A Hőszivattyú Elve'),
      p('Az inverteres klímaberendezés egy megfordítható hőszivattyú. Hűtési módban a helyiségből elvont hőt a kültéri levegőbe adja. Fűtési módban megfordítja a folyamatot: a kültéri levegőből nyeri ki a hőt (még -15°C-on is van hő a levegőben!), és azt a belső térbe juttatja.'),
      h2('Hatékonysági Előnyök'),
      liS('3-4x hatékonyabb, ', 'mint az elektromos fűtés'),
      liS('COP értéke 3.0–4.5: ', '1 kWh elektromosságból 3–4.5 kWh hő'),
      liS('Akár -15°C-ig ', 'garantált fűtési teljesítmény'),
      liS('Nyáron hűt, ', 'télen fűt – két funkcióban egy eszköz'),
      h2('Ajánlott Klíma Márkák Fűtési Célra'),
      liS('Daikin Perfera / Stylish: ', 'Kiemelkedő alacsony hőmérsékletű teljesítmény'),
      liS('Fujitsu KE sorozat: ', '-25°C-ig garantált fűtési teljesítmény'),
      liS('Toshiba Haori / Shorai Edge: ', 'Intelligens fűtési algoritmus'),
      liS('Fisher: ', 'Kiváló ár-érték arányú fűtési klíma'),
      h2('Mekkora Klíma Szükséges a Fűtéshez?'),
      p('Általános szabály: 50 W/m³ szükséges jól szigetelt épületnél, 70–100 W/m³ régi, szigeteletlen épületnél. Pontosabb méretezéshez használja ingyenes klíma méretező kalkulátorunkat.'),
    ],
    priceItems: [],
    faqs: [
      { _key: k(), question: 'Mennyire hatékony a klíma fűtési módban?', answer: 'A modern inverteres klíma COP értéke 3.0–4.5, ami azt jelenti, hogy 1 kWh elektromos energiából 3–4.5 kWh hőt állít elő. A klíma 3–4-szer hatékonyabb az elektromos fűtésnél.' },
      { _key: k(), question: 'Milyen hidegig fűt a klíma?', answer: 'A modern inverteres klímák -15°C-ig, egyes modellek (pl. Daikin Ururu Sarara) -25°C-ig is hatékonyan fűtenek. Budapest éghajlatán ez több mint elegendő.' },
      { _key: k(), question: 'Megéri-e klímával fűteni gáz helyett?', answer: 'Ez az aktuális energiaáraktól függ. Jelenlegi magyarországi árak mellett a klíma fűtés általában olcsóbb vagy hasonló költségű, mint a gáz.' },
      { _key: k(), question: 'Kell-e külön fűtésre engedélyezett klíma?', answer: 'Nem. Minden modern inverteres split klíma egyszerre képes hűteni és fűteni – ez a hőszivattyú funkció. Speciális engedély nem szükséges.' },
    ],
  },
];

// ─── FELTÖLTÉS ───────────────────────────────────────────────────────────────
async function seed() {
  const docs = [
    { label: 'Főoldal', doc: homepageDoc },
    { label: 'Rólunk', doc: rolunkDoc },
    ...servicePages.map((sp) => ({
      label: `Szolgáltatás: ${sp.title}`,
      doc: {
        _type: 'servicePage',
        _id: sp._id,
        slug: { _type: 'slug', current: sp.slug },
        title: sp.title,
        subtitle: sp.subtitle,
        heroIcon: sp.heroIcon,
        photo1: sp.photo1,
        photo2: sp.photo2,
        photoSectionLabel: sp.photoSectionLabel,
        photoSectionTitle: sp.photoSectionTitle,
        photoSectionText: sp.photoSectionText,
        body: sp.body,
        priceItems: sp.priceItems,
        faqs: sp.faqs,
      },
    })),
  ];

  console.log(`\n${docs.length} dokumentum feltöltése...\n`);
  for (const { label, doc } of docs) {
    try {
      await client.createOrReplace(doc);
      console.log(`✓ ${label}`);
    } catch (err) {
      console.error(`✗ ${label}: ${err.message}`);
    }
  }
  console.log('\n✅ Kész! Minden tartalom elérhető a Sanity Stúdióban.');
}

seed();
