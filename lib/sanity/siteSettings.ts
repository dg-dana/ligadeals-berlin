import { client } from '@/sanity/sanity.client';
import { getSiteSettingsQuery } from '@/lib/sanity/queries';

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
}

// Used until real contact details are entered in Sanity Studio (siteSettings document).
const FALLBACK_SITE_SETTINGS: SiteSettings = {
  email: 'info@ligadeals-berlin.com',
  phone: '+49 30 1234 5678',
  whatsapp: '491234567890',
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
