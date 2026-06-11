'use client';

import React from 'react';

export const Services: React.FC = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root { 
          --zx-primary: #008188; 
          --zx-accent: #00e5ff; 
          --zx-dark-navy: #1a2a3a; 
          --zx-light-bg: #f8f9fa; 
          --zx-text-main: #1a1a1a; 
          --zx-text-body: #333; 
        }
        
        .zx-services-section { 
          width: 100% !important; 
          max-width: 100% !important; 
          margin: 0 auto; 
          padding: 3rem 4%; 
          box-sizing: border-box; 
          background: #fff; 
        }
        
        .zx-services-header { 
          text-align: left; 
          margin-bottom: 3rem; 
          border-bottom: 3px solid var(--zx-primary); 
          padding-bottom: 1.5rem; 
        }
        
        .zx-services-header span { 
          color: var(--zx-primary); 
          font-size: 0.75rem; 
          font-weight: 800; 
          letter-spacing: 3px; 
          text-transform: uppercase; 
        }
        
        .zx-services-header h2 { 
          font-size: 2.2rem; 
          font-weight: 900; 
          color: var(--zx-text-main); 
          margin-top: 0.8rem; 
          line-height: 1.2;
        }
        
        .services-matrix { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 1.5rem; 
          contain: layout style;
        }
        
        .service-card { 
          background: #ffffff; 
          padding: 2rem 1.5rem; 
          border: 1px solid #eee; 
          border-radius: 4px; 
          position: relative; 
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease, border-color 0.4s ease; 
          display: flex; 
          flex-direction: column; 
          will-change: transform;
          contain: content;
        }
        
        .service-card:hover { 
          transform: translateY(-0.5rem); 
          box-shadow: 0 1.5rem 3rem rgba(0, 155, 164, 0.12); 
          border-color: var(--zx-primary); 
        }
        
        .service-card::after { 
          content: attr(data-step); 
          position: absolute; 
          top: 1rem; 
          right: 1rem; 
          font-size: 2.5rem; 
          font-weight: 900; 
          color: #f0f0f0; 
          z-index: 0; 
          line-height: 1;
        }
        
        .service-card h3 { 
          font-size: 1.1rem; 
          font-weight: 800; 
          color: var(--zx-text-main); 
          line-height: 1.3; 
          margin-bottom: 1rem; 
          min-height: auto; 
          z-index: 1; 
        }
        
        .service-card p { 
          font-size: 0.9rem; 
          line-height: 1.7; 
          color: var(--zx-text-body); 
          margin: 0; 
          z-index: 1; 
        }
        
        .cta-card { 
          background: var(--zx-dark-navy) !important; 
          border: none; 
          text-align: center; 
          align-items: center; 
          justify-content: center; 
        }
        
        .cta-card h3 { 
          color: #fff !important; 
          min-height: auto; 
          margin-bottom: 1.5rem;
        }
        
        .cta-btn { 
          display: inline-block;
          background: var(--zx-accent); 
          color: var(--zx-dark-navy); 
          padding: 1rem 2.5rem; 
          border-radius: 4px; 
          text-decoration: none; 
          font-weight: 900; 
          font-size: 0.9rem; 
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 229, 255, 0.3);
        }

        @media (max-width: 1024px) {
          .services-matrix { 
            grid-template-columns: repeat(2, 1fr); 
            gap: 1.2rem; 
          }
          
          .zx-services-header h2 {
            font-size: 1.8rem;
          }
          
          .service-card {
            padding: 1.5rem 1.2rem;
          }
          
          .service-card::after {
            font-size: 2rem;
            top: 0.8rem;
            right: 0.8rem;
          }
        }

        @media (max-width: 600px) {
          .zx-services-section {
            padding: 2rem 5%;
          }
          
          .zx-services-header {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
          }
          
          .zx-services-header h2 {
            font-size: 1.5rem;
          }
          
          .zx-services-header span {
            font-size: 0.65rem;
            letter-spacing: 2px;
          }
          
          .services-matrix { 
            grid-template-columns: 1fr; 
            gap: 1rem; 
          }
          
          .service-card {
            padding: 1.5rem 1rem;
          }
          
          .service-card h3 {
            font-size: 1rem;
          }
          
          .service-card p {
            font-size: 0.85rem;
          }
          
          .service-card::after {
            font-size: 1.8rem;
            top: 0.5rem;
            right: 0.5rem;
            opacity: 0.5;
          }
          
          .cta-btn {
            width: 100%;
            padding: 1rem;
            text-align: center;
            box-sizing: border-box;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-card {
            transition: none;
          }
          .service-card:hover {
            transform: none;
            box-shadow: 0 0.5rem 1rem rgba(0, 155, 164, 0.08);
          }
          .cta-btn {
            transition: none;
          }
          .cta-btn:hover {
            transform: none;
            box-shadow: none;
          }
        }
      ` }} />

      <section className="zx-services-section" role="region" aria-label="Our Factory Services">
        <div className="zx-services-header">
          <span>FACTORY-DIRECT SERVICES</span>
          <h2>Engineering Success for Every Roll</h2>
        </div>
        
        <div className="services-matrix" role="list">
          <div className="service-card" data-step="01" role="listitem">
            <h3>Precision Manufacturing & Volume Capacity</h3>
            <p>Powered by <strong>70+ professionals</strong> and a 4,000㎡ facility.</p>
          </div>
          <div className="service-card" data-step="02" role="listitem">
            <h3>Advanced Technical Engineering</h3>
            <p>We solve pain points with <strong>high-tensile glassine liners</strong>.</p>
          </div>
          <div className="service-card" data-step="03" role="listitem">
            <h3>Premium Brand Enhancement</h3>
            <p>From <strong>gold foil stamping</strong> to 3D embossing.</p>
          </div>
          <div className="service-card" data-step="04" role="listitem">
            <h3>Extreme Environment Durability</h3>
            <p>Specialized adhesives for <strong>-20°C to 120°C</strong>.</p>
          </div>
          <div className="service-card" data-step="05" role="listitem">
            <h3>Secure Partnership</h3>
            <p>We offer <strong>100% confidential blind dropshipping</strong>.</p>
          </div>
          <div className="service-card cta-card" role="listitem">
            <h3>Need Custom Technical Specs?</h3>
            <a href="#contact" className="cta-btn">GET EXPERT ADVICE</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
