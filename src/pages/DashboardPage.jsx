import React, { useState } from 'react';
import { 
  LayoutDashboard, Search, Building2, MapPin, Star, User, PhoneCall, LogOut, 
  Bell, ChevronDown, Pill, Store, Users, TrendingUp, ChevronRight, ChevronLeft, 
  ShieldCheck, Headphones, Bookmark, Plus, ArrowRight, Activity, Clock, Menu, X,
  Navigation
} from 'lucide-react';
import SidebarDrawer from '../components/SidebarDrawer';
import './DashboardPage.css';

export default function DashboardPage({ user, onLogout, onNavigateToPage }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Patna, Bihar');
  const [savedItems, setSavedItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Location Selector States & Functions
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
          // Reverse geocoding via BigDataCloud client API (free, fast, CORS-friendly)
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          );
          const data = await response.json();

          const city = data.city || data.locality || data.localityInfo?.administrative?.[2]?.name || data.localityInfo?.administrative?.[1]?.name;
          const state = data.principalSubdivision || data.localityInfo?.administrative?.[0]?.name || 'Bihar';

          if (city) {
            setLocation(`${city}, ${state}`);
          } else {
            // Backup reverse geocoding via OpenStreetMap Nominatim
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
          // Fallback formatting if network is restricted
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

  const toggleSaveMedicine = (id) => {
    if (savedItems.includes(id)) {
      setSavedItems(savedItems.filter(i => i !== id));
    } else {
      setSavedItems([...savedItems, id]);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* SLIDE-OUT SIDEBAR DRAWER (Only opens when 3-line button is clicked) */}
      <SidebarDrawer 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        onLogout={onLogout}
        onNavigateToPage={onNavigateToPage}
        activePage="dashboard"
      />

      {/* MAIN CONTENT AREA */}
      <main className="dashboard-main full-width-main">
        {/* TOP BAR HEADER WITH 3-LINE MENU TOGGLE */}
        <header className="dashboard-topbar">
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
              <div className="sidebar-logo-badge">
                <Plus className="sidebar-cross-icon" />
              </div>
              <span className="sidebar-logo-text">
                Medi<span className="text-green-bright">Near</span>
              </span>
            </div>
          </div>

          {/* Search Input Box */}
          <div className="topbar-search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search medicines, hospitals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="kbd-shortcut">⌘ /</span>
          </div>

          {/* Right Controls: Location, Notifications, User Profile */}
          <div className="topbar-right-controls">
            {/* Location Selector */}
            <div 
              className="location-pill-selector" 
              onClick={() => setShowLocationModal(true)}
              title="Click to Change Location"
            >
              <MapPin size={16} className="text-blue" />
              <span>{location}</span>
              <ChevronDown size={14} className="arrow" />
            </div>

            {/* Notification Bell */}
            <button className="notification-btn" aria-label="Notifications">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>

            {/* User Profile Info */}
            <div className="user-profile-menu" onClick={() => handleTabClick('profile')}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                alt="User Avatar" 
                className="user-avatar"
              />
              <div className="user-text-info">
                <span className="user-greeting">Hello, {user?.fullName || user?.name || 'Rahul'}</span>
                <span className="user-role-badge">{user?.role || 'Premium User'}</span>
              </div>
              <ChevronDown size={14} className="user-arrow" />
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY CONTENT - ONLY RECENT SEARCHES */}
        <div className="dashboard-body-container">
          
          {/* Welcome Subheader */}
          <div className="dashboard-welcome-header">
            <div>
              <h2 className="welcome-title">Welcome back, {user?.fullName || user?.name || 'Rahul'} 👋</h2>
              <p className="welcome-subtitle">View and manage your recent health and medicine search history.</p>
            </div>
            <button className="btn-new-search" onClick={() => onNavigateToPage('search-medicine')}>
              <Search size={18} /> Perform New Search
            </button>
          </div>

          {/* DEDICATED RECENT SEARCHES CONTAINER */}
          <div className="recent-searches-full-card">
            <div className="card-top-header">
              <div className="header-title-group">
                <div className="icon-search-badge">
                  <Search size={22} className="text-blue" />
                </div>
                <div>
                  <h3>Recent Searches</h3>
                  <p>Your search activity across medicines, hospitals, and pharmacies</p>
                </div>
              </div>
              
              {recentSearches.length > 0 && (
                <button 
                  className="btn-clear-history"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear your recent searches?')) {
                      setRecentSearches([]);
                    }
                  }}
                >
                  <X size={16} /> Clear History
                </button>
              )}
            </div>

            {/* List of Recent Searches */}
            {recentSearches.length > 0 ? (
              <div className="recent-searches-grid-list">
                {recentSearches.map((item) => (
                  <div key={item.id} className="recent-search-row-card">
                    <div className={`search-type-icon ${item.bg}`}>
                      {item.icon}
                    </div>

                    <div className="search-row-details">
                      <div className="search-title-tag">
                        <h4>{item.query}</h4>
                        <span className={`type-badge ${item.bg}`}>{item.type}</span>
                      </div>
                      <div className="search-meta-text">
                        <span>{item.category}</span> • <span className="time-text"><Clock size={12} /> {item.time}</span>
                      </div>
                    </div>

                    <div className="search-row-actions">
                      <button 
                        className="btn-search-again"
                        onClick={() => {
                          if (item.type === 'Hospital') onNavigateToPage('hospitals');
                          else if (item.type === 'Pharmacy') onNavigateToPage('pharmacies');
                          else onNavigateToPage('search-medicine');
                        }}
                      >
                        <span>Search Again</span>
                        <ArrowRight size={16} />
                      </button>

                      <button 
                        className="btn-remove-item"
                        onClick={() => setRecentSearches(recentSearches.filter(s => s.id !== item.id))}
                        title="Remove from history"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-searches-state">
                <Search size={48} className="empty-icon" />
                <h4>No Recent Searches Found</h4>
                <p>Start searching for medicines, hospitals, or pharmacies to see your history here.</p>
                <button className="btn-primary-action" onClick={() => onNavigateToPage('search-medicine')}>
                  Search Medicine Now
                </button>
              </div>
            )}

            {/* Quick Categories Footer */}
            <div className="recent-searches-footer">
              <span className="footer-label">Quick Search Categories:</span>
              <div className="category-tags-list">
                <button onClick={() => onNavigateToPage('search-medicine')} className="tag-btn">💊 Medicines</button>
                <button onClick={() => onNavigateToPage('hospitals')} className="tag-btn">🏥 Best Hospitals</button>
                <button onClick={() => onNavigateToPage('pharmacies')} className="tag-btn">🏪 Near Pharmacies</button>
                <button onClick={() => onNavigateToPage('emergency')} className="tag-btn">🚨 Emergency Services</button>
              </div>
            </div>
          </div>

        </div>
      </main>

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
                    Pharmacies & hospital distances will be updated accordingly
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
                    placeholder="Enter city, area or pincode (e.g. Boring Road, Patna)..."
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
