import React, { useState } from 'react';
import { 
  Plus, Search, MapPin, Bell, ChevronDown, Star, CheckCircle2, 
  ThumbsUp, Flag, MoreVertical, Image as ImageIcon, Check, X, 
  ArrowLeft, Building2, Store, Calendar, Filter, RotateCcw, Edit3
} from 'lucide-react';
import './MyReviewsPage.css';

export default function MyReviewsPage({ user, onNavigateToPage }) {
  const [activeNavTab, setActiveNavTab] = useState('reviews');
  const [userRating, setUserRating] = useState(4);
  const [reviewText, setReviewText] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=300&auto=format&fit=crop&q=80'
  ]);
  const [isVisitedChecked, setIsVisitedChecked] = useState(true);
  const [showWriteReview, setShowWriteReview] = useState(true);
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState('All Ratings');
  const [selectedVisitType, setSelectedVisitType] = useState('All');
  const [sortByFilter, setSortByFilter] = useState('Most Recent');

  // Initial user reviews list matching Page 11 Figma
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: user?.fullName || user?.name || 'Rahul Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      verified: true,
      stats: '12 reviews • 8 photos',
      rating: 4.5,
      date: '2 days ago',
      isNew: true,
      text: 'Very good hospital with experienced doctors. Staff is supportive and the hospital is very clean. Waiting time is a bit high during peak hours.',
      photos: [
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&auto=format&fit=crop&q=80'
      ],
      extraPhotosCount: 4,
      helpfulCount: 24
    },
    {
      id: 2,
      author: 'Priya Singh',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      verified: true,
      stats: '6 reviews • 3 photos',
      rating: 5.0,
      date: '1 week ago',
      isNew: false,
      text: 'Excellent facilities and very cooperative staff. My surgery went smoothly. Special thanks to Dr. Sharma and his team.',
      photos: [],
      helpfulCount: 18
    },
    {
      id: 3,
      author: 'Amit Verma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      verified: true,
      stats: '3 reviews',
      rating: 3.0,
      date: '2 weeks ago',
      isNew: false,
      text: 'Good hospital overall but the billing process took too much time. Rest everything was fine.',
      photos: [],
      helpfulCount: 7
    }
  ]);

  const ratingLabels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Excellent'
  };

  const handleRemovePhoto = (idx) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== idx));
  };

  const handleAddSamplePhoto = () => {
    if (uploadedPhotos.length >= 5) {
      alert('Maximum 5 photos allowed.');
      return;
    }
    setUploadedPhotos([
      ...uploadedPhotos,
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&auto=format&fit=crop&q=80'
    ]);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      alert('Please write your review thoughts before submitting.');
      return;
    }

    const newRev = {
      id: Date.now(),
      author: user?.fullName || user?.name || 'Rahul Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      verified: true,
      stats: '13 reviews • 9 photos',
      rating: userRating,
      date: 'Just now',
      isNew: true,
      text: reviewText,
      photos: uploadedPhotos,
      helpfulCount: 0
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setReviewText('');
    }, 2500);
  };

  const handleHelpfulClick = (revId) => {
    setReviewsList(reviewsList.map(r => r.id === revId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
  };

  return (
    <div className="my-reviews-layout">
      {/* TOP HEADER BAR */}
      <header className="reviews-header">
        <div className="container header-content">
          <div className="brand-logo-group" onClick={() => onNavigateToPage('home')}>
            <div className="brand-logo-badge">
              <Plus className="brand-cross-icon" />
            </div>
            <span className="brand-logo-text">
              Medi<span className="text-green-bright">Near</span>
            </span>
          </div>

          <div className="header-search-box">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search hospitals, pharmacies..." />
          </div>

          <div className="header-location-pill">
            <MapPin size={16} className="text-blue" />
            <span>Patna, Bihar</span>
          </div>

          <div className="header-right-controls">
            <button className="icon-bell-btn">
              <Bell size={20} />
              <span className="badge-count">3</span>
            </button>

            <div className="user-profile-avatar" onClick={() => onNavigateToPage('dashboard')}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                alt="User Avatar" 
              />
            </div>
          </div>
        </div>
      </header>

      {/* SUB-NAVIGATION TAB BAR */}
      <div className="sub-nav-bar">
        <div className="container sub-nav-content">
          <button className="btn-back-link" onClick={() => onNavigateToPage('dashboard')}>
            <ArrowLeft size={16} /> Back to Dashboard
          </button>

          <nav className="sub-nav-tabs">
            <button onClick={() => onNavigateToPage('dashboard')} className="sub-tab">Overview</button>
            <button onClick={() => onNavigateToPage('hospitals')} className="sub-tab">Hospitals</button>
            <button onClick={() => onNavigateToPage('pharmacies')} className="sub-tab">Pharmacies</button>
            <button className="sub-tab active">My Reviews</button>
            <button className="sub-tab">Photos</button>
            <button className="sub-tab">Contact</button>
          </nav>

          <button className="btn-appointment-cta" onClick={() => onNavigateToPage('hospitals')}>
            Appointment
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="container main-reviews-container">
        
        {/* TOP HOSPITAL HEADER BANNER */}
        <div className="hospital-banner-card">
          <div className="banner-left-info">
            <img 
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=120&auto=format&fit=crop&q=80" 
              alt="City Care Hospital" 
              className="hosp-thumb"
            />
            <div className="hosp-text-col">
              <div className="hosp-name-row">
                <h2>City Care Hospital</h2>
                <CheckCircle2 size={18} className="verified-blue" />
              </div>
              <p className="hosp-subtext">
                <Building2 size={14} className="text-gray" /> Multi-speciality Hospital • <MapPin size={14} className="text-gray" /> Kankarbagh, Patna, Bihar
              </p>
            </div>
          </div>

          <div className="banner-right-rating">
            <div className="rating-score-box">
              <span className="score">4.3</span>
              <div className="stars-gold">★★★★☆</div>
              <span className="count">(1,248 reviews)</span>
            </div>

            <button 
              className="btn-write-review"
              onClick={() => setShowWriteReview(!showWriteReview)}
            >
              <Edit3 size={16} /> {showWriteReview ? 'Close Form' : 'Write a Review'}
            </button>
          </div>
        </div>

        {/* WRITE A REVIEW INTERACTIVE FORM */}
        {showWriteReview && (
          <form className="write-review-form-card animate-fade-in" onSubmit={handleSubmitReview}>
            <div className="form-header">
              <h3>Write a Review</h3>
              <p>Share your experience to help others</p>
            </div>

            {submittedMessage && (
              <div className="review-submitted-banner">
                <Check size={20} /> Your review has been published successfully!
              </div>
            )}

            {/* Star Rating Picker */}
            <div className="form-rating-picker-block">
              <label>Rate your experience *</label>
              <div className="stars-picker-row">
                {[1, 2, 3, 4, 5].map((starNum) => (
                  <Star
                    key={starNum}
                    size={28}
                    className={`star-pick-icon ${starNum <= userRating ? 'active-star' : 'empty-star'}`}
                    onClick={() => setUserRating(starNum)}
                  />
                ))}
                <span className="rating-score-tag">{userRating}.0 / 5</span>
                <span className="rating-quality-badge">{ratingLabels[userRating]}</span>
              </div>
            </div>

            {/* Textarea Input */}
            <div className="form-textarea-block">
              <label>Your review *</label>
              <textarea
                rows={4}
                placeholder="Tell others about your experience... (e.g. cleanliness, staff behavior, waiting time, treatment, etc.)"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                maxLength={1000}
              />
              <span className="char-counter">{reviewText.length}/1000</span>
            </div>

            {/* Upload Photos Section */}
            <div className="form-photos-upload-block">
              <label>Upload photos (Optional)</label>
              <p className="sub-hint">Add photos of the hospital/pharmacy (Max 5)</p>

              <div className="photos-upload-grid">
                <button type="button" className="btn-upload-photos-box" onClick={handleAddSamplePhoto}>
                  <ImageIcon size={22} className="text-blue" />
                  <span>Upload Photos</span>
                </button>

                {uploadedPhotos.map((photoUrl, idx) => (
                  <div key={idx} className="uploaded-photo-item">
                    <img src={photoUrl} alt={`Upload ${idx}`} />
                    <button 
                      type="button" 
                      className="btn-remove-photo"
                      onClick={() => handleRemovePhoto(idx)}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}

                {uploadedPhotos.length < 5 && (
                  <button type="button" className="btn-add-more-box" onClick={handleAddSamplePhoto}>
                    <Plus size={20} className="text-blue" />
                    <span>Add more</span>
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="form-bottom-actions-row">
              <label className="visited-checkbox-label">
                <input 
                  type="checkbox" 
                  checked={isVisitedChecked}
                  onChange={(e) => setIsVisitedChecked(e.target.checked)}
                />
                <span>I visited this place <small className="text-gray">(Your review will be public)</small></span>
              </label>

              <div className="action-btns-right">
                <button type="button" className="btn-cancel" onClick={() => setReviewText('')}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit-review">
                  Submit Review
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TWO COLUMNS CONTENT GRID */}
        <div className="reviews-two-columns-grid">
          
          {/* LEFT MAIN FEED: REVIEWS LIST */}
          <main className="reviews-feed-column">
            <div className="feed-header-bar">
              <h3 className="feed-title">Reviews ({reviewsList.length})</h3>
              <div className="feed-sort-dropdown">
                <span>Sort by: </span>
                <select value={sortByFilter} onChange={(e) => setSortByFilter(e.target.value)}>
                  <option value="Most Recent">Most Recent</option>
                  <option value="Highest Rating">Highest Rating</option>
                  <option value="Lowest Rating">Lowest Rating</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </div>

            {/* REVIEWS LIST STACK */}
            <div className="reviews-list-stack">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="review-card-item">
                  <div className="card-top-row">
                    <img src={rev.avatar} alt={rev.author} className="author-avatar-img" />
                    
                    <div className="author-info-col">
                      <div className="name-verified-line">
                        <span className="author-name">{rev.author}</span>
                        {rev.verified && (
                          <span className="verified-green-tag"><Check size={12} /> Verified</span>
                        )}
                      </div>
                      <span className="author-stats">{rev.stats}</span>
                    </div>

                    <button className="btn-more-options"><MoreVertical size={16} /></button>
                  </div>

                  <div className="rating-date-row">
                    <div className="stars-gold-row">★★★★★</div>
                    <span className="rating-num-val">{rev.rating}</span>
                    <span className="dot-sep">•</span>
                    <span className="date-txt">{rev.date}</span>
                    {rev.isNew && <span className="new-badge-pill">NEW</span>}
                  </div>

                  <p className="review-body-text">{rev.text}</p>

                  {/* Photo Thumbnails */}
                  {rev.photos && rev.photos.length > 0 && (
                    <div className="review-photos-grid">
                      {rev.photos.slice(0, 4).map((pUrl, pIdx) => (
                        <img key={pIdx} src={pUrl} alt="Review attachment" className="rev-photo-thumb" />
                      ))}
                      {rev.extraPhotosCount && (
                        <div className="extra-photos-overlay-box">
                          +{rev.extraPhotosCount}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bottom Helpful / Report Actions */}
                  <div className="card-bottom-actions-row">
                    <button className="btn-helpful-action" onClick={() => handleHelpfulClick(rev.id)}>
                      <ThumbsUp size={14} /> Helpful ({rev.helpfulCount})
                    </button>
                    <span className="pipe-sep">|</span>
                    <button className="btn-report-action" onClick={() => alert('Review reported for team review.')}>
                      <Flag size={14} /> Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* RIGHT SIDEBAR (RATING SUMMARY & FILTERS) */}
          <aside className="reviews-sidebar-column">
            
            {/* 1. Rating Summary Card */}
            <div className="sidebar-card">
              <h4 className="card-heading">Rating Summary</h4>
              <div className="rating-big-score-box">
                <span className="big-score font-bold">4.3</span>
                <div className="score-text-group">
                  <div className="stars-gold-sm">★★★★☆</div>
                  <span className="quality-lbl">Very Good</span>
                </div>
              </div>
              <p className="based-count-lbl">Based on 1,248 reviews</p>

              <div className="rating-progress-bars-stack">
                <div className="bar-row"><span>5★</span><div className="bar-track"><div className="bar-fill" style={{ width: '62%' }} /></div><span>62%</span></div>
                <div className="bar-row"><span>4★</span><div className="bar-track"><div className="bar-fill" style={{ width: '23%' }} /></div><span>23%</span></div>
                <div className="bar-row"><span>3★</span><div className="bar-track"><div className="bar-fill" style={{ width: '9%' }} /></div><span>9%</span></div>
                <div className="bar-row"><span>2★</span><div className="bar-track"><div className="bar-fill" style={{ width: '3%' }} /></div><span>3%</span></div>
                <div className="bar-row"><span>1★</span><div className="bar-track"><div className="bar-fill" style={{ width: '3%' }} /></div><span>3%</span></div>
              </div>
            </div>

            {/* 2. Rate Other Places Card */}
            <div className="sidebar-card">
              <h4 className="card-heading">Rate other places</h4>
              <div className="visited-places-list">
                <div className="place-item-row" onClick={() => onNavigateToPage('pharmacies')}>
                  <div className="place-icon-box green"><Store size={18} /></div>
                  <div className="place-info">
                    <h5>MedPlus Pharmacy</h5>
                    <span>Kankarbagh, Patna</span>
                  </div>
                </div>

                <div className="place-item-row" onClick={() => onNavigateToPage('pharmacies')}>
                  <div className="place-icon-box blue"><Store size={18} /></div>
                  <div className="place-info">
                    <h5>Life Line Pharmacy</h5>
                    <span>Boring Road, Patna</span>
                  </div>
                </div>
              </div>

              <button className="btn-view-visited-places" onClick={() => onNavigateToPage('hospitals')}>
                View all visited places
              </button>
            </div>

            {/* 3. Filter Reviews Card */}
            <div className="sidebar-card">
              <h4 className="card-heading">Filter Reviews</h4>

              <div className="filter-radio-group">
                <label className="radio-label-title">Rating</label>
                {['All Ratings', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'].map((rLabel) => (
                  <label key={rLabel} className="radio-option">
                    <input 
                      type="radio" 
                      name="ratingFilter" 
                      checked={selectedRatingFilter === rLabel}
                      onChange={() => setSelectedRatingFilter(rLabel)}
                    />
                    <span>{rLabel === 'All Ratings' ? '★ All Ratings' : `★ ${rLabel}`}</span>
                  </label>
                ))}
              </div>

              <div className="filter-radio-group">
                <label className="radio-label-title">Visit Type</label>
                {['All', 'Visited for Treatment', 'Visited for Consultation'].map((vLabel) => (
                  <label key={vLabel} className="radio-option">
                    <input 
                      type="radio" 
                      name="visitTypeFilter"
                      checked={selectedVisitType === vLabel}
                      onChange={() => setSelectedVisitType(vLabel)}
                    />
                    <span>{vLabel}</span>
                  </label>
                ))}
              </div>

              <div className="filter-radio-group">
                <label className="radio-label-title">Sort By</label>
                {['Most Recent', 'Highest Rating', 'Lowest Rating', 'Most Helpful'].map((sLabel) => (
                  <label key={sLabel} className="radio-option">
                    <input 
                      type="radio" 
                      name="sortFilter"
                      checked={sortByFilter === sLabel}
                      onChange={() => setSortByFilter(sLabel)}
                    />
                    <span>{sLabel}</span>
                  </label>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
