import { getSiteSettings } from '@/lib/siteSettings';
import { getProductsWithOverrides } from '@/lib/products';
import { getSlottedImages, DEFAULT_SLOTS } from '@/lib/imageSlots';
import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.seo.title,
    description: settings.seo.description,
    keywords: settings.seo.keywords,
  };
}

export default async function HomePage() {
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
