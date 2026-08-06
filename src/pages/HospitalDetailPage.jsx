import React, { useState } from 'react';
import { 
  Plus, ArrowLeft, Share2, Bookmark, MoreVertical, Star, ShieldCheck, 
  PhoneCall, MapPin, CheckCircle2, Calendar, Phone, Navigation, 
  Activity, Clock, Users, Heart, Brain, Bone, User, Stethoscope, 
  ChevronRight, ExternalLink, Mail, Globe, Check, Ambulance, 
  FileText, Home, CreditCard, Eye, X, Send, ThumbsUp, ImagePlus, Upload, XCircle, Camera, Images
} from 'lucide-react';
import './HospitalDetailPage.css';

export default function HospitalDetailPage({ hospital, user, onNavigateToPage }) {
  const [isSaved, setIsSaved] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Rajeev Kumar');
  const [appointmentDate, setAppointmentDate] = useState('2026-08-05');
  const [appointmentTime, setAppointmentTime] = useState('10:00 AM');

  // Review states
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewImage, setReviewImage] = useState(null);         // mandatory proof { file, previewUrl }
  const [imageError, setImageError] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]); // extra hospital photos [{ file, previewUrl }]
  const [additionalImgError, setAdditionalImgError] = useState('');

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

  const [reviewsList, setReviewsList] = useState([
    {
      initials: 'R',
      name: 'Rohit Kumar',
      date: '2 days ago',
      rating: 5,
      comment: 'Excellent treatment and good staff. Doctors are very cooperative and the hospital is well maintained.',
      likes: 12
    },
    {
      initials: 'N',
      name: 'Neha Priya',
      date: '1 week ago',
      rating: 5,
      comment: 'Very good experience: clean environment, all facilities available under one roof.',
      likes: 8
    },
    {
      initials: 'A',
      name: 'Amit Sinha',
      date: '2 weeks ago',
      rating: 5,
      comment: 'Best hospital in Patna. Emergency services are excellent and always available.',
      likes: 15
    }
  ]);

  const handleBookAppointmentConfirm = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setShowAppointmentModal(false);
      setBookingSuccess(false);
    }, 2000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setImageError('Please upload a valid image file (JPG, PNG, etc.)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError('Image must be smaller than 5 MB.');
      return;
    }
    setImageError('');
    const previewUrl = URL.createObjectURL(file);
    setReviewImage({ file, previewUrl });
  };

  const handleRemoveImage = () => {
    if (reviewImage?.previewUrl) URL.revokeObjectURL(reviewImage.previewUrl);
    setReviewImage(null);
    setImageError('');
  };

  // Additional images — up to 6 photos
  const handleAdditionalImages = (e) => {
    const files = Array.from(e.target.files);
    const remaining = 6 - additionalImages.length;
    if (remaining <= 0) {
      setAdditionalImgError('Maximum 6 additional photos allowed.');
      return;
    }
    const toAdd = files.slice(0, remaining);
    const invalid = toAdd.filter(f => !f.type.startsWith('image/') || f.size > 10 * 1024 * 1024);
    if (invalid.length > 0) {
      setAdditionalImgError('Some files were skipped (must be image, max 10 MB each).');
    } else {
      setAdditionalImgError('');
    }
    const validFiles = toAdd.filter(f => f.type.startsWith('image/') && f.size <= 10 * 1024 * 1024);
    const newImgs = validFiles.map(f => ({ file: f, previewUrl: URL.createObjectURL(f) }));
    setAdditionalImages(prev => [...prev, ...newImgs]);
    // reset input so same files can be re-selected
    e.target.value = '';
  };

  const handleRemoveAdditional = (idx) => {
    setAdditionalImages(prev => {
      URL.revokeObjectURL(prev[idx].previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!userRating || !reviewComment.trim()) return;
    if (!reviewImage) {
      setImageError('Please upload a proof image (prescription / hospital bill / discharge summary).');
      return;
    }
    const name = reviewName.trim() || (user?.name) || 'Anonymous';
    const newReview = {
      initials: name.charAt(0).toUpperCase(),
      name,
      date: 'Just now',
      rating: userRating,
      comment: reviewComment.trim(),
      likes: 0,
      isNew: true,
      proofImage: reviewImage.previewUrl,
      additionalImages: additionalImages.map(i => i.previewUrl)
    };
    setReviewsList(prev => [newReview, ...prev]);
    setReviewSubmitted(true);
    setUserRating(0);
    setReviewName('');
    setReviewComment('');
    setReviewImage(null);
    setAdditionalImages([]);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

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
              {hospData.phone1 && (
                <a href={`tel:${hospData.phone1}`} className="btn-call-hospital" style={{ textDecoration: 'none' }}>
                  <Phone size={16} /> Call Hospital
                </a>
              )}
              <a 
                href={hospData.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${hospData.lat || 25.5941},${hospData.lon || 85.1376}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-get-directions"
                style={{ textDecoration: 'none' }}
              >
                <Navigation size={16} /> Get Directions (Google Maps)
              </a>
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

          {/* Patient Reviews + Write Review */}
          <div className="reviews-card">
            <div className="block-header-row">
              <h3>Patient Reviews</h3>
              <span className="reviews-count-badge">{reviewsList.length} reviews</span>
            </div>

            {/* ── WRITE A REVIEW FORM ── */}
            <div className="write-review-section">
              <div className="write-review-header">
                <div className="write-review-avatar">
                  {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
                </div>
                <div>
                  <p className="write-review-title">Write Your Review</p>
                  <p className="write-review-sub">Share your experience at {hospData.name}</p>
                </div>
              </div>

              {reviewSubmitted ? (
                <div className="review-success-msg">
                  <CheckCircle2 size={20} className="text-green" />
                  <span>Thank you! Your review has been posted successfully.</span>
                </div>
              ) : (
                <form className="review-form" onSubmit={handleSubmitReview}>
                  {/* Star Rating Picker */}
                  <div className="star-picker-row">
                    <span className="star-picker-label">Your Rating:</span>
                    <div className="star-picker">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          className={`star-btn ${(hoverRating || userRating) >= star ? 'filled' : ''}`}
                          onClick={() => setUserRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          aria-label={`Rate ${star} star`}
                        >
                          <Star size={28} />
                        </button>
                      ))}
                    </div>
                    {(hoverRating || userRating) > 0 && (
                      <span className="rating-label-text">
                        {ratingLabels[hoverRating || userRating]}
                      </span>
                    )}
                  </div>

                  {/* Name Field */}
                  <div className="review-form-group">
                    <label>Your Name <span className="optional-txt">(optional)</span></label>
                    <input
                      type="text"
                      placeholder={user?.name || 'Enter your name'}
                      value={reviewName}
                      onChange={e => setReviewName(e.target.value)}
                      className="review-input"
                    />
                  </div>

                  {/* Comment Field */}
                  <div className="review-form-group">
                    <label>Your Experience *</label>
                    <textarea
                      placeholder="Describe your experience — doctors, cleanliness, staff behaviour, waiting time..."
                      value={reviewComment}
                      onChange={e => setReviewComment(e.target.value)}
                      className="review-textarea"
                      rows={4}
                      required
                    />
                    <span className="char-count">{reviewComment.length}/500</span>
                  </div>

                  {/* ── MANDATORY PROOF IMAGE ── */}
                  <div className="review-form-group">
                    <label className="upload-label-row">
                      <ImagePlus size={15} />
                      Upload Proof Image <span className="required-star">*</span>
                      <span className="upload-hint">(Prescription / Hospital Bill / Discharge Summary)</span>
                    </label>

                    {!reviewImage ? (
                      <label className="image-upload-dropzone" htmlFor="review-img-input">
                        <Upload size={28} className="upload-icon-main" />
                        <p className="upload-main-text">Click to upload your proof</p>
                        <p className="upload-sub-text">JPG, PNG • Max 5 MB</p>
                        <input
                          id="review-img-input"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: 'none' }}
                        />
                      </label>
                    ) : (
                      <div className="image-preview-box">
                        <img src={reviewImage.previewUrl} alt="Proof Preview" className="proof-preview-img" />
                        <div className="preview-info">
                          <CheckCircle2 size={16} className="text-green" />
                          <span className="preview-filename">{reviewImage.file.name}</span>
                          <span className="preview-size">({(reviewImage.file.size / 1024).toFixed(0)} KB)</span>
                        </div>
                        <button type="button" className="btn-remove-image" onClick={handleRemoveImage}>
                          <XCircle size={18} /> Remove
                        </button>
                      </div>
                    )}

                    {imageError && (
                      <p className="upload-error-msg">⚠ {imageError}</p>
                    )}
                  </div>

                  {/* ── ADDITIONAL HOSPITAL PHOTOS (optional, up to 6) ── */}
                  <div className="review-form-group">
                    <label className="upload-label-row">
                      <Camera size={15} />
                      Add Hospital Photos
                      <span className="upload-hint">(Ward / Room / Food / Staff — optional, up to 6)</span>
                      <span className="photo-count-badge">{additionalImages.length}/6</span>
                    </label>

                    {/* Thumbnail grid of already-added images */}
                    {additionalImages.length > 0 && (
                      <div className="additional-images-grid">
                        {additionalImages.map((img, idx) => (
                          <div key={idx} className="add-img-thumb-wrap">
                            <img src={img.previewUrl} alt={`Photo ${idx + 1}`} className="add-img-thumb" />
                            <button
                              type="button"
                              className="btn-remove-thumb"
                              onClick={() => handleRemoveAdditional(idx)}
                              title="Remove photo"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                        {/* Add more button inside grid */}
                        {additionalImages.length < 6 && (
                          <label className="add-more-thumb-btn" htmlFor="review-add-imgs">
                            <Images size={20} />
                            <span>Add More</span>
                            <input
                              id="review-add-imgs"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleAdditionalImages}
                              style={{ display: 'none' }}
                            />
                          </label>
                        )}
                      </div>
                    )}

                    {/* Show dropzone only if no images yet */}
                    {additionalImages.length === 0 && (
                      <label className="image-upload-dropzone additional-dropzone" htmlFor="review-add-imgs-main">
                        <Camera size={26} className="upload-icon-main" />
                        <p className="upload-main-text">Add hospital photos (optional)</p>
                        <p className="upload-sub-text">Upload up to 6 photos • Max 10 MB each</p>
                        <input
                          id="review-add-imgs-main"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleAdditionalImages}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}

                    {additionalImgError && (
                      <p className="upload-error-msg">⚠ {additionalImgError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-submit-review"
                    disabled={!userRating || !reviewComment.trim() || !reviewImage}
                  >
                    <Send size={16} /> Post Review
                  </button>
                </form>
              )}
            </div>

            {/* Divider */}
            <div className="reviews-divider" />

            {/* Reviews List */}
            <div className="reviews-list-stack">
              {reviewsList.map((rev, idx) => (
                <div key={idx} className={`review-item-box ${rev.isNew ? 'review-new-highlight' : ''}`}>
                  <div className="rev-header">
                    <div className="rev-avatar">{rev.initials}</div>
                    <div className="rev-user-text">
                      <h4>{rev.name}</h4>
                      <span>{rev.date}</span>
                    </div>
                    <div className="rev-stars-dynamic">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={13} fill={s <= rev.rating ? '#F59E0B' : 'none'} stroke={s <= rev.rating ? '#F59E0B' : '#D1D5DB'} />
                      ))}
                    </div>
                  </div>
                  <p className="rev-comment">"{rev.comment}"</p>

                  {/* Additional hospital photos grid */}
                  {rev.additionalImages && rev.additionalImages.length > 0 && (
                    <div className="rev-additional-photos-grid">
                      {rev.additionalImages.map((url, pi) => (
                        <img key={pi} src={url} alt={`Hospital photo ${pi + 1}`} className="rev-add-photo-thumb" />
                      ))}
                    </div>
                  )}

                  {/* Proof image in review card */}
                  {rev.proofImage && (
                    <div className="rev-proof-image-wrap">
                      <img src={rev.proofImage} alt="Patient Proof" className="rev-proof-thumb" />
                      <span className="rev-proof-label"><CheckCircle2 size={12} /> Verified Patient Proof</span>
                    </div>
                  )}

                  <div className="rev-like-row">
                    <button className="btn-rev-like">
                      <ThumbsUp size={13} /> Helpful ({rev.likes || 0})
                    </button>
                    {rev.isNew && <span className="new-review-badge">✓ Your Review</span>}
                  </div>
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
