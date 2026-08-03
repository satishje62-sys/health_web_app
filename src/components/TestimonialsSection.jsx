import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';
import './TestimonialsSection.css';

export default function TestimonialsSection() {
  const [activeDot, setActiveDot] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "MediNear helped me find the medicine I needed in minutes. Super easy to use and very reliable!",
      name: "Priya Sharma",
      role: "Verified Patient",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rating: 5
    },
    {
      id: 2,
      quote: "I can now compare pharmacies and choose the best one near me. Highly recommended!",
      name: "Rahul Verma",
      role: "Regular User",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5
    },
    {
      id: 3,
      quote: "The hospital reviews are very helpful. MediNear has become my go-to healthcare companion.",
      name: "Anjali Mehta",
      role: "Healthcare Worker",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header">
          <h2 className="section-title">
            What Our <span className="text-green">Users Say</span>
          </h2>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="quote-icon">
                <Quote size={24} className="text-blue" />
              </div>
              <p className="testimonial-quote">"{item.quote}"</p>
              
              <div className="testimonial-author">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="author-avatar" 
                />
                <div className="author-info">
                  <h4 className="author-name">{item.name}</h4>
                  <div className="author-rating">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={14} className="star-filled" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots matching Figma */}
        <div className="pagination-dots">
          {[0, 1, 2, 3].map((dotIndex) => (
            <button
              key={dotIndex}
              className={`dot ${activeDot === dotIndex ? 'active' : ''}`}
              onClick={() => setActiveDot(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
