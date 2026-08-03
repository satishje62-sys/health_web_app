import React from 'react';
import { Pill, MapPin, MessageSquareHeart, Navigation, Search, ShieldCheck } from 'lucide-react';
import './FeaturesSection.css';

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: <Pill size={24} />,
      iconBg: 'blue',
      title: 'Medicine Availability',
      description: 'Check real-time availability of medicines in nearby pharmacies.'
    },
    {
      id: 2,
      icon: <MapPin size={24} />,
      iconBg: 'green',
      title: 'Nearby Pharmacies',
      description: 'Find pharmacies around you with distance, timing and directions.'
    },
    {
      id: 3,
      icon: <MessageSquareHeart size={24} />,
      iconBg: 'blue',
      title: 'Hospital Reviews',
      description: 'Read real reviews and ratings of hospitals and make better decisions.'
    },
    {
      id: 4,
      icon: <Navigation size={24} />,
      iconBg: 'green',
      title: 'Distance Tracking',
      description: 'Get the exact distance to pharmacies and hospitals with live tracking.'
    },
    {
      id: 5,
      icon: <Search size={24} />,
      iconBg: 'blue',
      title: 'Fast Search',
      description: 'Search medicines quickly with auto-suggestions and smart filters.'
    },
    {
      id: 6,
      icon: <ShieldCheck size={24} />,
      iconBg: 'green',
      title: 'Trusted Healthcare',
      description: 'We ensure verified listings and genuine medicines for your safety.'
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header">
          <h2 className="section-title">
            Everything You Need, All in <span className="text-green">One Place</span>
          </h2>
          <p className="section-subtitle">
            Smart features for a healthier you.
          </p>
        </div>

        {/* Features 3x2 Grid */}
        <div className="features-grid">
          {features.map((item) => (
            <div key={item.id} className="feature-card">
              <div className={`feature-icon-circle ${item.iconBg}`}>
                {item.icon}
              </div>
              <div className="feature-content">
                <h3 className="feature-card-title">{item.title}</h3>
                <p className="feature-card-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
