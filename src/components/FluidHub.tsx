'use client';

import React, { useState } from 'react';
import { DEFAULT_SLOTS } from '@/lib/imageSlotsData';

interface FluidHubProps {
  resolvedUrls?: Record<string, string>;
}

export const FluidHub: React.FC<FluidHubProps> = ({ resolvedUrls }) => {
  const posterUrl = resolvedUrls?.['hub_video_poster'] || DEFAULT_SLOTS['hub_video_poster'];
  const videoUrl = resolvedUrls?.['hub_video'] || DEFAULT_SLOTS['hub_video'];
  const gallery1 = resolvedUrls?.['gallery_1'] || DEFAULT_SLOTS['gallery_1'];
  const gallery2 = resolvedUrls?.['gallery_2'] || DEFAULT_SLOTS['gallery_2'];
  const gallery3 = resolvedUrls?.['gallery_3'] || DEFAULT_SLOTS['gallery_3'];
  const gallery4 = resolvedUrls?.['gallery_4'] || DEFAULT_SLOTS['gallery_4'];

  const [isPlaying, setIsOpen] = useState(false);

  const startVid = () => {
    setIsOpen(true);
    const v = document.getElementById('hVideo') as HTMLVideoElement;
    if (v) {
      setTimeout(() => {
        v.play();
      }, 300);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root { --zx-primary: #008188; --zx-light-bg: #f8f9fa; --zx-text-main: #1a1a1a; --zx-text-body: #444; }
        
        .zx-fluid-hub { 
          width: 100% !important; 
          max-width: 100% !important; 
          margin: 0 auto; 
          padding: 3rem 4%; 
          background: #ffffff; 
          font-family: "Helvetica Neue", Arial, sans-serif; 
          box-sizing: border-box; 
        }
        
        .hub-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-end; 
          margin-bottom: 3rem; 
          border-bottom: 3px solid var(--zx-primary); 
          padding-bottom: 1.5rem; 
        }
        
        .title-box h2 { 
          font-size: 1.85rem; 
          margin: 0.5rem 0 0; 
          color: var(--zx-text-main); 
          font-weight: 900; 
          line-height: 1.2; 
        }
        
        .stat-pills { 
          display: flex; 
          gap: 1.5rem; 
        }
        
        .pill { 
          background: var(--zx-light-bg); 
          padding: 0.8rem 1.5rem; 
          border-radius: 4px; 
          text-align: center; 
          min-width: 110px; 
          border: 1px solid #ddd; 
        }
        
        .pill b { 
          font-size: 1.5rem; 
          color: var(--zx-text-main); 
          display: block; 
          line-height: 1; 
          margin-bottom: 5px; 
        }
        
        .pill i { 
          font-style: normal; 
          font-size: 0.75rem; 
          color: #555; 
          font-weight: 800; 
          text-transform: uppercase; 
        }
        
        .hub-main { 
          display: grid; 
          grid-template-columns: 1.2fr 1fr; 
          gap: 3rem; 
          align-items: center; 
        }
        
        .video-frame { 
          position: relative; 
          width: 100%; 
          aspect-ratio: 16 / 9; 
          background: #000; 
          border-radius: 4px; 
          overflow: hidden; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.08); 
        }
        
        .text-grid { 
          display: flex; 
          flex-direction: column; 
          gap: 1.5rem; 
        }
        
        .text-grid p { 
          font-size: 1.05rem; 
          line-height: 1.8; 
          color: var(--zx-text-body); 
          margin: 0; 
        }
        
        .gallery-strip { 
          display: grid; 
          grid-template-columns: repeat(4, 1fr); 
          gap: 1.5rem; 
          margin-top: 3rem; 
        }
        
        .gallery-item { 
          aspect-ratio: 16 / 9; 
          border-radius: 4px; 
          overflow: hidden; 
          border: 1px solid #ddd; 
          background-color: #f0f0f0; 
        }
        
        .gallery-item img { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          display: block; 
        }
        
        @media (max-width: 1024px) { 
          .hub-main { grid-template-columns: 1fr; } 
          .hub-header { flex-direction: column; align-items: flex-start; gap: 2rem; } 
        }
        
        @media (max-width: 768px) { 
          .gallery-strip { grid-template-columns: repeat(2, 1fr); } 
        }
      ` }} />

      <section className="zx-fluid-hub" role="region" aria-labelledby="hub-main-title">
        <div className="hub-header">
          <div className="title-box">
            <span style={{ color: 'var(--zx-primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '3px' }}>ESTABLISHED 2009</span>
            <h2 id="hub-main-title">15+ Years of Technical Expertise in Global Label Manufacturing</h2>
          </div>
          <dl className="stat-pills">
            <div className="pill"><dt><b>15+</b></dt><dd><i>Years Exp.</i></dd></div>
            <div className="pill"><dt><b>70+</b></dt><dd><i>Skilled Staff</i></dd></div>
            <div className="pill"><dt><b>Global</b></dt><dd><i>Reach</i></dd></div>
          </dl>
        </div>
        <div className="hub-main">
          <div className="video-frame">
            <img 
              src={posterUrl} 
              id="vPoster" 
              alt="Entrance of Zhixin Paper automated label production facility" 
              width="1200" 
              height="675" 
              style={{ 
                position: 'absolute', 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                zIndex: 2, 
                transition: '0.6s',
                opacity: isPlaying ? 0 : 1,
                display: isPlaying ? 'none' : 'block'
              }} 
              loading="lazy" 
              decoding="async" 
            />
            {!isPlaying && (
              <button 
                type="button" 
                id="playBtn" 
                onClick={startVid} 
                aria-label="Play Factory Tour Video" 
                style={{ 
                  position: 'absolute', 
                  bottom: '1.5rem', 
                  left: '1.5rem', 
                  zIndex: 5, 
                  background: 'var(--zx-primary)', 
                  color: '#fff', 
                  padding: '12px 25px', 
                  fontSize: '0.75rem', 
                  fontWeight: 900, 
                  cursor: 'pointer', 
                  border: 'none', 
                  borderRadius: '4px', 
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)' 
                }}
              >
                WATCH TOUR
              </button>
            )}
            <video 
              id="hVideo" 
              controls={isPlaying}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                display: isPlaying ? 'block' : 'none' 
              }} 
              aria-label="Factory Production Video" 
              preload="none"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
          <div className="text-grid">
            <p>With over <b>15 years of industry experience</b>, Zhixin Paper has built a reputation for high-stability labeling. Our facility is operated by <b>70+ professionals</b> and equipped with advanced precision rotary die-cutting units.</p>
            <p>We solve technical challenges for global brands. Our <b>high-tensile glassine liners</b> prevent breakage during application, while our <b>automated QC</b> ensures 100% consistency.</p>
          </div>
        </div>
        <div className="gallery-strip" role="list" aria-label="Factory gallery images">
          <figure className="gallery-item" role="listitem"><img src={gallery1} alt="Multi-color label printing machine in factory" width="400" height="225" loading="lazy" decoding="async" /></figure>
          <figure className="gallery-item" role="listitem"><img src={gallery2} alt="Organized warehouse for logistics stability" width="400" height="225" loading="lazy" decoding="async" /></figure>
          <figure className="gallery-item" role="listitem"><img src={gallery3} alt="Shipping logistics preparation" width="400" height="225" loading="lazy" decoding="async" /></figure>
          <figure className="gallery-item" role="listitem"><img src={gallery4} alt="Zhixin Paper professional team group photo" width="400" height="225" loading="lazy" decoding="async" /></figure>
        </div>
      </section>
    </>
  );
};

export default FluidHub;
