export interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
}

export interface HeroConfig {
  title: string;
  highlightText: string;
  description: string;
  btnPrimaryText: string;
  btnPrimaryLink: string;
  btnSecondaryText: string;
  btnSecondaryLink: string;
}

export interface SiteSettingsData {
  seo: SeoConfig;
  hero: HeroConfig;
  geo: Record<string, { hero: Partial<HeroConfig> }>;
  contact: {
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
    formspreeId: string;
  };
}

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  seo: {
    title: "Zhixin Paper | Custom Roll Label Manufacturer & High-Speed Packaging",
    description: "Leading custom label manufacturer since 2009. Specialized in high-tensile glassine liners for automatic machines, FDA-compliant jar stickers, and 100% blind dropshipping for global partners.",
    keywords: "custom labels, thermal paper, jar stickers, label manufacturer, China factory, blind dropshipping"
  },
  hero: {
    title: "Zhixin Paper: Custom Roll Label Manufacturer & Global Supply Partner",
    highlightText: "Custom Roll Label",
    description: "Direct factory supplier since 2009. We engineer high-tensile glassine liners for zero-downtime automatic labeling and premium gold foil finishes for luxury brands. Serving partners in 80+ countries with 100% confidential support.",
    btnPrimaryText: "Request Free Samples",
    btnPrimaryLink: "#contact",
    btnSecondaryText: "Explore Products",
    btnSecondaryLink: "#products"
  },
  geo: {
    us: {
      hero: {
        title: "Zhixin Paper USA: Premium Roll Label Supply for the American Market",
        description: "Specialized direct factory solutions for North American packaging giants. Direct fast shipping, full FDA compliance, and complete customs clearance support since 2009."
      }
    },
    ca: {
      hero: {
        title: "Zhixin Paper Canada: Industrial Grade Thermal Labels & Stickers",
        description: "Delivering heavy-duty cold-storage freezer labels and custom industrial stickers across Canada. Eco-friendly FSC materials with factory-direct bulk savings."
      }
    },
    eu: {
      hero: {
        title: "Zhixin Paper Europe: High-Stability Roll Labels & REACH Compliance",
        description: "Leading European partner for REACH/RoHS-compliant custom label manufacturing. Certified FSC-paper stocks with zero-tariff customs routing options."
      }
    }
  },
  contact: {
    address: "Building 15, Ronghao Industrial Park, Gaoling District, Xi'an, China",
    phone: "+86 180 9211 7618",
    email: "Sales@zxpapers.com",
    whatsapp: "+8618092117618",
    formspreeId: "xjgdgayb"
  }
};
