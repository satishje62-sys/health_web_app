import React, { useState } from 'react';
import { 
  LayoutDashboard, Search, Building2, MapPin, Star, User, PhoneCall, LogOut, 
  Bell, ChevronDown, Pill, Store, Users, TrendingUp, ChevronRight, ChevronLeft, 
  ShieldCheck, Headphones, Bookmark, Plus, ArrowRight, Activity, Clock, CheckCircle2,
  Camera, Edit3, Upload, Phone, X, Home, Download, FileText, Heart, CreditCard,
  ShoppingBag, Menu
} from 'lucide-react';
import SidebarDrawer from '../components/SidebarDrawer';
import './UserProfilePage.css';

export default function UserProfilePage({ user, onLogout, onNavigateToPage }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Patna, Bihar');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggles for Notification Settings
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [offersDiscounts, setOffersDiscounts] = useState(true);
  const [healthTips, setHealthTips] = useState(true);
  const [reminders, setReminders] = useState(false);

  // Edit Profile Modal & Profile Avatar Image State
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
  );

  const [userProfileData, setUserProfileData] = useState({
    fullName: user?.fullName || user?.name || 'Rahul Kumar',
    email: user?.email || 'rahulkumar@gmail.com',
    phone: '+91 98765 43210',
    dob: '14 May 1996',
    gender: 'Male',
    bloodGroup: 'O+',
    location: 'Patna, Bihar'
  });

  const handleProfileImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (JPG, PNG, WEBP, etc.).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const savedMedicinesData = [
    { name: 'Crocin 650 Tablet', salt: 'Paracetamol 650 mg', price: '₹25.00', bgClass: 'crocin' },
    { name: 'Dolo 650 Tablet', salt: 'Paracetamol 650 mg', price: '₹23.50', bgClass: 'dolo' },
    { name: 'Azithral 500 Tablet', salt: 'Azithromycin 500 mg', price: '₹52.00', bgClass: 'azithral' },
    { name: 'Calpol 650 Tablet', salt: 'Paracetamol 650 mg', price: '₹24.00', bgClass: 'calpol' }
  ];

  const favoriteHospitalsData = [
    { name: 'AIIMS Patna', location: 'Phulwari Sharif, Patna', distance: '2.1 km away' },
    { name: 'Patna Medical College', location: 'Kankarbagh, Patna', distance: '3.4 km away' },
    { name: 'Paras HMRI Hospital', location: 'Rukanpura, Patna', distance: '4.2 km away' }
  ];

  const reviewHistoryData = [
    { place: 'AIIMS Patna', date: '12 May 2024', rating: '4.5', comment: 'Very good experience. Doctors and staff...' },
    { place: 'MedPlus Pharmacy', date: '03 May 2024', rating: '4.0', comment: 'Medicines available at best price.' },
    { place: 'Apollo Pharmacy', date: '22 Apr 2024', rating: '4.5', comment: 'Good service and fast delivery.' }
  ];

  const [recentSearches, setRecentSearches] = useState([
    'Crocin 650 Tablet', 'MedPlus Pharmacy Patna', 'AIIMS Patna', 
    'Vitamin D3 Tablet', 'Apollo Hospital Patna'
  ]);

  const handleRemoveSearch = (idx) => {
    setRecentSearches(recentSearches.filter((_, i) => i !== idx));
  };

  const handleSaveEditProfile = (e) => {
    e.preventDefault();
    setShowEditModal(false);
    alert('Profile updated successfully!');
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
        activePage="profile"
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

            <div className="user-profile-menu">
              <img 
                src={profileImage} 
                alt="User Avatar" 
                className="user-avatar"
              />
              <div className="user-text-info">
                <span className="user-greeting">Hello, {userProfileData.fullName.split(' ')[0]}</span>
                <span className="user-role-badge">User</span>
              </div>
              <ChevronDown size={14} className="user-arrow" />
            </div>
          </div>
        </header>

        {/* HIDDEN FILE INPUT FOR MEDIA/GALLERY PROFILE IMAGE SELECTION */}
        <input 
          type="file" 
          id="profile-pic-file-input" 
          accept="image/*" 
          style={{ display: 'none' }} 
          onChange={handleProfileImageUpload} 
        />

        {/* PROFILE PAGE CONTENT BODY */}
        <div className="profile-body-container">
          <div className="profile-columns-grid">
            
            {/* COLUMN 1 & 2: LEFT/CENTER MAIN CARDS */}
            <div className="left-center-content-column">
              
              {/* 1. TOP USER PROFILE HERO CARD */}
              <div className="user-profile-hero-card">
                <div 
                  className="user-avatar-upload-box clickable-avatar"
                  onClick={() => document.getElementById('profile-pic-file-input').click()}
                  title="Click to Upload Profile Picture from device"
                >
                  <img 
                    src={profileImage} 
                    alt={userProfileData.fullName} 
                    className="hero-avatar-img"
                  />
                  <div className="camera-badge-btn" title="Upload Photo">
                    <Camera size={14} />
                  </div>
                </div>

                <div className="user-hero-info">
                  <div className="name-verified-row">
                    <h2 className="user-name">{userProfileData.fullName}</h2>
                    <CheckCircle2 size={20} className="verified-blue" />
                  </div>

                  <div className="contact-details-row">
                    <span>✉️ {userProfileData.email}</span>
                  </div>
                  <div className="contact-details-row">
                    <span>📞 {userProfileData.phone}</span>
                  </div>
                  <div className="contact-details-row">
                    <span>📅 Joined on Feb 12, 2024</span>
                  </div>
                </div>

                <button className="btn-edit-profile" onClick={() => setShowEditModal(true)}>
                  <Edit3 size={16} /> Edit Profile
                </button>

                {/* Sub-grid Metadata Pills */}
                <div className="profile-meta-pills-bar">
                  <div className="meta-pill-item green-box">
                    <span className="lbl">Health Score</span>
                    <div className="val-row">
                      <span className="score-num font-bold">85</span>
                      <span className="score-tag">Good</span>
                    </div>
                    <span className="sub-tip">Keep it up!</span>
                  </div>

                  <div className="meta-pill-item">
                    <span className="lbl">Date of Birth</span>
                    <span className="val">{userProfileData.dob}</span>
                  </div>

                  <div className="meta-pill-item">
                    <span className="lbl">Gender</span>
                    <span className="val">{userProfileData.gender}</span>
                  </div>

                  <div className="meta-pill-item">
                    <span className="lbl">Blood Group</span>
                    <span className="val blood-red">{userProfileData.bloodGroup}</span>
                  </div>

                  <div className="meta-pill-item">
                    <span className="lbl">Location</span>
                    <span className="val">{userProfileData.location}</span>
                  </div>
                </div>
              </div>

              {/* 2. SAVED MEDICINES CAROUSEL CARD */}
              <div className="profile-section-card">
                <div className="section-card-header">
                  <h3>Saved Medicines</h3>
                  <button className="link-view-all" onClick={() => onNavigateToPage('search-medicine')}>View All</button>
                </div>

                <div className="saved-medicines-grid">
                  {savedMedicinesData.map((med, idx) => (
                    <div key={idx} className="saved-med-card">
                      <div className="med-box-mockup">
                        <div className={`mock-pack ${med.bgClass}`}>
                          <span>{med.name}</span>
                        </div>
                      </div>
                      <div className="med-info">
                        <h4>{med.name}</h4>
                        <span className="salt">{med.salt}</span>
                        <div className="price-bookmark-row">
                          <span className="price">{med.price}</span>
                          <Bookmark size={16} className="text-blue fill-blue" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. FAVORITE HOSPITALS & REVIEW HISTORY (SPLIT 2 COLS) */}
              <div className="split-two-cols">
                
                {/* Favorite Hospitals */}
                <div className="profile-section-card">
                  <div className="section-card-header">
                    <h3>Favorite Hospitals</h3>
                    <button className="link-view-all" onClick={() => onNavigateToPage('hospitals')}>View All</button>
                  </div>

                  <div className="fav-hospitals-list">
                    {favoriteHospitalsData.map((hosp, idx) => (
                      <div key={idx} className="fav-hosp-item" onClick={() => onNavigateToPage('hospitals')}>
                        <div className="hosp-icon-thumb"><Building2 size={20} className="text-blue" /></div>
                        <div className="hosp-info">
                          <h4>{hosp.name}</h4>
                          <span>{hosp.location}</span>
                          <small>{hosp.distance}</small>
                        </div>
                        <Heart size={18} className="text-red-fill" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review History */}
                <div className="profile-section-card">
                  <div className="section-card-header">
                    <h3>Review History</h3>
                    <button className="link-view-all" onClick={() => onNavigateToPage('reviews')}>View All</button>
                  </div>

                  <div className="review-history-list">
                    {reviewHistoryData.map((rev, idx) => (
                      <div key={idx} className="review-hist-item" onClick={() => onNavigateToPage('reviews')}>
                        <div className="rev-icon-thumb"><Star size={18} className="text-gold" /></div>
                        <div className="rev-info">
                          <div className="rev-top-line">
                            <h4>{rev.place}</h4>
                            <span className="date">{rev.date}</span>
                          </div>
                          <div className="rating-stars">★★★★★ <strong>{rev.rating}</strong></div>
                          <p className="comment">"{rev.comment}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* 4. RECENT SEARCHES & ADDRESSES (SPLIT 2 COLS) */}
              <div className="split-two-cols">
                
                {/* Recent Searches */}
                <div className="profile-section-card">
                  <div className="section-card-header">
                    <h3>Recent Searches</h3>
                    <button className="link-view-all" onClick={() => setRecentSearches([])}>Clear All</button>
                  </div>

                  <div className="recent-searches-list">
                    {recentSearches.map((query, idx) => (
                      <div key={idx} className="recent-search-row">
                        <div className="search-text-item">
                          <Search size={14} className="text-gray" />
                          <span>{query}</span>
                        </div>
                        <button className="btn-remove-search" onClick={() => handleRemoveSearch(idx)}><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Addresses */}
                <div className="profile-section-card">
                  <div className="section-card-header">
                    <h3>Addresses</h3>
                    <button className="link-view-all">Manage</button>
                  </div>

                  <div className="addresses-list">
                    <div className="address-item-card">
                      <div className="addr-icon"><Home size={18} className="text-blue" /></div>
                      <div className="addr-info">
                        <h4>Home</h4>
                        <p>Boring Road, Patna, Bihar - 800001</p>
                        <span>+91 98765 43210</span>
                      </div>
                    </div>

                    <div className="address-item-card">
                      <div className="addr-icon"><Building2 size={18} className="text-blue" /></div>
                      <div className="addr-info">
                        <h4>Office</h4>
                        <p>Exhibition Road, Patna, Bihar - 800001</p>
                        <span>+91 98765 43210</span>
                      </div>
                    </div>

                    <div className="address-item-card">
                      <div className="addr-icon"><MapPin size={18} className="text-blue" /></div>
                      <div className="addr-info">
                        <h4>Other</h4>
                        <p>Kankarbagh, Patna, Bihar - 800020</p>
                        <span>+91 98765 43210</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* COLUMN 3: RIGHT SIDEBAR CONTROLS */}
            <aside className="right-sidebar-controls-column">
              
              {/* 1. Account Overview */}
              <div className="sidebar-control-card">
                <h4 className="card-title">Account Overview</h4>
                <div className="overview-stats-list">
                  <div className="ov-row" onClick={() => onNavigateToPage('dashboard')}>
                    <span className="lbl"><ShoppingBag size={16} /> Orders</span>
                    <span className="val font-bold">12</span>
                  </div>
                  <div className="ov-row" onClick={() => onNavigateToPage('reviews')}>
                    <span className="lbl"><Star size={16} /> Reviews</span>
                    <span className="val font-bold">8</span>
                  </div>
                  <div className="ov-row" onClick={() => onNavigateToPage('search-medicine')}>
                    <span className="lbl"><Bookmark size={16} /> Saved Medicines</span>
                    <span className="val font-bold">7</span>
                  </div>
                  <div className="ov-row" onClick={() => onNavigateToPage('hospitals')}>
                    <span className="lbl"><Heart size={16} /> Favorite Hospitals</span>
                    <span className="val font-bold">5</span>
                  </div>
                  <div className="ov-row">
                    <span className="lbl"><MapPin size={16} /> Addresses</span>
                    <span className="val font-bold">3</span>
                  </div>
                </div>
              </div>

              {/* 2. Quick Actions */}
              <div className="sidebar-control-card">
                <h4 className="card-title">Quick Actions</h4>
                <div className="quick-actions-list">
                  <div className="action-row-item" onClick={() => alert('Upload Prescription feature')}>
                    <div className="act-icon blue"><Upload size={16} /></div>
                    <div className="act-text">
                      <h5>Upload Prescription</h5>
                      <span>Upload and order medicines</span>
                    </div>
                    <ChevronRight size={16} className="arrow" />
                  </div>

                  <div className="action-row-item" onClick={() => onNavigateToPage('hospitals')}>
                    <div className="act-icon green"><MapPin size={16} /></div>
                    <div className="act-text">
                      <h5>Find Nearby</h5>
                      <span>Hospitals & Pharmacies</span>
                    </div>
                    <ChevronRight size={16} className="arrow" />
                  </div>

                  <div className="action-row-item" onClick={() => alert('Health Records feature')}>
                    <div className="act-icon purple"><FileText size={16} /></div>
                    <div className="act-text">
                      <h5>Health Records</h5>
                      <span>View your health documents</span>
                    </div>
                    <ChevronRight size={16} className="arrow" />
                  </div>

                  <div className="action-row-item" onClick={() => alert('Calling Emergency Helpline...')}>
                    <div className="act-icon red"><PhoneCall size={16} /></div>
                    <div className="act-text">
                      <h5>Emergency</h5>
                      <span>24x7 Emergency Helpline</span>
                    </div>
                    <ChevronRight size={16} className="arrow" />
                  </div>
                </div>
              </div>

              {/* 3. Notification Settings */}
              <div className="sidebar-control-card">
                <h4 className="card-title">Notification Settings</h4>
                <p className="card-sub">Manage how you receive updates</p>

                <div className="settings-toggles-list">
                  <div className="toggle-row">
                    <div className="t-text">
                      <h5>Order Updates</h5>
                      <span>Get notified about your orders</span>
                    </div>
                    <button 
                      className={`btn-toggle ${orderUpdates ? 'on' : 'off'}`}
                      onClick={() => setOrderUpdates(!orderUpdates)}
                    >
                      <span className="handle" />
                    </button>
                  </div>

                  <div className="toggle-row">
                    <div className="t-text">
                      <h5>Offers & Discounts</h5>
                      <span>Receive offers and deals</span>
                    </div>
                    <button 
                      className={`btn-toggle ${offersDiscounts ? 'on' : 'off'}`}
                      onClick={() => setOffersDiscounts(!offersDiscounts)}
                    >
                      <span className="handle" />
                    </button>
                  </div>

                  <div className="toggle-row">
                    <div className="t-text">
                      <h5>Health Tips</h5>
                      <span>Daily health tips and info</span>
                    </div>
                    <button 
                      className={`btn-toggle ${healthTips ? 'on' : 'off'}`}
                      onClick={() => setHealthTips(!healthTips)}
                    >
                      <span className="handle" />
                    </button>
                  </div>

                  <div className="toggle-row">
                    <div className="t-text">
                      <h5>Reminders</h5>
                      <span>Medicine reminders & refills</span>
                    </div>
                    <button 
                      className={`btn-toggle ${reminders ? 'on' : 'off'}`}
                      onClick={() => setReminders(!reminders)}
                    >
                      <span className="handle" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Privacy Settings */}
              <div className="sidebar-control-card">
                <h4 className="card-title">Privacy Settings</h4>
                <p className="card-sub">Manage your privacy and data</p>

                <div className="privacy-options-list">
                  <div className="priv-row">
                    <span>Profile Visibility</span>
                    <span className="val">Anyone &gt;</span>
                  </div>
                  <div className="priv-row">
                    <span>Share Data for Better Suggestions</span>
                    <span className="val">On &gt;</span>
                  </div>
                  <div className="priv-row">
                    <span>Search History</span>
                    <span className="val">On &gt;</span>
                  </div>
                  <div className="priv-row">
                    <span>Personalized Ads</span>
                    <span className="val">Off &gt;</span>
                  </div>
                </div>

                <button className="btn-download-data" onClick={() => alert('Downloading your MediNear encrypted data archive...')}>
                  <Download size={16} /> Download My Data
                </button>
              </div>

            </aside>

          </div>

          {/* BOTTOM PRIVACY BANNER */}
          <div className="bottom-privacy-shield-banner">
            <div className="shield-icon-badge">
              <ShieldCheck size={32} />
            </div>
            <div className="banner-text">
              <h3>Your Health. Your Data. Our Priority.</h3>
              <p>We are committed to protect your privacy and provide you safe experience.</p>
            </div>
            <button className="btn-learn-more" onClick={() => alert('MediNear Privacy Assurance Policy')}>
              Learn More
            </button>
          </div>

        </div>
      </main>

      {/* EDIT PROFILE MODAL */}
      {showEditModal && (
        <div className="modal-backdrop" onClick={() => setShowEditModal(false)}>
          <div className="edit-profile-modal-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={() => setShowEditModal(false)}>✕</button>

            <form onSubmit={handleSaveEditProfile} className="edit-form">
              <h3 className="modal-title">Edit Profile Information</h3>

              {/* Profile Photo Upload Row */}
              <div className="photo-upload-modal-row flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <img src={profileImage} alt="Profile Preview" className="modal-avatar-preview-img w-16 h-16 rounded-full object-cover border-2 border-blue" />
                <div>
                  <h4 className="text-sm font-semibold mb-1">Profile Photo</h4>
                  <button 
                    type="button" 
                    className="btn-upload-modal-pic" 
                    onClick={() => document.getElementById('profile-pic-file-input').click()}
                  >
                    <Camera size={15} /> Upload Photo from Device
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={userProfileData.fullName}
                  onChange={(e) => setUserProfileData({ ...userProfileData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={userProfileData.email}
                  onChange={(e) => setUserProfileData({ ...userProfileData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    value={userProfileData.phone}
                    onChange={(e) => setUserProfileData({ ...userProfileData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Blood Group</label>
                  <select 
                    value={userProfileData.bloodGroup}
                    onChange={(e) => setUserProfileData({ ...userProfileData, bloodGroup: e.target.value })}
                  >
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Gender</label>
                  <select 
                    value={userProfileData.gender}
                    onChange={(e) => setUserProfileData({ ...userProfileData, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input 
                    type="text" 
                    value={userProfileData.location}
                    onChange={(e) => setUserProfileData({ ...userProfileData, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-save-profile">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
