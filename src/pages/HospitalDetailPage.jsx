import React, { useState } from 'react';
import { 
  Plus, ArrowLeft, Share2, Bookmark, MoreVertical, Star, ShieldCheck, 
  PhoneCall, MapPin, CheckCircle2, Calendar, Phone, Navigation, 
  Activity, Clock, Users, Heart, Brain, Bone, User, Stethoscope, 
  ChevronRight, ExternalLink, Mail, Globe, Check, Ambulance, 
  FileText, Home, CreditCard, Eye, X
} from 'lucide-react';
import './HospitalDetailPage.css';

export default function HospitalDetailPage({ hospital, user, onNavigateToPage }) {
  const [isSaved, setIsSaved] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Rajeev Kumar');
  const [appointmentDate, setAppointmentDate] = useState('2026-08-05');
  const [appointmentTime, setAppointmentTime] = useState('10:00 AM');

  // Default hospital data matching Page 8 Figma
  const hospData = hospital || {
    id: 'city-care',
    name: 'City Care Hospital',
    type: 'Multi Speciality Hospital',
    rating: 4.6,
    reviewsCount: '1,248',
    satisfaction: '98%',
    emergency24x7: true,
    cashless: true,
    patientsTreated: '10,000+',
    address: 'MG Road, Near Metro Station, Patna, Bihar - 800001',
    expYears: '20+ Years',
    bedsCapacity: '250+ Beds',
    doctorsCount: '500+',
    servicesCount: '24x7',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&auto=format&fit=crop&q=80',
    phone1: '+91 612 123 4567',
    phone2: '+91 98765 43210',
    email: 'info@citycarehospital.com',
    website: 'www.citycarehospital.com'
  };

  const specialtiesList = [
    'Cardiology', 'Neurology', 'Orthopedics', 'Gastroenterology', 
    'Nephrology', 'General Surgery', 'Pediatrics', '+ 12 More'
  ];

  const departmentsList = [
    { name: 'Cardiology', icon: <Heart size={24} className="text-red" /> },
    { name: 'Neurology', icon: <Brain size={24} className="text-purple" /> },
    { name: 'Orthopedics', icon: <Bone size={24} className="text-blue" /> },
    { name: 'Gynecology', icon: <User size={24} className="text-pink" /> },
    { name: 'Pediatrics', icon: <User size={24} className="text-green" /> },
    { name: 'General Surgery', icon: <Stethoscope size={24} className="text-teal" /> },
    { name: 'Urology', icon: <Activity size={24} className="text-orange" /> },
    { name: 'Dermatology', icon: <Activity size={24} className="text-indigo" /> },
  ];

  const doctorsList = [
    {
      name: 'Dr. Rajeev Kumar',
      role: 'Cardiologist',
      degree: 'MBBS, MD, DM',
      exp: '12 Years Exp.',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80'
    },
    {
      name: 'Dr. Anjali Singh',
      role: 'Neurologist',
      degree: 'MBBS, MD, DM',
      exp: '10 Years Exp.',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1594824813566-88855ce78906?w=200&auto=format&fit=crop&q=80'
    },
    {
      name: 'Dr. Amit Verma',
      role: 'Orthopedic Surgeon',
      degree: 'MBBS, MS (Ortho)',
      exp: '15 Years Exp.',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80'
    },
    {
      name: 'Dr. Neha Shah',
      role: 'Gynecologist',
      degree: 'MBBS, MS (OBG)',
      exp: '9 Years Exp.',
      rating: '4.6',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80'
    },
    {
      name: 'Dr. Suresh Yadav',
      role: 'General Surgeon',
      degree: 'MBBS, MS',
      exp: '14 Years Exp.',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80'
    }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&auto=format&fit=crop&q=80'
  ];

  const reviewsList = [
    {
      initials: 'R',
      name: 'Rohit Kumar',
      date: '2 days ago',
      rating: 5,
      comment: 'Excellent treatment and good staff. Doctors are very cooperative and the hospital is well maintained.'
    },
    {
      initials: 'N',
      name: 'Neha Priya',
      date: '1 week ago',
      rating: 5,
      comment: 'Very good experience: clean environment, all facilities available under one roof.'
    },
    {
      initials: 'A',
      name: 'Amit Sinha',
      date: '2 weeks ago',
      rating: 5,
      comment: 'Best hospital in Patna. Emergency services are excellent and always available.'
    }
  ];

  const handleBookAppointmentConfirm = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setShowAppointmentModal(false);
      setBookingSuccess(false);
    }, 2000);
  };

  return (
    <div className="hospital-detail-layout">
      {/* TOP HEADER BACK BAR */}
      <div className="detail-top-back-bar">
        <div className="container back-bar-content">
          <button className="btn-back-link" onClick={() => onNavigateToPage('hospitals')}>
            <ArrowLeft size={18} /> Back to Hospitals
          </button>
          
          <div className="right-top-actions">
            <button className="btn-icon-circle" aria-label="Share" onClick={() => alert('Hospital link copied to clipboard!')}>
              <Share2 size={16} /> Share
            </button>
            <button 
              className={`btn-icon-circle ${isSaved ? 'active' : ''}`} 
              aria-label="Save" 
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark size={16} /> {isSaved ? 'Saved' : 'Save'}
            </button>
            <button className="btn-icon-circle" aria-label="More">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="container hospital-detail-main">
        
        {/* HERO BANNER SECTION */}
        <div className="hospital-hero-banner">
          <img src={hospData.image} alt={hospData.name} className="hero-bg-img" />
          
          {/* Top Right Glassmorphism Rating Card */}
          <div className="glass-rating-card">
            <div className="rating-score-row">
              <Star size={24} className="star-gold-fill" />
              <span className="big-rating">{hospData.rating}</span>
              <span className="scale">/ 5</span>
            </div>
            <span className="reviews-lbl">{hospData.reviewsCount} Reviews</span>

            <div className="glass-features-list">
              <div className="glass-feat-item"><ShieldCheck size={14} /> 98% Patient Satisfaction</div>
              <div className="glass-feat-item"><Ambulance size={14} /> 24x7 Emergency</div>
              <div className="glass-feat-item"><CreditCard size={14} /> Cashless Insurance</div>
              <div className="glass-feat-item"><Users size={14} /> 10,000+ Patients Treated</div>
            </div>
          </div>

          {/* Bottom Left Badge */}
          <div className="hero-tag-badge">
            <Activity size={14} /> MULTI SPECIALITY
          </div>
        </div>

        {/* MAIN HOSPITAL INFO CARD */}
        <div className="hospital-header-info-card">
          <div className="info-card-left">
            <div className="hospital-brand-logo">
              <Plus className="cross-icon" />
              <div className="logo-text-col">
                <span>CITY CARE</span>
                <span className="sub">HOSPITAL</span>
              </div>
            </div>

            <div className="hospital-title-block">
              <div className="name-title-row">
                <h1 className="hosp-name">{hospData.name}</h1>
                <CheckCircle2 size={22} className="verified-icon" />
              </div>
              <p className="hosp-type">{hospData.type}</p>
              <div className="hosp-address">
                <MapPin size={16} className="text-blue" />
                <span>{hospData.address}</span>
              </div>
            </div>
          </div>

          {/* 4 Stat Pills */}
          <div className="hosp-stat-pills">
            <div className="stat-pill"><span className="val">{hospData.expYears}</span><span className="lbl">Experience</span></div>
            <div className="stat-pill"><span className="val">{hospData.bedsCapacity}</span><span className="lbl">Capacity</span></div>
            <div className="stat-pill"><span className="val">{hospData.doctorsCount}</span><span className="lbl">Doctors</span></div>
            <div className="stat-pill"><span className="val">{hospData.servicesCount}</span><span className="lbl">Services</span></div>
          </div>

          {/* Right Action CTAs */}
          <div className="hosp-cta-actions">
            <button className="btn-book-appointment" onClick={() => setShowAppointmentModal(true)}>
              <Calendar size={18} /> Book Appointment
            </button>

            <div className="secondary-btn-row">
              <button className="btn-call-hospital" onClick={() => alert(`Calling ${hospData.phone1}...`)}>
                <Phone size={16} /> Call Hospital
              </button>
              <button className="btn-get-directions" onClick={() => alert(`Opening GPS Navigation to ${hospData.address}...`)}>
                <Navigation size={16} /> Get Directions
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION 1: ABOUT & FACILITIES */}
        <div className="about-facilities-grid">
          {/* Left: About Hospital */}
          <div className="about-hospital-card">
            <h3>About Hospital</h3>
            <p className="about-text">
              City Care Hospital is a leading multi-speciality healthcare institution committed to providing world-class medical services with compassion and excellence. Equipped with advanced technology and a team of highly experienced doctors, we ensure the best possible care for our patients.
            </p>

            <h4 className="specialties-title">Specialties</h4>
            <div className="specialties-tags-wrap">
              {specialtiesList.map((tag, idx) => (
                <span key={idx} className="spec-tag-pill">{tag}</span>
              ))}
            </div>
          </div>

          {/* Right: Emergency & Facilities */}
          <div className="facilities-right-column">
            <div className="facility-item-card red">
              <div className="fac-icon-box red"><PhoneCall size={20} /></div>
              <div className="fac-info">
                <h4>Emergency Services</h4>
                <p>24x7 Available</p>
              </div>
            </div>

            <div className="facility-item-card green">
              <div className="fac-icon-box green"><Activity size={20} /></div>
              <div className="fac-info">
                <h4>ICU Availability</h4>
                <p>20 ICU Beds Available</p>
              </div>
            </div>

            <div className="facility-item-card purple">
              <div className="fac-icon-box purple"><Stethoscope size={20} /></div>
              <div className="fac-info">
                <h4>Operation Theatre</h4>
                <p>12 Modular OT's</p>
              </div>
            </div>

            <div className="facility-item-card blue">
              <div className="fac-icon-box blue"><Activity size={20} /></div>
              <div className="fac-info">
                <h4>Pharmacy</h4>
                <p>24x7 Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION 2: DEPARTMENTS */}
        <div className="section-block">
          <div className="block-header-row">
            <h3>Departments</h3>
            <button className="link-view-all">View All Departments →</button>
          </div>

          <div className="departments-horizontal-grid">
            {departmentsList.map((dept, idx) => (
              <div key={idx} className="department-card">
                <div className="dept-icon-circle">{dept.icon}</div>
                <span className="dept-name">{dept.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION 3: OUR DOCTORS */}
        <div className="section-block">
          <div className="block-header-row">
            <h3>Our Doctors</h3>
            <button className="link-view-all">View All Doctors →</button>
          </div>

          <div className="doctors-carousel-row">
            {doctorsList.map((doc, idx) => (
              <div key={idx} className="doctor-item-card">
                <div className="doc-avatar-box">
                  <img src={doc.image} alt={doc.name} />
                </div>
                <div className="doc-info-content">
                  <h4 className="doc-name">{doc.name}</h4>
                  <span className="doc-role">{doc.role}</span>
                  <span className="doc-degree">{doc.degree}</span>
                  <span className="doc-exp">{doc.exp}</span>
                  <div className="doc-rating-tag">
                    <Star size={12} className="star-fill" /> {doc.rating}
                  </div>
                </div>
              </div>
            ))}
            <button className="btn-carousel-next" aria-label="Next Doctors"><ChevronRight size={18} /></button>
          </div>
        </div>

        {/* MIDDLE SECTION 4: GALLERY & REVIEWS */}
        <div className="gallery-reviews-grid">
          {/* Hospital Gallery */}
          <div className="gallery-card">
            <div className="block-header-row">
              <h3>Hospital Gallery</h3>
              <button className="link-view-all">View All Photos →</button>
            </div>

            <div className="gallery-images-grid">
              <div className="gal-big-photo">
                <img src={galleryImages[0]} alt="Reception" />
              </div>
              <div className="gal-thumb-grid">
                <img src={galleryImages[1]} alt="Bed Room" />
                <img src={galleryImages[2]} alt="Operation Theatre" />
                <img src={galleryImages[3]} alt="Waiting Area" />
                <div className="gal-overlay-thumb">
                  <img src={galleryImages[4]} alt="More" />
                  <div className="overlay-text">+18</div>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Reviews */}
          <div className="reviews-card">
            <div className="block-header-row">
              <h3>Patient Reviews</h3>
              <button className="link-view-all">View All Reviews →</button>
            </div>

            <div className="reviews-list-stack">
              {reviewsList.map((rev, idx) => (
                <div key={idx} className="review-item-box">
                  <div className="rev-header">
                    <div className="rev-avatar">{rev.initials}</div>
                    <div className="rev-user-text">
                      <h4>{rev.name}</h4>
                      <span>{rev.date}</span>
                    </div>
                    <div className="rev-stars">★★★★★</div>
                  </div>
                  <p className="rev-comment">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION 1: CONTACT DETAILS & LOCATION MAP */}
        <div className="contact-location-grid">
          {/* Contact Details */}
          <div className="contact-details-card">
            <h3>Contact Details</h3>
            <div className="contact-info-list">
              <div className="c-item"><Phone size={16} className="text-blue" /> <span>{hospData.phone1}</span></div>
              <div className="c-item"><Phone size={16} className="text-blue" /> <span>{hospData.phone2}</span></div>
              <div className="c-item"><Mail size={16} className="text-blue" /> <span>{hospData.email}</span></div>
              <div className="c-item"><Globe size={16} className="text-blue" /> <span>{hospData.website}</span></div>
              <div className="c-item"><MapPin size={16} className="text-blue" /> <span>{hospData.address}</span></div>
            </div>

            <div className="working-hours-box">
              <h4>Working Hours</h4>
              <p>Monday - Sunday</p>
              <span className="hours-badge">24 Hours Open</span>
            </div>

            <div className="social-follow-row">
              <span>Follow Us</span>
              <div className="social-icons-group">
                <span className="soc-icon fb">f</span>
                <span className="soc-icon ig">📷</span>
                <span className="soc-icon yt">▶</span>
                <span className="soc-icon in">in</span>
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="location-map-card">
            <div className="block-header-row">
              <h3>Location</h3>
              <button className="link-view-all" onClick={() => alert('Opening Google Maps Location...')}>View on Google Maps →</button>
            </div>

            <div className="map-embed-wrapper">
              <svg viewBox="0 0 400 220" fill="none" className="hosp-map-svg">
                <rect width="400" height="220" fill="#EBF3FF" />
                <path d="M0 80 Q 200 40, 400 120" stroke="#CBD5E1" strokeWidth="16" />
                <path d="M120 0 Q 180 140, 300 220" stroke="#CBD5E1" strokeWidth="12" />
              </svg>

              <div className="map-hospital-pin">
                <div className="pin-tooltip">{hospData.name}</div>
                <div className="pin-red-dot"><MapPin size={18} /></div>
              </div>

              <div className="map-label museum">Patna Museum</div>
              <div className="map-label station">Metro Station</div>
              <div className="map-label maidan">Gandhi Maidan</div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION 2: 4 FEATURE PILLS */}
        <div className="bottom-feature-pills-bar">
          <div className="feature-pill">
            <div className="f-icon blue"><CreditCard size={20} /></div>
            <div className="f-text">
              <h4>Cashless Insurance</h4>
              <p>All Major Insurances Accepted</p>
            </div>
          </div>

          <div className="feature-pill">
            <div className="f-icon blue"><FileText size={20} /></div>
            <div className="f-text">
              <h4>Online Reports</h4>
              <p>Get Reports Online</p>
            </div>
          </div>

          <div className="feature-pill">
            <div className="f-icon blue"><Home size={20} /></div>
            <div className="f-text">
              <h4>Home Collection</h4>
              <p>Sample Collection at Home</p>
            </div>
          </div>

          <div className="feature-pill">
            <div className="f-icon blue"><Ambulance size={20} /></div>
            <div className="f-text">
              <h4>Ambulance Service</h4>
              <p>24x7 Ambulance Available</p>
            </div>
          </div>
        </div>

      </div>

      {/* APPOINTMENT BOOKING MODAL */}
      {showAppointmentModal && (
        <div className="modal-backdrop" onClick={() => setShowAppointmentModal(false)}>
          <div className="appointment-modal-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={() => setShowAppointmentModal(false)}>✕</button>

            {bookingSuccess ? (
              <div className="booking-success-state">
                <Check size={52} className="text-green" />
                <h3>Appointment Booked Successfully!</h3>
                <p>Your appointment with <strong>{selectedDoctor}</strong> at <strong>{hospData.name}</strong> is confirmed for <strong>{appointmentDate} at {appointmentTime}</strong>.</p>
              </div>
            ) : (
              <form onSubmit={handleBookAppointmentConfirm} className="appointment-form">
                <h3 className="modal-title">Book Doctor Appointment</h3>
                <p className="modal-subtitle">Instant booking at {hospData.name}</p>

                <div className="form-group">
                  <label>Select Doctor</label>
                  <select value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)}>
                    {doctorsList.map((doc, idx) => (
                      <option key={idx} value={doc.name}>{doc.name} ({doc.role})</option>
                    ))}
                  </select>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Date</label>
                    <input type="date" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Time Slot</label>
                    <select value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)}>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Patient Full Name</label>
                  <input type="text" defaultValue={user?.fullName || user?.name || 'Rahul Sharma'} placeholder="Full Name" required />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" defaultValue="+91 98765 43210" placeholder="Phone Number" required />
                </div>

                <button type="submit" className="btn-confirm-appointment">
                  Confirm Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
