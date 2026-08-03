import React, { useState } from 'react';
import { Plus, Mail, Lock, User, Phone, CheckCircle2 } from 'lucide-react';
import './AuthModal.css';

export default function AuthModal({ initialMode = 'login', onClose }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="auth-modal-card animate-fade-in" onClick={e => e.stopPropagation()}>
        <button className="btn-close-modal" onClick={onClose}>✕</button>

        <div className="auth-header">
          <div className="logo-badge">
            <Plus className="logo-cross-icon" />
          </div>
          <h2>{mode === 'login' ? 'Welcome Back to MediNear' : 'Create Your MediNear Account'}</h2>
          <p>{mode === 'login' ? 'Log in to manage appointments & orders' : 'Join 100K+ users finding nearby healthcare instantly'}</p>
        </div>

        {submitted ? (
          <div className="auth-success animate-fade-in">
            <CheckCircle2 size={48} className="text-green" />
            <h3>{mode === 'login' ? 'Successfully Logged In!' : 'Account Created Successfully!'}</h3>
            <p>Redirecting to your healthcare dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            {mode === 'signup' && (
              <div className="input-group">
                <label>Full Name</label>
                <div className="input-field">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="Priya Sharma"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-field">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  placeholder="priya@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="input-group">
                <label>Phone Number</label>
                <div className="input-field">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label>Password</label>
              <div className="input-field">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-auth-submit">
              {mode === 'login' ? 'Login to MediNear' : 'Create Free Account'}
            </button>

            <div className="auth-toggle-prompt">
              {mode === 'login' ? (
                <span>Don't have an account? <button type="button" onClick={() => setMode('signup')}>Sign Up</button></span>
              ) : (
                <span>Already have an account? <button type="button" onClick={() => setMode('login')}>Login</button></span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
