'use client';

import React from 'react';
import SlotImage from './SlotImage';

interface CertificationsProps {
  resolvedUrls?: Record<string, string>;
}

export const Certifications: React.FC<CertificationsProps> = ({ resolvedUrls }) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .zx-certifications {
          padding: 1.5rem 4%;
          background: #fff;
        }
        
        .cert-section-title {
          font-size: 1rem;
          font-weight: 900;
          color: #1a1a1a;
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .cert-full-width {
          width: 100%;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        
        @media (max-width: 768px) {
          .zx-certifications {
            padding: 1rem 5%;
          }
          
          .cert-section-title {
            font-size: 0.85rem;
            text-align: center;
          }
          
          .cert-full-width {
            border-radius: 4px;
          }
        }
      ` }} />

      <section className="zx-certifications" id="factory" aria-labelledby="cert-title">
        <h2 id="cert-title" className="cert-section-title">Factory Certifications & Compliance</h2>
        
        <SlotImage 
          slotKey="certifications_img"
          resolvedUrls={resolvedUrls}
          className="cert-full-width"
          alt="Zhixin Paper Factory Certifications: ISO 9001:2015, SGS Certified, REACH/RoHS Compliant, FSC Certified Paper, FDA Compliant Standards"
          width="1200"
          height="160"
          loading="lazy"
          decoding="async"
        />
      </section>
    </>
  );
};

export default Certifications;
