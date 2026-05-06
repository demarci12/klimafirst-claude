import siteConfig from '../data/site-config.json';
import homepageJson from '../data/homepage.json';
import rolunkJson from '../data/rolunk.json';
import pricingJson from '../data/pricing.json';
import referenciakJson from '../data/referenciak.json';

export async function getSiteConfig() {
  return siteConfig;
}

export async function getHomepage() {
  return homepageJson;
}

export async function getRolunk() {
  return rolunkJson;
}

export async function getReferenciak() {
  return referenciakJson;
}

export async function getPricing() {
  return pricingJson;
}

export async function getBlogPosts() {
  return [];
}

export async function getBlogPostBySlug(slug: string) {
  return null;
}

export async function getServicePage(slugStr: string) {
  return null;
}

export async function getBrandPage(slugStr: string) {
  return null;
}

export async function getBrandPages() {
  return [];
}
