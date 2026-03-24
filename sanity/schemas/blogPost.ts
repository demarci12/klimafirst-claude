import { defineType, defineField } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Bejegyzés (Tudástár)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Cím', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'description', title: 'Meta leírás', type: 'text', rows: 2, validation: (R) => R.required().max(160) }),
    defineField({ name: 'pubDate', title: 'Publikálás dátuma', type: 'date', validation: (R) => R.required() }),
    defineField({ name: 'updatedDate', title: 'Frissítés dátuma', type: 'date' }),
    defineField({ name: 'author', title: 'Szerző', type: 'string', initialValue: 'Juhász Balázs' }),
    defineField({ name: 'tags', title: 'Tagek', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'image', title: 'Kép URL', type: 'string' }),
    defineField({ name: 'imageAlt', title: 'Kép alt szöveg', type: 'string' }),
    defineField({ name: 'keywords', title: 'SEO kulcsszavak', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'body', title: 'Tartalom', type: 'blockContent' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'pubDate' },
  },
});
