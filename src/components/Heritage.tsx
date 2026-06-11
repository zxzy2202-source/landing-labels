'use client';

import React from 'react';

export const Heritage: React.FC = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root { 
          --zx-primary: #008188; 
          --zx-accent: #00e5ff; 
          --zx-dark-navy: #1a2a3a; 
          --zx-light-bg: #f8f9fa; 
          --zx-text-main: #1a1a1a; 
          --zx-text-body: #4a4a4a; 
        }
        
        .zx-heritage-dashboard { 
          width: 100% !important; 
          max-width: 100% !important; 
          margin: 0 auto; 
          padding: 3rem 4%; 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
          box-sizing: border-box; 
          background: #fff; 
        }
        
        .dashboard-header { 
          text-align: left; 
          border-left: 5px solid var(--zx-primary); 
          padding-left: 1.5rem; 
          margin-bottom: 3rem; 
        }
        
        .dashboard-header h2 { 
          font-size: 2.2rem; 
          font-weight: 900; 
          color: var(--zx-text-main); 
          margin: 0; 
        }
        
        .journey-grid { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 1.5rem; 
          contain: layout style;
        }
        
        .journey-card { 
          background: var(--zx-light-bg); 
          padding: 2.2rem; 
          border-radius: 8px; 
          border-top: 3px solid #eee; 
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease, border-color 0.4s ease; 
          border: 1px solid #f0f0f0; 
          display: flex; 
          flex-direction: column; 
          will-change: transform;
          contain: content;
          touch-action: manipulation;
          cursor: pointer;
        }
        
        .journey-card:hover { 
          background: #ffffff; 
          box-shadow: 0 1rem 3rem rgba(0, 155, 164, 0.1); 
          border-color: var(--zx-primary); 
          transform: translateY(-5px); 
        }
        
        .year-tag { 
          font-size: 1.8rem; 
          font-weight: 900; 
          color: var(--zx-primary); 
          text-rendering: optimizeLegibility;
        }
        
        .status-dot { 
          width: 12px; 
          height: 12px; 
          background: var(--zx-accent); 
          border-radius: 50%; 
          box-shadow: 0 0 10px var(--zx-accent); 
        }
        
        .journey-card h3 { 
          font-size: 1.2rem; 
          font-weight: 800; 
          color: var(--zx-text-main); 
          margin: 0 0 0.8rem 0; 
          text-transform: uppercase; 
        }
        
        .journey-card p { 
          font-size: 1rem; 
          line-height: 1.7; 
          color: var(--zx-text-body); 
          margin: 0; 
          font-display: swap;
        }
        
        .journey-footer { 
          margin-top: 3rem; 
          padding: 3rem 2rem; 
          background: var(--zx-dark-navy); 
          border-radius: 8px; 
          color: #fff; 
          font-size: 1.15rem; 
          line-height: 1.8; 
          text-align: center; 
        }
        
        @media (max-width: 1024px) { 
          .journey-grid { grid-template-columns: repeat(2, 1fr); } 
        }
        
        @media (max-width: 650px) { 
          .journey-grid { grid-template-columns: 1fr; } 
          .journey-card { padding: 1.5rem; }
          .dashboard-header h2 { font-size: 1.6rem; }
          .journey-footer { 
            padding: 2rem 1rem; 
            font-size: 1rem; 
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .journey-card {
            transition: none;
            transform: none !important;
          }
          .journey-card:hover {
            transform: none !important;
            box-shadow: 0 0.5rem 1rem rgba(0, 155, 164, 0.08);
          }
        }
      ` }} />

      <section className="zx-heritage-dashboard" id="why-us" role="region" aria-label="Our 15-Year Journey">
        <div className="dashboard-header">
          <h2 id="journey-title">OUR HERITAGE: 15-Year Journey</h2>
        </div>
        <div className="journey-grid" role="list">
          <div className="journey-card" role="listitem" tabIndex={0}>
            <div className="card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span className="year-tag">2009</span>
              <div className="status-dot" aria-hidden="true"></div>
            </div>
            <h3>Founded</h3>
            <p>Started with a "Quality-First" mindset, focusing on the core stability of adhesive labeling materials.</p>
          </div>
          <div className="journey-card" role="listitem" tabIndex={0}>
            <div className="card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span className="year-tag">2011</span>
              <div className="status-dot" aria-hidden="true"></div>
            </div>
            <h3>First Production</h3>
            <p>First precision slitting machine (600mm) installed in a 200㎡ workshop delivering reliable blank rolls.</p>
          </div>
          <div className="journey-card" role="listitem" tabIndex={0}>
            <div className="card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span className="year-tag">2014</span>
              <div className="status-dot" aria-hidden="true"></div>
            </div>
            <h3>Expansion</h3>
            <p>Moved to an 1,800㎡ facility. Integrated multi-color printing to serve the premium branding market.</p>
          </div>
          <div className="journey-card" role="listitem" tabIndex={0}>
            <div className="card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span className="year-tag">2015-18</span>
              <div className="status-dot" aria-hidden="true"></div>
            </div>
            <h3>Technical R&D</h3>
            <p>Spent 7 years perfecting high-tensile liner technology with a specialized 30-person production team.</p>
          </div>
          <div className="journey-card" role="listitem" tabIndex={0}>
            <div className="card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span className="year-tag">2019</span>
              <div className="status-dot" aria-hidden="true"></div>
            </div>
            <h3>Industrial Upgrade</h3>
            <p>Moved to a standalone factory with automatic packaging lines to solve high-speed labeling downtime.</p>
          </div>
          <div className="journey-card" role="listitem" tabIndex={0}>
            <div className="card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span className="year-tag">2026</span>
              <div className="status-dot" aria-hidden="true"></div>
            </div>
            <h3>Global Chapter</h3>
            <p>Now serving partners in 80+ countries with 70+ skilled staff and 100% blind dropshipping support.</p>
          </div>
        </div>
        <div className="journey-footer">
          For over 15 years, <strong>ZXPapers</strong> has remained at the forefront, providing results for <strong>80+ countries</strong>, backed by <strong>ISO 9001 and FSC certifications</strong>.
        </div>
      </section>
    </>
  );
};

export default Heritage;
