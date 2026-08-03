import React, { useState } from 'react';
import { 
  Plus, Search, MapPin, Bell, ChevronDown, Store, Phone, Navigation, 
  ArrowRight, Filter, RotateCcw, ChevronLeft, ChevronRight, ShieldCheck, 
  Truck, Clock, Star, Home, Building2, Pill, Activity, User, SlidersHorizontal 
} from 'lucide-react';
import './PharmaciesListPage.css';

export default function PharmaciesListPage({ user, onNavigateToPage, onSelectPharmacy }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [distanceKm, setDistanceKm] = useState(5);
  const [openNowOnly, setOpenNowOnly] = useState(true);
  const [twentyFourHoursOnly, setTwentyFourHoursOnly] = useState(false);
  const [deliveryAvailable, setDeliveryAvailable] = useState(false);
  const [selectedRating, setSelectedRating] = useState('4.0+');
  const [sortBy, setSortBy] = useState('Nearest');
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const pharmaciesData = [
    {
      id: 'wellcare-pharmacy',
      name: 'WellCare Pharmacy & Diagnostic',
      rating: 4.7,
      reviewsCount: '420 reviews',
      distance: '0.3 km away',
      address: 'Boring Road, Near Panch Mukhi Mandir, Patna - 800001',
      status: 'Open until 10:00 PM',
      isOpen: true,
      delivery: 'Home Delivery Available (30 Mins)',
      phone: '+91 98765 11111',
      discount: 'Flat 15% Off',
      image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'apollo-pharmacy',
      name: 'Apollo Pharmacy 24x7',
      rating: 4.5,
      reviewsCount: '850 reviews',
      distance: '0.6 km away',
      address: 'Kankarbagh Main Road, Opposite Metro Pillar 42, Patna - 800020',
      status: 'Open 24 Hours',
      isOpen: true,
      delivery: 'Express 24x7 Delivery Available',
      phone: '+91 98765 22222',
      discount: 'Flat 20% Off on Medicines',
      image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'medplus-pharmacy',
      name: 'MedPlus Pharmacy',
      rating: 4.3,
      reviewsCount: '310 reviews',
      distance: '0.8 km away',
      address: 'Rajendra Nagar, Opposite Big Bazaar, Patna - 800016',
      status: 'Open until 11:00 PM',
      isOpen: true,
      delivery: 'Home Delivery Available',
      phone: '+91 98765 33333',
      discount: 'Buy 2 Get 1 Free on Wellness',
      image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'healthfirst-chemist',
      name: 'HealthFirst Chemist & Druggist',
      rating: 4.2,
      reviewsCount: '195 reviews',
      distance: '1.2 km away',
      address: 'Bailey Road, Near High Court, Patna - 800001',
      status: 'Open until 9:30 PM',
      isOpen: true,
      delivery: 'Store Pickup Available',
      phone: '+91 98765 44444',
      discount: '10% Member Discount',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'sunrise-medical',
      name: 'Sunrise Medical Store',
      rating: 4.1,
      reviewsCount: '140 reviews',
      distance: '1.5 km away',
      address: 'Exhibition Road, Near Hotel Maurya, Patna - 800001',
      status: 'Opens Tomorrow 8:00 AM',
      isOpen: false,
      delivery: 'Generic Medicines Specialist',
      phone: '+91 98765 55555',
      discount: 'Up to 50% Off on Generic',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=80'
    }
  ];

  const resetFilters = () => {
    setDistanceKm(5);
    setOpenNowOnly(true);
    setTwentyFourHoursOnly(false);
    setDeliveryAvailable(false);
    setSelectedRating('4.0+');
  };

  const handlePharmacyClick = (pharmacy) => {
    if (onSelectPharmacy) {
      onSelectPharmacy(pharmacy);
    }
  };

  return (
    <div className="pharmacies-list-layout">
      {/* TOP HEADER BAR */}
      <header className="pharmacies-header">
        <div className="container header-content">
          {/* Logo */}
          <div className="brand-logo-group" onClick={() => onNavigateToPage('home')}>
            <div className="brand-logo-badge">
              <Plus className="brand-cross-icon" />
            </div>
            <span className="brand-logo-text">
              Medi<span className="text-green-bright">Near</span>
            </span>
          </div>

          {/* Global Search Bar */}
          <div className="header-search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search pharmacies, locations, medicines..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Right Header Nav Links */}
          <nav className="header-nav-links">
            <button onClick={() => onNavigateToPage('home')} className="nav-link-btn">
              <Home size={18} /> Home
            </button>
            <button className="nav-link-btn active">
              <Store size={18} /> Pharmacies
            </button>
            <button onClick={() => onNavigateToPage('hospitals')} className="nav-link-btn">
              <Building2 size={18} /> Hospitals
            </button>
            <button onClick={() => onNavigateToPage('medicine-search')} className="nav-link-btn">
              <Pill size={18} /> Medicines
            </button>

            <button className="bell-icon-btn">
              <Bell size={20} />
              <span className="bell-dot" />
            </button>

            <div className="user-profile-avatar" onClick={() => onNavigateToPage('dashboard')}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                alt="User Avatar" 
              />
            </div>
          </nav>
        </div>
      </header>

      {/* HERO TITLE SECTION */}
      <div className="container pharmacies-hero-section">
        <div className="title-area">
          <h1 className="page-main-title">Find Nearby Pharmacies & Medical Stores</h1>
          <p className="page-subtitle">Locate verified pharmacies near you for instant medicine pickup & home delivery.</p>
        </div>
        <div className="location-info-badge">
          <span>Showing 24 pharmacies near <strong>Patna, Bihar</strong></span>
          <MapPin size={16} className="text-blue" />
        </div>
      </div>

      {/* MAIN CONTAINER: SIDEBAR FILTERS + PHARMACIES LIST */}
      <div className="container main-pharmacies-container">
        
        {/* LEFT SIDEBAR FILTERS PANEL */}
        <aside className="filters-sidebar">
          <div className="filters-sidebar-header">
            <h3>Filters</h3>
            <button className="btn-reset-link" onClick={resetFilters}>Reset</button>
          </div>

          {/* Filter 1: Distance Slider */}
          <div className="filter-block">
            <div className="label-with-value">
              <label className="filter-label">Distance</label>
              <span className="val-badge">Within {distanceKm} km</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="15" 
              value={distanceKm} 
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="distance-range-slider"
            />
            <div className="range-min-max">
              <span>0 km</span>
              <span>15 km</span>
            </div>
          </div>

          {/* Filter 2: Open Status */}
          <div className="filter-block">
            <label className="filter-label">Status</label>
            <div className="checkbox-list">
              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={openNowOnly} 
                  onChange={(e) => setOpenNowOnly(e.target.checked)}
                />
                <span>Open Now Only</span>
              </label>
              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={twentyFourHoursOnly} 
                  onChange={(e) => setTwentyFourHoursOnly(e.target.checked)}
                />
                <span>24 Hours Open</span>
              </label>
            </div>
          </div>

          {/* Filter 3: Services Offered */}
          <div className="filter-block">
            <label className="filter-label">Services Offered</label>
            <div className="checkbox-list">
              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={deliveryAvailable}
                  onChange={(e) => setDeliveryAvailable(e.target.checked)}
                />
                <span>Home Delivery Available</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" />
                <span>Prescription Pickup</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" />
                <span>Generic Medicines Available</span>
              </label>
            </div>
          </div>

          {/* Filter 4: Rating */}
          <div className="filter-block">
            <label className="filter-label">Rating</label>
            <div className="rating-pills-grid">
              {['4.0+', '3.5+', '3.0+'].map((rate) => (
                <button 
                  key={rate}
                  className={`rating-pill-btn ${selectedRating === rate ? 'active' : ''}`}
                  onClick={() => setSelectedRating(rate)}
                >
                  {rate} ★
                </button>
              ))}
            </div>
          </div>

          {/* Apply Filters Button */}
          <button className="btn-apply-filters" onClick={() => alert('Pharmacy filters applied!')}>
            <Filter size={16} /> Apply Filters
          </button>
        </aside>

        {/* RIGHT MAIN PHARMACY CARDS STACK */}
        <main className="pharmacies-main-content">
          
          {/* SORT CONTROLS BAR */}
          <div className="sort-controls-bar">
            <div className="sort-dropdown-box">
              <span>Sort by: </span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="Nearest">Nearest Distance</option>
                <option value="Rating">Highest Rated</option>
                <option value="Discount">Best Offers</option>
              </select>
              <ChevronDown size={14} />
            </div>

            <button className="btn-mobile-filter" aria-label="Filters">
              <SlidersHorizontal size={18} />
            </button>
          </div>

          {/* 5 PHARMACY ITEM CARDS */}
          <div className="pharmacies-cards-list">
            {pharmaciesData.map((pharmacy) => (
              <div 
                key={pharmacy.id} 
                className="pharmacy-item-card"
                onClick={() => handlePharmacyClick(pharmacy)}
              >
                
                {/* Left Pharmacy Shop Image */}
                <div className="pharmacy-img-wrapper">
                  <img src={pharmacy.image} alt={pharmacy.name} />
                  {pharmacy.discount && (
                    <span className="offer-tag-badge">{pharmacy.discount}</span>
                  )}
                </div>

                {/* Center Pharmacy Details */}
                <div className="pharmacy-details-col">
                  <div className="title-row">
                    <h2 className="pharmacy-name">{pharmacy.name}</h2>
                    <ShieldCheck size={18} className="verified-green" />
                    <span className="dist-right-tag"><MapPin size={14} /> {pharmacy.distance}</span>
                  </div>

                  <div className="rating-row">
                    <span className="rating-num">{pharmacy.rating}</span>
                    <div className="stars-group">★★★★★</div>
                    <span className="reviews-txt">({pharmacy.reviewsCount})</span>
                  </div>

                  <div className="address-row">
                    <MapPin size={14} className="text-gray" />
                    <span>{pharmacy.address}</span>
                  </div>

                  <div className="status-delivery-row">
                    <span className={`status-pill ${pharmacy.isOpen ? 'open' : 'closed'}`}>
                      <Clock size={12} /> {pharmacy.status}
                    </span>
                    <span className="delivery-pill">
                      <Truck size={12} /> {pharmacy.delivery}
                    </span>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="pharmacy-actions-col">
                  <div className="top-actions-row">
                    <button 
                      className="btn-pharmacy-call" 
                      onClick={(e) => { e.stopPropagation(); alert(`Calling ${pharmacy.name} at ${pharmacy.phone}...`); }}
                    >
                      <Phone size={14} /> Call
                    </button>
                    <button 
                      className="btn-pharmacy-directions"
                      onClick={(e) => { e.stopPropagation(); alert(`Opening Directions to ${pharmacy.name}...`); }}
                    >
                      <Navigation size={14} /> Directions
                    </button>
                  </div>

                  <button className="btn-view-shop">
                    View Shop <ArrowRight size={16} />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* BOTTOM PAGINATION BAR */}
          <div className="pharmacies-pagination-bar">
            <div className="pagination-controls">
              <button className="btn-page-arrow" disabled={currentPageNum === 1} onClick={() => setCurrentPageNum(p => p - 1)}>
                <ChevronLeft size={16} />
              </button>
              
              {[1, 2, 3, 4, 5].map(num => (
                <button 
                  key={num}
                  className={`btn-page-num ${currentPageNum === num ? 'active' : ''}`}
                  onClick={() => setCurrentPageNum(num)}
                >
                  {num}
                </button>
              ))}
              
              <button className="btn-page-arrow" onClick={() => setCurrentPageNum(p => p + 1)}>
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="pagination-count-text">
              Showing 1 to 5 of 24 pharmacies
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}
