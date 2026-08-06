import React, { useState } from 'react';
import { 
  Plus, Search, MapPin, Bell, ChevronDown, CheckCircle2, Phone, 
  Navigation, ArrowRight, Filter, RotateCcw, ChevronLeft, ChevronRight,
  ShieldCheck, Home, Building2, Pill, Activity, User, SlidersHorizontal, Menu, X,
  Map, LayoutGrid, Loader2, ExternalLink, LocateFixed
} from 'lucide-react';
import SidebarDrawer from '../components/SidebarDrawer';
import InteractiveMap from '../components/InteractiveMap';
import { useLocationContext } from '../context/LocationContext';
import './HospitalsListPage.css';

export default function HospitalsListPage({ user, onNavigateToPage, onLogout, onSelectHospital }) {
  const {
    location,
    detectLocation,
    isDetectingLocation,
    nearbyHospitals,
    isLoadingPlaces,
    searchLocations,
    searchResults,
    selectSearchResult,
    setCustomLocation
  } = useLocationContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('All Specialities');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [icuOnly, setIcuOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [customLocationInput, setCustomLocationInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFiltersSidebar, setShowFiltersSidebar] = useState(false);

  const popularCities = [
    'Patna, Bihar',
    'Bhagalpur, Bihar',
    'Gaya, Bihar',
    'Muzaffarpur, Bihar',
    'New Delhi, Delhi',
    'Mumbai, Maharashtra',
    'Bangalore, Karnataka',
    'Kolkata, West Bengal',
    'Ranchi, Jharkhand',
    'Lucknow, Uttar Pradesh'
  ];

  const handleSelectCity = (city) => {
    setCustomLocation(city);
    setShowLocationModal(false);
  };

  const handleSaveCustomLocation = (e) => {
    e.preventDefault();
    if (customLocationInput.trim()) {
      setCustomLocation(customLocationInput.trim());
      setCustomLocationInput('');
      setShowLocationModal(false);
    }
  };

  // Filter Hospitals by Search Query, Emergency, ICU, Speciality
  const filteredHospitals = nearbyHospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hospital.type && hospital.type.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesEmergency = emergencyOnly ? hospital.emergency : true;
    const matchesIcu = icuOnly ? hospital.icu : true;

    return matchesSearch && matchesEmergency && matchesIcu;
  });

  return (
    <div className="hospitals-list-page">
      {/* Sidebar Drawer Panel */}
      <SidebarDrawer 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigateToPage={onNavigateToPage} 
        activePage="hospitals"
      />

      {/* Top Header Navbar */}
      <header className="page-header-nav">
        <div className="container header-container">
          <div className="header-left">
            <button 
              className="sidebar-toggle-btn"
              onClick={() => setIsSidebarOpen(true)}
              title="Open Navigation Menu"
            >
              <Menu size={24} />
            </button>

            <div className="brand-logo" onClick={() => onNavigateToPage('home')}>
              <div className="logo-cross-badge">
                <Plus size={18} className="logo-cross" />
              </div>
              <span className="logo-text">Medi<span className="text-green">Near</span></span>
            </div>
          </div>

          {/* Location Selector Pill */}
          <div className="location-selector-pill" onClick={() => setShowLocationModal(true)}>
            <MapPin size={18} className="location-icon" />
            <div className="location-info">
              <span className="location-label">Location (Live GPS)</span>
              <span className="location-value">{location.name}</span>
            </div>
            <ChevronDown size={16} className="chevron-icon" />
          </div>

          {/* Header Right Actions */}
          <div className="header-right">
            <button className="icon-action-btn" title="Notifications">
              <Bell size={20} />
            </button>
            
            {user ? (
              <div className="user-profile-chip" onClick={() => onNavigateToPage('profile')}>
                <div className="user-avatar">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <div className="user-details">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">{user.role || 'Member'}</span>
                </div>
              </div>
            ) : (
              <button className="btn-login-small" onClick={() => onNavigateToPage('login')}>
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Layout */}
      <main className="container page-content-container">
        {/* Breadcrumb & Section Title Bar */}
        <div className="page-title-banner">
          <div>
            <div className="breadcrumb-trail">
              <span onClick={() => onNavigateToPage('home')}>Home</span> / <span className="active">Hospitals</span>
            </div>
            <h1 className="main-heading">
              Best Hospitals Near <span className="text-blue">{location.name}</span>
            </h1>
            <p className="sub-heading">
              {isLoadingPlaces ? (
                'Fetching live hospital nodes from Google Maps & OpenStreetMap...'
              ) : (
                `Found ${filteredHospitals.length} verified hospitals & clinics within your range.`
              )}
            </p>
          </div>

          {/* Grid vs Map View Toggle */}
          <div className="view-toggle-container">
            <button 
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={16} /> Grid Cards
            </button>
            <button 
              className={`view-toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              <Map size={16} /> Interactive Map
            </button>
          </div>
        </div>

        {/* Search Bar & Filters Trigger */}
        <div className="search-filter-bar">
          <div className="search-input-group">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder={`Search hospitals, ICU, emergency near ${location.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="quick-filter-chips">
            <button 
              className={`chip-btn ${emergencyOnly ? 'active' : ''}`}
              onClick={() => setEmergencyOnly(!emergencyOnly)}
            >
              🚨 24/7 Emergency
            </button>

            <button 
              className={`chip-btn ${icuOnly ? 'active' : ''}`}
              onClick={() => setIcuOnly(!icuOnly)}
            >
              🏥 ICU Available
            </button>

            <button className="btn-gps-trigger" onClick={detectLocation} disabled={isDetectingLocation}>
              {isDetectingLocation ? <Loader2 size={16} className="spin-icon" /> : <LocateFixed size={16} />}
              Refetch Live GPS
            </button>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoadingPlaces && (
          <div className="loading-state-banner">
            <Loader2 size={24} className="spin-icon text-blue" />
            <span>Scanning live Google Maps & OpenStreetMap geospatial data for <strong>{location.name}</strong>...</span>
          </div>
        )}

        {/* MAP VIEW */}
        {viewMode === 'map' && (
          <div className="map-view-container">
            <InteractiveMap 
              center={location}
              userLocation={location}
              markers={filteredHospitals.map(h => ({ ...h, isHospital: true }))}
              title={`Live Hospitals & Emergency Centers around ${location.name}`}
              height="580px"
              zoom={13}
            />
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="hospitals-cards-grid">
            {filteredHospitals.length > 0 ? (
              filteredHospitals.map((hospital) => (
                <div key={hospital.id} className="hospital-card hover-lift">
                  <div className="card-image-box">
                    <img src={hospital.image} alt={hospital.name} loading="lazy" />
                    <div className="distance-badge">
                      ⚡ {hospital.distance} away
                    </div>
                    {hospital.emergency && (
                      <div className="emergency-badge">
                        🚨 24/7 Emergency
                      </div>
                    )}
                  </div>

                  <div className="card-body">
                    <div className="card-header-row">
                      <span className="hospital-type-tag">{hospital.type}</span>
                      <span className="hospital-rating-tag">⭐ {hospital.rating}</span>
                    </div>

                    <h3 className="hospital-title">{hospital.name}</h3>

                    <p className="hospital-address">
                      <MapPin size={15} className="text-muted" /> {hospital.address}
                    </p>

                    <div className="hospital-facilities-list">
                      <span className="facility-pill">{hospital.bedsAvailable || 'Beds Available'}</span>
                      <span className="facility-pill">{hospital.doctorsCount || 'Doctors On Call'}</span>
                      {hospital.icu && <span className="facility-pill icu">ICU ICU Ready</span>}
                    </div>

                    <div className="hospital-card-actions">
                      <a 
                        href={hospital.directionsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-gmaps-direct"
                        title="Get directions on Google Maps"
                      >
                        <Navigation size={15} /> Directions
                      </a>

                      {hospital.phone && (
                        <a href={`tel:${hospital.phone}`} className="btn-call-direct">
                          <Phone size={15} /> Call
                        </a>
                      )}

                      <button 
                        className="btn-view-details"
                        onClick={() => onSelectHospital(hospital)}
                      >
                        Details <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results-box">
                <h3>No hospitals found matching your criteria near {location.name}</h3>
                <p>Try clearing filters or search for another city/area.</p>
                <button className="btn-gps-trigger" onClick={detectLocation}>
                  Detect Current GPS Location
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="modal-backdrop" onClick={() => setShowLocationModal(false)}>
          <div className="location-modal-container animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Select Location / Search City</h3>
              <button className="btn-close" onClick={() => setShowLocationModal(false)}>✕</button>
            </div>
            
            <div className="modal-body">
              <button 
                className="btn-detect-gps-large" 
                onClick={() => {
                  detectLocation();
                  setShowLocationModal(false);
                }}
                disabled={isDetectingLocation}
              >
                {isDetectingLocation ? <Loader2 size={20} className="spin-icon" /> : <LocateFixed size={20} />}
                Use My Current GPS Location
              </button>

              <div className="divider-text">OR Search City/Area</div>

              <form onSubmit={handleSaveCustomLocation} className="custom-location-form">
                <input 
                  type="text" 
                  placeholder="Enter city or area name (e.g. Patna, Delhi, Bhagalpur)"
                  value={customLocationInput}
                  onChange={(e) => {
                    setCustomLocationInput(e.target.value);
                    searchLocations(e.target.value);
                  }}
                />
                <button type="submit" className="btn-save-loc">Set</button>
              </form>

              {searchResults.length > 0 && (
                <div className="search-results-list">
                  <div className="results-label">Matching Locations</div>
                  {searchResults.map((item, idx) => (
                    <div 
                      key={idx}
                      className="search-item-row"
                      onClick={() => {
                        selectSearchResult(item);
                        setShowLocationModal(false);
                      }}
                    >
                      <MapPin size={16} className="text-blue" />
                      <div>
                        <div className="item-title">{item.displayName}</div>
                        <div className="item-sub">{item.fullAddress}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="popular-cities-section">
                <div className="popular-cities-label">Popular Indian Cities</div>
                <div className="popular-cities-chips">
                  {popularCities.map((city) => (
                    <button 
                      key={city} 
                      className={`city-chip ${location.name === city ? 'active' : ''}`}
                      onClick={() => handleSelectCity(city)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
