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
