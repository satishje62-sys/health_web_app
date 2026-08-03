import React, { useState } from 'react';
import { Smartphone, QrCode, CheckCircle, Pill, Heart, Thermometer, Shield } from 'lucide-react';
import './AppDownloadBanner.css';

export default function AppDownloadBanner() {
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <section className="app-download-section">
      <div className="container">
        <div className="app-banner-card">
          {/* Left Column: Copy & Store Buttons */}
          <div className="banner-left">
            <h2 className="banner-title">
              Get <span className="text-blue">Medi</span><span className="text-green">Near</span> App
            </h2>
            <p className="banner-subtitle">
              Faster. Smarter. Closer to your health. Download the app now!
            </p>

            <div className="store-buttons-row">
              {/* Google Play Store Badge Button */}
              <a 
                href="#download-playstore" 
                className="store-badge-btn"
                onClick={(e) => { e.preventDefault(); setShowQrModal(true); }}
              >
                <svg viewBox="0 0 24 24" className="store-icon" fill="currentColor">
                  <path d="M3.6 1.8l12.4 10.2-3.1 3.1-9.3-13.3zm0 20.4v-20.4l10.2 10.2-10.2 10.2zm11.4-9.1l2.5 1.5-12.8 7.6 10.3-9.1zm3.1-2.1l2.3 1.4c.5.3.5 1 0 1.3l-2.3 1.4-2.8-2.8 2.8-1.3z"/>
                </svg>
                <div className="store-text">
                  <span className="store-tag">GET IT ON</span>
                  <span className="store-name">Google Play</span>
                </div>
              </a>

              {/* Apple App Store Badge Button */}
              <a 
                href="#download-appstore" 
                className="store-badge-btn"
                onClick={(e) => { e.preventDefault(); setShowQrModal(true); }}
              >
                <svg viewBox="0 0 24 24" className="store-icon" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.35c.67-.82 1.13-1.97.99-3.12-1 .04-2.19.67-2.9 1.5-.63.74-1.19 1.91-1.04 3.04 1.12.09 2.27-.58 2.95-1.42z"/>
                </svg>
                <div className="store-text">
                  <span className="store-tag">Download on the</span>
                  <span className="store-name">App Store</span>
                </div>
              </a>
            </div>
          </div>

          {/* Center Column: Phone Mockup Frame */}
          <div className="banner-center">
            <div className="phone-mockup-frame">
              {/* Top Notch */}
              <div className="phone-notch">
                <span className="notch-time">11:41</span>
                <div className="notch-camera" />
              </div>

              {/* Screen Content inside phone */}
              <div className="phone-screen-content">
                <div className="phone-app-header">
                  <div className="phone-logo">
                    <span className="p-blue">Medi</span><span className="p-green">Near</span>
                  </div>
                  <div className="phone-location-bar">
                    <span className="loc-label">Deliver to:</span>
                    <span className="loc-address">Home - MG Road, Bangalore</span>
                  </div>
                </div>

                <div className="phone-search-input">
                  <span className="placeholder">Search medicine...</span>
                </div>

                <div className="phone-categories-header">
                  <span>Categories</span>
                  <span className="link-view">View All</span>
                </div>

                {/* 4 Category Pill Mockups matching Figma */}
                <div className="phone-categories-grid">
                  <div className="phone-cat-card">
                    <div className="cat-icon pink"><Pill size={16} /></div>
                    <span>Pain Relief</span>
                  </div>
                  <div className="phone-cat-card">
                    <div className="cat-icon blue"><Heart size={16} /></div>
                    <span>Vitamins</span>
                  </div>
                  <div className="phone-cat-card">
                    <div className="cat-icon green"><Thermometer size={16} /></div>
                    <span>Cold & Flu</span>
                  </div>
                  <div className="phone-cat-card">
                    <div className="cat-icon orange"><Shield size={16} /></div>
                    <span>Baby Care</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: QR Code Card */}
          <div className="banner-right">
            <div className="qr-code-card" onClick={() => setShowQrModal(true)}>
              {/* Genuine SVG QR Code Pattern */}
              <svg className="qr-code-svg" viewBox="0 0 100 100" fill="none">
                <rect x="5" y="5" width="30" height="30" rx="4" stroke="#0F172A" strokeWidth="4"/>
                <rect x="12" y="12" width="16" height="16" fill="#1E60D5" rx="2"/>
                <rect x="65" y="5" width="30" height="30" rx="4" stroke="#0F172A" strokeWidth="4"/>
                <rect x="72" y="12" width="16" height="16" fill="#1E60D5" rx="2"/>
                <rect x="5" y="65" width="30" height="30" rx="4" stroke="#0F172A" strokeWidth="4"/>
                <rect x="12" y="72" width="16" height="16" fill="#00C853" rx="2"/>
                
                {/* Micro blocks */}
                <rect x="42" y="10" width="8" height="8" fill="#0F172A"/>
                <rect x="52" y="18" width="8" height="8" fill="#00C853"/>
                <rect x="42" y="26" width="8" height="8" fill="#1E60D5"/>
                <rect x="10" y="42" width="8" height="8" fill="#0F172A"/>
                <rect x="22" y="48" width="8" height="8" fill="#1E60D5"/>
                <rect x="42" y="42" width="16" height="16" fill="#0F172A" rx="2"/>
                <rect x="65" y="42" width="10" height="10" fill="#00C853"/>
                <rect x="80" y="48" width="12" height="12" fill="#0F172A"/>
                <rect x="42" y="65" width="10" height="10" fill="#1E60D5"/>
                <rect x="58" y="72" width="14" height="14" fill="#0F172A" rx="2"/>
                <rect x="78" y="78" width="14" height="14" fill="#00C853" rx="2"/>
              </svg>
              <span className="qr-scan-label">Scan to Download</span>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQrModal && (
        <div className="modal-backdrop" onClick={() => setShowQrModal(false)}>
          <div className="qr-modal-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={() => setShowQrModal(false)}>✕</button>
            <h3>Scan QR Code to Install</h3>
            <p>Point your mobile phone camera at the QR code to instantly download the MediNear app.</p>
            <div className="large-qr-wrapper">
              <QrCode size={160} className="text-blue" />
            </div>
            <div className="badge-verified">
              <CheckCircle size={16} className="text-green" /> Available for iOS & Android
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
