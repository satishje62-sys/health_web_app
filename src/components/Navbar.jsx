import React, { useState } from 'react';
import { 
  Search, MapPin, Activity, User, LogIn, Menu, X, Shield, Plus, 
  Home, Building2, Store, Headphones, ArrowRight 
} from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenAuth, activePage, setActivePage }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarNavItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'search-medicine', label: 'Search Medicine', icon: <Search size={20} /> },
    { id: 'hospitals', label: 'Best Hospitals', icon: <Building2 size={20} /> },
    { id: 'pharmacies', label: 'Near Pharmacy', icon: <Store size={20} /> },
    { id: 'profile', label: 'User Profile', icon: <User size={20} /> },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setSidebarOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Left Section: 3-Line Menu Button & Brand Logo */}
        <div className="navbar-left-group">
          {/* 3-Line Hamburger Menu Icon Button */}
          <button 
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar Menu"
            title="Open Menu Sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="navbar-brand" onClick={() => setActivePage('home')}>
            <div className="logo-badge">
              <div className="logo-icon-wrapper">
                <Plus className="logo-cross-icon" />
              </div>
            </div>
            <span className="logo-text">
              Medi<span className="text-green">Near</span>
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          {sidebarNavItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`nav-link ${activePage === item.id ? 'active' : ''}`}
            >
              {item.label}
              {activePage === item.id && <div className="active-indicator" />}
            </button>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="navbar-actions">
          <button 
            className="btn-login" 
            onClick={() => onOpenAuth('login')}
          >
            Login
          </button>
          <button 
            className="btn-signup" 
            onClick={() => onOpenAuth('signup')}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Slide-out Sidebar Drawer Overlay & Container */}
      {sidebarOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div 
            className="sidebar-overlay animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar Drawer Panel */}
          <aside className="sidebar-drawer animate-slide-right">
            {/* Sidebar Header */}
            <div className="sidebar-drawer-header">
              <div className="sidebar-brand">
                <div className="logo-badge">
                  <Plus className="logo-cross-icon" />
                </div>
                <span className="logo-text">
                  Medi<span className="text-green">Near</span>
                </span>
              </div>
              <button 
                className="sidebar-close-btn"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close Sidebar"
              >
                <X size={22} />
              </button>
            </div>

            {/* Sidebar Subheading */}
            <div className="sidebar-section-title">
              Main Menu & Navigation
            </div>

            {/* Sidebar Navigation Items */}
            <div className="sidebar-drawer-links">
              {sidebarNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`sidebar-drawer-link ${activePage === item.id ? 'active' : ''}`}
                >
                  <span className="sidebar-link-icon">{item.icon}</span>
                  <span className="sidebar-link-text">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Account & Auth Actions inside Sidebar */}
            <div className="sidebar-drawer-actions">
              <div className="sidebar-section-title">Account</div>
              <button 
                className="btn-login full-width" 
                onClick={() => { onOpenAuth('login'); setSidebarOpen(false); }}
              >
                <LogIn size={18} style={{ marginRight: '8px' }} /> Login
              </button>
              <button 
                className="btn-signup full-width" 
                onClick={() => { onOpenAuth('signup'); setSidebarOpen(false); }}
              >
                Sign Up Now
              </button>
            </div>

            {/* Support Banner in Sidebar */}
            <div className="sidebar-drawer-footer">
              <div className="sidebar-support-box">
                <div className="support-title">
                  <Headphones size={18} className="text-green" /> 24/7 Health Support
                </div>
                <p>Our team is available round the clock for assistance.</p>
              </div>
            </div>
          </aside>
        </>
      )}
    </header>
  );
}

