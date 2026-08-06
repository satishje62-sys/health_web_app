import React, { useState } from 'react';
import { 
  Plus, Search, MapPin, Bell, ChevronDown, RotateCcw, ShieldCheck, 
  Navigation, Store, Check, X, Filter, SlidersHorizontal, Bookmark,
  ChevronRight, Calendar, Clock, AlertCircle, Menu, Phone, CheckCircle2, 
  LocateFixed, Loader2, Star, Package, Truck, Clock3
} from 'lucide-react';
import SidebarDrawer from '../components/SidebarDrawer';
import { useLocationContext } from '../context/LocationContext';
import { SAMPLE_PHARMACY_DATABASE } from '../data/pharmacyInventory';
import { searchMedicineAcrossStores } from '../data/medicalStoresDB';
import './MedicineSearchPage.css';

export default function MedicineSearchPage({ user, onNavigateToPage, onLogout, onSelectMedicine }) {
  const {
    location,
    detectLocation,
    isDetectingLocation,
    nearbyPharmacies,
    searchLocations,
    searchResults,
    selectSearchResult,
    setCustomLocation
  } = useLocationContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [openOnly, setOpenOnly] = useState(false);
  const [reservationModal, setReservationModal] = useState(null); // { medicine, store }
  const [reservedSuccess, setReservedSuccess] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [customLocationInput, setCustomLocationInput] = useState('');
  const [expandedMed, setExpandedMed] = useState(null); // which medicine's store list is expanded

  const popularCities = [
    'Patna, Bihar', 'Bhagalpur, Bihar', 'Gaya, Bihar',
    'Muzaffarpur, Bihar', 'New Delhi, Delhi', 'Mumbai, Maharashtra',
    'Bangalore, Karnataka', 'Kolkata, West Bengal',
    'Ranchi, Jharkhand', 'Lucknow, Uttar Pradesh'
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

  // Search medicines and find stores
  const handleSearch = () => {
    if (searchQuery.trim()) setHasSearched(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const rawResults = searchMedicineAcrossStores(SAMPLE_PHARMACY_DATABASE, searchQuery);

  const searchResults2 = rawResults.map(({ medicine, stores }) => {
    let filteredStores = stores;
    if (inStockOnly) filteredStores = filteredStores.filter(s => medicine.inStock);
    if (openOnly) filteredStores = filteredStores.filter(s => s.isOpen);
    return { medicine, stores: filteredStores };
  }).filter(r => r.stores.length > 0 || !inStockOnly);

  const handleReserveConfirm = () => {
    setReservedSuccess(true);
    setTimeout(() => {
      setReservationModal(null);
      setReservedSuccess(false);
    }, 2000);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        fill={i < Math.floor(rating) ? '#f59e0b' : 'none'}
        stroke={i < Math.floor(rating) ? '#f59e0b' : '#d1d5db'}
      />
    ));
  };

  return (
    <div className="medicine-search-page-layout">
      {/* SIDEBAR */}
      <SidebarDrawer 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        onLogout={onLogout}
        onNavigateToPage={onNavigateToPage}
        activePage="medicine-search"
      />

      {/* TOP HEADER NAV */}
      <header className="page-header-nav">
        <div className="container header-container">
          <div className="header-left">
            <button className="sidebar-toggle-btn" onClick={() => setIsSidebarOpen(true)} title="Open Navigation Menu">
              <Menu size={24} />
            </button>
            <div className="brand-logo" onClick={() => onNavigateToPage('home')}>
              <div className="logo-cross-badge">
                <Plus size={18} className="logo-cross" />
              </div>
              <span className="logo-text">Medi<span className="text-green">Near</span></span>
            </div>
          </div>

          <div className="location-selector-pill" onClick={() => setShowLocationModal(true)}>
            <MapPin size={18} className="location-icon" />
            <div className="location-info">
              <span className="location-label">Location (Live GPS)</span>
              <span className="location-value">{location.name}</span>
            </div>
            <ChevronDown size={16} className="chevron-icon" />
          </div>

          <div className="header-right">
            <button className="icon-action-btn" title="Notifications">
              <Bell size={20} />
            </button>
            {user ? (
              <div className="user-profile-chip" onClick={() => onNavigateToPage('profile')}>
                <div className="user-avatar">{user.name ? user.name.charAt(0) : 'U'}</div>
                <div className="user-details">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">{user.role || 'Member'}</span>
                </div>
              </div>
            ) : (
              <button className="btn-login-small" onClick={() => onNavigateToPage('login')}>Login</button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="container page-content-container">
        {/* Title */}
        <div className="page-title-banner">
          <div>
            <div className="breadcrumb-trail">
              <span onClick={() => onNavigateToPage('home')}>Home</span> / <span className="active">Medicine Search</span>
            </div>
            <h1 className="main-heading">
              Find Medicine Near <span className="text-blue">{location.name}</span>
            </h1>
            <p className="sub-heading">
              Search any medicine — we'll show you which medical stores near you have it in stock.
            </p>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="search-filter-bar">
          <div className="search-input-group">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search medicine name (e.g. Dolo 650, Paracetamol, Cetirizine, Combiflam...)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim().length >= 2) setHasSearched(true);
                else setHasSearched(false);
              }}
              onKeyDown={handleKeyDown}
            />
            <button className="btn-search-go" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="quick-filter-chips">
            <button className={`chip-btn ${inStockOnly ? 'active' : ''}`} onClick={() => setInStockOnly(!inStockOnly)}>
              ✓ In Stock Only
            </button>
            <button className={`chip-btn ${openOnly ? 'active' : ''}`} onClick={() => setOpenOnly(!openOnly)}>
              🟢 Open Now
            </button>
            <button className="btn-gps-trigger" onClick={detectLocation} disabled={isDetectingLocation}>
              {isDetectingLocation ? <Loader2 size={16} className="spin-icon" /> : <LocateFixed size={16} />}
              GPS Refetch
            </button>
          </div>
        </div>

        {/* POPULAR SEARCH SUGGESTIONS (before search) */}
        {!hasSearched && (
          <div className="popular-searches-section">
            <p className="popular-label">🔥 Popular Searches</p>
            <div className="popular-chips">
              {['Dolo 650', 'Paracetamol', 'Cetirizine', 'Combiflam', 'Azithromycin', 'ORS', 'Vitamin C', 'Pantoprazole'].map(s => (
                <button
                  key={s}
                  className="popular-chip"
                  onClick={() => { setSearchQuery(s); setHasSearched(true); }}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="store-count-banner">
              <Store size={20} />
              <span>Searching across <strong>12 medical stores</strong> near {location.name}</span>
            </div>
          </div>
        )}

        {/* SEARCH RESULTS — Medicines with their stores */}
        {hasSearched && (
          <div className="medicine-results-wrapper">
            {searchResults2.length === 0 ? (
              <div className="no-results-box">
                <AlertCircle size={36} className="text-orange" />
                <h3>No medicine found for "{searchQuery}"</h3>
                <p>Try searching: <strong>Dolo 650</strong>, <strong>Paracetamol</strong>, <strong>Cetirizine</strong>, <strong>Combiflam</strong></p>
              </div>
            ) : (
              <>
                <div className="results-summary-bar">
                  <span>Found <strong>{searchResults2.length} medicine(s)</strong> matching "<em>{searchQuery}</em>"</span>
                  <span className="stores-found-count">
                    <Store size={14} />
                    Showing stores across {location.name}
                  </span>
                </div>

                {searchResults2.map(({ medicine, stores }) => (
                  <div key={medicine.id} className="medicine-store-result-block">
                    {/* Medicine Info Header */}
                    <div className="med-result-header">
                      <div className="med-info-left">
                        <img src={medicine.image} alt={medicine.name} className="med-thumb-sm" />
                        <div>
                          <h2 className="med-result-name">{medicine.name}</h2>
                          <p className="med-result-generic">{medicine.genericName} • {medicine.form}</p>
                          <div className="med-result-tags">
                            <span className="tag-category">{medicine.category}</span>
                            {medicine.prescriptionRequired && <span className="tag-rx">Rx Required</span>}
                            <span className={`tag-stock ${medicine.inStock ? 'in' : 'out'}`}>
                              {medicine.inStock ? '✓ Available' : '✕ Out of Stock'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="med-price-right">
                        <span className="med-result-price">₹{medicine.price}</span>
                        <span className="med-result-mrp">MRP ₹{medicine.mrp}</span>
                        <span className="med-result-disc">{medicine.discount}</span>
                      </div>
                    </div>

                    {/* Stores list */}
                    <div className="stores-list-section">
                      <div className="stores-list-label">
                        <Store size={15} />
                        <span>{stores.length} store{stores.length !== 1 ? 's' : ''} near you have this medicine</span>
                      </div>

                      <div className="stores-grid">
                        {stores.map(store => (
                          <div key={store.id} className={`store-card ${!store.isOpen ? 'store-closed' : ''}`}>
                            <div className="store-card-top">
                              <div className="store-logo-circle">{store.logo}</div>
                              <div className="store-name-block">
                                <h4 className="store-name">{store.name}</h4>
                                <p className="store-type">{store.type}</p>
                              </div>
                              <div className={`store-open-badge ${store.isOpen ? 'open' : 'closed'}`}>
                                {store.isOpen ? '🟢 Open' : '🔴 Closed'}
                              </div>
                            </div>

                            <div className="store-card-meta">
                              <div className="store-meta-row">
                                <MapPin size={13} />
                                <span>{store.address}</span>
                              </div>
                              <div className="store-meta-row">
                                <Navigation size={13} />
                                <span className="store-distance">{store.distance} away</span>
                                <span className="store-time-sep">•</span>
                                <Clock3 size={13} />
                                <span>{store.openTime}</span>
                              </div>
                              <div className="store-meta-row">
                                <Phone size={13} />
                                <span>{store.phone}</span>
                              </div>
                            </div>

                            <div className="store-rating-delivery">
                              <div className="store-stars-row">
                                {renderStars(store.rating)}
                                <span className="rating-value">{store.rating}</span>
                                <span className="rating-count">({store.totalRatings})</span>
                              </div>
                              {store.homeDelivery && (
                                <div className="delivery-badge">
                                  <Truck size={12} /> Home Delivery
                                </div>
                              )}
                            </div>

                            <div className="store-card-actions">
                              <a
                                href={store.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.name + ', ' + store.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-directions-store"
                              >
                                <Navigation size={14} /> Get Directions
                              </a>
                              <button
                                className="btn-call-store"
                                onClick={() => window.open(`tel:${store.phone}`)}
                              >
                                <Phone size={14} /> Call Store
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </main>

      {/* RESERVATION MODAL */}
      {reservationModal && (
        <div className="modal-backdrop" onClick={() => setReservationModal(null)}>
          <div className="reservation-modal-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={() => setReservationModal(null)}>✕</button>

            {reservedSuccess ? (
              <div className="reservation-success-state">
                <CheckCircle2 size={54} className="text-green" />
                <h3>Medicine Reserved Successfully!</h3>
                <p>
                  <strong>{reservationModal.medicine?.name}</strong> has been reserved at{' '}
                  <strong>{reservationModal.store?.name}</strong>.
                </p>
                <div className="reserve-token-box">
                  <span>Reservation Token: <strong>MED-{Math.floor(100000 + Math.random() * 900000)}</strong></span>
                </div>
              </div>
            ) : (
              <div className="reservation-form">
                <h3>Reserve at {reservationModal.store?.name}</h3>
                <p className="sub-txt">Your medicine will be held for 2 hours at the store.</p>

                <div className="reserved-med-summary">
                  <img src={reservationModal.medicine?.image} alt={reservationModal.medicine?.name} />
                  <div>
                    <h4>{reservationModal.medicine?.name}</h4>
                    <p>{reservationModal.medicine?.form} • ₹{reservationModal.medicine?.price}</p>
                    <p className="store-reserve-name">📍 {reservationModal.store?.address}</p>
                  </div>
                </div>

                <div className="form-group">
                  <label>Patient Full Name</label>
                  <input type="text" defaultValue={user?.name || 'Patient Name'} />
                </div>
                <div className="form-group">
                  <label>Contact Phone Number</label>
                  <input type="tel" defaultValue="+91 98765 43210" />
                </div>

                <button className="btn-confirm-reserve" onClick={handleReserveConfirm}>
                  Confirm 2-Hour Store Hold
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LOCATION MODAL */}
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
                onClick={() => { detectLocation(); setShowLocationModal(false); }}
                disabled={isDetectingLocation}
              >
                {isDetectingLocation ? <Loader2 size={20} className="spin-icon" /> : <LocateFixed size={20} />}
                Use My Current GPS Location
              </button>

              <div className="divider-text">OR Search City/Area</div>

              <form onSubmit={handleSaveCustomLocation} className="custom-location-form">
                <input
                  type="text"
                  placeholder="Enter city or area name (e.g. Patna, Delhi)"
                  value={customLocationInput}
                  onChange={(e) => { setCustomLocationInput(e.target.value); searchLocations(e.target.value); }}
                />
                <button type="submit" className="btn-save-loc">Set</button>
              </form>

              {searchResults.length > 0 && (
                <div className="search-results-list">
                  <div className="results-label">Matching Locations</div>
                  {searchResults.map((item, idx) => (
                    <div key={idx} className="search-item-row" onClick={() => { selectSearchResult(item); setShowLocationModal(false); }}>
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
                    <button key={city} className={`city-chip ${location.name === city ? 'active' : ''}`} onClick={() => handleSelectCity(city)}>
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
