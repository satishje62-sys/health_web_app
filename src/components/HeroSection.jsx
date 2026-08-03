import React, { useState } from 'react';
import { Plus, Search, ShieldCheck, Tag, Zap, MapPin, Star, Clock, Phone, Navigation, ArrowRight, CheckCircle2 } from 'lucide-react';
import './HeroSection.css';

const SAMPLE_MEDICINES = [
  { name: 'Paracetamol 500mg', type: 'Tablet', category: 'Fever & Pain', availableIn: '14 Pharmacies' },
  { name: 'Amoxicillin 250mg', type: 'Antibiotic', category: 'Infection', availableIn: '8 Pharmacies' },
  { name: 'Cetirizine 10mg', type: 'Antihistamine', category: 'Allergy', availableIn: '22 Pharmacies' },
  { name: 'Vitamin C + Zinc', type: 'Supplement', category: 'Immunity', availableIn: '30 Pharmacies' },
  { name: 'Metformin 500mg', type: 'Diabetes', category: 'Chronic Care', availableIn: '12 Pharmacies' },
  { name: 'Pantoprazole 40mg', type: 'Gastric', category: 'Digestive', availableIn: '19 Pharmacies' }
];

const NEARBY_PLACES = [
  {
    id: 1,
    name: 'Apollo Pharmacy',
    type: 'Pharmacy',
    distance: '0.3 km',
    timing: 'Open - Closes 10 PM',
    rating: 4.8,
    reviews: 142,
    badgeColor: 'green',
    phone: '+91 98765 12345',
    address: 'Indiranagar 100ft Rd, Bangalore',
    status: 'In Stock'
  },
  {
    id: 2,
    name: 'Sunrise Medical',
    type: 'Pharmacy',
    distance: '1.2 km',
    timing: 'Open - Closes 9 PM',
    rating: 4.4,
    reviews: 89,
    badgeColor: 'blue',
    phone: '+91 98765 67890',
    address: 'Koramangala 5th Block, Bangalore',
    status: 'Limited Stock'
  },
  {
    id: 3,
    name: 'City Care Hospital',
    type: 'Hospital',
    distance: '2.1 km',
    timing: 'Open 24/7',
    rating: 4.7,
    reviews: 310,
    badgeColor: 'blue-dark',
    phone: '+91 80 2345 6789',
    address: 'MG Road Metro Station, Bangalore',
    status: 'Emergency 24x7'
  }
];

export default function HeroSection({ onSearchSelect, onSelectPlace }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

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

  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Find Medicines Nearby. <span className="text-green">Instantly.</span>
          </h1>
          
          <p className="hero-subtitle">
            MediNear helps you find medicines, nearby pharmacies and hospitals with ease.
          </p>

          {/* Search Box */}
          <div className="hero-search-wrapper">
            <form onSubmit={handleSearchSubmit} className="hero-search-box">
              <Search className="search-icon" size={22} />
              <input
                type="text"
                className="search-input"
                placeholder="Search medicines near you instantly"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              <button type="submit" className="btn-find-medicine">
                Find Medicine
              </button>
            </form>

            {/* Live Autocomplete Dropdown */}
            {showSuggestions && searchTerm.length > 0 && (
              <div className="search-suggestions-dropdown animate-fade-in">
                <div className="dropdown-header">Available Medicines & Pharmacies</div>
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
                      <span className="med-availability">{med.availableIn}</span>
                    </div>
                  ))
                ) : (
                  <div className="no-suggestions">
                    No matching medicine found. Press "Find Medicine" to search nearby.
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
              <span className="badge-text">Nearby & Fast</span>
            </div>
          </div>
        </div>

        {/* Right Map Visual Illustration */}
        <div className="hero-visual">
          <div className="map-illustration-card">
            {/* SVG City & Map Background */}
            <div className="map-svg-bg">
              <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Roads */}
                <path d="M0 150 C 150 120, 300 250, 500 200" stroke="#E2E8F0" strokeWidth="24" strokeLinecap="round" />
                <path d="M120 0 C 180 200, 100 350, 250 500" stroke="#E2E8F0" strokeWidth="18" strokeLinecap="round" />
                <path d="M250 100 C 350 180, 450 300, 500 400" stroke="#CBD5E1" strokeWidth="12" strokeDasharray="8 8" />
                {/* Subtle City Skyline SVG outline */}
                <rect x="40" y="40" width="30" height="70" fill="#E2E8F0" opacity="0.5" rx="4" />
                <rect x="80" y="20" width="40" height="90" fill="#CBD5E1" opacity="0.4" rx="4" />
                <rect x="380" y="50" width="50" height="80" fill="#E2E8F0" opacity="0.5" rx="4" />
                <rect x="440" y="30" width="40" height="100" fill="#CBD5E1" opacity="0.4" rx="4" />
              </svg>
            </div>

            {/* Character Graphic */}
            <div className="character-wrapper">
              <div className="person-illustration">
                {/* Phone mockup in character hand */}
                <div className="person-avatar-circle">
                  <div className="inner-pulse" />
                </div>
              </div>
            </div>

            {/* Floating Map Pin Cards matching Figma */}

            {/* Card 1: Apollo Pharmacy */}
            <div 
              className="floating-place-card card-apollo float-animation"
              onClick={() => setSelectedPlace(NEARBY_PLACES[0])}
            >
              <div className="place-icon-box green">
                <Plus size={20} className="icon-cross" />
              </div>
              <div className="place-info">
                <div className="place-header">
                  <h4 className="place-name">{NEARBY_PLACES[0].name}</h4>
                  <span className="place-distance">{NEARBY_PLACES[0].distance}</span>
                </div>
                <div className="place-status-row">
                  <span className="status-open">{NEARBY_PLACES[0].timing}</span>
                </div>
                <div className="place-rating">
                  <Star size={14} className="star-filled" />
                  <span className="rating-score">{NEARBY_PLACES[0].rating}</span>
                </div>
              </div>
            </div>

            {/* Card 2: Sunrise Medical */}
            <div 
              className="floating-place-card card-sunrise float-animation" 
              style={{ animationDelay: '1s' }}
              onClick={() => setSelectedPlace(NEARBY_PLACES[1])}
            >
              <div className="place-icon-box blue">
                <MapPin size={20} />
              </div>
              <div className="place-info">
                <div className="place-header">
                  <h4 className="place-name">{NEARBY_PLACES[1].name}</h4>
                  <span className="place-distance">{NEARBY_PLACES[1].distance}</span>
                </div>
                <div className="place-status-row">
                  <span className="status-open">{NEARBY_PLACES[1].timing}</span>
                </div>
                <div className="place-rating">
                  <Star size={14} className="star-filled" />
                  <span className="rating-score">{NEARBY_PLACES[1].rating}</span>
                </div>
              </div>
            </div>

            {/* Card 3: City Care Hospital */}
            <div 
              className="floating-place-card card-citycare float-animation"
              style={{ animationDelay: '2s' }}
              onClick={() => setSelectedPlace(NEARBY_PLACES[2])}
            >
              <div className="place-icon-box hospital-icon">
                <span className="hospital-h">H</span>
              </div>
              <div className="place-info">
                <div className="place-header">
                  <h4 className="place-name">{NEARBY_PLACES[2].name}</h4>
                  <span className="place-distance">{NEARBY_PLACES[2].distance}</span>
                </div>
                <div className="place-status-row">
                  <span className="status-open">{NEARBY_PLACES[2].timing}</span>
                </div>
                <div className="place-rating">
                  <Star size={14} className="star-filled" />
                  <span className="rating-score">{NEARBY_PLACES[2].rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal when user clicks any map pin card */}
      {selectedPlace && (
        <div className="modal-backdrop" onClick={() => setSelectedPlace(null)}>
          <div className="place-detail-modal animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-row">
                <div className={`modal-badge ${selectedPlace.badgeColor}`}>
                  {selectedPlace.type}
                </div>
                <h3>{selectedPlace.name}</h3>
              </div>
              <button className="btn-close-modal" onClick={() => setSelectedPlace(null)}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-info-row">
                <MapPin size={18} className="text-blue" />
                <span>{selectedPlace.address} ({selectedPlace.distance} away)</span>
              </div>
              <div className="modal-info-row">
                <Clock size={18} className="text-green" />
                <span>{selectedPlace.timing}</span>
              </div>
              <div className="modal-info-row">
                <Phone size={18} className="text-blue" />
                <span>{selectedPlace.phone}</span>
              </div>
              <div className="modal-info-row">
                <Star size={18} className="star-filled" />
                <span>{selectedPlace.rating} / 5.0 ({selectedPlace.reviews} reviews)</span>
              </div>

              <div className="modal-stock-status">
                <CheckCircle2 size={18} className="text-green" />
                <span>Verified Listing • Real-time Location Sync</span>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-navigate">
                <Navigation size={16} /> Get Directions
              </button>
              <button className="btn-call">
                <Phone size={16} /> Call Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
