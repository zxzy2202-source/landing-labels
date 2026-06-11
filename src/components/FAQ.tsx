'use client';

import React, { useState } from 'react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "My current labels keep tearing on the high-speed automatic labeling machine. How does Zhixin Paper prevent this?",
      a: "Frequent tearing is a major production downtime cause. We solve this by focusing on the \"Skeleton\" of the label—the liner tension.",
      solutions: [
        "High-tensile glassine liners",
        "Zero-snap tension control",
        "Precision rotary die-cutting",
        "Pre-shipment stress testing"
      ],
      emoji: "🛡️",
      header: "ZHIXIN FACTORY APPROACH"
    },
    {
      q: "Will the colors of my labels be consistent between different batches?",
      a: "We understand brand integrity relies on visual perfection. Our color management ensures Batch A matches Batch Z perfectly.",
      solutions: [
        "Automated visual QC systems",
        "Digital color-match archiving",
        "X-Rite calibration tools",
        "Master sample retention (2Y)"
      ],
      emoji: "🎨",
      header: "COLOR CONSISTENCY STRATEGY"
    },
    {
      q: "Can your labels withstand extreme environments like freezers or oily kitchens?",
      a: "Our materials are engineered for durability. We use specialized adhesives that maintain tackiness under extreme thermal stress.",
      solutions: [
        "-20°C to 120°C service temp",
        "Oil & condensation proof",
        "Ultra-high tack for uneven jars",
        "Friction-resistant coating"
      ],
      emoji: "❄️",
      header: "ADHESIVE STABILITY SPECS"
    },
    {
      q: "As a distributor, I am worried about direct factory-client contact. Do you support Blind Dropshipping?",
      a: "Protecting our distribution partners (The \"Lever\") is a core part of our international growth strategy.",
      solutions: [
        "100% Confidential shipping",
        "Unbranded swatch books",
        "Strict NDA compliance",
        "Customizable packing slips"
      ],
      emoji: "🤝",
      header: "AGENCY PROTECTION POLICY"
    },
    {
      q: "Are your materials safe for food and cosmetic packaging?",
      a: "Safety and compliance are non-negotiable. All raw materials are sourced from certified international suppliers.",
      solutions: [
        "FDA-compliant adhesives",
        "SGS / REACH certified stocks",
        "FSC certified paper sources",
        "Dust-free production line"
      ],
      emoji: "✅",
      header: "COMPLIANCE & SAFETY"
    }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root { 
          --zx-primary: #007d85; 
          --zx-accent: #00e5ff; 
          --zx-dark-navy: #1a2a3a; 
          --zx-light-bg: #f8f9fa; 
          --zx-text-main: #111111; 
          --zx-text-body: #333333; 
        }

        .zx-faq-section { 
          width: 100% !important; 
          max-width: 100% !important; 
          margin: 0 auto; 
          padding: 4rem 4%; 
          box-sizing: border-box; 
          background: #fff; 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        .zx-faq-header { 
          text-align: center; 
          margin-bottom: 3rem; 
        }
        
        .zx-faq-header span { 
          color: var(--zx-primary); 
          font-size: 0.75rem; 
          font-weight: 800; 
          letter-spacing: 3px; 
          text-transform: uppercase; 
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .zx-faq-header h2 { 
          font-size: 2rem; 
          font-weight: 900; 
          color: var(--zx-text-main); 
          margin: 0; 
          line-height: 1.2;
        }

        .faq-item { 
          border-bottom: 1px solid #eee; 
          padding: 1.2rem 0; 
          overflow: hidden; 
        }

        .faq-question { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start; 
          cursor: pointer; 
          background: none; 
          border: none; 
          width: 100%; 
          text-align: left; 
          padding: 0.5rem 0; 
          outline: none;
          font-family: inherit;
        }
        
        .faq-question:focus { 
          outline: 2px solid var(--zx-primary); 
          outline-offset: 5px; 
        }

        .faq-question h3 { 
          margin: 0; 
          font-size: 1.05rem; 
          font-weight: 700; 
          line-height: 1.4; 
          color: var(--zx-text-main); 
          transition: color 0.3s ease; 
          flex: 1;
          padding-right: 15px;
        }

        .faq-icon { 
          position: relative; 
          width: 18px; 
          height: 18px; 
          flex-shrink: 0; 
          margin-top: 4px;
          will-change: transform;
        }
        .faq-icon::before, .faq-icon::after { 
          content: ''; 
          position: absolute; 
          background: var(--zx-primary); 
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
        }
        .faq-icon::before { width: 2px; height: 100%; left: 8px; top: 0; }
        .faq-icon::after { width: 100%; height: 2px; left: 0; top: 8px; }

        .faq-item.active .faq-icon::before { 
          transform: rotate(90deg); 
          opacity: 0; 
        }
        .faq-item.active .faq-icon { 
          transform: rotate(45deg); 
        }
        .faq-item.active h3 { 
          color: var(--zx-primary); 
        }

        .faq-answer { 
          max-height: 0; 
          overflow: hidden; 
          transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
          opacity: 0;
        }
        .faq-item.active .faq-answer { 
          max-height: 800px; 
          opacity: 1;
        }

        .faq-answer-inner { 
          padding: 1rem 0 1.5rem 0; 
          color: var(--zx-text-body); 
          font-size: 0.95rem; 
          line-height: 1.7; 
        }

        .zx-factory-solution { 
          margin-top: 1.2rem; 
          background: var(--zx-light-bg); 
          border-left: 4px solid var(--zx-primary); 
          padding: 1.2rem; 
          border-radius: 4px; 
          contain: content;
        }

        .solution-title { 
          display: flex; 
          align-items: center; 
          gap: 0.5rem; 
          color: var(--zx-primary); 
          font-weight: 800; 
          font-size: 0.75rem; 
          text-transform: uppercase; 
          margin-bottom: 1rem; 
        }

        .solution-list { 
          list-style: none; 
          padding: 0; 
          margin: 0; 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 0.6rem; 
        }
        .solution-list li { 
          position: relative; 
          padding-left: 1.2rem; 
          font-size: 0.85rem; 
          font-weight: 600; 
          color: var(--zx-dark-navy); 
          line-height: 1.4;
        }
        .solution-list li::before { 
          content: '✓'; 
          position: absolute; 
          left: 0; 
          color: var(--zx-accent); 
          font-weight: 900; 
          font-size: 0.8rem;
        }

        @media (max-width: 1024px) {
          .zx-faq-header h2 {
            font-size: 1.7rem;
          }
          .zx-faq-header {
            margin-bottom: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .zx-faq-section { 
            padding: 2.5rem 5%; 
          }
          .zx-faq-header { 
            margin-bottom: 2rem; 
            text-align: left;
            border-left: 4px solid var(--zx-primary);
            padding-left: 1rem;
          }
          .zx-faq-header span { 
            font-size: 0.65rem; 
            letter-spacing: 2px; 
            margin-bottom: 0.3rem;
          }
          .zx-faq-header h2 { 
            font-size: 1.4rem; 
            font-weight: 900;
          }
          .faq-item { 
            padding: 1rem 0; 
          }
          .faq-question h3 { 
            font-size: 0.95rem; 
            line-height: 1.5;
          }
          .faq-icon { 
            width: 16px; 
            height: 16px; 
            margin-top: 2px;
          }
          .faq-icon::before { left: 7px; }
          .faq-icon::after { top: 7px; }
          .faq-answer-inner { 
            font-size: 0.9rem; 
            line-height: 1.6; 
            padding: 0.8rem 0 1rem 0;
          }
          .solution-list { 
            grid-template-columns: 1fr; 
            gap: 0.5rem; 
          }
          .solution-list li { 
            font-size: 0.8rem; 
            padding-left: 1rem;
          }
          .zx-factory-solution { 
            margin-top: 1rem; 
            padding: 1rem; 
          }
          .solution-title { 
            font-size: 0.7rem; 
            margin-bottom: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .zx-faq-section {
            padding: 2rem 4%;
          }
          .zx-faq-header h2 {
            font-size: 1.25rem;
          }
          .faq-question h3 {
            font-size: 0.9rem;
          }
          .faq-answer-inner {
            font-size: 0.85rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-answer,
          .faq-icon::before,
          .faq-icon::after {
            transition: none;
          }
          .faq-item.active .faq-icon::before {
            opacity: 1;
            transform: none;
          }
          .faq-item.active .faq-icon {
            transform: none;
          }
        }
      ` }} />

      <section className="zx-faq-section" role="region" aria-labelledby="faq-main-title">
        <div className="zx-faq-header">
          <span>Expert Solutions</span>
          <h2 id="faq-main-title">Technical & Supply Chain Support</h2>
        </div>

        <div className="faq-list" role="list">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${openIndex === idx ? 'active' : ''}`} role="listitem">
              <button 
                className="faq-question" 
                aria-expanded={openIndex === idx} 
                aria-controls={`faq-answer-${idx}`} 
                id={`faq-btn-${idx}`}
                onClick={() => toggleFaq(idx)}
              >
                <h3>{faq.q}</h3>
                <div className="faq-icon" aria-hidden="true"></div>
              </button>
              <div id={`faq-answer-${idx}`} className="faq-answer" role="region" aria-labelledby={`faq-btn-${idx}`}>
                <div className="faq-answer-inner">
                  {faq.a}
                  <div className="zx-factory-solution">
                    <div className="solution-title">
                      <span aria-hidden="true">{faq.emoji}</span> {faq.header}
                    </div>
                    <ul className="solution-list">
                      {faq.solutions.map((sol, sIdx) => (
                        <li key={sIdx}>{sol}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FAQ;
