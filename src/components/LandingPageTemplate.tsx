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

export interface LandingPageTemplateProps {
  settings: SiteSettingsData;
  products: ProductCategory[];
  resolvedUrls: Record<string, string>;
  geoCode?: 'us' | 'ca' | 'eu';
  industrySlug?: string;
}

export const LandingPageTemplate: React.FC<LandingPageTemplateProps> = ({
  settings,
  products,
  resolvedUrls,
  geoCode,
  industrySlug,
}) => {
  // Merge GEO overrides if applicable
  const heroConfig = {
    ...settings.hero,
    ...(geoCode ? settings.geo[geoCode]?.hero : {}),
  };

  // Merge Industry Overrides if applicable
  if (industrySlug) {
    const formattedIndustry = industrySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    heroConfig.title = `High-Performance ${formattedIndustry} Labels & Customized Roll Solutions`;
    heroConfig.highlightText = `${formattedIndustry} Labels`;
    heroConfig.description = `Direct factory manufacturer supplying high-tensile glassine liners and food/medical-grade adhesives optimized for ${formattedIndustry} packaging machinery. 100% FDA compliant with global logistics stability.`;
  }

  return (
    <div id="home">
      <Header resolvedUrls={resolvedUrls} />
      <main id="main-content" role="main">
        <Hero heroConfig={heroConfig} resolvedUrls={resolvedUrls} />
        <Suspense fallback={null}>
          <Vanguard resolvedUrls={resolvedUrls} />
          <FluidHub resolvedUrls={resolvedUrls} />
          <ProductCenter products={products} resolvedUrls={resolvedUrls} />
          <Heritage />
          <FAQ />
          <Certifications resolvedUrls={resolvedUrls} />
          <LogisticsShowcase resolvedUrls={resolvedUrls} />
          <Services />
          <ContactForm />
        </Suspense>
      </main>
      <Footer resolvedUrls={resolvedUrls} />
      <WhatsAppWidget />
    </div>
  );
};

export default LandingPageTemplate;
dUrls} />
      <WhatsAppWidget />
    </div>
  );
};

export default LandingPageTemplate;
