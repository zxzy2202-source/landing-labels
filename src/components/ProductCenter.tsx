'use client';

import React, { useState } from 'react';
import { ProductCategory, ProductItem } from '@/lib/productsData';
import { DEFAULT_SLOTS } from '@/lib/imageSlotsData';

interface ProductCenterProps {
  products: ProductCategory[];
  resolvedUrls?: Record<string, string>;
}

export const ProductCenter: React.FC<ProductCenterProps> = ({ products, resolvedUrls }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ProductItem | null>(null);

  const data = products[activeCategory];
  const catMainImg = resolvedUrls?.[`products_cat_${activeCategory}`] || DEFAULT_SLOTS[`products_cat_${activeCategory}`] || data?.mainImg || '';

  const openModal = (item: ProductItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
    
    // Preload adjacent images
    if (data) {
      const idx = data.items.findIndex(x => x.title === item.title);
      const nextIdx = (idx + 1) % data.items.length;
      const prevIdx = (idx - 1 + data.items.length) % data.items.length;
      [nextIdx, prevIdx].forEach(i => {
        const nextImg = data.items[i];
        if (nextImg) {
          const img = new Image();
          img.src = nextImg.img;
        }
      });
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  const goToContact = () => {
    closeModal();
    window.location.hash = '#contact';
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root { 
          --zx-primary: #008188; 
          --zx-border: #e8e8e8; 
          --zx-bg: #ffffff; 
          --zx-text-main: #1a1a1a; 
          --zx-text-body: #444; 
          --zx-gap: 0.8rem; 
        }
        
        .p-container { 
          width: 100% !important; 
          max-width: 100% !important; 
          margin: 0 auto; 
          padding: 3rem 4%; 
          box-sizing: border-box; 
          background: #fff; 
        }
        
        .section-header {
          margin-bottom: 1.5rem;
        }
        
        .section-header h2 {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--zx-text-main);
          margin: 0 0 0.5rem 0;
        }
        
        .category-desc {
          font-size: 0.85rem;
          color: var(--zx-primary);
          font-weight: 600;
        }
        
        .tabs-nav { 
          display: flex; 
          list-style: none; 
          padding: 0; 
          margin: 0.8rem 0; 
          border-bottom: 1px solid var(--zx-border); 
          overflow-x: auto; 
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; 
        }
        
        .tabs-nav::-webkit-scrollbar {
          display: none; 
        }
        
        .tab-btn { 
          padding: 0.6rem 1rem; 
          cursor: pointer; 
          color: #333 !important; 
          position: relative; 
          transition: color 0.3s ease, opacity 0.3s ease; 
          font-weight: bold; 
          font-size: 0.8rem; 
          white-space: nowrap; 
          background: none !important; 
          border: none !important;
          opacity: 0.7;
          touch-action: manipulation;
        }
        
        .tab-btn.active { 
          color: var(--zx-primary) !important; 
          opacity: 1;
        }
        
        .tab-btn.active::after { 
          content: ""; 
          position: absolute; 
          bottom: 0; 
          left: 0; 
          width: 100%; 
          height: 3px; 
          background: var(--zx-primary); 
        }

        .grid-gallery { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          grid-auto-rows: 180px; 
          gap: var(--zx-gap); 
          contain: layout style;
        }
        
        .main-feat-card { 
          grid-column: span 2; 
          grid-row: span 2; 
          border: 1px solid var(--zx-border); 
          overflow: hidden; 
          cursor: pointer; 
          background-color: #f5f5f5;
          position: relative;
        }
        
        .main-feat-card img { 
          width: 100%; 
          height: 100%; 
          object-fit: contain; 
          display: block;
          background: #fafafa;
        }
        
        .p-card { 
          background: #fff; 
          border: 1px solid var(--zx-border); 
          display: flex; 
          overflow: hidden; 
          transition: transform 0.2s ease, box-shadow 0.2s ease; 
          cursor: pointer; 
          text-align: left; 
          min-height: 110px;
          will-change: transform;
        }
        
        .p-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .p-card:focus { 
          outline: 3px solid var(--zx-primary); 
          outline-offset: 2px;
        }
        
        .p-img-box { 
          flex: 1.2; 
          padding: 8px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          background: #f9f9f9; 
          min-width: 80px;
        }
        
        .p-img-box img { 
          max-width: 100%; 
          max-height: 100%; 
          object-fit: contain; 
        }
        
        .p-info-box { 
          flex: 0.8; 
          padding: 0.6rem 0.8rem; 
          display: flex; 
          flex-direction: column; 
          justify-content: center; 
          border-left: 1px dotted #f0f0f0; 
        }
        
        .p-info-box h3 { 
          font-size: 0.85rem; 
          margin: 0 0 3px 0; 
          font-weight: 900; 
          color: var(--zx-text-main); 
        }
        
        .p-info-box p { 
          font-size: 0.7rem; 
          color: var(--zx-text-body); 
          margin: 0 0 8px 0; 
          line-height: 1.3; 
          height: 2.6em; 
          overflow: hidden; 
        }
        
        .btn-sm { 
          background: var(--zx-primary); 
          color: #fff; 
          font-size: 0.6rem; 
          font-weight: 900; 
          padding: 2px 8px; 
          border-radius: 2px; 
          width: fit-content; 
          text-transform: uppercase; 
        }
        
        .modal-overlay { 
          position: fixed; 
          top: 0; 
          left: 0; 
          width: 100%; 
          height: 100%; 
          background: rgba(0,0,0,0.85); 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          z-index: 10000; 
          backdrop-filter: blur(5px); 
          padding: 1rem;
          box-sizing: border-box;
        }
        
        .modal-content { 
          background: #fff; 
          width: 100%; 
          max-width: 900px; 
          height: 80vh; 
          max-height: 600px;
          display: flex; 
          border-radius: 4px; 
          overflow: hidden; 
          position: relative; 
        }
        
        @media (max-width: 1024px) {
          .grid-gallery { 
            grid-template-columns: repeat(2, 1fr); 
            grid-auto-rows: 150px; 
          }
          .main-feat-card { 
            grid-column: span 2; 
            grid-row: span 1; 
          }
        }

        @media (max-width: 768px) {
          .p-container {
            padding: 2rem 5%;
          }
          
          .section-header h2 {
            font-size: 1.3rem;
          }
          
          .category-desc {
            font-size: 0.75rem;
          }
          
          .tabs-nav {
            margin: 0.6rem -5% 0.6rem 0;
            padding-left: 5%;
            padding-right: 5%;
          }
          
          .tab-btn {
            padding: 0.5rem 0.8rem;
            font-size: 0.7rem;
          }
          
          .grid-gallery { 
            grid-template-columns: repeat(2, 1fr); 
            grid-auto-rows: 130px; 
            gap: 0.6rem; 
          }
          
          .main-feat-card { 
            grid-column: span 2; 
            grid-row: span 1; 
          }
          
          .p-info-box {
            padding: 0.4rem 0.6rem;
          }
          
          .p-info-box h3 {
            font-size: 0.75rem;
          }
          
          .p-info-box p {
            font-size: 0.65rem;
            -webkit-line-clamp: 2;
          }
          
          .btn-sm {
            font-size: 0.55rem;
            padding: 2px 6px;
          }
        }

        @media (max-width: 480px) {
          .grid-gallery { 
            grid-template-columns: 1fr 1fr; 
            grid-auto-rows: 120px; 
          }
          
          .main-feat-card { 
            grid-column: span 2; 
          }
          
          .p-card {
            flex-direction: column;
            min-height: auto;
          }
          
          .p-img-box {
            width: 100%;
            min-height: 90px;
            flex: none;
          }
          
          .modal-content {
            flex-direction: column;
            height: 85vh;
            max-height: none;
          }
          
          .modal-left {
            flex: 1;
            min-height: 150px;
          }
          
          .modal-right {
            flex: 1;
            padding: 1rem !important;
            overflow-y: auto;
          }
          
          .modal-right h2 {
            font-size: 1.1rem !important;
            margin: 0 0 0.5rem 0 !important;
          }
          
          .modal-right button {
            padding: 0.6rem !important;
            font-size: 0.85rem !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .p-card,
          .tab-btn {
            transition: none;
          }
          .p-card:hover {
            transform: none;
            box-shadow: none;
          }
        }
      ` }} />

      <section className="p-container" id="products" role="region" aria-label="Product Center">
        <div className="section-header">
          <h2 id="product-title">Product Center</h2>
          <div className="category-desc" id="catTagline">{data?.tagline}</div>
        </div>
        
        <div className="tabs-nav" role="tablist" aria-label="Product categories">
          {products.map((cat, i) => (
            <button 
              key={cat.category}
              type="button" 
              className={`tab-btn ${activeCategory === i ? 'active' : ''}`} 
              role="tab" 
              aria-selected={activeCategory === i}
              onClick={() => setActiveCategory(i)}
            >
              {cat.category}
            </button>
          ))}
        </div>
        
        <div className="grid-gallery" id="galleryGrid" role="list">
          {data && (
            <>
              <button type="button" className="main-feat-card" onClick={goToContact} aria-label={`Inquire about ${data.category}`}>
                <img src={catMainImg} alt={data.category} width="800" height="450" loading="lazy" decoding="async" />
              </button>
              {data.items.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="p-card"
                  aria-label={`View details for ${item.title}`}
                  onClick={() => openModal(item)}
                >
                  <div className="p-img-box">
                    <img src={item.img} alt={item.title} width="120" height="80" loading="lazy" decoding="async" />
                  </div>
                  <div className="p-info-box">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <div className="btn-sm" aria-hidden="true">Inquiry</div>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      </section>

      {selectedItem && (
        <div className="modal-overlay" id="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal} aria-label="Close details" style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '30px', color: '#333', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10 }}>&times;</button>
            <div className="modal-left" style={{ flex: 1, background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img id="modalImg" src={selectedItem.img} alt={selectedItem.title} style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} width="400" height="300" />
            </div>
            <div className="modal-right" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <h2 id="modalTitle" style={{ margin: '0 0 0.8rem 0', fontSize: '1.4rem' }}>{selectedItem.title}</h2>
              <div id="modalLongDesc" style={{ color: '#444', fontSize: '0.85rem', marginBottom: '1.2rem', lineHeight: 1.8, borderLeft: '3px solid var(--zx-primary)', paddingLeft: '1rem', whiteSpace: 'pre-line' }}>
                {selectedItem.longDesc}
              </div>
              <button onClick={goToContact} style={{ background: 'var(--zx-primary)', color: '#fff', border: 'none', padding: '0.8rem', fontWeight: 900, cursor: 'pointer', marginTop: 'auto', borderRadius: '4px', textTransform: 'uppercase' }}>INQUIRE NOW</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCenter;
