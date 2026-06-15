import { getSiteSettings } from '@/lib/siteSettings';
import { getProductsWithOverrides } from '@/lib/products';
import { getSlottedImages, DEFAULT_SLOTS } from '@/lib/imageSlots';
import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const caTitle = settings.geo.ca?.hero?.title || `${settings.seo.title} - Canada Market`;
  const caDesc = settings.geo.ca?.hero?.description || settings.seo.description;
  return {
    title: caTitle,
    description: caDesc,
    keywords: settings.seo.keywords,
  };
}

export default async function CAPage() {
  const settings = await getSiteSettings();
  const products = await getProductsWithOverrides();
  const slotKeys = Object.keys(DEFAULT_SLOTS);
  const resolvedUrls = await getSlottedImages(slotKeys);

  return (
    <LandingPageTemplate 
      settings={settings}
      products={products}
      resolvedUrls={resolvedUrls}
    />
  );
}
