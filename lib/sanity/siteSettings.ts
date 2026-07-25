import { client } from '@/sanity/sanity.client';
import { getSiteSettingsQuery } from '@/lib/sanity/queries';
import type { PortableTextBlock } from '@portabletext/react';
import type { SanityImage } from '@/lib/sanity/types';

export interface SiteSettings {
  siteName?: string;
  description?: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  aboutText?: PortableTextBlock[];
  aboutImage?: SanityImage;
}

// Fallback used only if the Sanity fetch fails. These mirror the real published
// siteSettings document (the source of truth) so a fetch error can never surface
// placeholder/example contact data on the production site.
const FALLBACK_SITE_SETTINGS: SiteSettings = {
  email: 'info@ligadeals-berlin.com',
  phone: '+49 177 7258599',
  whatsapp: '491777258599',
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const settings = await client.fetch<Partial<SiteSettings> | null>(
      getSiteSettingsQuery,
      {},
      { next: { revalidate: 3600 } }
    );
    return { ...FALLBACK_SITE_SETTINGS, ...settings };
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return FALLBACK_SITE_SETTINGS;
  }
}
