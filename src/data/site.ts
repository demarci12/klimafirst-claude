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
    { name: 'Gree', slug: 'gree-klima', tagline: 'Lakossági és kereskedelmi megoldások' },
    { name: 'Midea', slug: 'midea-klima', tagline: 'Multisplit specialista' },
    { name: 'Daikin', slug: 'daikin-klima', tagline: 'Globális piacvezető' },
    { name: 'Syen', slug: 'syen-klima', tagline: 'Teljes lakossági paletta' },
    { name: 'Fisher', slug: 'fisher-klima', tagline: 'Megbízható és megfizethető' },
    { name: 'Toshiba', slug: 'toshiba-klima', tagline: 'Japán prémium minőség' },
    { name: 'Fujitsu', slug: 'fujitsu-klima', tagline: 'Kiemelkedően halk működés' },
    { name: 'LG', slug: 'lg-klima', tagline: 'Dual Inverter technológia' },
    { name: 'Samsung', slug: 'samsung-klima', tagline: 'WindFree™ technológia' },
    { name: 'Panasonic', slug: 'panasonic-klima', tagline: 'nanoe™ X légtisztítás' },
    { name: 'Mitsubishi Electric', slug: 'mitsubishi-electric-klima', tagline: 'Csúcskategóriás japán prémium' },
    { name: 'Polar', slug: 'polar-klima', tagline: 'Kiváló ár-érték arány' },
  ],
};
