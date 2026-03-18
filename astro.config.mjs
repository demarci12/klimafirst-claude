import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'http://localhost:4321',
  output: 'static',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        if (!item || !item.url) return item;
        // Homepage – matches e.g. http://localhost:4321/ or https://klimafirst.hu/
        const urlObj = new URL(item.url);
        if (urlObj.pathname === '/') {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        // Service & pricing pages
        if (item.url.includes('/szolgaltatasok/') || item.url.includes('/arak') || item.url.includes('/keszulekek')) {
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
    icon({
      include: {
        heroicons: ['*'],
        lucide: ['*'],
      },
    }),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
