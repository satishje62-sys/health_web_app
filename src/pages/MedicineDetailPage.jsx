import React, { useState } from 'react';
import { 
  Plus, Search, MapPin, Heart, Bell, ChevronRight, ChevronDown, 
  ShieldCheck, Calendar, Bookmark, ShoppingBag, Pill, Atom, Package, 
  Check, Store, Map, Star, User, Headphones, CreditCard, Home, FileText, 
  Sparkles, ExternalLink, ThumbsUp
} from 'lucide-react';
import './MedicineDetailPage.css';

export default function MedicineDetailPage({ medicine, user, onNavigateToPage, onSelectMedicine }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'pharmacies' | 'reviews' | 'similar'
  const [isSaved, setIsSaved] = useState(false);
  const [reservedSuccess, setReservedSuccess] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);

  const defaultPrecautions = [
    'Do not exceed the recommended dose.',
    'Avoid alcohol while taking this medicine.',
    'Consult a doctor if you have liver or kidney disease.'
  ];

  // Robust merged medicine object with default fallbacks for all fields
  const medData = {
    id: medicine?.id || 'crocin-650',
    title: medicine?.title || 'Crocin 650 Tablet',
    manufacturer: medicine?.manufacturer || 'GlaxoSmithKline Pharmaceuticals Ltd.',
    trusted: medicine?.trusted ?? true,
    form: medicine?.form || 'Tablet',
    strength: medicine?.strength || '650 mg',
    packSize: medicine?.packSize || '15 Tablets',
    inStock: medicine?.inStock ?? true,
    pharmaciesCount: medicine?.pharmaciesCount || 8,
    mrp: medicine?.mrp || medicine?.price || '₹42.50',
    discount: medicine?.discount || 'You Save ₹6.50 (13%)',
    composition: medicine?.composition || 'Paracetamol IP 650 mg\nExcipients q.s.',
    uses: medicine?.uses || 'Crocin 650 Tablet is used to relieve pain and reduce fever. It is effective in conditions like headache, muscle pain, toothache, cold, and fever.',
    sideEffects: medicine?.sideEffects || 'Nausea, stomach discomfort, rash, or allergic reactions may occur in some individuals. Consult your doctor if any side effect persists.',
    precautions: (medicine?.precautions && Array.isArray(medicine.precautions)) ? medicine.precautions : defaultPrecautions
  };

  const nearbyPharmacies = [
    { name: 'MedPlus Pharmacy', distance: '0.3 km away', status: 'In Stock', phone: '+91 98765 11111' },
    { name: 'Shivam Medical Store', distance: '0.5 km away', status: 'In Stock', phone: '+91 98765 22222' },
    { name: 'HealthCare Pharmacy', distance: '0.7 km away', status: 'In Stock', phone: '+91 98765 33333' }
  ];

  const similarMedicines = [
    {
      id: 'calpol-650',
      title: 'Calpol 650 Tablet',
      manufacturer: 'GSK Pharma',
      price: '₹40.00',
      bgClass: 'calpol'
    },
    {
      id: 'dolo-650',
      title: 'Dolo 650 Tablet',
      manufacturer: 'Micro Labs',
      price: '₹38.50',
      bgClass: 'dolo'
    },
    {
      id: 'pacimol-650',
      title: 'Pacimol 650 Tablet',
      manufacturer: 'Cipla Ltd.',
      price: '₹39.00',
      bgClass: 'pacimol'
    }
  ];

  return (
    <div className="medicine-detail-layout">
      {/* HEADER NAVBAR */}
      <header className="detail-page-header">
        <div className="container header-container">
          <div className="brand-logo-group" onClick={() => onNavigateToPage('home')}>
            <div className="brand-logo-badge">
              <Plus className="brand-cross-icon" />
            </div>
            <span className="brand-logo-text">
              Medi<span className="text-green-bright">Near</span>
            </span>
          </div>

          {/* Location Selector */}
          <div className="location-pill">
            <MapPin size={16} className="text-blue" />
            <span>Bhagalpur, Bihar</span>
          </div>

          {/* Header Search Bar */}
          <div className="header-search-bar">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search medicines, brands..." />
          </div>

          {/* Right Action Icons */}
          <div className="header-right-actions">
            <button className="icon-action-btn" aria-label="Saved" onClick={() => onNavigateToPage('saved')}>
              <Heart size={20} className={isSaved ? 'text-red-fill' : ''} />
            </button>

            <button className="icon-action-btn" aria-label="Notifications">
              <Bell size={20} />
            </button>

            <div className="user-avatar-pill" onClick={() => onNavigateToPage('dashboard')}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                alt="User" 
                className="user-img"
              />
            </div>
          </div>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="container breadcrumb-wrapper">
        <span className="bc-link" onClick={() => onNavigateToPage('home')}>Home</span>
        <ChevronRight size={14} />
        <span className="bc-link" onClick={() => onNavigateToPage('medicine-search')}>Medicines</span>
        <ChevronRight size={14} />
        <span className="bc-link">Pain Relief</span>
        <ChevronRight size={14} />
        <span className="bc-current">{medData.title}</span>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="container detail-main-container">
        
        {/* TOP HERO PRODUCT CARD */}
        <div className="product-hero-card">
          {/* Left Product Image */}
          <div className="hero-product-image-box">
            <div className="crocin-box-mockup">
              <div className="crocin-pack-label">{medData.title}</div>
            </div>
            <div className="blister-strip-mockup">
              <div className="tablet-pill" /><div className="tablet-pill" /><div className="tablet-pill" />
              <div className="tablet-pill" /><div className="tablet-pill" />
            </div>
          </div>

          {/* Center Product Details */}
          <div className="hero-product-info">
            <h1 className="med-title">{medData.title}</h1>
            <div className="manufacturer-row">
              <span>by <strong className="text-blue">{medData.manufacturer}</strong></span>
              <span className="badge-trusted"><ShieldCheck size={14} /> Trusted</span>
            </div>

            {/* 3 Spec Pills */}
            <div className="specs-pills-row">
              <div className="spec-pill">
                <Pill size={16} className="text-blue" />
                <div className="spec-text">
                  <span className="val">{medData.form}</span>
                  <span className="lbl">Dosage Form</span>
                </div>
              </div>

              <div className="spec-pill">
                <Atom size={16} className="text-blue" />
                <div className="spec-text">
                  <span className="val">{medData.strength}</span>
                  <span className="lbl">Strength</span>
                </div>
              </div>

              <div className="spec-pill">
                <Package size={16} className="text-blue" />
                <div className="spec-text">
                  <span className="val">{medData.packSize}</span>
                  <span className="lbl">Pack Size</span>
                </div>
              </div>
            </div>

            {/* Stock Status Badge */}
            <div className="stock-availability-bar">
              <span className="stock-tag-green">In Stock</span>
              <span className="avail-pharmacies-text">Available in {medData.pharmaciesCount} nearby pharmacies</span>
            </div>

            {/* Action Buttons */}
            <div className="hero-cta-row">
              <button className="btn-reserve-now" onClick={() => setShowReserveModal(true)}>
                <Calendar size={18} /> Reserve Now
              </button>
              <button 
                className={`btn-buy-later ${isSaved ? 'saved' : ''}`}
                onClick={() => setIsSaved(!isSaved)}
              >
                <Bookmark size={18} /> {isSaved ? 'Saved in Wishlist' : 'Buy Later'}
              </button>
            </div>
          </div>

          {/* Right MRP Pricing Card */}
          <div className="hero-mrp-card">
            <span className="mrp-lbl">MRP</span>
            <h2 className="mrp-value">{medData.mrp}</h2>
            <span className="mrp-taxes-text">Inclusive of all taxes</span>

            <div className="savings-badge-card">
              <span>{medData.discount}</span>
            </div>
          </div>
        </div>

        {/* TAB BAR NAVIGATION */}
        <div className="detail-tabs-bar">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FileText size={18} /> Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pharmacies' ? 'active' : ''}`}
            onClick={() => setActiveTab('pharmacies')}
          >
            <Store size={18} /> Nearby Pharmacies
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <Star size={18} /> Reviews (128)
          </button>
          <button 
            className={`tab-btn ${activeTab === 'similar' ? 'active' : ''}`}
            onClick={() => setActiveTab('similar')}
          >
            <Sparkles size={18} /> Similar Medicines
          </button>
        </div>

        {/* MIDDLE OVERVIEW SPLIT SECTION */}
        <div className="overview-split-grid">
          
          {/* LEFT ACCORDIONS COLUMN */}
          <div className="medical-info-column">
            
            {/* 1. Composition */}
            <div className="medical-info-card">
              <div className="card-info-header">
                <div className="info-icon-box blue"><Atom size={20} /></div>
                <h3>Composition</h3>
                <ChevronDown size={18} className="arrow" />
              </div>
              <div className="card-info-body">
                <p>Paracetamol IP 650 mg</p>
                <p className="text-muted">Excipients q.s.</p>
              </div>
            </div>

            {/* 2. Uses */}
            <div className="medical-info-card">
              <div className="card-info-header">
                <div className="info-icon-box green"><ShieldCheck size={20} /></div>
                <h3>Uses</h3>
                <ChevronDown size={18} className="arrow" />
              </div>
              <div className="card-info-body">
                <p>{medData.uses}</p>
              </div>
            </div>

            {/* 3. Side Effects */}
            <div className="medical-info-card">
              <div className="card-info-header">
                <div className="info-icon-box red"><Plus size={20} className="rotate-45" /></div>
                <h3>Side Effects</h3>
                <ChevronDown size={18} className="arrow" />
              </div>
              <div className="card-info-body">
                <p>{medData.sideEffects}</p>
              </div>
            </div>

            {/* 4. Precautions */}
            <div className="medical-info-card">
              <div className="card-info-header">
                <div className="info-icon-box orange"><ShieldCheck size={20} /></div>
                <h3>Precautions</h3>
                <ChevronDown size={18} className="arrow" />
              </div>
              <div className="card-info-body">
                <ul className="precautions-list">
                  {medData.precautions && medData.precautions.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT NEARBY PHARMACIES & MAP COLUMN */}
          <div className="pharmacies-map-column">
            
            {/* Nearby Pharmacies Card */}
            <div className="sidebar-widget-card">
              <div className="widget-header">
                <h3>Nearby Pharmacies (8)</h3>
              </div>
              
              <div className="pharmacy-mini-list">
                {nearbyPharmacies.map((pharm, idx) => (
                  <div key={idx} className="pharmacy-mini-item">
                    <div className="pharm-text-info">
                      <h4>{pharm.name}</h4>
                      <span className="dist">{pharm.distance}</span>
                    </div>
                    <span className="stock-green-badge">{pharm.status}</span>
                  </div>
                ))}
              </div>

              <button className="link-view-pharmacies" onClick={() => setActiveTab('pharmacies')}>
                View all pharmacies <ChevronRight size={14} />
              </button>
            </div>

            {/* Find on Map Card */}
            <div className="sidebar-widget-card">
              <div className="widget-header">
                <h3>Find on Map</h3>
              </div>

              <div className="interactive-map-preview">
                <svg viewBox="0 0 300 160" fill="none" className="map-svg">
                  <rect width="300" height="160" fill="#EBF3FF" />
                  <path d="M0 60 Q 150 20, 300 100" stroke="#CBD5E1" strokeWidth="12" />
                  <path d="M80 0 Q 120 100, 220 160" stroke="#CBD5E1" strokeWidth="10" />
                </svg>
                {/* 3 Red Map Pins */}
                <div className="map-pin-red pin1" style={{ top: '25%', right: '35%' }}><MapPin size={16} /></div>
                <div className="map-pin-red pin2" style={{ top: '45%', left: '20%' }}><MapPin size={16} /></div>
                <div className="map-pin-red pin3" style={{ bottom: '30%', right: '20%' }}><MapPin size={16} /></div>
                {/* User Blue Location Dot */}
                <div className="user-location-dot" style={{ top: '55%', left: '45%' }} />
              </div>

              <button className="btn-open-google-maps" onClick={() => alert('Opening Google Maps Location Sync...')}>
                <Map size={16} /> Open in Google Maps
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: SIMILAR MEDICINES & CUSTOMER REVIEWS */}
        <div className="bottom-detail-grid">
          
          {/* SIMILAR MEDICINES CAROUSEL/GRID */}
          <div className="similar-medicines-section">
            <div className="section-header-row">
              <h3>Similar Medicines</h3>
              <button className="link-view-all" onClick={() => onNavigateToPage('medicine-search')}>View all</button>
            </div>

            <div className="similar-cards-grid">
              {similarMedicines.map((sim) => (
                <div key={sim.id} className="similar-medicine-card">
                  <div className="sim-image-box">
                    <div className={`sim-pack-mock ${sim.bgClass}`}>
                      <span>{sim.title}</span>
                    </div>
                  </div>
                  <div className="sim-info">
                    <h4>{sim.title}</h4>
                    <span className="mfg">{sim.manufacturer}</span>
                    <div className="sim-price-row">
                      <span className="price">{sim.price}</span>
                      <button className="btn-heart-icon" aria-label="Save"><Heart size={16} /></button>
                    </div>
                    <button 
                      className="btn-view-details"
                      onClick={() => {
                        if (onSelectMedicine) onSelectMedicine(sim);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CUSTOMER REVIEWS */}
          <div className="customer-reviews-section">
            <div className="section-header-row">
              <h3>Customer Reviews</h3>
            </div>

            <div className="reviews-summary-wrapper">
              <div className="score-big">4.6</div>
              <div className="stars-and-count">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < 4 ? 'star-filled' : 'star-empty'} />
                  ))}
                </div>
                <span className="reviews-count-lbl">Based on 128 reviews</span>
              </div>
            </div>

            {/* Rating Bars */}
            <div className="rating-bars-list">
              <div className="r-bar-item"><span>5★</span><div className="bar-bg"><div className="bar-fill" style={{ width: '84%' }} /></div><span>84%</span></div>
              <div className="r-bar-item"><span>4★</span><div className="bar-bg"><div className="bar-fill" style={{ width: '10%' }} /></div><span>10%</span></div>
              <div className="r-bar-item"><span>3★</span><div className="bar-bg"><div className="bar-fill" style={{ width: '4%' }} /></div><span>4%</span></div>
              <div className="r-bar-item"><span>2★</span><div className="bar-bg"><div className="bar-fill" style={{ width: '1%' }} /></div><span>1%</span></div>
              <div className="r-bar-item"><span>1★</span><div className="bar-bg"><div className="bar-fill" style={{ width: '1%' }} /></div><span>1%</span></div>
            </div>

            {/* Verified Review Comment */}
            <div className="review-comment-card">
              <div className="reviewer-header">
                <div className="reviewer-avatar">RA</div>
                <div className="reviewer-info">
                  <div className="reviewer-name-row">
                    <span className="r-name">Rahul Kumar</span>
                    <span className="r-verified"><Check size={12} /> Verified Buyer</span>
                  </div>
                  <div className="r-stars">★★★★★ <span className="r-date">2 days ago</span></div>
                </div>
              </div>
              <p className="review-text">"Very effective for fever and headache. Works quickly. Recommended!"</p>
            </div>

            <button className="link-view-reviews">
              View all reviews <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* PAGE BOTTOM FEATURE BAR (4 PILLS) */}
        <div className="detail-bottom-feature-bar">
          <div className="feature-pill-item">
            <div className="f-icon blue"><ShieldCheck size={20} /></div>
            <div className="f-text">
              <h4>100% Authentic</h4>
              <p>Genuine medicines</p>
            </div>
          </div>

          <div className="feature-pill-item">
            <div className="f-icon blue"><Calendar size={20} /></div>
            <div className="f-text">
              <h4>Easy Reservation</h4>
              <p>Reserve in 30 seconds</p>
            </div>
          </div>

          <div className="feature-pill-item">
            <div className="f-icon blue"><CreditCard size={20} /></div>
            <div className="f-text">
              <h4>Secure Payments</h4>
              <p>Safe & secure checkout</p>
            </div>
          </div>

          <div className="feature-pill-item">
            <div className="f-icon blue"><Headphones size={20} /></div>
            <div className="f-text">
              <h4>24x7 Support</h4>
              <p>We're here to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE / WEB BOTTOM NAV FOOTER BAR */}
      <footer className="detail-mobile-footer-nav">
        <div className="footer-nav-container">
          <button className="mobile-nav-btn active" onClick={() => onNavigateToPage('home')}>
            <Home size={20} />
            <span>Home</span>
          </button>
          <button className="mobile-nav-btn" onClick={() => onNavigateToPage('medicine-search')}>
            <Search size={20} />
            <span>Search</span>
          </button>
          <button className="mobile-nav-btn" onClick={() => onNavigateToPage('saved')}>
            <Package size={20} />
            <span>Orders</span>
          </button>
          <button className="mobile-nav-btn" onClick={() => onNavigateToPage('health-tips')}>
            <FileText size={20} />
            <span>Health Tips</span>
          </button>
          <button className="mobile-nav-btn" onClick={() => onNavigateToPage('dashboard')}>
            <User size={20} />
            <span>Profile</span>
          </button>
        </div>

        <div className="detail-copyright-line">
          © 2025 MediNear. All rights reserved. • About Us • Privacy Policy • Terms & Conditions
        </div>
      </footer>

      {/* Reservation Modal */}
      {showReserveModal && (
        <div className="modal-backdrop" onClick={() => setShowReserveModal(false)}>
          <div className="reserve-modal-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={() => setShowReserveModal(false)}>✕</button>
            
            {reservedSuccess ? (
              <div className="reserve-success-state">
                <Check size={48} className="text-green" />
                <h3>Reservation Confirmed!</h3>
                <p><strong>{medData.title}</strong> is reserved at <strong>MedPlus Pharmacy</strong> for 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="modal-title">Reserve {medData.title}</h3>
                <p className="modal-desc">Instant free reservation at nearest pharmacy.</p>
                <div className="res-details">
                  <div><span>Price:</span> <strong>{medData.mrp}</strong></div>
                  <div><span>Pharmacies Available:</span> <span>{medData.pharmaciesCount} pharmacies</span></div>
                </div>
                <button className="btn-confirm-reserve" onClick={() => { setReservedSuccess(true); setTimeout(() => setShowReserveModal(false), 1500); }}>
                  Confirm Reservation Now
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
