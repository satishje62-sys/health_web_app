import React, { useState } from 'react';
import { 
  LayoutDashboard, Search, Building2, MapPin, Star, User, PhoneCall, LogOut, 
  Bell, ChevronDown, Pill, Store, Users, Navigation, ShieldCheck, 
  AlertTriangle, Phone, Activity, Heart, Clock, ChevronRight, 
  Bookmark, Check, ShieldAlert, Ambulance, Droplet, Headphones, HeadphonesIcon,
  Plus, Headphones as SupportIcon, Menu, X
} from 'lucide-react';
import SidebarDrawer from '../components/SidebarDrawer';
import './EmergencyPage.css';

export default function EmergencyPage({ user, onLogout, onNavigateToPage }) {
  const [activeTab, setActiveTab] = useState('emergency');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Patna, Bihar');
  const [showSosModal, setShowSosModal] = useState(false);
  const [savedPage, setSavedPage] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const nearestHospitals = [
    { id: 1, name: 'AIIMS Patna', distance: '2.1 km', time: '6 mins', phone: '+91 612 245 1000' },
    { id: 2, name: 'Medanta Patna', distance: '2.8 km', time: '8 mins', phone: '+91 612 350 5000' },
    { id: 3, name: 'Paras HMRI Hospital', distance: '3.4 km', time: '10 mins', phone: '+91 612 710 7777' }
  ];

  const emergencyPharmacies = [
    { name: 'Apollo Pharmacy', status: 'Open 24 Hours', distance: '0.6 km', phone: '+91 98765 11111' },
    { name: 'MedPlus Pharmacy', status: 'Open 24 Hours', distance: '1.2 km', phone: '+91 98765 22222' },
    { name: 'Wellness Forever', status: 'Open till 11:00 PM', distance: '1.8 km', phone: '+91 98765 33333' },
    { name: 'Healing Pharma', status: 'Open 24 Hours', distance: '2.4 km', phone: '+91 98765 44444' }
  ];

  const bloodBanksNearby = [
    { name: 'Red Cross Blood Bank', distance: '0.8 km', area: 'Boring Road', phone: '+91 612 221 0001' },
    { name: 'Patna Blood Centre', distance: '1.5 km', area: 'Exhibition Road', phone: '+91 612 221 0002' },
    { name: 'Jeevan Blood Bank', distance: '2.0 km', area: 'Bailey Road', phone: '+91 612 221 0003' },
    { name: 'Rotary Blood Bank', distance: '2.6 km', area: 'Kankarbagh', phone: '+91 612 221 0004' }
  ];

  const helplineNumbers = [
    { label: 'Ambulance', number: '102 / 108' },
    { label: 'Police', number: '100' },
    { label: 'Fire Services', number: '101' },
    { label: 'Women Helpline', number: '1091' },
    { label: 'Child Helpline', number: '1098' },
    { label: 'Disaster Management', number: '1070' },
    { label: 'Mental Health Support', number: '9152987821' }
  ];

  const handleSosClick = () => {
    setShowSosModal(true);
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
        activePage="emergency"
      />

      {/* RIGHT MAIN CONTENT AREA */}
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

          <div className="topbar-right-controls">
            <div className="location-pill-selector">
              <MapPin size={16} className="text-blue" />
              <span>{location}</span>
              <ChevronDown size={14} className="arrow" />
            </div>

            <button className="notification-btn" aria-label="Notifications">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>

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

        {/* EMERGENCY PAGE BODY CONTENT */}
        <div className="emergency-body-container">
          
          {/* TOP EMERGENCY GRID (2 COLUMNS: SOS CALL CARD + HOSPITALS & MAP) */}
          <div className="top-emergency-grid">
            
            {/* LEFT: SOS CALL BOX */}
            <div className="sos-call-card">
              <h2 className="sos-title">In an Emergency?</h2>
              <p className="sos-sub">Get immediate help now</p>

              {/* MASSIVE PULSING RED SOS BUTTON */}
              <div className="sos-button-wrapper" onClick={handleSosClick}>
                <div className="sos-pulse-ring-2" />
                <div className="sos-pulse-ring-1" />
                <button className="btn-sos-trigger">
                  <PhoneCall size={36} className="phone-sos-icon" />
                  <span className="sos-lbl-txt">SOS</span>
                </button>
              </div>

              <span className="tap-hint-txt">Tap to call for help</span>
              <span className="location-share-sub">Your location will be shared with emergency services</span>

              <div className="sos-legal-warning-box">
                <AlertTriangle size={18} className="warning-icon" />
                <div className="warning-text">
                  <strong>Use only in a genuine emergency</strong>
                  <p>Misuse may lead to legal action</p>
                </div>
              </div>
            </div>

            {/* RIGHT: NEAREST HOSPITALS & LIVE MAP */}
            <div className="hospitals-map-card">
              
              {/* Header: Location */}
              <div className="your-location-row">
                <div className="loc-text-group">
                  <MapPin size={16} className="text-blue" />
                  <span>Your Location: <strong>Boring Road, Patna, Bihar</strong></span>
                </div>
                <button className="btn-change-loc" onClick={() => alert('Location detector updated!')}>Change</button>
              </div>

              {/* Content Split: Hospitals List & Map */}
              <div className="hosp-map-split">
                
                {/* Nearest Hospitals List */}
                <div className="nearest-hospitals-col">
                  <div className="col-header-row">
                    <h4>Nearest Hospitals</h4>
                    <button className="link-view-all" onClick={() => onNavigateToPage('hospitals')}>View all</button>
                  </div>

                  <div className="hospitals-stack-list">
                    {nearestHospitals.map((hosp) => (
                      <div key={hosp.id} className="hosp-item-row">
                        <div className="num-badge">{hosp.id}</div>
                        <div className="hosp-details">
                          <h5>{hosp.name}</h5>
                          <span>{hosp.distance} • {hosp.time}</span>
                        </div>
                        <div className="hosp-action-btns">
                          <button className="btn-h-call" onClick={() => alert(`Calling ${hosp.name} at ${hosp.phone}...`)}>
                            <Phone size={14} /> Call
                          </button>
                          <button className="btn-h-dir" onClick={() => alert(`Opening GPS Directions to ${hosp.name}...`)}>
                            <Navigation size={14} /> Directions
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Emergency Map Preview */}
                <div className="live-emergency-map-col">
                  <svg viewBox="0 0 280 200" fill="none" className="emergency-map-svg">
                    <rect width="280" height="200" fill="#EBF3FF" />
                    {/* Ganges River */}
                    <path d="M0 30 Q 140 10, 280 40" stroke="#BFDBFE" strokeWidth="16" />
                    {/* Roads */}
                    <path d="M40 0 Q 100 120, 200 200" stroke="#CBD5E1" strokeWidth="10" />
                    <path d="M0 110 Q 140 100, 280 130" stroke="#CBD5E1" strokeWidth="10" />
                  </svg>

                  {/* Live User Blue Pulse Dot */}
                  <div className="user-live-pulse-dot">
                    <div className="dot-pulse-ring" />
                    <div className="dot-center" />
                  </div>

                  {/* Hospital Red Pins */}
                  <div className="hospital-pin h1"><span className="pin-tag">H 1</span></div>
                  <div className="hospital-pin h2"><span className="pin-tag">H 2</span></div>
                  <div className="hospital-pin h3"><span className="pin-tag">H 3</span></div>

                  <div className="map-place-lbl station">Patna Junction</div>
                  <div className="map-place-lbl boring">BORING ROAD</div>
                  <div className="map-place-lbl kankarbagh">KANKARBAGH</div>
                </div>

              </div>
            </div>

          </div>

          {/* 4 EMERGENCY QUICK ACTION CARDS */}
          <div className="emergency-actions-grid">
            
            {/* Card 1: Ambulance (Blue) */}
            <div className="quick-action-card blue">
              <div className="qa-header">
                <div className="qa-icon-circle blue"><Ambulance size={22} /></div>
                <div className="qa-text">
                  <h4>Ambulance</h4>
                  <p>Get an ambulance in minutes</p>
                </div>
              </div>
              <div className="qa-number-big">102 / 108</div>
              <button className="btn-qa-action blue" onClick={() => alert('Calling Ambulance 102 / 108...')}>
                <Phone size={14} /> Call Now
              </button>
            </div>

            {/* Card 2: Blood Bank (Red) */}
            <div className="quick-action-card red">
              <div className="qa-header">
                <div className="qa-icon-circle red"><Droplet size={22} /></div>
                <div className="qa-text">
                  <h4>Blood Bank</h4>
                  <p>Find blood banks near you</p>
                </div>
              </div>
              <div className="qa-number-big red-txt">4 Nearby</div>
              <button className="btn-qa-action red-btn" onClick={() => alert('Showing nearby blood bank locations')}>
                View Locations
              </button>
            </div>

            {/* Card 3: Emergency Pharmacy (Green) */}
            <div className="quick-action-card green">
              <div className="qa-header">
                <div className="qa-icon-circle green"><Store size={22} /></div>
                <div className="qa-text">
                  <h4>Emergency Pharmacy</h4>
                  <p>24x7 pharmacies near you</p>
                </div>
              </div>
              <div className="qa-number-big green-txt">6 Open Now</div>
              <button className="btn-qa-action green-btn" onClick={() => onNavigateToPage('pharmacies')}>
                View Pharmacies
              </button>
            </div>

            {/* Card 4: Helpline Numbers (Purple) */}
            <div className="quick-action-card purple">
              <div className="qa-header">
                <div className="qa-icon-circle purple"><Headphones size={22} /></div>
                <div className="qa-text">
                  <h4>Helpline Numbers</h4>
                  <p>Important emergency helplines</p>
                </div>
              </div>
              <div className="qa-number-big purple-txt">View All</div>
              <button className="btn-qa-action purple-btn" onClick={() => alert('Showing all emergency helplines')}>
                See Numbers
              </button>
            </div>

          </div>

          {/* MIDDLE 3 COLUMNS SECTION */}
          <div className="middle-three-cols-grid">
            
            {/* Column 1: Emergency Pharmacies */}
            <div className="middle-col-card">
              <div className="card-top-header">
                <h4>Emergency Pharmacies</h4>
                <button className="link-view-all" onClick={() => onNavigateToPage('pharmacies')}>View all</button>
              </div>

              <div className="col-items-list">
                {emergencyPharmacies.map((pharm, idx) => (
                  <div key={idx} className="middle-item-row" onClick={() => onNavigateToPage('pharmacies')}>
                    <div className="plus-green-badge"><Plus size={16} /></div>
                    <div className="item-text-info">
                      <h5>{pharm.name}</h5>
                      <span>{pharm.status} • {pharm.distance}</span>
                    </div>
                    <button className="btn-icon-call" onClick={(e) => { e.stopPropagation(); alert(`Calling ${pharm.name}...`); }}>
                      <Phone size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Blood Banks Nearby */}
            <div className="middle-col-card">
              <div className="card-top-header">
                <h4>Blood Banks Nearby</h4>
                <button className="link-view-all">View all</button>
              </div>

              <div className="col-items-list">
                {bloodBanksNearby.map((bank, idx) => (
                  <div key={idx} className="middle-item-row">
                    <div className="droplet-red-badge"><Droplet size={16} /></div>
                    <div className="item-text-info">
                      <h5>{bank.name}</h5>
                      <span>{bank.distance} • {bank.area}</span>
                    </div>
                    <button className="btn-icon-call" onClick={() => alert(`Calling ${bank.name}...`)}>
                      <Phone size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Emergency Helpline Numbers */}
            <div className="middle-col-card">
              <div className="card-top-header">
                <h4>Emergency Helpline Numbers</h4>
              </div>

              <div className="col-items-list helplines">
                {helplineNumbers.map((hl, idx) => (
                  <div key={idx} className="helpline-item-row">
                    <span className="hl-label">{hl.label}</span>
                    <div className="hl-num-call">
                      <span className="hl-num font-bold">{hl.number}</span>
                      <button className="btn-icon-call" onClick={() => alert(`Dialing ${hl.label} (${hl.number})...`)}>
                        <Phone size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* QUICK DIRECTIONS BANNER */}
          <div className="quick-directions-banner">
            <div className="banner-left-route">
              <div className="car-blue-icon"><Ambulance size={24} /></div>
              <div className="route-text-block">
                <h4>Quick Directions to Nearest Hospital</h4>
                <div className="route-from-to-line">
                  <span className="from">📍 From Your Location: <strong>Boring Road, Patna</strong></span>
                  <span className="arrow-sep">➔</span>
                  <span className="to">📍 To: <strong>AIIMS Patna</strong> <small>(2.1 km • 6 mins)</small></span>
                </div>
              </div>
            </div>

            <button className="btn-get-directions-banner" onClick={() => alert('Opening Turn-by-Turn GPS Navigation to AIIMS Patna...')}>
              <Navigation size={16} /> Get Directions
            </button>
          </div>

          {/* STAY CALM, STAY SAFE 4 STEPS BANNER */}
          <div className="stay-safe-banner">
            <h4>Stay Calm, Stay Safe</h4>
            <div className="safe-steps-grid">
              <div className="safe-step-item">
                <div className="step-icon red"><PhoneCall size={18} /></div>
                <span>Dial SOS for immediate assistance</span>
              </div>

              <div className="safe-step-item">
                <div className="step-icon blue"><Headphones size={18} /></div>
                <span>Stay on the line and follow instructions</span>
              </div>

              <div className="safe-step-item">
                <div className="step-icon blue"><MapPin size={18} /></div>
                <span>Share accurate location for faster help</span>
              </div>

              <div className="safe-step-item">
                <div className="step-icon red"><Ambulance size={18} /></div>
                <span>Keep calm and help will reach you soon</span>
              </div>
            </div>
          </div>

          {/* BOTTOM RED SAFETY ASSURANCE BANNER */}
          <div className="bottom-red-safety-banner">
            <div className="shield-icon-badge-red">
              <ShieldCheck size={32} />
            </div>
            <div className="banner-text">
              <h3>We're here for you, 24x7</h3>
              <p>Your safety is our priority</p>
            </div>
            <button 
              className={`btn-save-emergency-page ${savedPage ? 'saved' : ''}`}
              onClick={() => setSavedPage(!savedPage)}
            >
              <Bookmark size={16} /> {savedPage ? 'Page Saved' : 'Save This Page'}
              <small>Quick access in emergencies</small>
            </button>
          </div>

        </div>
      </main>

      {/* SOS EMERGENCY CALL MODAL */}
      {showSosModal && (
        <div className="modal-backdrop" onClick={() => setShowSosModal(false)}>
          <div className="sos-modal-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="sos-alert-ring-animation">
              <PhoneCall size={48} className="text-white" />
            </div>

            <h3 className="modal-title text-red">CONNECTING TO EMERGENCY DISPATCH</h3>
            <p className="modal-sub">Calling 108 Ambulance & sharing your location: <strong>Boring Road, Patna</strong></p>

            <div className="sos-status-box">
              <div className="status-item"><Check size={16} className="text-green" /> GPS Location Shared</div>
              <div className="status-item"><Check size={16} className="text-green" /> Nearby Hospitals Notified</div>
              <div className="status-item"><Clock size={16} className="text-orange" /> Dispatching Ambulance...</div>
            </div>

            <button className="btn-cancel-sos" onClick={() => setShowSosModal(false)}>
              Cancel Emergency Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
