import React, { useState } from 'react';
import { Search, MapPin, Activity, User, LogIn, Menu, X, Shield, Plus } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenAuth, activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'search-medicine', label: 'Search Medicine' },
    { id: 'hospitals', label: 'Hospitals' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
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

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
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
          
          {/* Mobile menu toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <div className="mobile-nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`mobile-nav-link ${activePage === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mobile-drawer-actions">
            <button 
              className="btn-login full-width" 
              onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
            >
              Login
            </button>
            <button 
              className="btn-signup full-width" 
              onClick={() => { onOpenAuth('signup'); setMobileMenuOpen(false); }}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
