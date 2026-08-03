import React from 'react';
import { Store, Building2, Users } from 'lucide-react';
import './StatsBanner.css';

export default function StatsBanner() {
  const stats = [
    {
      id: 1,
      number: '5000+',
      label: 'Pharmacies',
      icon: <Store size={32} />
    },
    {
      id: 2,
      number: '1000+',
      label: 'Hospitals',
      icon: <Building2 size={32} />
    },
    {
      id: 3,
      number: '100K+',
      label: 'Users',
      icon: <Users size={32} />
    }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-banner-card">
          {/* Heartbeat ECG Line Overlay SVG */}
          <div className="ecg-bg-overlay">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none">
              <path 
                d="M0,60 L300,60 L320,40 L340,90 L360,10 L380,80 L400,60 L700,60 L720,30 L740,95 L760,15 L780,75 L800,60 L1200,60" 
                stroke="rgba(255, 255, 255, 0.12)" 
                strokeWidth="3" 
              />
            </svg>
          </div>

          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <React.Fragment key={stat.id}>
                <div className="stat-item">
                  <div className="stat-icon-wrapper">
                    {stat.icon}
                  </div>
                  <div className="stat-text-wrapper">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
                {idx < stats.length - 1 && <div className="stat-divider" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
