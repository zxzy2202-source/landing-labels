import { getSiteSettings } from '@/lib/siteSettings';
import { getProductsWithOverrides } from '@/lib/products';
import { getSlottedImages, DEFAULT_SLOTS } from '@/lib/imageSlots';
import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const settings = await getSiteSettings();
  const formattedIndustry = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `Custom ${formattedIndustry} Jars & Roll Labels | Zhixin Paper`,
    description: `Leading custom ${formattedIndustry} labels manufacturer. FDA and FSC-certified materials designed for zero-downtime high-speed labeling machinery since 2009.`,
    keywords: `${slug} labels, custom ${slug} rolls, label manufacturer, China factory`,
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const settings = await getSiteSettings();
  const products = await getProductsWithOverrides();
  const slotKeys = Object.keys(DEFAULT_SLOTS);
  const resolvedUrls = await getSlottedImages(slotKeys);

  return (
    <LandingPageTemplate 
      settings={settings}
      products={products}
      resolvedUrls={resolvedUrls}
      industrySlug={slug}
    />
  );
}
export const dynamicParams = true;
