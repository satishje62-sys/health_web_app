import React, { useState } from 'react';
import { 
  LayoutDashboard, Search, Building2, MapPin, Star, User, PhoneCall, LogOut, 
  Bell, ChevronDown, Pill, Store, Users, Navigation, ShieldCheck, 
  AlertTriangle, Phone, Activity, Heart, Clock, ChevronRight, 
  Bookmark, Check, ShieldAlert, Ambulance, Droplet, Headphones, HeadphonesIcon,
  Plus, Headphones as SupportIcon, Menu, X, LocateFixed, Loader2, Map
} from 'lucide-react';
import SidebarDrawer from '../components/SidebarDrawer';
import InteractiveMap from '../components/InteractiveMap';
import { useLocationContext } from '../context/LocationContext';
import './EmergencyPage.css';

export default function EmergencyPage({ user, onLogout, onNavigateToPage }) {
  const {
    location,
    detectLocation,
    isDetectingLocation,
    nearbyHospitals,
    nearbyPharmacies,
    isLoadingPlaces
  } = useLocationContext();

  const [activeTab, setActiveTab] = useState('emergency');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSosModal, setShowSosModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showMap, setShowMap] = useState(true);

  // Filter 24/7 emergency hospitals near user location
  const emergencyHospitals = nearbyHospitals.filter(h => h.emergency || h.icu || true).slice(0, 5);
  const pharmacies24x7 = nearbyPharmacies.filter(p => p.is24x7 || true).slice(0, 5);

  const helplineNumbers = [
    { label: 'National Ambulance', number: '108 / 102' },
    { label: 'Police Emergency', number: '100 / 112' },
    { label: 'Fire Services', number: '101' },
    { label: 'Women Helpline', number: '1091' },
    { label: 'Disaster Emergency', number: '1070' },
    { label: 'Mental Health Support', number: '9152987821' }
  ];

  const handleSosClick = () => {
    setShowSosModal(true);
  };

  return (
    <div className="dashboard-layout">
      {/* SLIDE-OUT SIDEBAR DRAWER */}
      <SidebarDrawer 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        onLogout={onLogout}
        onNavigateToPage={onNavigateToPage}
        activePage="emergency"
      />

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="dashboard-main full-width-main">
        {/* TOP BAR HEADER WITH 3-LINE MENU TOGGLE */}
        <header className="dashboard-topbar">
          <div className="topbar-left-brand-group">
            <button 
              className="topbar-3line-toggle"
              onClick={() => setIsSidebarOpen(true)}
              title="Click to Open Menu Sidebar"
              aria-label="Open Sidebar Menu"
            >
              <Menu size={24} />
            </button>

            <div className="brand-logo-group" onClick={() => onNavigateToPage('home')}>
              <div className="sidebar-logo-badge">
                <Plus className="sidebar-cross-icon" />
              </div>
              <span className="sidebar-logo-text">
                Medi<span className="text-green-bright">Near</span>
              </span>
            </div>
          </div>

          <div className="topbar-search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search emergency services, hospitals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="topbar-right-controls">
            <div className="location-pill-chip" onClick={detectLocation}>
              <MapPin size={16} className="pin-icon" />
              <span>{location.name}</span>
              <LocateFixed size={14} className="detect-icon text-green-bright" />
            </div>

            <button className="sos-pill-btn pulse-glow" onClick={handleSosClick}>
              🚨 SOS 108
            </button>

            <div className="user-profile-widget" onClick={() => onNavigateToPage('profile')}>
              <div className="avatar-circle">
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
              <div className="user-info">
                <span className="user-name-text">{user?.name || 'Rahul Kumar'}</span>
                <span className="user-badge">{user?.role || 'Premium'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* HERO EMERGENCY BANNER */}
        <div className="emergency-hero-banner">
          <div className="hero-alert-badge">
            <ShieldAlert size={20} className="alert-pulse" /> 24/7 Emergency Healthcare Finder
          </div>
          <h1>
            Emergency Services Near <span className="text-yellow">{location.name}</span>
          </h1>
          <p>
            Real-time emergency hospital locator, ambulance dispatch helpline, and 24/7 medical store navigation.
          </p>

          <div className="emergency-quick-actions">
            <button className="action-btn sos-red" onClick={handleSosClick}>
              <PhoneCall size={20} /> Call Ambulance (108)
            </button>
            <button className="action-btn gps-blue" onClick={detectLocation} disabled={isDetectingLocation}>
              {isDetectingLocation ? <Loader2 size={20} className="spin-icon" /> : <LocateFixed size={20} />}
              Refresh GPS Location
            </button>
          </div>
        </div>

        {/* INTERACTIVE EMERGENCY MAP VIEW */}
        <div className="emergency-map-section">
          <div className="section-header-row">
            <h2>📍 Live Emergency Map - {location.name}</h2>
            <button className="btn-toggle-map" onClick={() => setShowMap(!showMap)}>
              <Map size={16} /> {showMap ? 'Hide Map' : 'Show Interactive Map'}
            </button>
          </div>

          {showMap && (
            <InteractiveMap 
              center={location}
              userLocation={location}
              markers={[
                ...emergencyHospitals.map(h => ({ ...h, isHospital: true })),
                ...pharmacies24x7.map(p => ({ ...p, isPharmacy: true }))
              ]}
              title={`Emergency Facilities within 10km of ${location.name}`}
              height="450px"
              zoom={13}
            />
          )}
        </div>

        {/* EMERGENCY HOSPITALS LIST */}
        <div className="emergency-grid-section">
          <div className="section-title">
            <Building2 size={22} className="text-red" />
            <h3>Nearest 24/7 Emergency Hospitals ({emergencyHospitals.length})</h3>
          </div>

          <div className="hospitals-emergency-cards">
            {emergencyHospitals.map((hosp) => (
              <div key={hosp.id} className="emergency-card">
                <div className="card-top-row">
                  <span className="badge-icu">🚨 ICU 24/7</span>
                  <span className="badge-dist">⚡ {hosp.distance}</span>
                </div>
                <h4>{hosp.name}</h4>
                <p className="card-addr"><MapPin size={14} /> {hosp.address}</p>

                <div className="card-actions-row">
                  <a 
                    href={hosp.directionsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-route-gmaps"
                  >
                    <Navigation size={15} /> Directions
                  </a>
                  {hosp.phone && (
                    <a href={`tel:${hosp.phone}`} className="btn-call-emergency">
                      <Phone size={15} /> Call Hospital
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NATIONAL HELPLINES BAR */}
        <div className="helpline-numbers-section">
          <h3>☎️ Immediate National Toll-Free Helplines</h3>
          <div className="helplines-grid">
            {helplineNumbers.map((h, i) => (
              <div key={i} className="helpline-item">
                <span className="helpline-label">{h.label}</span>
                <a href={`tel:${h.number.split('/')[0].trim()}`} className="helpline-num">{h.number}</a>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* SOS MODAL */}
      {showSosModal && (
        <div className="modal-backdrop" onClick={() => setShowSosModal(false)}>
          <div className="sos-modal-card animate-bounce-in" onClick={e => e.stopPropagation()}>
            <div className="sos-modal-header">
              <ShieldAlert size={48} className="sos-icon-large" />
              <h2>Emergency SOS Alert</h2>
              <p>Active GPS Location: <strong>{location.name}</strong></p>
            </div>

            <div className="sos-modal-body">
              <div className="sos-call-box">
                <span className="call-title">National Ambulance Helpline</span>
                <a href="tel:108" className="btn-sos-call">
                  📞 CALL 108 NOW
                </a>
              </div>

              <div className="sos-call-box">
                <span className="call-title">Police Emergency Services</span>
                <a href="tel:112" className="btn-sos-call police">
                  📞 CALL 112 NOW
                </a>
              </div>
            </div>

            <button className="btn-close-sos" onClick={() => setShowSosModal(false)}>
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
