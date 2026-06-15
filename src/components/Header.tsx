'use client';

import React, { useState, useEffect } from 'react';
import SlotImage from './SlotImage';

interface HeaderProps {
  resolvedUrls?: Record<string, string>;
}

export const Header: React.FC<HeaderProps> = ({ resolvedUrls }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }

        :root {
          --zx-primary: #007d85;
          --zx-accent: #00e5ff;
          --zx-dark-navy: #1a2a3a;
          --zx-text-main: #1a1a1a;
          --zx-white: #ffffff;
        }

        .zx-header-fixed {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 999999;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        .zx-top-scroller {
          height: 34px;
          background: var(--zx-dark-navy);
          display: flex;
          align-items: center;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .zx-marquee-content {
          display: flex;
          white-space: nowrap;
          animation: zx-marquee-loop 40s linear infinite;
        }

        .zx-tag {
          display: inline-flex;
          align-items: center;
          color: var(--zx-white);
          font-size: 11px;
          font-weight: 700;
          padding: 0 20px;
          letter-spacing: 0.5px;
        }
        .zx-tag::before { 
          content: '✓'; 
          color: var(--zx-accent); 
          margin-right: 6px; 
          font-weight: 900; 
        }

        @keyframes zx-marquee-loop { 
          0% { transform: translateX(0); } 
          100% { transform: translateX(-50%); } 
        }

        .zx-navbar {
          height: 60px;
          background: var(--zx-white);
          display: flex;
          align-items: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          border-bottom: 1px solid #f0f0f0;
        }

        .zx-nav-container {
          width: 94%;
          max-width: 1600px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .zx-logo img { 
          height: 36px; 
          width: auto; 
          display: block; 
          transition: 0.3s; 
        }
        .zx-logo img:hover { opacity: 0.8; }

        .zx-menu-links { 
          display: flex; 
          gap: 25px; 
          align-items: center;
        }
        
        .zx-menu-links a {
          text-decoration: none !important;
          font-size: 14px;
          font-weight: 800;
          color: var(--zx-text-main);
          transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .zx-menu-links a:focus, .zx-logo a:focus {
          outline: 2px solid var(--zx-primary);
          outline-offset: 5px;
        }

        .zx-menu-links a:hover {
          color: var(--zx-primary);
        }
        
        .zx-menu-links a::after {
          content: '';
          position: absolute;
          bottom: -5px; left: 50%;
          width: 0; height: 2px;
          background: var(--zx-primary);
          transition: 0.3s ease;
          transform: translateX(-50%);
        }
        .zx-menu-links a:hover::after { width: 100%; }

        .zx-nav-cta {
          background: var(--zx-primary);
          color: var(--zx-white) !important;
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none !important;
          box-shadow: 0 4px 12px rgba(0, 155, 164, 0.2);
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
          display: inline-block;
        }

        .zx-nav-cta:focus {
          outline: 3px solid var(--zx-accent);
          outline-offset: 3px;
        }

        .zx-nav-cta:hover {
          background: var(--zx-dark-navy); 
          transform: translateY(-3px); 
          box-shadow: 0 10px 25px rgba(26, 42, 58, 0.3); 
        }

        .zx-mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          margin-right: 10px;
        }

        .zx-hamburger {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 18px;
        }

        .zx-hamburger span {
          display: block;
          height: 2px;
          background: var(--zx-text-main);
          border-radius: 2px;
          transition: 0.3s;
        }

        .zx-mobile-menu-btn.active .zx-hamburger span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .zx-mobile-menu-btn.active .zx-hamburger span:nth-child(2) {
          opacity: 0;
        }
        .zx-mobile-menu-btn.active .zx-hamburger span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        .zx-mobile-panel {
          display: none;
          position: fixed;
          top: calc(34px + 60px);
          left: 0;
          width: 100%;
          background: var(--zx-white);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          z-index: 999998;
          padding: 1rem 0;
          max-height: calc(100vh - 94px);
          overflow-y: auto;
        }

        .zx-mobile-panel.open {
          display: block;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .zx-mobile-panel a {
          display: block;
          padding: 14px 5%;
          font-size: 15px;
          font-weight: 700;
          color: var(--zx-text-main);
          text-decoration: none;
          border-bottom: 1px solid #f5f5f5;
          transition: background 0.2s, color 0.2s;
        }

        .zx-mobile-panel a:hover {
          background: var(--zx-light-bg, #f8f9fa);
          color: var(--zx-primary);
        }

        .zx-mobile-panel .zx-nav-cta {
          display: block;
          margin: 1rem 5%;
          text-align: center;
          padding: 14px 20px;
        }

        .zx-header-spacer { 
          height: calc(34px + 60px); 
        }
        
        @media (max-width: 1024px) {
          .zx-menu-links { display: none; }
          .zx-mobile-menu-btn { display: flex; }
        }

        @media (max-width: 768px) {
          html {
            scroll-behavior: auto;
          }

          .zx-top-scroller {
            height: 28px;
          }

          .zx-marquee-content {
            animation: none;
            transform: none;
            justify-content: flex-start;
          }
          .zx-tag {
            font-size: 9px;
            padding: 0 15px;
          }
          .zx-tag::before {
            margin-right: 4px;
            font-size: 10px;
          }
          .zx-navbar {
            height: 54px;
          }
          .zx-logo img {
            height: 30px;
          }
          .zx-header-spacer { 
            height: calc(28px + 54px); 
          }
          .zx-mobile-panel {
            top: calc(28px + 54px);
            max-height: calc(100vh - 82px);
          }
        }

        @media (max-width: 480px) {
          .zx-top-scroller {
            height: 24px;
          }
          .zx-tag {
            font-size: 8px;
            padding: 0 12px;
            letter-spacing: 0;
          }
          .zx-tag::before {
            margin-right: 3px;
          }
          .zx-navbar {
            height: 50px;
          }
          .zx-logo img {
            height: 26px;
          }
          .zx-nav-cta {
            padding: 8px 14px;
            font-size: 11px;
          }
          .zx-header-spacer { 
            height: calc(24px + 50px); 
          }
          .zx-mobile-panel {
            top: calc(24px + 50px);
            max-height: calc(100vh - 74px);
          }
          .zx-mobile-panel a {
            padding: 12px 5%;
            font-size: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .zx-marquee-content {
            animation: none;
          }
          .zx-nav-cta,
          .zx-menu-links a::after {
            transition: none;
          }
          .zx-nav-cta:hover {
            transform: none;
          }
        }
      ` }} />

      <div className="zx-header-fixed">
        <div className="zx-top-scroller" role="region" aria-label="Certifications Scroller">
          <div className="zx-marquee-content">
            <div className="zx-tag">SGS CERTIFIED</div>
            <div className="zx-tag">ISO 9001:2015</div>
            <div className="zx-tag">REACH/RoHS COMPLIANT</div>
            <div className="zx-tag">FSC CERTIFIED PAPER</div>
            <div className="zx-tag">FDA COMPLIANT STANDARDS</div>
            <div className="zx-tag">SGS CERTIFIED</div>
            <div className="zx-tag">ISO 9001:2015</div>
            <div className="zx-tag">REACH/RoHS COMPLIANT</div>
            <div className="zx-tag">FSC CERTIFIED PAPER</div>
            <div className="zx-tag">FDA COMPLIANT STANDARDS</div>
          </div>
        </div>

        <nav className="zx-navbar" role="navigation" aria-label="Main Navigation">
          <div className="zx-nav-container">
            <div className="zx-logo">
              <a href="#home" aria-label="Zhixin Paper Home">
                <SlotImage 
                  slotKey="logo_header" 
                  resolvedUrls={resolvedUrls}
                  alt="Zhixin Paper official logo - Professional Thermal Solutions Provider"
                  width="200"
                  height="45"
                />
              </a>
            </div>

            <button 
              className={`zx-mobile-menu-btn ${isOpen ? 'active' : ''}`} 
              aria-label="Toggle menu" 
              aria-expanded={isOpen} 
              onClick={toggleMobileMenu}
            >
              <div className="zx-hamburger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>

            <div className="zx-menu-links">
              <a href="#home" aria-label="Go to homepage">Home</a>
              <a href="#why-us" aria-label="Read why global brands choose us">Why Us</a>
              <a href="#products" aria-label="Explore our custom roll products">Products</a>
              <a href="#factory" aria-label="View our factory and quality trust">Quality/Trust</a>
              <a href="#contact" aria-label="Contact sales team">Contact</a>
            </div>

            <div className="zx-actions">
              <a href="#contact" className="zx-nav-cta" aria-label="Contact factory for an instant quote">GET FACTORY QUOTE</a>
            </div>
          </div>
        </nav>

        <div className={`zx-mobile-panel ${isOpen ? 'open' : ''}`} id="mobilePanel" role="menu">
          <a href="#home" role="menuitem" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#why-us" role="menuitem" onClick={() => setIsOpen(false)}>Why Us</a>
          <a href="#products" role="menuitem" onClick={() => setIsOpen(false)}>Products</a>
          <a href="#factory" role="menuitem" onClick={() => setIsOpen(false)}>Quality/Trust</a>
          <a href="#contact" role="menuitem" onClick={() => setIsOpen(false)}>Contact</a>
          <a href="#contact" className="zx-nav-cta" role="menuitem" onClick={() => setIsOpen(false)}>GET FACTORY QUOTE</a>
        </div>
      </div>

      <div className="zx-header-spacer"></div>
    </>
  );
};

export default Header;
