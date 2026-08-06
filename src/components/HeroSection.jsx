import React, { useState } from 'react';
import { Plus, Search, ShieldCheck, Tag, Zap, MapPin, Star, Clock, Phone, Navigation, ArrowRight, CheckCircle2, LocateFixed, Loader2 } from 'lucide-react';
import { useLocationContext } from '../context/LocationContext';
import './HeroSection.css';

const SAMPLE_MEDICINES = [
  { name: 'Paracetamol 500mg', type: 'Tablet', category: 'Fever & Pain', availableIn: '14 Pharmacies' },
  { name: 'Amoxicillin 250mg', type: 'Antibiotic', category: 'Infection', availableIn: '8 Pharmacies' },
  { name: 'Cetirizine 10mg', type: 'Antihistamine', category: 'Allergy', availableIn: '22 Pharmacies' },
  { name: 'Vitamin C + Zinc', type: 'Supplement', category: 'Immunity', availableIn: '30 Pharmacies' },
  { name: 'Metformin 500mg', type: 'Diabetes', category: 'Chronic Care', availableIn: '12 Pharmacies' },
  { name: 'Pantoprazole 40mg', type: 'Gastric', category: 'Digestive', availableIn: '19 Pharmacies' }
];

export default function HeroSection({ onSearchSelect, onSelectPlace, onNavigateToPage }) {
  const {
    location,
    detectLocation,
    isDetectingLocation,
    nearbyHospitals,
    nearbyPharmacies,
    searchLocations,
    searchResults,
    selectSearchResult,
    setCustomLocation
  } = useLocationContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [locationInput, setLocationInput] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const filteredMedicines = SAMPLE_MEDICINES.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      if (onSearchSelect) onSearchSelect(searchTerm);
    }
  };

  const handleLocationInputChange = (e) => {
    const val = e.target.value;
    setLocationInput(val);
    if (val.length >= 2) {
      searchLocations(val);
      setShowLocationDropdown(true);
    } else {
      setShowLocationDropdown(false);
    }
  };

  const handleLocationSelect = (item) => {
    selectSearchResult(item);
    setLocationInput('');
    setShowLocationDropdown(false);
  };

  // Combine top nearby places from context for hero illustration
  const displayPlaces = [
    ...(nearbyPharmacies.slice(0, 2)),
    ...(nearbyHospitals.slice(0, 1))
  ];

  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Left Content */}
        <div className="hero-content">

          {/* Dynamic Active Location Pill */}
          <div className="location-pill-container">
            <div className="location-active-badge">
              <MapPin size={16} className="pin-active-icon" />
              <span className="location-text-val">{location.name}</span>
            </div>
            
            <button 
              className="btn-gps-detect"
              onClick={detectLocation}
              disabled={isDetectingLocation}
              title="Detect Live GPS Location"
            >
              {isDetectingLocation ? (
                <>
                  <Loader2 size={15} className="spin-icon" /> Detecting...
                </>
              ) : (
                <>
                  <LocateFixed size={15} /> Auto Detect GPS
                </>
              )}
            </button>
          </div>

          <h1 className="hero-title">
            Find Medicines & Hospitals. <span className="text-green">Near You.</span>
          </h1>
          
          <p className="hero-subtitle">
            Showing real-time pharmacies and hospitals near <strong>{location.name}</strong> based on live map data.
          </p>

          {/* Search Box with Location Quick Search */}
          <div className="hero-search-wrapper">
            <form onSubmit={handleSearchSubmit} className="hero-search-box">
              <Search className="search-icon" size={22} />
              <input
                type="text"
                className="search-input"
                placeholder="Search medicines (e.g. Paracetamol, Dolo 650)"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />

              {/* Location Input Overlay inside Search Bar */}
              <div className="location-inline-input-wrapper">
                <MapPin size={16} className="loc-input-icon" />
                <input
                  type="text"
                  className="location-inline-input"
                  placeholder="Change City/Area..."
                  value={locationInput}
                  onChange={handleLocationInputChange}
                  onFocus={() => {
                    if (locationInput.length >= 2) setShowLocationDropdown(true);
                  }}
                />
              </div>

              <button type="submit" className="btn-find-medicine">
                Find Medicine
              </button>
            </form>

            {/* Location Autocomplete Dropdown */}
            {showLocationDropdown && searchResults.length > 0 && (
              <div className="location-results-dropdown animate-fade-in">
                <div className="dropdown-header">Select City / Area in India</div>
                {searchResults.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="suggestion-item"
                    onClick={() => handleLocationSelect(item)}
                  >
                    <MapPin size={16} className="text-blue" />
                    <div className="med-info">
                      <span className="med-name">{item.displayName}</span>
                      <span className="med-category">{item.fullAddress}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Live Medicine Autocomplete Dropdown */}
            {showSuggestions && searchTerm.length > 0 && !showLocationDropdown && (
              <div className="search-suggestions-dropdown animate-fade-in">
                <div className="dropdown-header">Available Medicines & Nearby Shops</div>
                {filteredMedicines.length > 0 ? (
                  filteredMedicines.map((med, idx) => (
                    <div 
                      key={idx} 
                      className="suggestion-item"
                      onClick={() => {
                        setSearchTerm(med.name);
                        setShowSuggestions(false);
                        if (onSearchSelect) onSearchSelect(med.name);
                      }}
                    >
                      <div className="med-info">
                        <span className="med-name">{med.name}</span>
                        <span className="med-category">{med.category} • {med.type}</span>
                      </div>
                      <span className="med-availability">{med.availableIn} near {location.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="no-suggestions">
                    No matching medicine found. Press "Find Medicine" to search.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Feature Badges */}
          <div className="hero-badges">
            <div className="badge-item">
              <div className="badge-icon-box green">
                <ShieldCheck size={18} />
              </div>
              <span className="badge-text">Genuine Medicines</span>
            </div>

            <div className="badge-item">
              <div className="badge-icon-box green">
                <Tag size={18} />
              </div>
              <span className="badge-text">Best Prices</span>
            </div>

            <div className="badge-item">
              <div className="badge-icon-box green">
                <Zap size={18} />
              </div>
              <span className="badge-text">Real-time Map Distances</span>
            </div>
          </div>
        </div>

        {/* Right Map Visual Illustration */}
        <div className="hero-visual">
          <div className="map-illustration-card">
            {/* SVG City & Map Background */}
            <div className="map-svg-bg">
              <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 150 C 150 120, 300 250, 500 200" stroke="#E2E8F0" strokeWidth="24" strokeLinecap="round" />
                <path d="M120 0 C 180 200, 100 350, 250 500" stroke="#E2E8F0" strokeWidth="18" strokeLinecap="round" />
                <path d="M250 100 C 350 180, 450 300, 500 400" stroke="#CBD5E1" strokeWidth="12" strokeDasharray="8 8" />
                <rect x="40" y="40" width="30" height="70" fill="#E2E8F0" opacity="0.5" rx="4" />
                <rect x="80" y="20" width="40" height="90" fill="#CBD5E1" opacity="0.4" rx="4" />
                <rect x="380" y="50" width="50" height="80" fill="#E2E8F0" opacity="0.5" rx="4" />
                <rect x="440" y="30" width="40" height="100" fill="#CBD5E1" opacity="0.4" rx="4" />
              </svg>
            </div>

            <div className="character-wrapper">
              <div className="person-illustration">
                <div className="person-avatar-circle">
                  <div className="inner-pulse" />
                </div>
              </div>
            </div>

            {/* Floating Live Map Pin Cards from LocationContext */}
            {displayPlaces.map((place, idx) => {
              const isHosp = place.type?.toLowerCase().includes('hospital');
              const cardClass = idx === 0 ? 'card-apollo' : idx === 1 ? 'card-sunrise' : 'card-citycare';

              return (
                <div 
                  key={place.id || idx}
                  className={`floating-place-card ${cardClass} float-animation`}
                  style={{ animationDelay: `${idx * 0.8}s` }}
                  onClick={() => setSelectedPlace(place)}
                >
                  <div className={`place-icon-box ${isHosp ? 'hospital-icon' : idx === 0 ? 'green' : 'blue'}`}>
                    {isHosp ? <span className="hospital-h">H</span> : idx === 0 ? <Plus size={20} className="icon-cross" /> : <MapPin size={20} />}
                  </div>
                  <div className="place-info">
                    <div className="place-header">
                      <h4 className="place-name">{place.name}</h4>
                      <span className="place-distance">{place.distance}</span>
                    </div>
                    <div className="place-status-row">
                      <span className="status-open">{place.openStatus || 'Open Now'}</span>
                    </div>
                    <div className="place-rating">
                      <Star size={14} className="star-filled" />
                      <span className="rating-score">{place.rating || '4.6'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Modal when user clicks any map pin card */}
      {selectedPlace && (
        <div className="modal-backdrop" onClick={() => setSelectedPlace(null)}>
          <div className="place-detail-modal animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-row">
                <div className={`modal-badge ${selectedPlace.type?.toLowerCase().includes('hospital') ? 'blue-dark' : 'green'}`}>
                  {selectedPlace.type || 'Healthcare Facility'}
                </div>
                <h3>{selectedPlace.name}</h3>
              </div>
              <button className="btn-close-modal" onClick={() => setSelectedPlace(null)}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-info-row">
                <MapPin size={18} className="text-blue" />
                <span>{selectedPlace.address} (<strong>{selectedPlace.distance}</strong> away from {location.name})</span>
              </div>
              <div className="modal-info-row">
                <Clock size={18} className="text-green" />
                <span>{selectedPlace.openStatus || 'Open Now'}</span>
              </div>
              <div className="modal-info-row">
                <Phone size={18} className="text-blue" />
                <span>{selectedPlace.phone || '+91 98765 43210'}</span>
              </div>
              <div className="modal-info-row">
                <Star size={18} className="star-filled" />
                <span>{selectedPlace.rating || '4.5'} / 5.0 ({selectedPlace.reviewsCount || '150 reviews'})</span>
              </div>

              <div className="modal-stock-status">
                <CheckCircle2 size={18} className="text-green" />
                <span>Verified Live Location • Google Maps Directions Enabled</span>
              </div>
            </div>

            <div className="modal-footer">
              <a 
                href={selectedPlace.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.lat},${selectedPlace.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-navigate"
              >
                <Navigation size={16} /> Get Directions
              </a>
              {selectedPlace.phone && (
                <a href={`tel:${selectedPlace.phone}`} className="btn-call">
                  <Phone size={16} /> Call Now
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
