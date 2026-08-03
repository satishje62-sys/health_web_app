import React, { useState } from 'react';
import { 
  Plus, Search, MapPin, Bell, ChevronDown, CheckCircle2, Phone, 
  Navigation, ArrowRight, Filter, RotateCcw, ChevronLeft, ChevronRight,
  ShieldCheck, Home, Building2, Pill, Activity, User, SlidersHorizontal, Menu
} from 'lucide-react';
import SidebarDrawer from '../components/SidebarDrawer';
import './HospitalsListPage.css';

export default function HospitalsListPage({ user, onNavigateToPage, onLogout, onSelectHospital }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('All Specialities');
  const [selectedRating, setSelectedRating] = useState('4.0+');
  const [distanceKm, setDistanceKm] = useState(25);
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [hospitalType, setHospitalType] = useState({ government: false, private: false, trust: false });
  const [sortBy, setSortBy] = useState('Relevance');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const hospitalsData = [
    {
      id: 'aiims-patna',
      name: 'AIIMS Patna',
      type: 'Government',
      verified: true,
      rating: 4.6,
      reviewsCount: '1,245 reviews',
      distance: '2.3 km',
      address: 'Phulwarisharif, Patna, Bihar 801505',
      doctorsCount: '245+ Doctors Available',
      emergency: true,
      icu: true,
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&auto=format&fit=crop&q=80',
      phone: '+91 612 245 1000'
    },
    {
      id: 'paras-hmri',
      name: 'Paras HMRI Hospital',
      type: 'Private',
      verified: true,
      rating: 4.4,
      reviewsCount: '890 reviews',
      distance: '4.7 km',
      address: 'Boring Road, Patna, Bihar 800001',
      doctorsCount: '180+ Doctors Available',
      emergency: true,
      icu: true,
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&auto=format&fit=crop&q=80',
      phone: '+91 612 710 7777'
    },
    {
      id: 'indira-ivf',
      name: 'Indira IVF Hospital',
      type: 'Private',
      verified: true,
      rating: 4.2,
      reviewsCount: '567 reviews',
      distance: '6.1 km',
      address: 'Kankarbagh, Patna, Bihar 800020',
      doctorsCount: '95+ Doctors Available',
      emergency: true,
      icu: true,
      image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=500&auto=format&fit=crop&q=80',
      phone: '+91 612 300 5555'
    },
    {
      id: 'pmch-patna',
      name: 'Patna Medical College & Hospital',
      type: 'Government',
      verified: true,
      rating: 4.1,
      reviewsCount: '2,103 reviews',
      distance: '3.8 km',
      address: 'Kankarbagh, Patna, Bihar 800020',
      doctorsCount: '300+ Doctors Available',
      emergency: true,
      icu: true,
      image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&auto=format&fit=crop&q=80',
      phone: '+91 612 230 0080'
    }
  ];

  const resetFilters = () => {
    setSelectedSpeciality('All Specialities');
    setSelectedRating('4.0+');
    setDistanceKm(25);
    setEmergencyOnly(false);
    setHospitalType({ government: false, private: false, trust: false });
  };

  const handleHospitalClick = (hospital) => {
    if (onSelectHospital) {
      onSelectHospital(hospital);
    }
  };

  return (
    <div className="hospitals-list-layout">
      {/* SLIDE-OUT SIDEBAR DRAWER (Only opens when 3-line button is clicked) */}
      <SidebarDrawer 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        onLogout={onLogout}
        onNavigateToPage={onNavigateToPage}
        activePage="hospitals"
      />

      {/* STICKY TOPBAR HEADER */}
      <header className="hospitals-top-header">
        <div className="container header-container">
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

            {/* Brand Logo */}
            <div className="brand-logo-group" onClick={() => onNavigateToPage('home')}>
              <div className="brand-logo-badge">
                <Plus className="brand-cross-icon" />
              </div>
              <span className="brand-logo-text">
                Medi<span className="text-green-bright">Near</span>
              </span>
            </div>
          </div>

          {/* Global Search Bar */}
          <div className="header-search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search hospitals, locations, specialties..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Right Controls: Location, Notifications, User Profile */}
          <div className="header-right-controls">
            {/* Location Selector Pill */}
            <div 
              className="location-pill-selector" 
              onClick={() => setShowLocationModal(true)}
              title="Click to Change Location"
            >
              <MapPin size={16} className="text-blue" />
              <span>{location}</span>
              <ChevronDown size={14} className="arrow" />
            </div>

            <button className="bell-icon-btn" aria-label="Notifications">
              <Bell size={20} />
              <span className="bell-dot" />
            </button>

            <div className="user-profile-avatar" onClick={() => onNavigateToPage('dashboard')}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                alt="User Avatar" 
              />
            </div>
          </div>
        </div>
      </header>

      {/* PAGE HERO HEADER & SUBTITLE */}
      <div className="container hospitals-hero-section">
        <div className="title-area">
          <h1 className="page-main-title">Find the Best Hospitals Near You</h1>
          <p className="page-subtitle">Search and compare hospitals to get the best care possible.</p>
        </div>
        <div className="location-info-badge">
          <span>Showing 25 hospitals near <strong>Patna, Bihar</strong></span>
          <MapPin size={16} className="text-blue" />
        </div>
      </div>

      {/* MAIN CONTAINER: SIDEBAR FILTERS + RIGHT HOSPITAL LIST */}
      <div className="container main-hospitals-container">
        
        {/* LEFT SIDEBAR FILTERS PANEL */}
        <aside className="filters-sidebar">
          <div className="filters-sidebar-header">
            <h3>Filters</h3>
            <button className="btn-reset-link" onClick={resetFilters}>Reset</button>
          </div>

          {/* Filter 1: Speciality Dropdown */}
          <div className="filter-block">
            <label className="filter-label">Speciality</label>
            <div className="custom-select-box">
              <select 
                value={selectedSpeciality} 
                onChange={(e) => setSelectedSpeciality(e.target.value)}
              >
                <option value="All Specialities">All Specialities</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Gynecology">Gynecology</option>
              </select>
              <ChevronDown size={16} className="select-arrow" />
            </div>
          </div>

          {/* Filter 2: Rating Pills */}
          <div className="filter-block">
            <label className="filter-label">Rating</label>
            <div className="rating-pills-grid">
              {['4.0+', '3.5+', '3.0+', '2.0+'].map((rate) => (
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

          {/* Filter 3: Distance Slider */}
          <div className="filter-block">
            <div className="label-with-value">
              <label className="filter-label">Distance</label>
              <span className="val-badge">{distanceKm} km</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="25" 
              value={distanceKm} 
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="distance-range-slider"
            />
            <div className="range-min-max">
              <span>0 km</span>
              <span>25+ km</span>
            </div>
          </div>

          {/* Filter 4: Emergency Available */}
          <div className="filter-block">
            <label className="filter-label">Emergency Available</label>
            <label className="checkbox-item">
              <input 
                type="checkbox" 
                checked={emergencyOnly}
                onChange={(e) => setEmergencyOnly(e.target.checked)}
              />
              <span>Available Now</span>
            </label>
          </div>

          {/* Filter 5: Hospital Type */}
          <div className="filter-block">
            <label className="filter-label">Hospital Type</label>
            <div className="checkbox-list">
              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={hospitalType.government}
                  onChange={(e) => setHospitalType({ ...hospitalType, government: e.target.checked })}
                />
                <span>Government</span>
              </label>
              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={hospitalType.private}
                  onChange={(e) => setHospitalType({ ...hospitalType, private: e.target.checked })}
                />
                <span>Private</span>
              </label>
              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={hospitalType.trust}
                  onChange={(e) => setHospitalType({ ...hospitalType, trust: e.target.checked })}
                />
                <span>Trust / NGO</span>
              </label>
            </div>
          </div>

          {/* Apply Filters CTA */}
          <button className="btn-apply-filters" onClick={() => alert('Filters applied successfully!')}>
            <Filter size={16} /> Apply Filters
          </button>
        </aside>

        {/* RIGHT MAIN HOSPITAL CARDS STACK */}
        <main className="hospitals-main-content">
          
          {/* SORT & FILTER CONTROLS BAR */}
          <div className="sort-controls-bar">
            <div className="sort-dropdown-box">
              <span>Sort by: </span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="Relevance">Relevance</option>
                <option value="Rating">Highest Rating</option>
                <option value="Distance">Nearest Distance</option>
              </select>
              <ChevronDown size={14} />
            </div>

            <button className="btn-mobile-filter" aria-label="Filters">
              <SlidersHorizontal size={18} />
            </button>
          </div>

          {/* 4 HOSPITAL LIST CARDS */}
          <div className="hospitals-cards-list">
            {hospitalsData.map((hospital) => (
              <div 
                key={hospital.id} 
                className="hospital-item-card"
                onClick={() => handleHospitalClick(hospital)}
              >
                
                {/* Left Hospital Image */}
                <div className="hospital-img-wrapper">
                  <img src={hospital.image} alt={hospital.name} />
                </div>

                {/* Center Hospital Info */}
                <div className="hospital-details-col">
                  <div className="title-row">
                    <h2 className="hospital-name">{hospital.name}</h2>
                    <span className={`type-tag ${hospital.type.toLowerCase()}`}>{hospital.type}</span>
                    {hospital.verified && <CheckCircle2 size={18} className="verified-blue" />}
                    <span className="dist-right-tag"><MapPin size={14} /> {hospital.distance}</span>
                  </div>

                  <div className="rating-row">
                    <span className="rating-num">{hospital.rating}</span>
                    <div className="stars-group">★★★★★</div>
                    <span className="reviews-txt">({hospital.reviewsCount})</span>
                  </div>

                  <div className="address-row">
                    <MapPin size={14} className="text-gray" />
                    <span>{hospital.address}</span>
                  </div>

                  <div className="doctors-row">
                    <User size={14} className="text-gray" />
                    <span>{hospital.doctorsCount}</span>
                  </div>

                  <div className="badges-status-row">
                    {hospital.emergency && (
                      <span className="badge-status emergency">
                        🚑 24x7 Emergency
                      </span>
                    )}
                    {hospital.icu && (
                      <span className="badge-status icu">
                        🏥 ICU Available
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="hospital-actions-col">
                  <div className="top-actions-row">
                    <button 
                      className="btn-hospital-call" 
                      onClick={(e) => { e.stopPropagation(); alert(`Calling ${hospital.name} at ${hospital.phone}...`); }}
                    >
                      <Phone size={14} /> Call
                    </button>
                    <button 
                      className="btn-hospital-directions"
                      onClick={(e) => { e.stopPropagation(); alert(`Opening Directions to ${hospital.name}...`); }}
                    >
                      <Navigation size={14} /> Directions
                    </button>
                  </div>

                  <button className="btn-view-details">
                    View Details <ArrowRight size={16} />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* BOTTOM PAGINATION ROW */}
          <div className="hospitals-pagination-bar">
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
              
              <span className="dots">...</span>
              <button className="btn-page-num" onClick={() => setCurrentPageNum(10)}>10</button>
              
              <button className="btn-page-arrow" onClick={() => setCurrentPageNum(p => p + 1)}>
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="pagination-count-text">
              Showing 1 to 25 of 234 hospitals
            </div>
          </div>

        </main>
      </div>

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
                    Hospital distances & emergency services will be updated accordingly
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
