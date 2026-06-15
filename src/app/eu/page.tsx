import { getSiteSettings } from '@/lib/siteSettings';
import { getProductsWithOverrides } from '@/lib/products';
import { getSlottedImages, DEFAULT_SLOTS } from '@/lib/imageSlots';
import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const euTitle = settings.geo.eu?.hero?.title || `${settings.seo.title} - European Market`;
  const euDesc = settings.geo.eu?.hero?.description || settings.seo.description;
  return {
    title: euTitle,
    description: euDesc,
    keywords: settings.seo.keywords,
  };
}

export default async function EUPage() {
  const settings = await getSiteSettings();
  const products = await getProductsWithOverrides();
  const slotKeys = Object.keys(DEFAULT_SLOTS);
  const resolvedUrls = await getSlottedImages(slotKeys);

  const heroConfig = {
    ...settings.hero,
    ...settings.geo.eu?.hero,
  };

  return (
    <LandingPageTemplate 
      heroConfig={heroConfig}
      products={products}
      resolvedUrls={resolvedUrls}
    />
  );
}
