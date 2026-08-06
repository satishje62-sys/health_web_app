import React, { useState } from 'react';
import { 
  Plus, Search, MapPin, Bell, ChevronDown, Store, Phone, Navigation, 
  ArrowRight, Filter, RotateCcw, ChevronLeft, ChevronRight, ShieldCheck, 
  Truck, Clock, Star, Home, Building2, Pill, Activity, User, SlidersHorizontal, Menu, X,
  Map, LayoutGrid, Loader2, LocateFixed
} from 'lucide-react';
import SidebarDrawer from '../components/SidebarDrawer';
import InteractiveMap from '../components/InteractiveMap';
import { useLocationContext } from '../context/LocationContext';
import './PharmaciesListPage.css';

export default function PharmaciesListPage({ user, onNavigateToPage, onLogout, onSelectPharmacy }) {
  const {
    location,
    detectLocation,
    isDetectingLocation,
    nearbyPharmacies,
    isLoadingPlaces,
    searchLocations,
    searchResults,
    selectSearchResult,
    setCustomLocation
  } = useLocationContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [twentyFourHoursOnly, setTwentyFourHoursOnly] = useState(false);
  const [deliveryAvailable, setDeliveryAvailable] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [customLocationInput, setCustomLocationInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Filter Pharmacies by Search Query, 24x7, Delivery
  const filteredPharmacies = nearbyPharmacies.filter((pharmacy) => {
    const matchesSearch =
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pharmacy.inStock && pharmacy.inStock.some(med => med.toLowerCase().includes(searchQuery.toLowerCase())));

    const matches24x7 = twentyFourHoursOnly ? pharmacy.is24x7 : true;
    const matchesDelivery = deliveryAvailable ? pharmacy.homeDelivery : true;

    return matchesSearch && matches24x7 && matchesDelivery;
  });

  return (
    <div className="pharmacies-list-page">
      {/* Sidebar Drawer Panel */}
      <SidebarDrawer 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigateToPage={onNavigateToPage} 
        activePage="pharmacies"
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
              <span className="location-label">Active Location</span>
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
              <span onClick={() => onNavigateToPage('home')}>Home</span> / <span className="active">Pharmacies</span>
            </div>
            <h1 className="main-heading">
              Pharmacies & Chemist Stores Near <span className="text-green">{location.name}</span>
            </h1>
            <p className="sub-heading">
              {isLoadingPlaces ? (
                'Scanning live map nodes for medical stores...'
              ) : (
                `Showing ${filteredPharmacies.length} verified pharmacies near your current location.`
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

        {/* Search Bar & Filter Chips */}
        <div className="search-filter-bar">
          <div className="search-input-group">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder={`Search pharmacies or medicines near ${location.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="quick-filter-chips">
            <button 
              className={`chip-btn ${twentyFourHoursOnly ? 'active' : ''}`}
              onClick={() => setTwentyFourHoursOnly(!twentyFourHoursOnly)}
            >
              🕒 24x7 Open
            </button>

            <button 
              className={`chip-btn ${deliveryAvailable ? 'active' : ''}`}
              onClick={() => setDeliveryAvailable(!deliveryAvailable)}
            >
              🛵 Home Delivery
            </button>

            <button className="btn-gps-trigger" onClick={detectLocation} disabled={isDetectingLocation}>
              {isDetectingLocation ? <Loader2 size={16} className="spin-icon" /> : <LocateFixed size={16} />}
              GPS Refetch
            </button>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoadingPlaces && (
          <div className="loading-state-banner">
            <Loader2 size={24} className="spin-icon text-blue" />
            <span>Updating real-time medical store availability around <strong>{location.name}</strong>...</span>
          </div>
        )}

        {/* MAP VIEW */}
        {viewMode === 'map' && (
          <div className="map-view-container">
            <InteractiveMap 
              center={location}
              userLocation={location}
              markers={filteredPharmacies.map(p => ({ ...p, isPharmacy: true }))}
              title={`Nearby Pharmacies & Medical Stores around ${location.name}`}
              height="580px"
              zoom={14}
            />
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="pharmacies-cards-grid">
            {filteredPharmacies.length > 0 ? (
              filteredPharmacies.map((pharmacy) => (
                <div key={pharmacy.id} className="pharmacy-card hover-lift">
                  <div className="card-image-box">
                    <img src={pharmacy.image} alt={pharmacy.name} loading="lazy" />
                    <div className="distance-badge">
                      ⚡ {pharmacy.distance} away
                    </div>
                    {pharmacy.is24x7 && (
                      <div className="open-24x7-badge">
                        Open 24/7
                      </div>
                    )}
                  </div>

                  <div className="card-body">
                    <div className="card-header-row">
                      <span className="pharmacy-type-tag">Medical Store</span>
                      <span className="pharmacy-rating-tag">⭐ {pharmacy.rating}</span>
                    </div>

                    <h3 className="pharmacy-title">{pharmacy.name}</h3>

                    <p className="pharmacy-address">
                      <MapPin size={15} className="text-muted" /> {pharmacy.address}
                    </p>

                    <div className="stock-tags-row">
                      <span className="stock-label">Common Stock:</span>
                      {pharmacy.inStock?.slice(0, 3).map((item, idx) => (
                        <span key={idx} className="in-stock-pill">✓ {item}</span>
                      ))}
                    </div>

                    <div className="pharmacy-card-actions">
                      <a 
                        href={pharmacy.directionsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-gmaps-direct"
                        title="Open directions in Google Maps"
                      >
                        <Navigation size={15} /> Directions
                      </a>

                      {pharmacy.phone && (
                        <a href={`tel:${pharmacy.phone}`} className="btn-call-direct">
                          <Phone size={15} /> Call
                        </a>
                      )}

                      <button 
                        className="btn-view-details"
                        onClick={() => onSelectPharmacy(pharmacy)}
                      >
                        Details <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results-box">
                <h3>No pharmacies found matching your filters near {location.name}</h3>
                <p>Try resetting filters or search for another location.</p>
                <button className="btn-gps-trigger" onClick={detectLocation}>
                  Auto Detect GPS Location
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
