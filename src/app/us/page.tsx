import { getSiteSettings } from '@/lib/siteSettings';
import { getProductsWithOverrides } from '@/lib/products';
import { getSlottedImages, DEFAULT_SLOTS } from '@/lib/imageSlots';
import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const usTitle = settings.geo.us?.hero?.title || `${settings.seo.title} - US Market`;
  const usDesc = settings.geo.us?.hero?.description || settings.seo.description;
  return {
    title: usTitle,
    description: usDesc,
    keywords: settings.seo.keywords,
  };
}

export default async function USPage() {
  const settings = await getSiteSettings();
  const products = await getProductsWithOverrides();
  const slotKeys = Object.keys(DEFAULT_SLOTS);
  const resolvedUrls = await getSlottedImages(slotKeys);

  const heroConfig = {
    ...settings.hero,
    ...settings.geo.us?.hero,
  };

  return (
    <LandingPageTemplate 
      heroConfig={heroConfig}
      products={products}
      resolvedUrls={resolvedUrls}
    />
  );
}
