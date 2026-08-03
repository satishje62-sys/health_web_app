import React, { useState } from 'react';
import { Plus, User, Mail, Phone, Lock, Eye, EyeOff, MapPin, Building2, ShieldCheck, ChevronDown, ArrowRight, CheckCircle2, Headphones, Zap, Shield, UserCheck, Store, Building } from 'lucide-react';
import './SignUpPage.css';

export default function SignUpPage({ onNavigateToLogin, onSignUpSuccess, onBackToHome }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Patient');
  const [agreedTerms, setAgreedTerms] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const roleOptions = [
    { id: 'Patient', label: 'Patient', icon: <User size={16} className="text-green" /> },
    { id: 'Pharmacy Owner', label: 'Pharmacy Owner', icon: <Store size={16} className="text-green" /> },
    { id: 'Hospital', label: 'Hospital', icon: <Building2 size={16} className="text-blue" /> },
    { id: 'Admin', label: 'Admin', icon: <Shield size={16} className="text-purple" /> }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        if (onSignUpSuccess) onSignUpSuccess({ ...formData, role: selectedRole });
      }, 1200);
    }, 1000);
  };

  return (
    <div className="signup-page-wrapper">
      {/* Container split into Left Visual and Right Form Card */}
      <div className="signup-container-card">
        
        {/* LEFT SIDE: Brand & Value Proposition Visual */}
        <div className="signup-visual-side">
          {/* Brand Header */}
          <div className="signup-logo-brand" onClick={onBackToHome}>
            <div className="signup-logo-badge">
              <Plus className="signup-cross-icon" />
            </div>
            <span className="signup-logo-text">
              Medi<span className="text-green-bright">Near</span>
            </span>
          </div>

          {/* Headline */}
          <div className="signup-headline-group">
            <h1 className="signup-title">
              Join <span className="text-blue-highlight">Medi</span><span className="text-green-bright">Near</span>
            </h1>
            <p className="signup-subtitle">
              Create your account and access trusted healthcare services near you.
            </p>
          </div>

          {/* 3 Feature Bullet List */}
          <div className="signup-features-list">
            <div className="signup-feature-item">
              <div className="feature-icon-circle green">
                <MapPin size={20} />
              </div>
              <div className="feature-text">
                <h4>Find Medicines Near You</h4>
                <p>Search and locate medicines in nearby pharmacies instantly.</p>
              </div>
            </div>

            <div className="signup-feature-item">
              <div className="feature-icon-circle blue">
                <Building2 size={20} />
              </div>
              <div className="feature-text">
                <h4>Connect with Hospitals</h4>
                <p>Book appointments and consult top hospitals with ease.</p>
              </div>
            </div>

            <div className="signup-feature-item">
              <div className="feature-icon-circle green">
                <ShieldCheck size={20} />
              </div>
              <div className="feature-text">
                <h4>Trusted & Secure</h4>
                <p>Your health data is safe with us. Always.</p>
              </div>
            </div>
          </div>

          {/* 3D Visual Graphics & Smartphone Illustration */}
          <div className="signup-3d-illustration">
            <div className="pharmacy-shop-mock">
              <div className="shop-banner">PHARMACY</div>
              <div className="shop-window" />
            </div>

            <div className="medicine-bottle-mock">
              <div className="cap" />
              <div className="body"><Plus size={12} /></div>
            </div>

            <div className="hospital-tower-mock">
              <div className="h-sign"><Plus size={12} /> HOSPITAL</div>
            </div>

            <div className="smartphone-map-mock float-animation">
              <div className="map-pin-badge">
                <Plus size={14} />
              </div>
            </div>
          </div>

          {/* Glassmorphism Bottom Priority Card */}
          <div className="signup-priority-card">
            <div className="priority-icon-box">
              <ShieldCheck size={24} className="text-blue" />
            </div>
            <div className="priority-text">
              <h4>Your Health, Our Priority</h4>
              <p>MediNear connects you with the best healthcare services around you.</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: White Create Your Account Card */}
        <div className="signup-card-side">
          <div className="signup-card-header">
            <h2 className="card-title">Create Your Account</h2>
            <p className="card-subtitle">Fill in the details below to get started</p>
          </div>

          {success ? (
            <div className="signup-success-state animate-fade-in">
              <CheckCircle2 size={56} className="text-green" />
              <h3>Account Created Successfully!</h3>
              <p>Welcome to MediNear. Redirecting to your personal dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="signup-form">
              {/* Full Name */}
              <div className="signup-form-group">
                <label>Full Name</label>
                <div className="signup-input-box">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="signup-form-group">
                <label>Email Address</label>
                <div className="signup-input-box">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="signup-form-group">
                <label>Phone Number</label>
                <div className="signup-input-box">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="signup-form-group">
                <label>Password</label>
                <div className="signup-input-box">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="btn-toggle-eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <span className="password-hint">Password must be at least 8 characters long</span>
              </div>

              {/* Confirm Password */}
              <div className="signup-form-group">
                <label>Confirm Password</label>
                <div className="signup-input-box">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="btn-toggle-eye"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* User Role Selector */}
              <div className="signup-form-group relative">
                <label>User Role</label>
                <div 
                  className="signup-input-box cursor-pointer"
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                >
                  <UserCheck size={18} className="input-icon" />
                  <span className="role-selected-text">{selectedRole}</span>
                  <ChevronDown size={18} className="dropdown-arrow" />
                </div>

                {roleDropdownOpen && (
                  <div className="role-dropdown-menu animate-fade-in">
                    {roleOptions.map((role) => (
                      <div 
                        key={role.id}
                        className={`role-option-item ${selectedRole === role.id ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedRole(role.id);
                          setRoleDropdownOpen(false);
                        }}
                      >
                        {role.icon}
                        <span>{role.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="terms-checkbox-row">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={e => setAgreedTerms(e.target.checked)}
                    required
                  />
                  <span className="terms-text">
                    I agree to the <a href="#terms">Terms and Conditions</a> and <a href="#privacy">Privacy Policy</a>
                  </span>
                </label>
              </div>

              {/* Primary Submit Button */}
              <button 
                type="submit" 
                className="btn-primary-signup"
                disabled={submitting}
              >
                <span>{submitting ? 'Creating Account...' : 'Create Account'}</span>
                <ArrowRight size={18} />
              </button>

              {/* Divider */}
              <div className="divider-row">
                <div className="divider-line" />
                <span className="divider-text">or sign up with</span>
                <div className="divider-line" />
              </div>

              {/* Social Buttons */}
              <div className="social-auth-group">
                <button type="button" className="btn-social-auth">
                  <svg className="google-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button type="button" className="btn-social-auth">
                  <svg className="facebook-icon" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Continue with Facebook</span>
                </button>
              </div>

              {/* Already have an account? Login link */}
              <div className="login-link-row">
                <span>Already have an account? <button type="button" className="btn-link-login" onClick={onNavigateToLogin}>Login</button></span>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Page Bottom Bar Features */}
      <div className="signup-bottom-bar">
        <div className="bottom-bar-feature">
          <ShieldCheck size={18} className="text-green" />
          <span>Secure & Private</span>
        </div>
        <div className="bottom-bar-feature">
          <CheckCircle2 size={18} className="text-green" />
          <span>Verified Partners</span>
        </div>
        <div className="bottom-bar-feature">
          <Headphones size={18} className="text-green" />
          <span>24/7 Support</span>
        </div>
        <div className="bottom-bar-feature">
          <Zap size={18} className="text-green" />
          <span>Fast & Reliable</span>
        </div>
      </div>

      {/* Copyright */}
      <div className="signup-copyright">
        © 2025 MediNear. All rights reserved.
      </div>
    </div>
  );
}
