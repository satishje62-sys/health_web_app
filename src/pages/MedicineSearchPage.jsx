import React, { useState } from 'react';
import { 
  Plus, Search, MapPin, Bell, ChevronDown, RotateCcw, ShieldCheck, 
  Navigation, Store, Check, X, Filter, SlidersHorizontal, Bookmark,
  ChevronRight, Calendar, Clock, AlertCircle, Menu
} from 'lucide-react';
import SidebarDrawer from '../components/SidebarDrawer';
import './MedicineSearchPage.css';

export default function MedicineSearchPage({ user, onNavigateToPage, onLogout, onSelectMedicine }) {
  const [activeNavTab, setActiveNavTab] = useState('medicine-search');
  const [searchQuery, setSearchQuery] = useState('paracetamol 650');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [sortBy, setSortBy] = useState('Nearest');
  const [reservationModalItem, setReservationModalItem] = useState(null);
  const [reservedSuccess, setReservedSuccess] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter States
  const [distanceKm, setDistanceKm] = useState(10);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [includeGeneric, setIncludeGeneric] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState(['Dolo']);
  const [priceMax, setPriceMax] = useState(500);
  const [openPharmaciesOnly, setOpenPharmaciesOnly] = useState(false);

  const autocompleteList = [
    'Paracetamol 650mg Tablet',
    'Paracetamol 650mg Syrup',
    'Paracetamol 650mg Strip',
    'Paracetamol 650mg Dispersible Tablet',
    'Dolo 650 Tablet'
  ];

  const searchResultsData = [
    {
      id: 'dolo-650',
      title: 'Dolo 650 Tablet',
      formula: 'Paracetamol 650mg',
      inStock: true,
      stockLabel: 'In Stock',
      pharmacy: 'WellCare Pharmacy',
      distance: '0.3 km away',
      timing: 'Open until 10:00 PM',
      price: '₹18.50',
      pack: '10 Tablets (Strip)',
      bgClass: 'dolo',
      pinType: 'green',
      phone: '+91 98765 11111'
    },
    {
      id: 'crocin-650',
      title: 'Crocin 650 Tablet',
      formula: 'Paracetamol 650mg',
      inStock: true,
      stockLabel: 'In Stock',
      pharmacy: 'Apollo Pharmacy',
      distance: '0.6 km away',
      timing: 'Open until 11:00 PM',
      price: '₹20.45',
      pack: '15 Tablets (Strip)',
      bgClass: 'crocin',
      pinType: 'green',
      phone: '+91 98765 22222'
    },
    {
      id: 'paracip-650',
      title: 'Paracip 650 Tablet',
      formula: 'Paracetamol 650mg',
      inStock: false,
      stockLabel: 'Out of Stock',
      pharmacy: 'MedPlus Pharmacy',
      distance: '0.8 km away',
      timing: 'Opens tomorrow 8:00 AM',
      price: '₹17.00',
      pack: '10 Tablets (Strip)',
      bgClass: 'paracip',
      pinType: 'red',
      phone: '+91 98765 33333'
    },
    {
      id: 'calpol-650',
      title: 'Calpol 650 Tablet',
      formula: 'Paracetamol 650mg',
      inStock: true,
      stockLabel: 'In Stock',
      pharmacy: 'Sunrise Pharmacy',
      distance: '1.1 km away',
      timing: 'Open until 9:30 PM',
      price: '₹19.80',
      pack: '15 Tablets (Strip)',
      bgClass: 'calpol',
      pinType: 'green',
      phone: '+91 98765 44444'
    }
  ];

  const handleBrandToggle = (brandName) => {
    if (selectedBrands.includes(brandName)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brandName));
    } else {
      setSelectedBrands([...selectedBrands, brandName]);
    }
  };

  const resetFilters = () => {
    setDistanceKm(10);
    setInStockOnly(true);
    setIncludeGeneric(true);
    setSelectedBrands(['Dolo']);
    setPriceMax(500);
    setOpenPharmaciesOnly(false);
  };

  const handleReserveClick = (e, item) => {
    e.stopPropagation();
    if (!item.inStock) return;
    setReservationModalItem(item);
    setReservedSuccess(false);
  };

  const handleMedicineClick = (item) => {
    if (onSelectMedicine) {
      onSelectMedicine(item);
    }
  };

  const confirmReservation = () => {
    setReservedSuccess(true);
    setTimeout(() => {
      setReservationModalItem(null);
      setReservedSuccess(false);
    }, 1800);
  };

  return (
    <div className="medicine-search-layout">
      {/* SLIDE-OUT SIDEBAR DRAWER (Only opens when 3-line button is clicked) */}
      <SidebarDrawer 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        onLogout={onLogout}
        onNavigateToPage={onNavigateToPage}
        activePage="search-medicine"
      />

      {/* TOP HEADER NAVIGATION */}
      <header className="search-page-header">
        <div className="container header-content">
          <div className="topbar-left-brand-group">
            {/* 3-LINE HAMBURGER MENU BUTTON */}
            <button 
              className="topbar-3line-toggle"
              onClick={() => setIsSidebarOpen(true)}
              title="Click to Open Menu Sidebar"
              aria-label="Open Sidebar Menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <div className="brand-logo-group" onClick={() => onNavigateToPage('home')}>
              <div className="brand-logo-badge">
                <Plus className="brand-cross-icon" />
              </div>
              <span className="brand-logo-text">
                Medi<span className="text-green-bright">Near</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="header-nav-links">
            <button onClick={() => onNavigateToPage('dashboard')} className="nav-tab-btn">Dashboard</button>
            <button onClick={() => setActiveNavTab('medicine-search')} className="nav-tab-btn active">Medicine Search</button>
            <button onClick={() => onNavigateToPage('hospitals')} className="nav-tab-btn">Hospitals</button>
            <button onClick={() => onNavigateToPage('saved')} className="nav-tab-btn">Saved Medicines</button>
            <button onClick={() => onNavigateToPage('reviews')} className="nav-tab-btn">Reviews</button>
          </nav>

          {/* Right User Controls */}
          <div className="header-right-controls">
            <div className="location-pill">
              <MapPin size={16} className="text-blue" />
              <span>Bangalore, Karnataka</span>
              <ChevronDown size={14} />
            </div>

            <button className="icon-bell-btn">
              <Bell size={20} />
              <span className="badge-count">3</span>
            </button>

            <div className="user-profile-widget" onClick={() => onNavigateToPage('dashboard')}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                alt="User Avatar" 
                className="avatar-img"
              />
              <div className="user-text">
                <span className="name">{user?.fullName || user?.name || 'Rahul Sharma'}</span>
                <span className="badge">{user?.role || 'Premium User'}</span>
              </div>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER: LEFT FILTERS + RIGHT SEARCH CONTENT */}
      <div className="container main-content-container">
        
        {/* LEFT SIDEBAR FILTERS PANEL */}
        <aside className="filters-sidebar-panel">
          <div className="filters-panel-header">
            <h3 className="filters-title">Filters</h3>
            <button className="btn-reset-all" onClick={resetFilters}>
              <RotateCcw size={14} /> Reset All
            </button>
          </div>

          {/* Filter 1: Distance */}
          <div className="filter-group-accordion">
            <div className="filter-group-title">
              <span>Distance</span>
              <ChevronDown size={16} />
            </div>
            <div className="range-slider-wrapper">
              <div className="range-labels">
                <span>0 km</span>
                <span>20 km</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="20" 
                value={distanceKm} 
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="custom-range-slider"
              />
              <div className="selected-range-badge">Within {distanceKm} km</div>
            </div>
          </div>

          {/* Filter 2: Availability */}
          <div className="filter-group-accordion">
            <div className="filter-group-title">
              <span>Availability</span>
              <ChevronDown size={16} />
            </div>
            <div className="filter-checkbox-list">
              <label className="filter-checkbox-label">
                <input 
                  type="checkbox" 
                  checked={inStockOnly} 
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span>In Stock</span>
              </label>
              <label className="filter-checkbox-label">
                <input type="checkbox" />
                <span>Out of Stock</span>
              </label>
            </div>
          </div>

          {/* Filter 3: Generic Medicine */}
          <div className="filter-group-accordion">
            <div className="filter-group-title">
              <span>Generic Medicine</span>
              <ChevronDown size={16} />
            </div>
            <div className="filter-checkbox-list">
              <label className="filter-checkbox-label">
                <input type="checkbox" />
                <span>Show Generic Only</span>
              </label>
              <label className="filter-checkbox-label">
                <input 
                  type="checkbox" 
                  checked={includeGeneric} 
                  onChange={(e) => setIncludeGeneric(e.target.checked)}
                />
                <span>Include Generic</span>
              </label>
            </div>
          </div>

          {/* Filter 4: Brand */}
          <div className="filter-group-accordion">
            <div className="filter-group-title">
              <span>Brand</span>
              <ChevronDown size={16} />
            </div>
            <div className="brand-search-box">
              <Search size={14} className="search-icon" />
              <input type="text" placeholder="Search brand" />
            </div>
            <div className="filter-checkbox-list">
              {['Dolo', 'Crocin', 'Paracip', 'Calpol'].map((brand) => (
                <label key={brand} className="filter-checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))}
              <button className="link-show-more">Show More v</button>
            </div>
          </div>

          {/* Filter 5: Price Range */}
          <div className="filter-group-accordion">
            <div className="filter-group-title">
              <span>Price Range</span>
              <ChevronDown size={16} />
            </div>
            <div className="range-slider-wrapper">
              <div className="range-labels">
                <span>₹0</span>
                <span>₹500</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="500" 
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="custom-range-slider blue-track"
              />
              <div className="selected-range-badge price">₹0 - ₹{priceMax}</div>
            </div>
          </div>

          {/* Filter 6: Open Now */}
          <div className="filter-group-accordion">
            <div className="filter-group-title">
              <span>Open Now</span>
              <ChevronDown size={16} />
            </div>
            <div className="filter-checkbox-list">
              <label className="filter-checkbox-label">
                <input 
                  type="checkbox" 
                  checked={openPharmaciesOnly}
                  onChange={(e) => setOpenPharmaciesOnly(e.target.checked)}
                />
                <span>Show Open Pharmacies Only</span>
              </label>
            </div>
          </div>

          {/* Apply Filters Button */}
          <button className="btn-apply-filters" onClick={() => alert('Filters Applied Successfully!')}>
            Apply Filters
          </button>
        </aside>

        {/* RIGHT MAIN SEARCH RESULTS AREA */}
        <main className="search-results-main">
          
          {/* TOP BIG SEARCH INPUT BAR */}
          <div className="main-search-input-wrapper">
            <div className="main-search-input-box">
              <Search size={20} className="search-icon-blue" />
              <input
                type="text"
                className="search-input-field"
                placeholder="Search medicines near you..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              <span className="kbd-shortcut-pill">⌘ /</span>
              <button className="btn-clear-search" onClick={() => setSearchQuery('')}>✕</button>
            </div>

            {/* Live Autocomplete Dropdown List */}
            {showSuggestions && (
              <div className="search-autocomplete-dropdown animate-fade-in">
                {autocompleteList.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="autocomplete-item"
                    onClick={() => {
                      setSearchQuery(item);
                      setShowSuggestions(false);
                      handleMedicineClick({ title: item });
                    }}
                  >
                    <Search size={14} className="icon-search-item" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SEARCH META BAR */}
          <div className="search-meta-bar">
            <div className="results-query-text">
              Showing results for <span className="query-highlight">"{searchQuery || 'Paracetamol 650mg Tablet'}"</span>
            </div>
            <div className="results-right-controls">
              <span className="results-count">124 Results Found</span>
              <div className="sort-dropdown">
                <span>Sort by: <strong>{sortBy}</strong></span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* 4 SEARCH RESULT PRODUCT CARDS */}
          <div className="search-results-list-stack">
            {searchResultsData.map((item) => (
              <div 
                key={item.id} 
                className="search-result-card cursor-pointer"
                onClick={() => handleMedicineClick(item)}
              >
                
                {/* Left Product Image Box */}
                <div className="result-product-image">
                  <div className={`med-pack-mockup ${item.bgClass}`}>
                    <span className="pack-title">{item.title}</span>
                  </div>
                </div>

                {/* Center Product Details */}
                <div className="result-product-details">
                  <div className="product-title-row">
                    <h3 className="product-name">{item.title}</h3>
                  </div>
                  
                  <div className="product-formula-row">
                    <span className="formula-text">{item.formula}</span>
                    <span className={`stock-badge ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
                      ● {item.stockLabel}
                    </span>
                  </div>

                  <div className="pharmacy-info-row">
                    <Store size={16} className="text-blue" />
                    <span className="pharmacy-name">{item.pharmacy}</span>
                  </div>

                  <div className="location-status-row">
                    <span className="dist-text">{item.distance}</span>
                    <span className="dot-sep">•</span>
                    <span className={`timing-text ${item.inStock ? 'open' : 'closed'}`}>
                      {item.timing}
                    </span>
                  </div>
                </div>

                {/* Right Price & Actions */}
                <div className="result-product-actions">
                  <div className="price-tag-wrapper">
                    <span className="item-price">{item.price}</span>
                    <span className="item-pack-type">{item.pack}</span>
                  </div>

                  <div className="action-buttons-row">
                    <button 
                      className="btn-directions" 
                      onClick={(e) => { e.stopPropagation(); alert(`Opening GPS Directions to ${item.pharmacy} (${item.distance})...`); }}
                    >
                      <Navigation size={14} /> Directions
                    </button>
                    <button 
                      className={`btn-reserve ${!item.inStock ? 'disabled' : ''}`}
                      disabled={!item.inStock}
                      onClick={(e) => handleReserveClick(e, item)}
                    >
                      Reserve
                    </button>
                  </div>
                </div>

                {/* Right Mini Map Preview Card */}
                <div className="result-mini-map-card">
                  <div className="mini-map-bg">
                    <svg viewBox="0 0 200 120" fill="none">
                      <path d="M0 40 Q 100 20, 200 60" stroke="#CBD5E1" strokeWidth="12" />
                      <path d="M50 0 Q 80 80, 150 120" stroke="#CBD5E1" strokeWidth="10" />
                    </svg>
                  </div>
                  <div className={`map-pin-indicator ${item.pinType}`}>
                    <Plus size={14} />
                  </div>
                  <div className="mini-map-distance-badge">
                    {item.distance}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Bottom Pricing Disclaimer Note */}
          <div className="search-bottom-disclaimer">
            Prices may vary. Please check with the pharmacy for exact pricing.
          </div>
        </main>
      </div>

      {/* Reservation Modal */}
      {reservationModalItem && (
        <div className="modal-backdrop" onClick={() => setReservationModalItem(null)}>
          <div className="reserve-modal-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={() => setReservationModalItem(null)}>✕</button>
            
            {reservedSuccess ? (
              <div className="reserve-success-state">
                <Check size={48} className="text-green" />
                <h3>Medicine Reserved Successfully!</h3>
                <p>We notified <strong>{reservationModalItem.pharmacy}</strong>. Please collect within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="modal-title">Reserve Medicine</h3>
                <p className="modal-desc">Reserve <strong>{reservationModalItem.title}</strong> at <strong>{reservationModalItem.pharmacy}</strong> for instant pickup.</p>
                
                <div className="reservation-summary-box">
                  <div className="res-row">
                    <span>Price:</span>
                    <strong>{reservationModalItem.price}</strong>
                  </div>
                  <div className="res-row">
                    <span>Pack:</span>
                    <span>{reservationModalItem.pack}</span>
                  </div>
                  <div className="res-row">
                    <span>Location:</span>
                    <span>{reservationModalItem.pharmacy} ({reservationModalItem.distance})</span>
                  </div>
                </div>

                <button className="btn-confirm-reserve" onClick={confirmReservation}>
                  Confirm Free Reservation
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
