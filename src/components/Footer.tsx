'use client';

import React from 'react';
import SlotImage from './SlotImage';

interface FooterProps {
  resolvedUrls?: Record<string, string>;
}

export const Footer: React.FC<FooterProps> = ({ resolvedUrls }) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --zx-primary: #007d85;
          --zx-accent: #00e5ff;
          --zx-footer-bg: #15222e;
          --zx-text-dim: rgba(255, 255, 255, 0.85);
        }
        
        .zx-footer-main { 
          background-color: var(--zx-footer-bg); 
          color: #ffffff; 
          padding: 60px 0 30px; 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
          border-top: 4px solid var(--zx-primary); 
          width: 100% !important; 
        }
        
        .f-container { 
          width: 94%; 
          max-width: 1600px; 
          margin: 0 auto; 
          display: grid; 
          grid-template-columns: 1.5fr 1fr 1fr 1.5fr; 
          gap: 50px; 
          contain: layout style;
        }
        
        .f-col h4 { 
          color: #ffffff; 
          font-size: 18px; 
          font-weight: 800; 
          margin-bottom: 30px; 
          text-transform: uppercase; 
          position: relative; 
        }
        
        .f-col h4::after { 
          content: ''; 
          position: absolute; 
          bottom: -10px; 
          left: 0; 
          width: 40px; 
          height: 2px; 
          background: var(--zx-primary); 
        }
        
        .f-brand img { 
          height: 45px; 
          width: auto; 
          margin-bottom: 20px; 
          display: block; 
          aspect-ratio: 200 / 45;
        }
        
        .f-brand p { 
          font-size: 14px; 
          line-height: 1.8; 
          color: var(--zx-text-dim); 
        }
        
        .f-links ul { 
          list-style: none; 
          padding: 0; 
          margin: 0; 
        }
        
        .f-links a { 
          color: var(--zx-text-dim); 
          text-decoration: none !important; 
          font-size: 14px; 
          transition: color 0.3s ease; 
          touch-action: manipulation;
          will-change: color;
          display: inline-block;
          padding: 4px 0;
        }
        
        .f-links a:hover { 
          color: var(--zx-accent); 
        }
        
        .f-links a:focus {
          outline: 2px solid var(--zx-accent);
          outline-offset: 4px;
        }
        
        .f-contact .contact-item { 
          display: flex; 
          gap: 15px; 
          margin-bottom: 20px; 
          align-items: flex-start; 
        }
        
        .f-contact i { 
          color: var(--zx-primary); 
          font-size: 18px; 
          font-style: normal; 
          width: 24px;
          flex-shrink: 0;
        }
        
        .f-contact span { 
          font-size: 14px; 
          color: var(--zx-text-dim); 
          line-height: 1.6; 
        }
        
        .f-contact a {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .f-contact a:hover {
          color: var(--zx-accent);
        }
        
        .f-bottom { 
          width: 94%; 
          max-width: 1600px; 
          margin: 50px auto 0; 
          padding-top: 25px; 
          border-top: 1px solid rgba(255,255,255,0.1); 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          flex-wrap: wrap; 
        }
        
        .f-badges { 
          display: flex; 
          gap: 20px; 
          opacity: 0.9; 
        }
        
        .f-badges span { 
          font-size: 10px; 
          font-weight: 900; 
          border: 1px solid #fff; 
          padding: 2px 8px; 
          border-radius: 2px; 
        }
        
        @media (max-width: 1024px) { 
          .f-container { grid-template-columns: 1fr 1fr; } 
        }
        
        @media (max-width: 600px) { 
          .f-container { grid-template-columns: 1fr; } 
          .f-bottom { flex-direction: column; text-align: center; }
          .zx-footer-main { padding: 40px 0 20px; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .f-links a,
          .f-contact a {
            transition: none;
          }
        }
      ` }} />

      <footer className="zx-footer-main" role="contentinfo">
        <div className="f-container">
          <div className="f-col f-brand">
            <SlotImage 
              slotKey="logo_footer"
              resolvedUrls={resolvedUrls}
              alt="Zhixin Paper - Professional adhesive label manufacturer logo"
              width="200"
              height="45"
              loading="lazy"
              decoding="async"
            />
            <p>Leading custom label manufacturer since 2009. Specialized in high-performance roll labels and premium jar packaging.</p>
          </div>
          
          <div className="f-col f-links">
            <nav aria-label="Product Solutions Footer">
              <p className="footer-heading">Solutions</p>
              <ul>
                <li><a href="#products" aria-label="View Jar and Bottle Label solutions">Jar & Bottle Labels</a></li>
                <li><a href="#products" aria-label="View Cosmetic Packaging stickers">Cosmetic Packaging</a></li>
                <li><a href="#products" aria-label="View Industrial Roll Labels">Industrial Roll Labels</a></li>
              </ul>
            </nav>
          </div>
          
          <div className="f-col f-links">
            <nav aria-label="Site Quick Links Footer">
              <p className="footer-heading">Quick Links</p>
              <ul>
                <li><a href="#home" aria-label="Back to Top of the page">Back to Top</a></li>
                <li><a href="#contact" aria-label="Request a direct factory quote">Request a Quote</a></li>
              </ul>
            </nav>
          </div>
          
          <div className="f-col f-contact">
            <p className="footer-heading">Contact Info</p>
            <div className="contact-item">
              <i aria-hidden="true">📍</i>
              <address style={{ fontStyle: 'normal' }}>
                <span><b>Address:</b> Xi'an, China</span>
              </address>
            </div>
            <div className="contact-item">
              <i aria-hidden="true">💬</i>
              <span><b>WhatsApp:</b> <a href="tel:+8618092117618">+86 180 9211 7618</a></span>
            </div>
            <div className="contact-item">
              <i aria-hidden="true">✉️</i>
              <span><b>Email:</b> <a href="mailto:sales@zhixinpaper.com">sales@zhixinpaper.com</a></span>
            </div>
          </div>
        </div>
        
        <div className="f-bottom">
          <p>© 2026 Xi'an Zhixin Paper Co., Ltd. All Rights Reserved.</p>
          <div className="f-badges" role="list" aria-label="International Certifications">
            <span role="listitem">SGS</span>
            <span role="listitem">ISO 9001</span>
            <span role="listitem">FSC</span>
            <span role="listitem">FDA</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
