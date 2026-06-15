import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Vanguard from './Vanguard';
import FluidHub from './FluidHub';
import ProductCenter from './ProductCenter';
import Heritage from './Heritage';
import FAQ from './FAQ';
import Certifications from './Certifications';
import LogisticsShowcase from './LogisticsShowcase';
import Services from './Services';
import ContactForm from './ContactForm';
import Footer from './Footer';
import WhatsAppWidget from './WhatsAppWidget';
import { SiteSettingsData } from '@/lib/siteSettingsTypes';
import { ProductCategory } from '@/lib/productsData';

interface LandingPageTemplateProps {
  heroConfig?: Partial<{
    title: string;
    highlightText: string;
    description: string;
    btnPrimaryText: string;
    btnPrimaryLink: string;
    btnSecondaryText: string;
    btnSecondaryLink: string;
  }>;
  settings?: SiteSettingsData;
  products: ProductCategory[];
  resolvedUrls?: Record<string, string>;
  geoCode?: string;
}

export const LandingPageTemplate: React.FC<LandingPageTemplateProps> = ({
  heroConfig,
  settings,
  products,
  resolvedUrls,
}) => {
  const effectiveHero = {
    title: heroConfig?.title || settings?.hero?.title || 'Zhixin Paper: Custom Roll Label Manufacturer & Global Supply Partner',
    highlightText: heroConfig?.highlightText || settings?.hero?.highlightText || 'Custom Roll Label',
    description: heroConfig?.description || settings?.hero?.description || 'Direct factory supplier since 2009. We engineer high-tensile glassine liners for zero-downtime automatic labeling and premium gold foil finishes for luxury brands. Serving partners in 80+ countries with 100% confidential support.',
    btnPrimaryText: heroConfig?.btnPrimaryText || settings?.hero?.btnPrimaryText || 'Request Free Samples',
    btnPrimaryLink: heroConfig?.btnPrimaryLink || settings?.hero?.btnPrimaryLink || '#contact',
    btnSecondaryText: heroConfig?.btnSecondaryText || settings?.hero?.btnSecondaryText || 'Explore Products',
    btnSecondaryLink: heroConfig?.btnSecondaryLink || settings?.hero?.btnSecondaryLink || '#products',
  };

  return (
    <div id="home">
      <Header resolvedUrls={resolvedUrls} />
      <main id="main-content" role="main">
        <Hero heroConfig={effectiveHero} resolvedUrls={resolvedUrls} />
        <Vanguard resolvedUrls={resolvedUrls} />
        <FluidHub resolvedUrls={resolvedUrls} />
        <ProductCenter products={products} resolvedUrls={resolvedUrls} />
        <Heritage />
        <FAQ />
        <Certifications resolvedUrls={resolvedUrls} />
        <LogisticsShowcase resolvedUrls={resolvedUrls} />
        <Services />
        <ContactForm />
      </main>
      <Footer resolvedUrls={resolvedUrls} />
      <WhatsAppWidget />
    </div>
  );
};

export default LandingPageTemplate;

