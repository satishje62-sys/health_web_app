import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import StatsBanner from '../components/StatsBanner';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import AppDownloadBanner from '../components/AppDownloadBanner';
import Footer from '../components/Footer';

export default function HomePage({ onNavigateToLogin, onNavigateToSignUp }) {
  const [activePage, setActivePage] = useState('home');

  const handleOpenAuth = (mode) => {
    if (mode === 'signup' && onNavigateToSignUp) {
      onNavigateToSignUp();
    } else if (onNavigateToLogin) {
      onNavigateToLogin();
    }
  };

  return (
    <div className="homepage-wrapper">
      {/* Header Navigation */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        activePage={activePage}
        setActivePage={(pageId) => {
          if (pageId === 'home') {
            setActivePage('home');
          } else {
            onNavigateToLogin();
          }
        }}
      />

      {/* Hero Section */}
      <HeroSection
        onSearchSelect={() => onNavigateToLogin()}
      />

      {/* Section 2: Features 3x2 Grid */}
      <FeaturesSection />

      {/* Section 3: Blue Gradient Stats Banner */}
      <StatsBanner />

      {/* Section 4: Testimonials Slider */}
      <TestimonialsSection />

      {/* Section 5: FAQ Accordion */}
      <FAQSection />

      {/* Section 6: App Download Banner with Mockup */}
      <AppDownloadBanner />

      {/* Section 7: Footer */}
      <Footer setActivePage={() => onNavigateToLogin()} />
    </div>
  );
}
