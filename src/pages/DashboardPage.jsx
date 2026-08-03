import React, { useState } from 'react';
import { 
  LayoutDashboard, Search, Building2, MapPin, Star, User, PhoneCall, LogOut, 
  Bell, ChevronDown, Pill, Store, Users, TrendingUp, ChevronRight, ChevronLeft, 
  ShieldCheck, Headphones, Bookmark, Plus, ArrowRight, Activity, Clock
} from 'lucide-react';
import './DashboardPage.css';

export default function DashboardPage({ user, onLogout, onNavigateToPage }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Patna, Bihar');
  const [savedItems, setSavedItems] = useState([]);

  // Sidebar Items matching User Request
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'search-medicine', label: 'Medicine Search', icon: <Search size={20} /> },
    { id: 'hospitals', label: 'Best Hospital', icon: <Building2 size={20} /> },
    { id: 'pharmacies', label: 'Near Pharmacy', icon: <Store size={20} /> },
    { id: 'reviews', label: 'My Review', icon: <Star size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'emergency', label: 'Emergency', icon: <PhoneCall size={20} /> },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onNavigateToPage) {
      onNavigateToPage(tabId);
    }
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
      {/* LEFT SIDEBAR */}
      <aside className="dashboard-sidebar">
        {/* Logo */}
        <div className="sidebar-brand">
          <div className="sidebar-logo-badge">
            <Plus className="sidebar-cross-icon" />
          </div>
          <span className="sidebar-logo-text">
            Medi<span className="text-green-bright">Near</span>
          </span>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}

          {/* Log Out Button */}
          <button onClick={onLogout} className="sidebar-link logout-link">
            <span className="nav-icon"><LogOut size={20} /></span>
            <span className="nav-label">Log Out</span>
          </button>
        </nav>

        {/* Bottom Sidebar Banner 1: Emergency */}
        <div className="sidebar-emergency-card">
          <h4>Medical Emergency?</h4>
          <p>Connect with nearest hospital instantly.</p>
          <button className="btn-emergency-call" onClick={() => handleTabClick('emergency')}>
            <PhoneCall size={16} /> Emergency
          </button>
          <div className="ambulance-graphic-mini float-animation">🚑</div>
        </div>

        {/* Bottom Sidebar Banner 2: Support */}
        <div className="sidebar-support-card">
          <div className="support-header">
            <Headphones size={20} className="text-blue" />
            <span>Need Help?</span>
          </div>
          <p>Our support team is available 24/7</p>
          <button className="btn-contact-support" onClick={() => alert('Connecting to 24/7 MediNear Support Chat...')}>
            Contact Support
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="dashboard-main">
        {/* TOP BAR HEADER */}
        <header className="dashboard-topbar">
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
            <div className="location-pill-selector">
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

        {/* DASHBOARD BODY CONTENT */}
        <div className="dashboard-body-container">
          
          {/* TOP 4 STAT CARDS ROW */}
          <div className="metrics-cards-grid">
            {/* Card 1: Medicines Found */}
            <div className="metric-card">
              <div className="metric-icon-circle blue">
                <Pill size={24} />
              </div>
              <div className="metric-info">
                <span className="metric-title">Medicines Found</span>
                <h3 className="metric-value">2,540+</h3>
                <span className="metric-trend green">↑ 12% this week</span>
              </div>
            </div>

            {/* Card 2: Nearby Pharmacies */}
            <div className="metric-card">
              <div className="metric-icon-circle green">
                <Store size={24} />
              </div>
              <div className="metric-info">
                <span className="metric-title">Nearby Pharmacies</span>
                <h3 className="metric-value">128</h3>
                <span className="metric-trend green">↑ 8% this week</span>
              </div>
            </div>

            {/* Card 3: Top Hospitals */}
            <div className="metric-card">
              <div className="metric-icon-circle purple">
                <Building2 size={24} />
              </div>
              <div className="metric-info">
                <span className="metric-title">Top Hospitals</span>
                <h3 className="metric-value">86</h3>
                <span className="metric-trend green">↑ 10% this week</span>
              </div>
            </div>

            {/* Card 4: Reviews */}
            <div className="metric-card">
              <div className="metric-icon-circle orange">
                <Users size={24} />
              </div>
              <div className="metric-info">
                <span className="metric-title">Reviews</span>
                <h3 className="metric-value">1,248</h3>
                <span className="metric-trend green">↑ 15% this week</span>
              </div>
            </div>
          </div>

          {/* MIDDLE ROW: 3 COLUMNS (Recent Searches, Nearby Pharmacies, Top Rated Hospitals) */}
          <div className="middle-columns-grid">
            
            {/* COLUMN 1: RECENT SEARCHES */}
            <div className="dashboard-column-card">
              <div className="column-card-header">
                <h3>Recent Searches</h3>
                <button className="link-view-all">View All</button>
              </div>
              <div className="recent-searches-list">
                <div className="recent-search-item">
                  <div className="search-item-icon blue"><Pill size={18} /></div>
                  <div className="search-item-info">
                    <h4>Paracetamol 650mg</h4>
                    <span>Searched 10 mins ago</span>
                  </div>
                  <ChevronRight size={16} className="arrow-right" />
                </div>

                <div className="recent-search-item">
                  <div className="search-item-icon green"><Pill size={18} /></div>
                  <div className="search-item-info">
                    <h4>Amoxicillin 500mg</h4>
                    <span>Searched 2 hours ago</span>
                  </div>
                  <ChevronRight size={16} className="arrow-right" />
                </div>

                <div className="recent-search-item">
                  <div className="search-item-icon orange"><Pill size={18} /></div>
                  <div className="search-item-info">
                    <h4>Vitamin D3 Tablet</h4>
                    <span>Searched yesterday</span>
                  </div>
                  <ChevronRight size={16} className="arrow-right" />
                </div>

                <div className="recent-search-item">
                  <div className="search-item-icon purple"><Pill size={18} /></div>
                  <div className="search-item-info">
                    <h4>Cetirizine 10mg</h4>
                    <span>Searched 2 days ago</span>
                  </div>
                  <ChevronRight size={16} className="arrow-right" />
                </div>
              </div>
            </div>

            {/* COLUMN 2: NEARBY PHARMACIES */}
            <div className="dashboard-column-card">
              <div className="column-card-header">
                <h3>Nearby Pharmacies</h3>
                <button className="link-view-all" onClick={() => handleTabClick('pharmacies')}>View All</button>
              </div>
              <div className="places-list">
                <div className="place-list-item">
                  <img src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=120&auto=format&fit=crop&q=80" alt="WellCare" className="place-thumb" />
                  <div className="place-list-info">
                    <h4>WellCare Pharmacy</h4>
                    <div className="place-subtext">
                      <span>0.3 km away</span> • <span className="open-green">Open</span>
                    </div>
                  </div>
                  <div className="place-rating-badge">★ 4.7</div>
                </div>

                <div className="place-list-item">
                  <img src="https://images.unsplash.com/photo-1576602976047-174e57a47881?w=120&auto=format&fit=crop&q=80" alt="Apollo" className="place-thumb" />
                  <div className="place-list-info">
                    <h4>Apollo Pharmacy</h4>
                    <div className="place-subtext">
                      <span>0.6 km away</span> • <span className="open-green">Open</span>
                    </div>
                  </div>
                  <div className="place-rating-badge">★ 4.5</div>
                </div>

                <div className="place-list-item">
                  <img src="https://images.unsplash.com/photo-1563213126-a4273aed2016?w=120&auto=format&fit=crop&q=80" alt="MedPlus" className="place-thumb" />
                  <div className="place-list-info">
                    <h4>MedPlus Pharmacy</h4>
                    <div className="place-subtext">
                      <span>0.8 km away</span> • <span className="open-green">Open</span>
                    </div>
                  </div>
                  <div className="place-rating-badge">★ 4.3</div>
                </div>

                <div className="place-list-item">
                  <img src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=120&auto=format&fit=crop&q=80" alt="HealthFirst" className="place-thumb" />
                  <div className="place-list-info">
                    <h4>HealthFirst Pharmacy</h4>
                    <div className="place-subtext">
                      <span>1.2 km away</span> • <span className="open-green">Open</span>
                    </div>
                  </div>
                  <div className="place-rating-badge">★ 4.2</div>
                </div>
              </div>

              <button className="btn-column-action" onClick={() => handleTabClick('pharmacies')}>
                <MapPin size={16} /> Find More Pharmacies
              </button>
            </div>

            {/* COLUMN 3: TOP RATED HOSPITALS */}
            <div className="dashboard-column-card">
              <div className="column-card-header">
                <h3>Top Rated Hospitals</h3>
                <button className="link-view-all" onClick={() => handleTabClick('hospitals')}>View All</button>
              </div>
              <div className="places-list">
                <div className="place-list-item">
                  <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=120&auto=format&fit=crop&q=80" alt="Manipal" className="place-thumb" />
                  <div className="place-list-info">
                    <h4>Manipal Hospital</h4>
                    <div className="place-subtext">
                      <span>1.2 km away</span> • <span>Multi-speciality</span>
                    </div>
                  </div>
                  <div className="place-rating-badge">★ 4.8</div>
                </div>

                <div className="place-list-item">
                  <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=120&auto=format&fit=crop&q=80" alt="Apollo Hospital" className="place-thumb" />
                  <div className="place-list-info">
                    <h4>Apollo Hospitals</h4>
                    <div className="place-subtext">
                      <span>2.1 km away</span> • <span>Multi-speciality</span>
                    </div>
                  </div>
                  <div className="place-rating-badge">★ 4.6</div>
                </div>

                <div className="place-list-item">
                  <img src="https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=120&auto=format&fit=crop&q=80" alt="Fortis" className="place-thumb" />
                  <div className="place-list-info">
                    <h4>Fortis Hospital</h4>
                    <div className="place-subtext">
                      <span>2.7 km away</span> • <span>Multi-speciality</span>
                    </div>
                  </div>
                  <div className="place-rating-badge">★ 4.5</div>
                </div>

                <div className="place-list-item">
                  <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=120&auto=format&fit=crop&q=80" alt="Narayana" className="place-thumb" />
                  <div className="place-list-info">
                    <h4>Narayana Health</h4>
                    <div className="place-subtext">
                      <span>3.4 km away</span> • <span>Multi-speciality</span>
                    </div>
                  </div>
                  <div className="place-rating-badge">★ 4.4</div>
                </div>
              </div>

              <button className="btn-column-action" onClick={() => handleTabClick('hospitals')}>
                <Building2 size={16} /> View All Hospitals
              </button>
            </div>
          </div>

          {/* BOTTOM ROW: FEATURED MEDICINES & HEALTH TIP BANNER */}
          <div className="bottom-sections-grid">
            
            {/* FEATURED MEDICINES CAROUSEL */}
            <div className="featured-medicines-card">
              <div className="column-card-header">
                <h3>Featured Medicines</h3>
                <div className="header-actions">
                  <button className="link-view-all" onClick={() => handleTabClick('search-medicine')}>View All</button>
                  <div className="carousel-nav-btns">
                    <button className="btn-carousel" aria-label="Previous"><ChevronLeft size={16} /></button>
                    <button className="btn-carousel" aria-label="Next"><ChevronRight size={16} /></button>
                  </div>
                </div>
              </div>

              <div className="medicines-horizontal-grid">
                {/* Product 1 */}
                <div className="medicine-product-card">
                  <div className="product-image-box">
                    <div className="med-box-mock dolo">
                      <span>Dolo 650</span>
                    </div>
                  </div>
                  <div className="product-details">
                    <h4>Dolo 650mg Tablet</h4>
                    <div className="product-price-row">
                      <span className="price">₹18.50</span>
                      <span className="pack">10 Tablets</span>
                    </div>
                    <button 
                      className={`btn-add-save ${savedItems.includes(1) ? 'saved' : ''}`}
                      onClick={() => toggleSaveMedicine(1)}
                    >
                      <Bookmark size={14} />
                      <span>{savedItems.includes(1) ? 'Saved' : 'Add to Save'}</span>
                    </button>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="medicine-product-card">
                  <div className="product-image-box">
                    <div className="med-box-mock amox">
                      <span>Amoxicillin 500mg</span>
                    </div>
                  </div>
                  <div className="product-details">
                    <h4>Amoxicillin 500mg</h4>
                    <div className="product-price-row">
                      <span className="price">₹42.30</span>
                      <span className="pack">10 Capsules</span>
                    </div>
                    <button 
                      className={`btn-add-save ${savedItems.includes(2) ? 'saved' : ''}`}
                      onClick={() => toggleSaveMedicine(2)}
                    >
                      <Bookmark size={14} />
                      <span>{savedItems.includes(2) ? 'Saved' : 'Add to Save'}</span>
                    </button>
                  </div>
                </div>

                {/* Product 3 */}
                <div className="medicine-product-card">
                  <div className="product-image-box">
                    <div className="med-box-mock vit">
                      <span>Vitamin D3K</span>
                    </div>
                  </div>
                  <div className="product-details">
                    <h4>Vitamin D3 60K</h4>
                    <div className="product-price-row">
                      <span className="price">₹76.00</span>
                      <span className="pack">4 Tablets</span>
                    </div>
                    <button 
                      className={`btn-add-save ${savedItems.includes(3) ? 'saved' : ''}`}
                      onClick={() => toggleSaveMedicine(3)}
                    >
                      <Bookmark size={14} />
                      <span>{savedItems.includes(3) ? 'Saved' : 'Add to Save'}</span>
                    </button>
                  </div>
                </div>

                {/* Product 4 */}
                <div className="medicine-product-card">
                  <div className="product-image-box">
                    <div className="med-box-mock calc">
                      <span>Calcium + D3</span>
                    </div>
                  </div>
                  <div className="product-details">
                    <h4>Calcium + D3</h4>
                    <div className="product-price-row">
                      <span className="price">₹95.00</span>
                      <span className="pack">15 Tablets</span>
                    </div>
                    <button 
                      className={`btn-add-save ${savedItems.includes(4) ? 'saved' : ''}`}
                      onClick={() => toggleSaveMedicine(4)}
                    >
                      <Bookmark size={14} />
                      <span>{savedItems.includes(4) ? 'Saved' : 'Add to Save'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* HEALTH TIP OF THE DAY BANNER */}
            <div className="health-tip-banner">
              <h3>Health Tip of the Day</h3>
              <p className="tip-quote">
                "Stay hydrated, eat healthy, and take your medicines on time. Your health is your wealth."
              </p>
              
              <div className="tip-3d-graphic">
                <div className="shield-icon-3d">
                  <Plus size={28} className="shield-cross" />
                </div>
                <div className="pill-bottle-3d" />
              </div>

              <button className="btn-learn-more" onClick={() => alert('Health Tip: Drinking 3 liters of water daily improves energy and digestion!')}>
                <span>Learn More</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
