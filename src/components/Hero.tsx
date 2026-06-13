'use client';

import React from 'react';
import { DEFAULT_SLOTS } from '@/lib/imageSlotsData';
import { HeroConfig } from '@/lib/siteSettingsTypes';

interface HeroProps {
  heroConfig?: HeroConfig;
  resolvedUrls?: Record<string, string>;
}

export const Hero: React.FC<HeroProps> = ({ heroConfig, resolvedUrls }) => {
  const bgUrl = resolvedUrls?.['hero_bg'] || DEFAULT_SLOTS['hero_bg'];

  const title = heroConfig?.title || "Zhixin Paper: Custom Roll Label Manufacturer & Global Supply Partner";
  const highlight = heroConfig?.highlightText || "Custom Roll Label";
  const description = heroConfig?.description || "Direct factory supplier since 2009. We engineer high-tensile glassine liners for zero-downtime automatic labeling and premium gold foil finishes for luxury brands. Serving partners in 80+ countries with 100% confidential support.";
  const btnPrimaryText = heroConfig?.btnPrimaryText || "Request Free Samples";
  const btnPrimaryLink = heroConfig?.btnPrimaryLink || "#contact";
  const btnSecondaryText = heroConfig?.btnSecondaryText || "Explore Products";
  const btnSecondaryLink = heroConfig?.btnSecondaryLink || "#products";

  const renderTitle = (fullTitle: string, highlightText: string) => {
    if (!highlightText || !fullTitle.toLowerCase().includes(highlightText.toLowerCase())) {
      return <h1>{fullTitle}</h1>;
    }
    const idx = fullTitle.toLowerCase().indexOf(highlightText.toLowerCase());
    const before = fullTitle.substring(0, idx);
    const matched = fullTitle.substring(idx, idx + highlightText.length);
    const after = fullTitle.substring(idx + highlightText.length);
    return (
      <h1>
        {before}<span>{matched}</span>{after}
      </h1>
    );
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --zx-primary: #007d85;
          --zx-accent: #00e5ff;
          --zx-dark: #1a2a3a;
          --zx-white: #ffffff;
        }

        .hero-fixed-v2 {
          display: block !important; 
          position: relative;
          width: 100%;
          min-height: 100vh;
          background-color: #1a2a3a; 
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% auto; 
          
          display: flex;
          align-items: center;
          justify-content: flex-start; 
          padding: 80px 7%; 
          box-sizing: border-box;
          overflow: hidden;
        }

        @media (min-width: 1024px) {
          .hero-fixed-v2 {
            background-size: cover;
          }
        }

        .hero-fixed-v2::after {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(
            110deg, 
            rgba(26, 42, 58, 0.96) 0%, 
            rgba(26, 42, 58, 0.8) 45%, 
            rgba(26, 42, 58, 0.5) 100%
          );
          z-index: 1;
        }
        
        .hero-container-v2 {
          position: relative;
          z-index: 10;
          max-width: 800px; 
          text-align: left;
          color: #ffffff !important;
        }

        .hero-container-v2 h1 {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: clamp(34px, 5.5vw, 62px);
          font-weight: 900;
          line-height: 1.05;
          margin-bottom: 25px;
          text-transform: uppercase;
          letter-spacing: -1px;
          color: #ffffff !important;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .hero-container-v2 h1 span { 
          color: var(--zx-accent) !important; 
          text-shadow: 0 0 30px rgba(0, 229, 255, 0.4); 
        }

        .hero-container-v2 p {
          font-size: clamp(16px, 1.6vw, 19px);
          line-height: 1.8;
          margin-bottom: 45px;
          color: #ffffff !important;
          font-weight: 500;
        }
        .hero-container-v2 p b { color: #ffffff !important; border-bottom: 2px solid var(--zx-primary); }

          .tech-pills-wrap-v2 {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 15px;
            margin-bottom: 50px;
          }


        .pill-item-v2 {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          padding: 10px 22px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          backdrop-filter: blur(5px);
          color: #ffffff !important;
        }
        .pill-item-v2 i { color: var(--zx-accent) !important; font-style: normal; font-weight: 900; }

        .btn-group-v2 { display: flex; gap: 20px; }
        .btn-action-v2 {
          padding: 18px 45px;
          font-size: 15px;
          font-weight: 900;
          text-transform: uppercase;
          border-radius: 4px;
          text-decoration: none;
          transition: 0.4s;
          min-width: 220px;
          text-align: center;
        }

        .btn-action-v2:focus { outline: 3px solid var(--zx-accent); outline-offset: 4px; }

        .btn-solid-v2 { 
          background: var(--zx-primary) !important; 
          color: #fff !important; 
          box-shadow: 0 10px 25px rgba(0, 155, 164, 0.3); 
        }
        .btn-outline-v2 { border: 2px solid #fff !important; color: #fff !important; }
        .btn-outline-v2:hover { background: #fff !important; color: var(--zx-dark) !important; }

        @media (max-width: 768px) {
          .hero-fixed-v2 { 
            justify-content: center; 
            padding: 100px 20px 60px; 
            min-height: auto; 
            min-height: 100svh; 
            background-size: cover; 
            background-position: center center;
          }
          .hero-container-v2 { text-align: center; }
          .tech-pills-wrap-v2 { grid-template-columns: repeat(2, minmax(0, 1fr)); justify-content: center; }
          .pill-item-v2 { white-space: normal; min-height: 58px; }
          .btn-group-v2 { flex-direction: column; align-items: center; }
          .btn-action-v2 { width: 100%; max-width: 360px; }
        }
      ` }} />

      <section 
        className="hero-fixed-v2" 
        role="banner" 
        aria-label="Zhixin Paper Hero Banner"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      >
        <div className="hero-container-v2">
          {renderTitle(title, highlight)}
          
          <p dangerouslySetInnerHTML={{ __html: description.replace(/since 2009/g, '<b>since 2009</b>').replace(/high-tensile glassine liners/g, '<b>high-tensile glassine liners</b>').replace(/zero-downtime automatic labeling/g, '<b>zero-downtime automatic labeling</b>').replace(/80\+ countries/g, '<b>80+ countries</b>') }} />

          <div className="tech-pills-wrap-v2" role="list" aria-label="Our factory features">
            <div className="pill-item-v2" role="listitem"><i aria-hidden="true">✓</i> 15+ Years Expertise</div>
            <div className="pill-item-v2" role="listitem"><i aria-hidden="true">✓</i> High-Speed Compatibility</div>
            <div className="pill-item-v2" role="listitem"><i aria-hidden="true">✓</i> FDA & FSC Certified</div>
            <div className="pill-item-v2" role="listitem"><i aria-hidden="true">✓</i> Factory Direct Pricing</div>
          </div>

          <div className="btn-group-v2">
            <a href={btnPrimaryLink} className="btn-action-v2 btn-solid-v2" aria-label="Contact us for free label samples">{btnPrimaryText}</a>
            <a href={btnSecondaryLink} className="btn-action-v2 btn-outline-v2" aria-label="View our product categories">{btnSecondaryText}</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
