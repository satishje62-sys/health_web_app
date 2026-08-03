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
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sortBy, setSortBy] = useState('Nearest');
  const [reservationModalItem, setReservationModalItem] = useState(null);
  const [reservedSuccess, setReservedSuccess] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFiltersSidebar, setShowFiltersSidebar] = useState(false);

  // Working Location Selector States & Functions
  const [location, setLocation] = useState('Bhagalpur, Bihar');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [customLocationInput, setCustomLocationInput] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const popularCities = [
    'Bhagalpur, Bihar',
    'Patna, Bihar',
    'Gaya, Bihar',
    'Muzaffarpur, Bihar',
    'Darbhanga, Bihar',
    'New Delhi, Delhi',
    'Mumbai, Maharashtra',
    'Bangalore, Karnataka',
    'Kolkata, West Bengal',
    'Ranchi, Jharkhand',
    'Lucknow, Uttar Pradesh'
  ];

  const handleSelectCity = (city) => {
    setLocation(city);
    setShowLocationModal(false);
  };

  const handleSaveCustomLocation = (e) => {
    e.preventDefault();
    if (customLocationInput.trim()) {
      setLocation(customLocationInput.trim());
      setCustomLocationInput('');
      setShowLocationModal(false);
    }
  };

  const handleDetectCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          );
          const data = await response.json();

          const city = data.city || data.locality || data.localityInfo?.administrative?.[2]?.name || data.localityInfo?.administrative?.[1]?.name;
          const state = data.principalSubdivision || data.localityInfo?.administrative?.[0]?.name || 'Bihar';

          if (city) {
            setLocation(`${city}, ${state}`);
          } else {
            const osmResp = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const osmData = await osmResp.json();
            const addr = osmData.address || {};
            const detectedCity = addr.city || addr.town || addr.village || addr.county || addr.suburb || 'Bhagalpur';
            const detectedState = addr.state || 'Bihar';
            setLocation(`${detectedCity}, ${detectedState}`);
          }
        } catch (err) {
          console.warn('Reverse geocode error:', err);
          setLocation('Bhagalpur, Bihar');
        } finally {
          setIsDetectingLocation(false);
          setShowLocationModal(false);
        }
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setIsDetectingLocation(false);
        alert('Could not detect live location. Please allow location permissions in your browser or select Bhagalpur manually.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

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

          {/* Right User Controls & Location */}
          <div className="header-right-controls">
            {/* Interactive Location Selector */}
            <div 
              className="location-pill"
              onClick={() => setShowLocationModal(true)}
              title="Click to Change Location"
            >
              <MapPin size={16} className="text-blue" />
              <span>{location}</span>
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
              </div>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER: LEFT FILTERS + RIGHT SEARCH CONTENT */}
      <div className="container main-content-container">
        
        {/* LEFT SIDEBAR FILTERS PANEL (Hidden by default, toggleable via Filter button) */}
        {showFiltersSidebar && (
          <aside className="filters-sidebar-panel animate-fade-in">
            <div className="filters-panel-header">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-blue" />
                <h3 className="filters-title">Filters</h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-reset-all" onClick={resetFilters}>
                  <RotateCcw size={14} /> Reset
                </button>
                <button className="btn-close-filter-mobile" onClick={() => setShowFiltersSidebar(false)}>
                  <X size={18} />
                </button>
              </div>
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
                <span>Generic / Substitutes</span>
                <ChevronDown size={16} />
              </div>
              <div className="filter-checkbox-list">
                <label className="filter-checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={includeGeneric} 
                    onChange={(e) => setIncludeGeneric(e.target.checked)}
                  />
                  <span>Include Generic Substitutes</span>
                </label>
              </div>
            </div>

            {/* Filter 4: Brand */}
            <div className="filter-group-accordion">
              <div className="filter-group-title">
                <span>Brand</span>
                <ChevronDown size={16} />
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

            {/* Apply Filters Button */}
            <button className="btn-apply-filters" onClick={() => alert('Filters Applied!')}>
              Apply Filters
            </button>
          </aside>
        )}

        {/* RIGHT MAIN SEARCH RESULTS AREA */}
        <main className={`search-results-main ${!showFiltersSidebar ? 'full-width-search' : ''}`}>
          
          {/* TOP BIG SEARCH INPUT BAR WITH FILTER TOGGLE */}
          <div className="main-search-input-wrapper">
            <div className="main-search-input-box">
              <Search size={20} className="search-icon-blue" />
              <input
                type="text"
                className="search-input-field"
                placeholder="Search medicines, tablets, syrups, or healthcare products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              {searchQuery && (
                <button className="btn-clear-search" onClick={() => setSearchQuery('')}>✕</button>
              )}

              {/* Filter Sidebar Toggle Button */}
              <button 
                className={`btn-toggle-filters-trigger ${showFiltersSidebar ? 'active' : ''}`}
                onClick={() => setShowFiltersSidebar(!showFiltersSidebar)}
                title="Toggle Filters Panel"
              >
                <SlidersHorizontal size={18} />
                <span>{showFiltersSidebar ? 'Hide Filters' : 'Filters'}</span>
              </button>
            </div>

            {/* Live Autocomplete Dropdown List */}
            {showSuggestions && searchQuery.trim() !== '' && (
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

          {/* IF NO SEARCH QUERY HAS BEEN ENTERED: SHOW SEARCH LANDING HERO */}
          {!searchQuery.trim() ? (
            <div className="search-initial-empty-hero animate-fade-in">
              <div className="empty-hero-icon-circle">
                <Search size={38} className="text-blue" />
              </div>
              <h2 className="empty-hero-title">Search Medicines Nearby</h2>
              <p className="empty-hero-subtitle">
                Enter a medicine name above or select a popular search below to check real-time stock & prices across pharmacies in {location}.
              </p>

              <div className="popular-searches-box">
                <span className="popular-box-label">Popular Searches:</span>
                <div className="popular-chips-flex">
                  {[
                    'Paracetamol 650mg', 
                    'Dolo 650 Tablet', 
                    'Amoxicillin 500mg', 
                    'Vitamin D3 60K', 
                    'Cetirizine 10mg', 
                    'Azithromycin 500mg', 
                    'Pan D Capsule'
                  ].map((medName) => (
                    <button 
                      key={medName}
                      className="popular-chip-btn"
                      onClick={() => {
                        setSearchQuery(medName);
                        setShowSuggestions(false);
                      }}
                    >
                      <Search size={13} />
                      <span>{medName}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* SEARCH META BAR */}
              <div className="search-meta-bar">
                <div className="results-query-text">
                  Showing results for <span className="query-highlight">"{searchQuery}"</span>
                </div>
                <div className="results-right-controls">
                  <span className="results-count">124 Results Found</span>
                  <div className="sort-dropdown">
                    <span>Sort by: <strong>{sortBy}</strong></span>
                    <ChevronDown size={14} />
                  </div>
                </div>
              </div>

              {/* SEARCH RESULT PRODUCT CARDS */}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.inStock) setReservationModalItem(item);
                          }}
                        >
                          Reserve Free
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
            </>
          )}

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
      {/* LOCATION SELECTOR MODAL DIALOG */}
      {showLocationModal && (
        <>
          {/* Backdrop Blur Overlay */}
          <div 
            className="location-modal-overlay animate-fade-in"
            onClick={() => setShowLocationModal(false)}
          />

          {/* Modal Content Dialog */}
          <div className="location-modal-card animate-scale-up">
            {/* Modal Header */}
            <div className="location-modal-header">
              <div className="modal-header-brand">
                <div className="location-badge-icon">
                  <MapPin size={22} className="text-blue" />
                </div>
                <div>
                  <h3 className="location-modal-title">Select Your Location</h3>
                  <p className="location-modal-subtitle">
                    Pharmacies & medicine stock distances will be updated accordingly
                  </p>
                </div>
              </div>
              <button 
                className="location-modal-close" 
                onClick={() => setShowLocationModal(false)}
                aria-label="Close Location Modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="location-modal-body">
              {/* Option 1: Detect Live GPS Location */}
              <button 
                className="btn-detect-gps"
                onClick={handleDetectCurrentLocation}
                disabled={isDetectingLocation}
              >
                <Navigation size={18} className={isDetectingLocation ? 'spin-icon' : ''} />
                <span>
                  {isDetectingLocation ? 'Detecting your live location...' : 'Use Current Live GPS Location'}
                </span>
              </button>

              <div className="location-modal-divider">
                <span>OR ENTER MANUALLY</span>
              </div>

              {/* Option 2: Custom Search Input Form */}
              <form onSubmit={handleSaveCustomLocation} className="location-form">
                <div className="location-input-group">
                  <Search size={18} className="location-search-icon" />
                  <input 
                    type="text" 
                    placeholder="Enter city, area or pincode (e.g. Bhagalpur, Patna)..."
                    value={customLocationInput}
                    onChange={(e) => setCustomLocationInput(e.target.value)}
                    autoFocus
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-set-location" 
                  disabled={!customLocationInput.trim()}
                >
                  Set Location
                </button>
              </form>

              {/* Option 3: Popular Cities Grid */}
              <div className="popular-cities-wrapper">
                <h4 className="popular-cities-title">Popular Cities & Towns</h4>
                <div className="cities-chip-grid">
                  {popularCities.map((city) => (
                    <button 
                      key={city}
                      onClick={() => handleSelectCity(city)}
                      className={`city-chip-btn ${location === city ? 'active' : ''}`}
                    >
                      <MapPin size={13} />
                      <span>{city}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
