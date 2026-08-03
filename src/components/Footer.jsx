import React, { useState } from 'react';
import { Plus, Facebook, Twitter, Instagram, Linkedin, Send, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import './Footer.css';

export default function Footer({ setActivePage }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer-container">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand" onClick={() => setActivePage('home')}>
              <div className="footer-logo-badge">
                <Plus className="footer-cross-icon" />
              </div>
              <span className="footer-logo-text">
                Medi<span className="text-green-bright">Near</span>
              </span>
            </div>
            <p className="footer-bio">
              MediNear connects you with nearby pharmacies and hospitals to make healthcare simple, fast and reliable.
            </p>
            
            {/* Social Handles */}
            <div className="social-links-row">
              <a href="#facebook" className="social-icon-btn" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#twitter" className="social-icon-btn" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#instagram" className="social-icon-btn" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#linkedin" className="social-icon-btn" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Company Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><button onClick={() => setActivePage('about')}>About Us</button></li>
              <li><button onClick={() => setActivePage('how-it-works')}>How It Works</button></li>
              <li><button onClick={() => setActivePage('careers')}>Careers</button></li>
              <li><button onClick={() => setActivePage('blog')}>Blog</button></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><button onClick={() => setActivePage('help-center')}>Help Center</button></li>
              <li><button onClick={() => setActivePage('faqs')}>FAQs</button></li>
              <li><button onClick={() => setActivePage('privacy')}>Privacy Policy</button></li>
              <li><button onClick={() => setActivePage('terms')}>Terms & Conditions</button></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <Phone size={16} className="contact-icon" />
                <span>+91 98765 43210</span>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <span>support@medinear.com</span>
              </li>
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>Bangalore, India</span>
              </li>
            </ul>
          </div>

          {/* Subscribe to Newsletter */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-heading">Subscribe to our newsletter</h4>
            <p className="newsletter-desc">
              Get health tips and updates straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-newsletter-submit" aria-label="Subscribe">
                <Send size={16} />
              </button>
            </form>

            {subscribed && (
              <div className="subscription-toast animate-fade-in">
                <CheckCircle2 size={16} /> Subscribed successfully!
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© 2025 MediNear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
