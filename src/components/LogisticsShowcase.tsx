'use client';

import React from 'react';
import SlotImage from './SlotImage';

interface LogisticsShowcaseProps {
  resolvedUrls?: Record<string, string>;
}

export const LogisticsShowcase: React.FC<LogisticsShowcaseProps> = ({ resolvedUrls }) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .zx-logistics-showcase {
          padding: 2.5rem 4%;
          background: linear-gradient(180deg, #f6fafb 0%, #ffffff 100%);
        }

        .zx-logistics-card {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(320px, 520px) 1fr;
          gap: 2rem;
          align-items: center;
          background: #ffffff;
          border: 1px solid rgba(0, 125, 133, 0.12);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 18px 40px rgba(26, 42, 58, 0.08);
        }

        .zx-logistics-visual {
          min-height: 100%;
          background: #dfe9ec;
        }

        .zx-logistics-visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .zx-logistics-copy {
          padding: 2.2rem 2.4rem;
        }

        .zx-logistics-copy span {
          display: inline-block;
          margin-bottom: 0.9rem;
          color: #007d85;
          font-size: 0.8rem;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .zx-logistics-copy h2 {
          margin: 0 0 1rem;
          color: #1a2a3a;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          line-height: 1.15;
          font-weight: 900;
        }

        .zx-logistics-copy p {
          margin: 0 0 1rem;
          color: #43515c;
          font-size: 1rem;
          line-height: 1.75;
        }

        .zx-logistics-points {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.9rem 1rem;
          margin-top: 1.3rem;
        }

        .zx-logistics-points div {
          background: #f4f8f9;
          border: 1px solid rgba(0, 125, 133, 0.1);
          border-radius: 12px;
          padding: 0.95rem 1rem;
          color: #1f2f3d;
          font-size: 0.92rem;
          font-weight: 700;
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .zx-logistics-card {
            grid-template-columns: 1fr;
          }

          .zx-logistics-visual {
            min-height: 220px;
          }
        }

        @media (max-width: 640px) {
          .zx-logistics-showcase {
            padding: 1.5rem 5% 2rem;
          }

          .zx-logistics-copy {
            padding: 1.4rem 1.2rem 1.5rem;
          }

          .zx-logistics-points {
            grid-template-columns: 1fr;
          }
        }
      ` }} />

      <section className="zx-logistics-showcase" aria-labelledby="logistics-showcase-title">
        <div className="zx-logistics-card">
          <div className="zx-logistics-visual">
            <SlotImage
              slotKey="logistics_intro_img"
              resolvedUrls={resolvedUrls}
              alt="Global shipping, sea freight, rail transport and truck delivery for label orders"
              width="1280"
              height="720"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="zx-logistics-copy">
            <span>Global Delivery Assurance</span>
            <h2 id="logistics-showcase-title">Stable logistics support for urgent launches and recurring label replenishment</h2>
            <p>From export packing to customs-ready documentation, we help overseas buyers keep label supply predictable across air, sea, rail and truck routes. This section is prepared as an editable slot so you can replace the current logistics visual anytime from the backend.</p>
            <p>Whether you need sample rush shipping, scheduled bulk replenishment or blind dropshipping support for distributors, the logistics workflow stays aligned with your production calendar and destination market requirements.</p>
            <div className="zx-logistics-points" role="list" aria-label="Logistics strengths">
              <div role="listitem">Air, sea, rail and truck routing options for different urgency levels</div>
              <div role="listitem">Commercial invoice, packing list and customs support prepared in advance</div>
              <div role="listitem">Blind dropshipping workflow available for distributors and agency buyers</div>
              <div role="listitem">Flexible scheduling for sample dispatch, trial orders and repeat production runs</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogisticsShowcase;
