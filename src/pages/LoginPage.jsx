import React, { useState } from 'react';
import { Plus, Mail, Lock, Eye, EyeOff, ShieldCheck, MapPin, Clock, Phone, Shield, ArrowLeft } from 'lucide-react';
import './LoginPage.css';

export default function LoginPage({ onLoginSuccess, onBackToHome, onNavigateToSignUp }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loginState, setLoginState] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginState('submitting');
    setTimeout(() => {
      setLoginState('success');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(formData);
      }, 1000);
    }, 1200);
  };

  return (
    <div className="login-page-wrapper">
      {/* Back to Home floating button */}
      {onBackToHome && (
        <button className="btn-back-home" onClick={onBackToHome}>
          <ArrowLeft size={18} /> Back to Home
        </button>
      )}

      <div className="login-container-card">
        {/* LEFT SIDE: Brand & 3D Illustration Visual */}
        <div className="login-visual-side">
          {/* Top Logo */}
          <div className="visual-logo-brand" onClick={onBackToHome}>
            <div className="visual-logo-badge">
              <Plus className="visual-cross-icon" />
            </div>
            <span className="visual-logo-text">MediNear</span>
          </div>

          {/* Heading */}
          <div className="visual-headline-group">
            <h1 className="visual-title">
              Healthcare.<br />
              <span className="text-green-highlight">Closer</span> Than Ever.
            </h1>
            <p className="visual-subtitle">
              Find medicines, nearby pharmacies, and trusted hospitals - all in one place.
            </p>
          </div>

          {/* 3D Illustration Graphics Container */}
          <div className="visual-illustration-container">
            {/* Pharmacy Building 3D mock */}
            <div className="pharmacy-building-3d">
              <div className="pharmacy-sign">PHARMACY</div>
              <div className="pharmacy-door" />
              <div className="pharmacy-cross-badge"><Plus size={14} /></div>
            </div>

            {/* Hospital Building 3D mock */}
            <div className="hospital-building-3d">
              <div className="hospital-sign">
                <Plus size={16} className="h-cross" /> HOSPITAL
              </div>
              <div className="hospital-windows">
                <div className="win" /><div className="win" /><div className="win" />
                <div className="win" /><div className="win" /><div className="win" />
              </div>
            </div>

            {/* Ambulance Car 3D mock */}
            <div className="ambulance-car-3d float-animation">
              <div className="amb-text">AMBULANCE</div>
              <div className="amb-siren" />
              <div className="amb-wheels"><div className="wheel" /><div className="wheel" /></div>
            </div>

            {/* Smartphone Map Preview Mockup */}
            <div className="map-smartphone-mockup float-animation">
              <div className="phone-screen-inner">
                <div className="phone-top-bar">
                  <div className="mini-search">
                    <span className="s-icon">🔍</span>
                    <span className="s-text">Search medicine</span>
                    <span className="s-close">✕</span>
                  </div>
                </div>

                {/* Map area */}
                <div className="phone-map-area">
                  <div className="map-pin pin-green" style={{ top: '25%', left: '30%' }}>
                    <Plus size={12} />
                  </div>
                  <div className="map-pin pin-blue" style={{ top: '35%', right: '25%' }}>
                    <span className="h-letter">H</span>
                  </div>
                  <div className="map-pin pin-green-large" style={{ bottom: '40%', right: '35%' }}>
                    <Plus size={14} />
                  </div>

                  {/* Location card inside phone */}
                  <div className="phone-bottom-place-card">
                    <div className="p-icon-box">
                      <Plus size={14} />
                    </div>
                    <div className="p-details">
                      <span className="p-name">Nearby Pharmacy</span>
                      <span className="p-dist">0.3 km away</span>
                      <span className="p-time">Open - Closes at 10 PM</span>
                      <span className="p-stars">★★★★★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Feature Bar Pills */}
          <div className="visual-features-bar">
            <div className="feature-pill">
              <div className="pill-icon green"><ShieldCheck size={18} /></div>
              <span>Trusted Healthcare</span>
            </div>
            <div className="feature-pill">
              <div className="pill-icon blue"><MapPin size={18} /></div>
              <span>Nearby Access</span>
            </div>
            <div className="feature-pill">
              <div className="pill-icon green-dark"><Clock size={18} /></div>
              <span>Quick & Reliable</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: White Login Card */}
        <div className="login-card-side">
          <div className="login-card-header">
            <h2 className="card-title">
              {isSignUp ? 'Create Account' : 'Welcome Back!'}
            </h2>
            <p className="card-subtitle">
              {isSignUp ? 'Sign up for a free MediNear account' : 'Login to your MediNear account'}
            </p>
          </div>

          {loginState === 'success' ? (
            <div className="login-success-state animate-fade-in">
              <div className="success-icon-circle">
                <ShieldCheck size={48} className="text-green" />
              </div>
              <h3>Welcome to MediNear!</h3>
              <p>Authentication successful. Accessing your healthcare portal...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="login-form">
              {isSignUp && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div className="input-box">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-box">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-box">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="btn-toggle-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password Row */}
              {!isSignUp && (
                <div className="form-options-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="custom-checkbox"
                    />
                    <span>Remember Me</span>
                  </label>
                  <a 
                    href="#forgot-password" 
                    className="link-forgot-password"
                    onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered email!'); }}
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Primary Submit Button */}
              <button 
                type="submit" 
                className="btn-primary-login"
                disabled={loginState === 'submitting'}
              >
                {loginState === 'submitting' 
                  ? 'Verifying...' 
                  : (isSignUp ? 'Sign Up' : 'Login')}
              </button>

              {/* Or Continue With Divider */}
              <div className="divider-row">
                <div className="divider-line" />
                <span className="divider-text">or continue with</span>
                <div className="divider-line" />
              </div>

              {/* Social Login Buttons */}
              <div className="social-auth-group">
                <button 
                  type="button" 
                  className="btn-social-auth"
                  onClick={() => {
                    setFormData({ email: 'user@google.com', name: 'Google User', password: '***' });
                    setLoginState('submitting');
                    setTimeout(() => { setLoginState('success'); setTimeout(() => onLoginSuccess(formData), 1000); }, 1000);
                  }}
                >
                  <svg className="google-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button 
                  type="button" 
                  className="btn-social-auth"
                  onClick={() => {
                    const phone = prompt('Enter your phone number:', '+91 98765 43210');
                    if (phone) {
                      setLoginState('submitting');
                      setTimeout(() => { setLoginState('success'); setTimeout(() => onLoginSuccess({ phone }), 1000); }, 1000);
                    }
                  }}
                >
                  <Phone size={18} className="phone-icon-blue" />
                  <span>Continue with Phone Number</span>
                </button>
              </div>

              {/* Bottom Sign Up toggle prompt */}
              <div className="toggle-auth-prompt">
                {isSignUp ? (
                  <span>Already have an account? <button type="button" className="btn-link-toggle" onClick={() => setIsSignUp(false)}>Login</button></span>
                ) : (
                  <span>Don't have an account? <button type="button" className="btn-link-toggle" onClick={() => onNavigateToSignUp ? onNavigateToSignUp() : setIsSignUp(true)}>Sign Up</button></span>
                )}
              </div>
            </form>
          )}

          {/* Secure note */}
          <div className="data-security-note">
            <Shield size={14} className="shield-icon" />
            <span>Your data is secure with us</span>
          </div>
        </div>
      </div>
    </div>
  );
}
