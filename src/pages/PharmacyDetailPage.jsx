import React, { useState } from 'react';
import { 
  Plus, Search, MapPin, Bell, ChevronDown, Store, Phone, Navigation, 
  Bookmark, CheckCircle2, Clock, Filter, RotateCcw, ChevronLeft, ChevronRight, 
  ShieldCheck, Truck, CreditCard, Package, Upload, Star, ShoppingCart, Check,
  FileText, Home, ArrowRight, User
} from 'lucide-react';
import './PharmacyDetailPage.css';

export default function PharmacyDetailPage({ pharmacy, user, onNavigateToPage, onSelectMedicine }) {
  const [activeTab, setActiveTab] = useState('available-medicines');
  const [searchMedicine, setSearchMedicine] = useState('');
  const [inStockOnly, setInStockOnly] = useState(true);
  const [limitedStock, setLimitedStock] = useState(true);
  const [priceRange, setPriceRange] = useState(5000);
  const [medicineType, setMedicineType] = useState('Allopathic');
  const [sortBy, setSortBy] = useState('Relevance');
  const [isSaved, setIsSaved] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [reservedSuccess, setReservedSuccess] = useState(false);
  const [reservedItem, setReservedItem] = useState(null);

  // Default pharmacy details matching Page 10 Figma
  const pharmData = pharmacy || {
    id: 'careplus-pharmacy',
    name: 'CarePlus Pharmacy',
    verified: true,
    rating: 4.6,
    reviewsCount: 128,
    address: 'Shop No. 12, Boring Road, Near Panchmukhi Hanuman Mandir, Patna, Bihar 800001',
    status: 'Open • Closes at 10:00 PM',
    phone: '+91 98765 43210',
    owner: 'Rajesh Kumar',
    established: '2018',
    licenseNo: 'BR/PD/12345',
    gstNo: '10ABCDE1234F1Z5',
    pharmacyType: 'Retail Pharmacy',
    avgDeliveryTime: '30-45 mins',
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=1000&auto=format&fit=crop&q=80'
  };

  const inventoryMedicines = [
    {
      id: 1,
      name: 'Paracetamol 650mg',
      form: 'Tablet',
      salt: 'Paracetamol 650mg',
      type: 'Allopathic',
      typeColor: 'blue',
      stockStatus: 'In Stock',
      stockQty: '20+ Strips',
      price: '₹15.00',
      mrp: '₹20.00',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Crocin Advance 500mg',
      form: 'Tablet',
      salt: 'Paracetamol 500mg',
      type: 'Allopathic',
      typeColor: 'blue',
      stockStatus: 'In Stock',
      stockQty: '10+ Strips',
      price: '₹18.50',
      mrp: '₹25.00',
      image: 'https://images.unsplash.com/photo-1550572017-edf792894d4f?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'Amoxicillin 500mg',
      form: 'Capsule',
      salt: 'Amoxicillin 500mg',
      type: 'Allopathic',
      typeColor: 'blue',
      stockStatus: 'Limited Stock',
      stockQty: '5 Strips left',
      price: '₹32.00',
      mrp: '₹40.00',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      name: 'Diclofenac 50mg',
      form: 'Tablet',
      salt: 'Diclofenac Sodium 50mg',
      type: 'Allopathic',
      typeColor: 'blue',
      stockStatus: 'In Stock',
      stockQty: '15+ Strips',
      price: '₹12.00',
      mrp: '₹18.00',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      name: 'Cetirizine 10mg',
      form: 'Tablet',
      salt: 'Cetirizine Hydrochloride 10mg',
      type: 'Allopathic',
      typeColor: 'blue',
      stockStatus: 'In Stock',
      stockQty: '20+ Strips',
      price: '₹10.00',
      mrp: '₹16.00',
      image: 'https://images.unsplash.com/photo-1550572017-edf792894d4f?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 6,
      name: 'Azithromycin 500mg',
      form: 'Tablet',
      salt: 'Azithromycin 500mg',
      type: 'Allopathic',
      typeColor: 'blue',
      stockStatus: 'Limited Stock',
      stockQty: '7 Strips left',
      price: '₹45.00',
      mrp: '₹60.00',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 7,
      name: 'Pantoprazole 40mg',
      form: 'Tablet',
      salt: 'Pantoprazole 40mg',
      type: 'Allopathic',
      typeColor: 'blue',
      stockStatus: 'In Stock',
      stockQty: '20+ Strips',
      price: '₹22.00',
      mrp: '₹30.00',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 8,
      name: 'Vitamin D3 60K',
      form: 'Capsule',
      salt: 'Cholecalciferol 60000 IU',
      type: 'Supplements',
      typeColor: 'purple',
      stockStatus: 'In Stock',
      stockQty: '10+ Strips',
      price: '₹30.00',
      mrp: '₹45.00',
      image: 'https://images.unsplash.com/photo-1550572017-edf792894d4f?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 9,
      name: 'Ibuprofen 400mg',
      form: 'Tablet',
      salt: 'Ibuprofen 400mg',
      type: 'Allopathic',
      typeColor: 'blue',
      stockStatus: 'In Stock',
      stockQty: '15+ Strips',
      price: '₹16.00',
      mrp: '₹22.00',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 10,
      name: 'ORS (Electral)',
      form: 'Sachet',
      salt: 'ORS',
      type: 'Allopathic',
      typeColor: 'blue',
      stockStatus: 'In Stock',
      stockQty: '50+ Sachets',
      price: '₹5.50',
      mrp: '₹7.00',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 11,
      name: 'Cough Syrup (Ascoril)',
      form: 'Syrup 100ml',
      salt: 'Levosalbutamol + Guaiphenesin + Bromhexine',
      type: 'Allopathic',
      typeColor: 'blue',
      stockStatus: 'In Stock',
      stockQty: '5 Bottles',
      price: '₹85.00',
      mrp: '₹110.00',
      image: 'https://images.unsplash.com/photo-1550572017-edf792894d4f?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 12,
      name: 'Calcium + Vitamin D3',
      form: 'Tablet',
      salt: 'Calcium Carbonate + Vit D3',
      type: 'Supplements',
      typeColor: 'purple',
      stockStatus: 'In Stock',
      stockQty: '20+ Strips',
      price: '₹20.00',
      mrp: '₹28.00',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=100&auto=format&fit=crop&q=80'
    }
  ];

  const handleReserveClick = (med) => {
    setReservedItem(med);
    setReservedSuccess(false);
  };

  const confirmReservation = () => {
    setReservedSuccess(true);
    setTimeout(() => {
      setReservedItem(null);
      setReservedSuccess(false);
    }, 1800);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="pharmacy-detail-layout">
      {/* TOP HEADER BAR */}
      <header className="pharm-header">
        <div className="container header-content">
          <div className="brand-logo-group" onClick={() => onNavigateToPage('home')}>
            <div className="brand-logo-badge">
              <Plus className="brand-cross-icon" />
            </div>
            <span className="brand-logo-text">
              Medi<span className="text-green-bright">Near</span>
            </span>
          </div>

          <div className="header-location-picker">
            <MapPin size={16} className="text-blue" />
            <span>Patna, Bihar</span>
            <ChevronDown size={14} />
          </div>

          <div className="header-search-bar">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search medicines, hospitals..." />
          </div>

          <nav className="header-nav-links">
            <button onClick={() => onNavigateToPage('home')} className="nav-tab">Home</button>
            <button onClick={() => onNavigateToPage('medicine-search')} className="nav-tab">Medicine Search</button>
            <button onClick={() => onNavigateToPage('hospitals')} className="nav-tab">Hospitals</button>
            <button className="nav-tab">About</button>
            <button className="nav-tab">Contact</button>

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
          </nav>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="container breadcrumb-wrapper">
        <span className="bc-link" onClick={() => onNavigateToPage('home')}>Home</span>
        <ChevronRight size={14} />
        <span className="bc-link" onClick={() => onNavigateToPage('pharmacies')}>Near Pharmacies</span>
        <ChevronRight size={14} />
        <span className="bc-current">{pharmData.name}</span>
      </div>

      {/* MAIN CONTAINER */}
      <div className="container main-pharm-container">
        
        {/* TOP HERO PHARMACY HEADER CARD */}
        <div className="hero-pharmacy-card">
          <div className="hero-shop-img-box">
            <img src={pharmData.image} alt={pharmData.name} />
          </div>

          <div className="hero-shop-info">
            <div className="title-verified-row">
              <h1 className="shop-title">{pharmData.name}</h1>
              {pharmData.verified && (
                <span className="verified-badge"><CheckCircle2 size={16} /> Verified</span>
              )}
            </div>

            <div className="rating-reviews-row">
              <span className="rating-num">★ {pharmData.rating}</span>
              <div className="stars-gold">★★★★★</div>
              <span className="reviews-lbl">({pharmData.reviewsCount} Reviews)</span>
            </div>

            <div className="info-line">
              <MapPin size={16} className="text-blue" />
              <span>{pharmData.address}</span>
            </div>

            <div className="info-line">
              <Clock size={16} className="text-green" />
              <span>{pharmData.status}</span>
            </div>

            <div className="info-line">
              <Phone size={16} className="text-blue" />
              <span>{pharmData.phone}</span>
            </div>
          </div>

          {/* Right Action CTAs */}
          <div className="hero-shop-ctas">
            <button className="btn-get-directions" onClick={() => alert(`Opening GPS Directions to ${pharmData.address}...`)}>
              <Navigation size={16} /> Get Directions
            </button>
            <button className="btn-call-pharmacy" onClick={() => alert(`Calling ${pharmData.phone}...`)}>
              <Phone size={16} /> Call Pharmacy
            </button>
            <button 
              className={`btn-save-pharmacy ${isSaved ? 'saved' : ''}`}
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark size={16} /> {isSaved ? 'Saved Pharmacy' : 'Save Pharmacy'}
            </button>
          </div>
        </div>

        {/* TAB BAR NAVIGATION */}
        <div className="pharmacy-tabs-bar">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'available-medicines' ? 'active' : ''}`}
            onClick={() => setActiveTab('available-medicines')}
          >
            Available Medicines
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews (128)
          </button>
          <button 
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button 
            className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => setActiveTab('photos')}
          >
            Photos
          </button>
        </div>

        {/* 3 COLUMNS MAIN CONTENT GRID */}
        <div className="three-columns-grid">
          
          {/* COLUMN 1: LEFT FILTERS SIDEBAR */}
          <aside className="left-filters-panel">
            <h3 className="filters-title">Filters</h3>

            <div className="filter-group">
              <label>Search Medicine</label>
              <div className="input-search-box">
                <input 
                  type="text" 
                  placeholder="Search medicine name..." 
                  value={searchMedicine}
                  onChange={(e) => setSearchMedicine(e.target.value)}
                />
                <Search size={14} className="search-icon" />
              </div>
            </div>

            <div className="filter-group">
              <label>Availability</label>
              <div className="checkbox-stack">
                <label className="checkbox-item">
                  <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
                  <span>In Stock <small>(472)</small></span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" checked={limitedStock} onChange={(e) => setLimitedStock(e.target.checked)} />
                  <span>Limited Stock <small>(123)</small></span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" />
                  <span>Out of Stock <small>(35)</small></span>
                </label>
              </div>
            </div>

            <div className="filter-group">
              <label>Price Range</label>
              <input 
                type="range" 
                min="10" 
                max="5000" 
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="price-range-slider"
              />
              <div className="range-min-max">
                <span>₹0</span>
                <span>₹5000+</span>
              </div>
            </div>

            <div className="filter-group">
              <label>Medicine Type</label>
              <div className="checkbox-stack">
                <label className="checkbox-item">
                  <input type="checkbox" checked={medicineType === 'Allopathic'} onChange={() => setMedicineType('Allopathic')} />
                  <span>Allopathic <small>(542)</small></span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" checked={medicineType === 'Ayurvedic'} onChange={() => setMedicineType('Ayurvedic')} />
                  <span>Ayurvedic <small>(86)</small></span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" checked={medicineType === 'Homeopathic'} onChange={() => setMedicineType('Homeopathic')} />
                  <span>Homeopathic <small>(42)</small></span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" checked={medicineType === 'Supplements'} onChange={() => setMedicineType('Supplements')} />
                  <span>Supplements <small>(60)</small></span>
                </label>
              </div>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <div className="custom-select-box">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="Relevance">Relevance</option>
                  <option value="PriceLowToHigh">Price: Low to High</option>
                  <option value="PriceHighToLow">Price: High to Low</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </div>

            <button className="btn-clear-filters" onClick={() => { setSearchMedicine(''); setPriceRange(5000); }}>
              <RotateCcw size={14} /> Clear Filters
            </button>
          </aside>

          {/* COLUMN 2: CENTER AVAILABLE MEDICINES TABLE */}
          <main className="center-medicines-table-panel">
            <div className="table-header-bar">
              <h3 className="inventory-count-title">All Medicines (595)</h3>
              <div className="sort-dropdown-right">
                <span>Sort by: </span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="Relevance">Relevance</option>
                  <option value="PriceLowToHigh">Price: Low to High</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </div>

            {/* Inventory Table */}
            <div className="inventory-table-wrapper">
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Salt / Composition</th>
                    <th>Type</th>
                    <th>Availability</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryMedicines.map((med) => (
                    <tr 
                      key={med.id} 
                      className="table-row-item"
                      onClick={() => onSelectMedicine && onSelectMedicine({ title: med.name, price: med.price })}
                    >
                      {/* Medicine Name + Thumb */}
                      <td>
                        <div className="med-name-cell">
                          <img src={med.image} alt={med.name} className="med-thumb" />
                          <div className="med-title-sub">
                            <span className="m-name">{med.name}</span>
                            <span className="m-form">{med.form}</span>
                          </div>
                        </div>
                      </td>

                      {/* Salt / Composition */}
                      <td>
                        <span className="salt-text">{med.salt}</span>
                      </td>

                      {/* Type Pill */}
                      <td>
                        <span className={`type-badge-pill ${med.typeColor}`}>
                          {med.type}
                        </span>
                      </td>

                      {/* Availability Status */}
                      <td>
                        <div className="avail-cell">
                          <span className={`stock-status ${med.stockStatus === 'In Stock' ? 'green' : 'orange'}`}>
                            {med.stockStatus}
                          </span>
                          <span className="qty-sub">{med.stockQty}</span>
                        </div>
                      </td>

                      {/* Price & MRP */}
                      <td>
                        <div className="price-cell">
                          <span className="cur-price">{med.price}</span>
                          <span className="mrp-strike">MRP {med.mrp}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="actions-cell">
                          <button 
                            className="btn-table-reserve"
                            onClick={(e) => { e.stopPropagation(); handleReserveClick(med); }}
                          >
                            Reserve
                          </button>
                          <button 
                            className="btn-table-cart"
                            aria-label="Add to cart"
                            onClick={(e) => handleAddToCart(e)}
                          >
                            <ShoppingCart size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Bottom Pagination */}
            <div className="table-pagination-footer">
              <div className="pagination-btns">
                <button className="btn-p-arrow" disabled><ChevronLeft size={16} /></button>
                <button className="btn-p-num active">1</button>
                <button className="btn-p-num">2</button>
                <button className="btn-p-num">3</button>
                <button className="btn-p-num">4</button>
                <button className="btn-p-num">5</button>
                <span className="dots">...</span>
                <button className="btn-p-num">25</button>
                <button className="btn-p-arrow"><ChevronRight size={16} /></button>
              </div>

              <div className="per-page-selector">
                <span>Show per page:</span>
                <select defaultValue="20">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </div>
          </main>

          {/* COLUMN 3: RIGHT SIDEBAR DETAILS CARD */}
          <aside className="right-details-sidebar">
            
            {/* 1. Pharmacy Location Card */}
            <div className="sidebar-detail-card">
              <h4 className="card-title">Pharmacy Location</h4>
              <div className="map-preview-box">
                <svg viewBox="0 0 240 120" fill="none" className="map-svg">
                  <rect width="240" height="120" fill="#EBF3FF" />
                  <path d="M0 40 Q 120 10, 240 80" stroke="#CBD5E1" strokeWidth="12" />
                  <path d="M60 0 Q 100 80, 180 120" stroke="#CBD5E1" strokeWidth="8" />
                </svg>
                <div className="blue-map-pin">
                  <MapPin size={22} className="pin-icon" />
                </div>
              </div>
              <div className="location-address-row">
                <MapPin size={14} className="text-blue" />
                <span>{pharmData.address}</span>
              </div>
              <button className="link-get-directions" onClick={() => alert(`Opening Directions to ${pharmData.address}...`)}>
                Get Directions
              </button>
            </div>

            {/* 2. Pharmacy Details Metadata Card */}
            <div className="sidebar-detail-card">
              <h4 className="card-title">Pharmacy Details</h4>
              <div className="meta-info-list">
                <div className="meta-row">
                  <span className="lbl"><User size={14} /> Owner</span>
                  <span className="val">{pharmData.owner}</span>
                </div>
                <div className="meta-row">
                  <span className="lbl"><Clock size={14} /> Established</span>
                  <span className="val">{pharmData.established}</span>
                </div>
                <div className="meta-row">
                  <span className="lbl"><FileText size={14} /> License No.</span>
                  <span className="val">{pharmData.licenseNo}</span>
                </div>
                <div className="meta-row">
                  <span className="lbl"><FileText size={14} /> GST No.</span>
                  <span className="val">{pharmData.gstNo}</span>
                </div>
                <div className="meta-row">
                  <span className="lbl"><Store size={14} /> Pharmacy Type</span>
                  <span className="val">{pharmData.pharmacyType}</span>
                </div>
                <div className="meta-row">
                  <span className="lbl"><Truck size={14} /> Average Delivery Time</span>
                  <span className="val">{pharmData.avgDeliveryTime}</span>
                </div>
              </div>
            </div>

            {/* 3. Services Available Grid */}
            <div className="sidebar-detail-card">
              <h4 className="card-title">Services Available</h4>
              <div className="services-grid-2x2">
                <div className="service-grid-item">
                  <div className="s-icon green"><Truck size={18} /></div>
                  <span>Home Delivery</span>
                </div>

                <div className="service-grid-item">
                  <div className="s-icon green"><CreditCard size={18} /></div>
                  <span>Online Payment</span>
                </div>

                <div className="service-grid-item">
                  <div className="s-icon green"><Package size={18} /></div>
                  <span>Medicine Reservation</span>
                </div>

                <div className="service-grid-item">
                  <div className="s-icon green"><Upload size={18} /></div>
                  <span>Prescription Upload</span>
                </div>
              </div>
            </div>

            {/* 4. Customer Reviews Card */}
            <div className="sidebar-detail-card">
              <div className="card-title-row">
                <h4 className="card-title">Customer Reviews ({pharmData.reviewsCount})</h4>
                <button className="link-view-all">View All</button>
              </div>

              <div className="review-score-banner">
                <span className="score-num">{pharmData.rating}</span>
                <div className="stars-row">★★★★★</div>
                <span className="rev-count">({pharmData.reviewsCount} Reviews)</span>
              </div>

              <div className="mini-reviews-list">
                <div className="mini-rev-item">
                  <div className="rev-top">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="Amit" className="rev-avatar" />
                    <div className="rev-user">
                      <h5>Amit Kumar</h5>
                      <span>2 days ago</span>
                    </div>
                    <div className="rev-stars">★★★★★</div>
                  </div>
                  <p className="rev-txt">"Very good service and staff behavior is also polite. Got all medicines on time."</p>
                </div>

                <div className="mini-rev-item">
                  <div className="rev-top">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="Pooja" className="rev-avatar" />
                    <div className="rev-user">
                      <h5>Pooja Singh</h5>
                      <span>5 days ago</span>
                    </div>
                    <div className="rev-stars">★★★★★</div>
                  </div>
                  <p className="rev-txt">"Best pharmacy in the area. Prices are reasonable and delivery is fast."</p>
                </div>
              </div>

              <button className="btn-view-all-reviews">
                View All Reviews
              </button>
            </div>

          </aside>

        </div>
      </div>

      {/* Reservation Modal */}
      {reservedItem && (
        <div className="modal-backdrop" onClick={() => setReservedItem(null)}>
          <div className="reserve-modal-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={() => setReservedItem(null)}>✕</button>

            {reservedSuccess ? (
              <div className="reserve-success-state">
                <Check size={48} className="text-green" />
                <h3>Medicine Reserved Successfully!</h3>
                <p><strong>{reservedItem.name}</strong> is reserved at <strong>{pharmData.name}</strong> for 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="modal-title">Reserve Medicine</h3>
                <p className="modal-desc">Reserve <strong>{reservedItem.name}</strong> at <strong>{pharmData.name}</strong>.</p>
                <div className="res-summary">
                  <div><span>Price:</span> <strong>{reservedItem.price}</strong></div>
                  <div><span>Composition:</span> <span>{reservedItem.salt}</span></div>
                  <div><span>Stock:</span> <span className="text-green">{reservedItem.stockQty}</span></div>
                </div>
                <button className="btn-confirm-reserve" onClick={confirmReservation}>
                  Confirm Reservation
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
