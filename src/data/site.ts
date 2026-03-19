import siteConfig from './site-config.json';

export const SITE = {
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  tagline: siteConfig.tagline,
  phone: siteConfig.phone,
  phoneTel: siteConfig.phoneTel,
  email: siteConfig.email,
  owner: siteConfig.owner,
  description: siteConfig.description,
  address: {
    streetAddress: 'Budapest',
    addressLocality: 'Budapest',
    postalCode: '1000',
    addressCountry: 'HU',
  },
  geo: {
    region: 'HU-BU',
    placename: 'Budapest',
    position: '47.4979;19.0402',
    icbm: '47.4979, 19.0402',
  },
  social: {
    facebook: siteConfig.facebookUrl,
  },
  stats: siteConfig.stats,
  services: [
    { name: 'Klíma Telepítés', slug: 'klima-telepites', icon: 'tools' },
    { name: 'Klíma Javítás', slug: 'klima-javitas', icon: 'wrench' },
    { name: 'Klíma Tisztítás', slug: 'klima-tisztitas', icon: 'sparkles' },
    { name: 'Fűtés Klímával', slug: 'futes-klimaval', icon: 'fire' },
  ],
  brands: [
    { name: 'Fisher', slug: 'fisher-klima', tagline: 'Megbízható és megfizethető' },
    { name: 'Fujitsu', slug: 'fujitsu-klima', tagline: 'Japán minőség' },
    { name: 'Toshiba', slug: 'toshiba-klima', tagline: 'Prémium technológia' },
    { name: 'Daikin', slug: 'daikin-klima', tagline: 'Globális piacvezető' },
  ],
};
