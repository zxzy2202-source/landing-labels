import { unstable_noStore as noStore } from 'next/cache';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { DEFAULT_SITE_SETTINGS, SiteSettingsData } from './siteSettingsTypes';

export async function getSiteSettings(): Promise<SiteSettingsData> {
  noStore();
  try {
    const result = await db
      .select({
        value: siteSettings.value,
      })
      .from(siteSettings)
      .where(eq(siteSettings.key, 'config'))
      .limit(1);

    if (result.length > 0 && result[0].value) {
      const parsed = JSON.parse(result[0].value);
      return {
        ...DEFAULT_SITE_SETTINGS,
        ...parsed,
        seo: { ...DEFAULT_SITE_SETTINGS.seo, ...parsed.seo },
        hero: { ...DEFAULT_SITE_SETTINGS.hero, ...parsed.hero },
        geo: { ...DEFAULT_SITE_SETTINGS.geo, ...parsed.geo },
        contact: { ...DEFAULT_SITE_SETTINGS.contact, ...parsed.contact },
      };
    }

    // Auto-initialize settings in DB on first run
    await db
      .insert(siteSettings)
      .values({
        key: 'config',
        value: JSON.stringify(DEFAULT_SITE_SETTINGS),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: {
          value: JSON.stringify(DEFAULT_SITE_SETTINGS),
          updatedAt: new Date(),
        },
      });
  } catch (error) {
    console.error('Error reading/initializing site settings:', error);
  }
  return DEFAULT_SITE_SETTINGS;
}
