'use client';

import React, { useState, useEffect } from 'react';

export const ContactForm: React.FC = () => {
  const [inquiryType, setInquiryType] = useState<'contact' | 'quote' | 'sample'>('contact');
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [labelType, setLabelType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [specs, setSpecs] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-focus logic or URL hash check to switch form types on hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#contact' || hash === '#inquiry') {
        setInquiryType('contact');
      } else if (hash === '#quote') {
        setInquiryType('quote');
      } else if (hash === '#sample') {
        setInquiryType('sample');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !contactMethod.trim() || !labelType || !quantity) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: inquiryType,
          clientName: name,
          contactMethod,
          productCategory: labelType,
          quantity: parseInt(quantity, 10) || 10000,
          technicalSpecs: specs,
        }),
      });

      if (res.ok) {
        // Redirect to thank you page
        window.location.href = "/thank-you";
      } else {
        const errData = await res.json();
        setErrorMessage(errData?.error || "Submission failed. Please try WhatsApp.");
        setIsSubmitting(false);
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again or contact via WhatsApp.");
      setIsSubmitting(false);
    }
  };

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
        
        .zx-contact-section { 
          width: 100% !important; 
          max-width: 100% !important; 
          margin: 0 auto; 
          padding: 4rem 4%; 
          display: flex; 
          gap: 3rem; 
          box-sizing: border-box; 
          background: #fff; 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
        }
        
        .contact-info-panel { flex: 1; }
        
        .contact-info-panel h2 { 
          font-size: 2.2rem; 
          font-weight: 900; 
          color: var(--zx-text-main); 
          margin-bottom: 1.2rem; 
          line-height: 1.1; 
        }
        
        .contact-info-panel h2 span { 
          color: var(--zx-primary); 
        }
        
        .contact-info-panel p { 
          font-size: 1rem; 
          color: var(--zx-text-body); 
          line-height: 1.7; 
          margin-bottom: 2rem; 
        }
        
        .contact-methods { 
          list-style: none; 
          padding: 0; 
          margin: 0; 
        }
        
        .method-item { 
          display: flex; 
          align-items: flex-start; 
          gap: 1rem; 
          margin-bottom: 1.5rem; 
        }
        
        .method-icon { 
          width: 2.5rem; 
          height: 2.5rem; 
          background: rgba(0, 155, 164, 0.08); 
          border-radius: 6px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: var(--zx-primary); 
          font-size: 1rem; 
          flex-shrink: 0;
        }
        
        .method-content b { 
          display: block; 
          font-size: 0.9rem; 
          color: var(--zx-text-main); 
          margin-bottom: 3px; 
        }
        
        .method-content span { 
          font-size: 0.85rem; 
          color: var(--zx-text-body); 
          line-height: 1.5; 
          display: block;
        }
        
        .method-content a { 
          color: inherit; 
          text-decoration: none; 
          transition: color 0.3s ease; 
        }
        
        .method-content a:hover { 
          color: var(--zx-primary); 
        }

        .contact-form-panel { 
          flex: 1.3; 
          background: #fff; 
          padding: 2.5rem; 
          border-radius: 8px; 
          box-shadow: 0 20px 60px rgba(0,0,0,0.05); 
          border: 1px solid #f0f0f0; 
        }

        /* Inquiry Tabs */
        .form-tabs {
          display: flex;
          gap: 5px;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #eee;
          padding-bottom: 8px;
        }
        .form-tab-btn {
          flex: 1;
          background: #f8f9fa;
          border: 1px solid #eee;
          padding: 8px;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s;
          text-transform: uppercase;
        }
        .form-tab-btn.active {
          background: var(--zx-primary);
          color: #fff;
          border-color: var(--zx-primary);
        }
        
        .quote-form { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 1.2rem; 
        }
        
        .form-group { 
          display: flex; 
          flex-direction: column; 
          gap: 0.5rem; 
        }
        
        .form-group label { 
          font-size: 0.7rem; 
          font-weight: 800; 
          color: #111; 
          text-transform: uppercase; 
          letter-spacing: 1px; 
        }
        
        .form-group input, .form-group select, .form-group textarea { 
          padding: 0.8rem 1rem; 
          border: 1px solid #e5e5e5; 
          border-radius: 4px; 
          font-size: 0.9rem; 
          background: var(--zx-light-bg); 
          transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
          touch-action: manipulation;
        }
        
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { 
          border-color: var(--zx-primary); 
          background: #fff; 
          outline: none; 
          box-shadow: 0 0 0 4px rgba(0, 129, 136, 0.1); 
        }
        
        .submit-btn { 
          grid-column: span 2; 
          background: var(--zx-primary); 
          color: #fff; 
          border: none; 
          padding: 1rem; 
          font-size: 0.9rem; 
          font-weight: 900; 
          cursor: pointer; 
          text-transform: uppercase; 
          margin-top: 0.5rem; 
          border-radius: 4px;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                      background-color 0.4s ease,
                      box-shadow 0.4s ease;
          box-shadow: 0 10px 20px rgba(0,129,136,0.2);
          will-change: transform;
        }
        
        .submit-btn:hover { 
          background: #006a70; 
          transform: translateY(-2px); 
        }
        
        .submit-btn:active {
          transform: translateY(0);
        }
        
        .submit-btn:disabled { 
          background: #ccc; 
          cursor: not-allowed; 
          transform: none;
          box-shadow: none;
        }

        .error-msg {
          grid-column: span 2;
          color: #dc3545;
          font-size: 0.8rem;
          font-weight: 700;
          margin-top: -5px;
        }

        @media (max-width: 1024px) { 
          .zx-contact-section { 
            flex-direction: column; 
            gap: 2.5rem; 
            padding: 2.5rem 5%;
          } 
          .contact-form-panel { 
            padding: 2rem; 
          }
          .quote-form { 
            grid-template-columns: 1fr; 
          } 
          .submit-btn { 
            grid-column: span 1; 
          } 
          .contact-info-panel h2 { 
            font-size: 1.8rem; 
          }
          .contact-info-panel p {
            font-size: 0.95rem;
          }
          .error-msg {
            grid-column: span 1;
          }
        }

        @media (max-width: 768px) {
          .zx-contact-section {
            padding: 2rem 5%;
            gap: 2rem;
          }
          .contact-info-panel h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }
          .contact-info-panel p {
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
          }
          .method-item {
            margin-bottom: 1.2rem;
          }
          .method-icon {
            width: 2.2rem;
            height: 2.2rem;
            font-size: 0.9rem;
          }
          .method-content b {
            font-size: 0.85rem;
          }
          .method-content span {
            font-size: 0.8rem;
          }
          .contact-form-panel {
            padding: 1.5rem;
            border-radius: 6px;
          }
          .quote-form {
            gap: 1rem;
          }
          .form-group label {
            font-size: 0.65rem;
          }
          .form-group input, 
          .form-group select, 
          .form-group textarea {
            padding: 0.7rem 0.9rem;
            font-size: 0.85rem;
          }
          .submit-btn {
            padding: 0.9rem;
            font-size: 0.85rem;
            margin-top: 0.3rem;
          }
        }

        @media (max-width: 480px) {
          .zx-contact-section {
            padding: 1.5rem 4%;
          }
          .contact-info-panel h2 {
            font-size: 1.35rem;
            line-height: 1.3;
          }
          .contact-info-panel h2 br {
            display: none;
          }
          .contact-info-panel h2 span {
            display: block;
            margin-top: 0.3rem;
          }
          .contact-form-panel {
            padding: 1.2rem;
          }
          .form-group input, 
          .form-group select, 
          .form-group textarea {
            width: 100%;
            box-sizing: border-box;
            font-size: 16px;
          }
          .form-group textarea {
            min-height: 100px;
          }
          .submit-btn {
            width: 100%;
            padding: 1rem;
            font-size: 0.8rem;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .submit-btn,
          .form-group input,
          .form-group select,
          .form-group textarea {
            transition: none;
          }
          .submit-btn:hover {
            transform: none;
          }
        }
      ` }} />

      <section className="zx-contact-section" id="contact" role="region" aria-labelledby="contact-heading">
        <div className="contact-info-panel">
          <h2 id="contact-heading">Ready for a <br /><span>Factory Quote?</span></h2>
          <p>Get technical support and direct factory pricing within 24 hours. We provide free swatch books for your quality verification.</p>
          
          <ul className="contact-methods" role="list">
            <li className="method-item" role="listitem">
              <div className="method-icon" aria-hidden="true">📍</div>
              <div className="method-content">
                <b>Factory Address</b>
                <span>Building 15, Ronghao Industrial Park, Gaoling District, Xi'an, China</span>
              </div>
            </li>
            <li className="method-item" role="listitem">
              <div className="method-icon" aria-hidden="true">💬</div>
              <div className="method-content">
                <b>WhatsApp / Phone</b>
                <span><a href="tel:+8618092117618">+86 180 9211 7618</a></span>
              </div>
            </li>
            <li className="method-item" role="listitem">
              <div className="method-icon" aria-hidden="true">✉️</div>
              <div className="method-content">
                <b>Email Address</b>
                <span><a href="mailto:Sales@zxpapers.com">Sales@zxpapers.com</a></span>
              </div>
            </li>
          </ul>
        </div>

        <div className="contact-form-panel">
          <div className="form-tabs">
            <button 
              type="button" 
              className={`form-tab-btn ${inquiryType === 'contact' ? 'active' : ''}`}
              onClick={() => setInquiryType('contact')}
            >
              Contact Us
            </button>
            <button 
              type="button" 
              className={`form-tab-btn ${inquiryType === 'quote' ? 'active' : ''}`}
              onClick={() => setInquiryType('quote')}
            >
              Get Quote
            </button>
            <button 
              type="button" 
              className={`form-tab-btn ${inquiryType === 'sample' ? 'active' : ''}`}
              onClick={() => setInquiryType('sample')}
            >
              Apply Sample
            </button>
          </div>

          <form className="quote-form" id="zxInquiryForm" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="full_name">Your Name</label>
              <input 
                type="text" 
                id="full_name" 
                placeholder="Full Name" 
                required 
                aria-required="true" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact_info">Email / WhatsApp</label>
              <input 
                type="text" 
                id="contact_info" 
                placeholder="Contact Detail" 
                required 
                aria-required="true" 
                value={contactMethod}
                onChange={(e) => setContactMethod(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="label_type">Label Type</label>
              <select 
                id="label_type" 
                required 
                aria-required="true"
                value={labelType}
                onChange={(e) => setLabelType(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Canning">Canning Roll Labels</option>
                <option value="Cosmetic">Cosmetic Stickers</option>
                <option value="Logistics">Logistics Labels</option>
                <option value="Special">Specialty Foil Labels</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="qty">Est. Quantity</label>
              <input 
                type="number" 
                id="qty" 
                placeholder="e.g. 10000" 
                required 
                aria-required="true" 
                min="1" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label htmlFor="specs">Requirements</label>
              <textarea 
                id="specs" 
                rows={4} 
                placeholder="Describe size, material, or application..."
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
              ></textarea>
            </div>
            {errorMessage && <div className="error-msg">{errorMessage}</div>}
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "SENDING..." : inquiryType === 'contact' ? "Send My Inquiry Now" : inquiryType === 'quote' ? "Request Instant Quote" : "Request Swatch Samples"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
