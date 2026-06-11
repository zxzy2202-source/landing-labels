'use client';

import React, { useEffect, useRef } from 'react';
import { DEFAULT_SLOTS } from '@/lib/imageSlotsData';

interface VanguardProps {
  resolvedUrls?: Record<string, string>;
}

export const Vanguard: React.FC<VanguardProps> = ({ resolvedUrls }) => {
  const videoUrl = resolvedUrls?.['vanguard_video'] || DEFAULT_SLOTS['vanguard_video'];
  const videoRef = useRef<HTMLVideoElement>(null);

  const statsRef = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const trigger = statsRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.v-num');
          items.forEach(item => {
            const el = item as HTMLElement;
            const target = +(el.getAttribute('data-target') || 0);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const update = () => {
              current += step;
              if (current < target) {
                el.innerText = Math.ceil(current).toString();
                requestAnimationFrame(update);
              } else {
                el.innerText = target.toString();
              }
            };
            update();
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(trigger);
    return () => {
      if (trigger) observer.unobserve(trigger);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root { 
          --zx-primary: #008188; 
          --zx-accent: #00e5ff; 
          --zx-dark-navy: #1a2a3a; 
          --zx-white: #ffffff; 
        }
        
        .zx-vanguard { 
          position: relative; 
          height: 85vh; 
          width: 100%; 
          display: flex; 
          flex-direction: column; 
          justify-content: center; 
          overflow: hidden; 
          color: var(--zx-white); 
          font-family: "Helvetica Neue", Arial, sans-serif; 
        }
        
        .vanguard-video { 
          position: absolute; 
          top: 50%; 
          left: 50%; 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          transform: translate(-50%, -50%) scale(1.05); 
          z-index: 1; 
          background-color: var(--zx-dark-navy); 
        }
        
        @media (max-width: 768px) { 
          .vanguard-video { 
            object-fit: contain; 
            object-position: center center; 
            background-color: var(--zx-dark-navy); 
          } 
        }
        
        .vanguard-overlay { 
          position: absolute; 
          top: 0; 
          left: 0; 
          width: 100%; 
          height: 100%; 
          background: linear-gradient(135deg, rgba(26, 42, 58, 0.25) 0%, rgba(26, 42, 58, 0.05) 50%, rgba(26, 42, 58, 0.25) 100%); 
          z-index: 2; 
        }
        
        @media (max-width: 768px) { 
          .vanguard-overlay { 
            background: linear-gradient(135deg, rgba(26, 42, 58, 0.35) 0%, rgba(26, 42, 58, 0.15) 50%, rgba(26, 42, 58, 0.35) 100%); 
          } 
        }
        
        .vanguard-container { 
          position: relative; 
          z-index: 3; 
          max-width: 1200px; 
          margin: 0 auto; 
          padding: 2.5rem 1.25rem; 
          display: grid; 
          grid-template-columns: 1fr 1.2fr; 
          gap: 3.8rem; 
          align-items: center; 
        }
        
        .v-headline h4 { 
          color: var(--zx-accent); 
          font-size: 0.8rem; 
          text-transform: uppercase; 
          letter-spacing: 4px; 
          font-weight: 800; 
          margin-bottom: 0.9rem; 
        }
        
        .v-headline h2 { 
          font-size: clamp(1.75rem, 4vw, 2.6rem); 
          line-height: 1.1; 
          font-weight: 900; 
        }
        
        .v-body p { 
          font-size: 0.95rem; 
          line-height: 1.8; 
          color: rgba(255,255,255,1); 
          margin-bottom: 1.25rem; 
        }
        
        .v-stats-grid { 
          position: relative; 
          z-index: 3; 
          max-width: 1200px; 
          margin: 1.25rem auto 0; 
          padding: 0 1.25rem 2.5rem; 
          width: 100%; 
          display: grid; 
          grid-template-columns: repeat(4, 1fr); 
          gap: 1.25rem; 
          border-top: 1px solid rgba(255,255,255,0.2); 
          padding-top: 1.8rem; 
        }
        
        .v-num { 
          font-size: 3rem; 
          font-weight: 900; 
          display: block; 
          margin-bottom: 0.3rem; 
          line-height: 1; 
        }
        
        .v-num::after { 
          content: '+'; 
          color: var(--zx-accent); 
          font-size: 1.75rem; 
          vertical-align: top; 
          margin-left: 3px; 
        }
        
        .v-label { 
          font-size: 0.6rem; 
          text-transform: uppercase; 
          letter-spacing: 2px; 
          color: var(--zx-accent); 
          font-weight: 800; 
        }
        
        @media (max-width: 992px) { 
          .zx-vanguard { 
            height: auto; 
            min-height: 85vh; 
            padding: 3.8rem 0; 
          } 
          .vanguard-container { 
            grid-template-columns: 1fr; 
            gap: 1.8rem; 
          } 
          .v-stats-grid { 
            grid-template-columns: repeat(2, 1fr); 
          } 
        }
        
        @media (max-width: 768px) { 
          .zx-vanguard { 
            min-height: 70vh; 
          } 
        }
      ` }} />

      <section className="zx-vanguard" aria-labelledby="vanguard-title">
        <h2 id="vanguard-title" className="visually-hidden" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Company Overview Video</h2>
        <video ref={videoRef} className="vanguard-video" autoPlay muted loop playsInline preload="auto">
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="vanguard-overlay"></div>
        <div className="vanguard-container">
          <div className="v-headline">
            <h4>OUR CRAFT</h4>
            <h2>Empowering Global Brands with Precision Labeling Technology</h2>
          </div>
          <div className="v-body">
            <p>At <b>Zhixin Paper (ZXPapers)</b>, we transform raw materials into high-performance <b>custom roll labels</b> through high-speed printing and precision die-cutting.</p>
            <p>We deliver the <b>supply chain stability</b> required by retail giants and the <b>luxury aesthetics</b> demanded by premium brand owners.</p>
          </div>
        </div>
        <dl className="v-stats-grid" id="vStatTrigger" ref={statsRef}>
          <div className="v-stat-item">
            <dt className="v-num" data-target="15">0</dt>
            <dd className="v-label">YEARS EXPERIENCE</dd>
          </div>
          <div className="v-stat-item">
            <dt className="v-num" data-target="70">0</dt>
            <dd className="v-label">SKILLED STAFF</dd>
          </div>
          <div className="v-stat-item">
            <dt className="v-num" data-target="4000">0</dt>
            <dd className="v-label">FACTORY AREA (㎡)</dd>
          </div>
          <div className="v-stat-item">
            <dt className="v-num" data-target="200">0</dt>
            <dd className="v-label">GLOBAL PARTNERS</dd>
          </div>
        </dl>
      </section>
    </>
  );
};

export default Vanguard;
