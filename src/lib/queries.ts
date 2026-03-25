import { sanityClient } from './sanity';

export async function getSiteConfig() {
  return sanityClient.fetch(`*[_type == "siteConfig" && _id == "siteConfig"][0]`);
}

export async function getHomepage() {
  return sanityClient.fetch(`*[_type == "homepage" && _id == "homepage"][0]`);
}

export async function getRolunk() {
  return sanityClient.fetch(`*[_type == "rolunk" && _id == "rolunk"][0]`);
}

export async function getReferenciak() {
  return sanityClient.fetch(`*[_type == "referenciak" && _id == "referenciak"][0]`);
}

export async function getPricing() {
  return sanityClient.fetch(`*[_type == "pricing" && _id == "pricing"][0]`);
}

export async function getBlogPosts() {
  return sanityClient.fetch(
    `*[_type == "blogPost"] | order(pubDate desc) { title, slug, description, pubDate, updatedDate, author, tags, image, imageAlt, keywords }`
  );
}

export async function getBlogPostBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getServicePage(slugStr: string) {
  return sanityClient.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]`,
    { slug: slugStr }
  );
}

export async function getBrandPage(slugStr: string) {
  return sanityClient.fetch(
    `*[_type == "brandPage" && slug.current == $slug][0]`,
    { slug: slugStr }
  );
}

export async function getBrandPages() {
  return sanityClient.fetch(
    `*[_type == "brandPage"] | order(_createdAt asc) { name, slug, description, pros, priceRange, icon, logoUrl }`
  );
}
