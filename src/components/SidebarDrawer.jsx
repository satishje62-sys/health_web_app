import React from 'react';
import { 
  Home, LayoutDashboard, Search, Building2, Store, User,
  LogOut, X, Plus, Headphones, ChevronRight 
} from 'lucide-react';

import './SidebarDrawer.css';

export default function SidebarDrawer({ isOpen, onClose, user, onLogout, onNavigateToPage, activePage }) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'search-medicine', label: 'Search Medicine', icon: <Search size={20} /> },
    { id: 'hospitals', label: 'Best Hospital', icon: <Building2 size={20} /> },
    { id: 'pharmacies', label: 'Near Pharmacy', icon: <Store size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  ];

  const handleLinkClick = (id) => {
    if (onNavigateToPage) {
      onNavigateToPage(id);
    }
    onClose();
  };

  return (
    <>
      {/* Dark Blur Overlay */}
      <div className="sidebar-drawer-overlay animate-fade-in" onClick={onClose} />

      {/* Slide-out Sidebar Drawer */}
      <aside className="sidebar-drawer-panel animate-slide-right">
        {/* Sidebar Header */}
        <div className="sidebar-drawer-top">
          <div className="sidebar-brand-group" onClick={() => handleLinkClick('home')}>
            <div className="logo-badge-small">
              <Plus className="cross-icon-small" />
            </div>
            <span className="logo-text-small">
              Medi<span className="text-green-bright">Near</span>
            </span>
          </div>

          <button className="sidebar-close-icon-btn" onClick={onClose} aria-label="Close Sidebar">
            <X size={22} />
          </button>
        </div>

        {/* User Card inside Sidebar */}
        {user && (
          <div className="sidebar-user-card" onClick={() => handleLinkClick('profile')}>
            <div className="user-avatar-circle">
              {user?.fullName?.charAt(0) || user?.name?.charAt(0) || 'R'}
            </div>
            <div className="user-info-text">
              <span className="user-name">{user?.fullName || user?.name || 'Rahul Kumar'}</span>
              <span className="user-role">{user?.role || 'Premium User'}</span>
            </div>
            <ChevronRight size={16} className="text-muted" />
          </div>
        )}

        <div className="sidebar-menu-heading">Navigation Menu</div>

        {/* Sidebar Menu Items */}
        <nav className="sidebar-nav-list">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`sidebar-nav-btn ${activePage === item.id ? 'active' : ''}`}
            >
              <span className="nav-btn-icon">{item.icon}</span>
              <span className="nav-btn-label">{item.label}</span>
            </button>
          ))}

          {/* Log Out */}
          {onLogout && (
            <button 
              onClick={() => { onClose(); onLogout(); }} 
              className="sidebar-nav-btn logout-btn"
            >
              <span className="nav-btn-icon"><LogOut size={20} /></span>
              <span className="nav-btn-label">Log Out</span>
            </button>
          )}
        </nav>

        {/* Emergency & Support Footer */}
        <div className="sidebar-drawer-bottom">
          <div className="sidebar-support-box">
            <div className="support-title">
              <Headphones size={16} className="text-blue" /> 24/7 Help & Support
            </div>
            <p>Our team is available round the clock.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
