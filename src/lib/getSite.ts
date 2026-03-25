import { getSiteConfig } from './queries';
import { SITE as FALLBACK } from '../data/site';

export async function getSite() {
  try {
    const cfg = await getSiteConfig();
    if (!cfg) return FALLBACK;
    return {
      ...FALLBACK,
      name: cfg.name ?? FALLBACK.name,
      legalName: cfg.legalName ?? FALLBACK.legalName,
      tagline: cfg.tagline ?? FALLBACK.tagline,
      phone: cfg.phone ?? FALLBACK.phone,
      phoneTel: cfg.phoneTel ?? FALLBACK.phoneTel,
      email: cfg.email ?? FALLBACK.email,
      owner: cfg.owner ?? FALLBACK.owner,
      description: cfg.description ?? FALLBACK.description,
      social: { facebook: cfg.facebookUrl ?? FALLBACK.social.facebook },
      stats: {
        references: cfg.stats?.references ?? cfg.statsReferences ?? FALLBACK.stats.references,
        experience: cfg.stats?.experience ?? cfg.statsExperience ?? FALLBACK.stats.experience,
        warranty: cfg.stats?.warranty ?? cfg.statsWarranty ?? FALLBACK.stats.warranty,
        districts: cfg.stats?.districts ?? cfg.statsDistricts ?? FALLBACK.stats.districts,
      },
    };
  } catch {
    return FALLBACK;
  }
}
