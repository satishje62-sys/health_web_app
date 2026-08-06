import React, { useState } from 'react';
import { 
  Plus, Search, MapPin, Bell, ChevronDown, Store, Phone, Navigation, 
  Bookmark, CheckCircle2, Clock, Filter, RotateCcw, ChevronLeft, ChevronRight, 
  ShieldCheck, Truck, CreditCard, Package, Upload, Star, ShoppingCart, Check,
  FileText, Home, ArrowRight, User, AlertCircle, AlertTriangle
} from 'lucide-react';
import { SAMPLE_PHARMACY_DATABASE, searchMedicineInPharmacy } from '../data/pharmacyInventory';
import './PharmacyDetailPage.css';

export default function PharmacyDetailPage({ pharmacy, user, onNavigateToPage, onSelectMedicine }) {
  const [activeTab, setActiveTab] = useState('available-medicines');
  const [searchMedicine, setSearchMedicine] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [reservedSuccess, setReservedSuccess] = useState(false);
  const [reservedItem, setReservedItem] = useState(null);

  // Default pharmacy details matching Page 10 Figma
  const pharmData = pharmacy || {
    id: 'careplus-pharmacy',
    name: 'CarePlus Pharmacy & Surgical',
    verified: true,
    rating: 4.8,
    reviewsCount: 142,
    address: 'Shop No. 12, Main Road Market, Near Metro Station, Patna, Bihar 800001',
    status: 'Open 24 Hours • Verified Pharmacy',
    phone: '+91 98765 43210',
    owner: 'Rajesh Kumar',
    established: '2018',
    licenseNo: 'BR/PD/12345',
    gstNo: '10ABCDE1234F1Z5',
    pharmacyType: 'Retail Pharmacy & Surgical Center',
    avgDeliveryTime: '20-30 mins',
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=1000&auto=format&fit=crop&q=80'
  };

  // Pharmacy Inventory Database (14 essential medicines)
  const storeInventory = pharmacy?.inventory && pharmacy.inventory.length > 0
    ? pharmacy.inventory
    : SAMPLE_PHARMACY_DATABASE;

  // Filter medicines by search query and stock filter
  let filteredMedicines = searchMedicineInPharmacy(storeInventory, searchMedicine);

  if (inStockOnly) {
    filteredMedicines = filteredMedicines.filter(m => m.inStock);
  }

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
            <input 
              type="text" 
              placeholder={`Search medicines inside ${pharmData.name}...`}
              value={searchMedicine}
              onChange={(e) => setSearchMedicine(e.target.value)}
            />
          </div>

          <nav className="header-nav-links">
            <button onClick={() => onNavigateToPage('home')} className="nav-tab">Home</button>
            <button onClick={() => onNavigateToPage('medicine-search')} className="nav-tab">Medicine Search</button>
            <button onClick={() => onNavigateToPage('pharmacies')} className="nav-tab">Near Pharmacies</button>
            <button onClick={() => onNavigateToPage('hospitals')} className="nav-tab">Hospitals</button>

            <button className="icon-bell-btn">
              <Bell size={20} />
              <span className="badge-count">3</span>
            </button>

            <div className="user-profile-avatar" onClick={() => onNavigateToPage('dashboard')}>
              <div className="avatar-letter">{user?.name ? user.name.charAt(0) : 'U'}</div>
            </div>
          </nav>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="container pharm-detail-container">
        
        {/* BREADCRUMB TRAIL */}
        <div className="breadcrumb-nav">
          <span onClick={() => onNavigateToPage('home')}>Home</span> / 
          <span onClick={() => onNavigateToPage('pharmacies')}>Near Pharmacies</span> / 
          <span className="active">{pharmData.name}</span>
        </div>

        {/* HERO PHARMACY DETAILS CARD */}
        <div className="hero-pharmacy-card">
          <div className="hero-shop-image-box">
            <img src={pharmData.image} alt={pharmData.name} />
            {pharmData.verified && (
              <div className="badge-verified">
                <CheckCircle2 size={14} /> Verified Medical Store
              </div>
            )}
          </div>

          <div className="hero-shop-details">
            <div className="title-row">
              <h1 className="pharm-name">{pharmData.name}</h1>
              <div className="rating-badge">
                <Star size={14} className="star-fill" /> {pharmData.rating || '4.8'} 
                <span className="reviews-sub">({pharmData.reviewsCount || 142} Reviews)</span>
              </div>
            </div>

            <p className="pharm-subtitle">{pharmData.pharmacyType || 'Retail Pharmacy & Generic Medicine Provider'}</p>

            <div className="info-lines-group">
              <div className="info-line">
                <MapPin size={16} className="text-blue" />
                <span>{pharmData.address}</span>
              </div>

              <div className="info-line">
                <Clock size={16} className="text-green" />
                <span>{pharmData.status || 'Open 24 Hours'}</span>
              </div>

              <div className="info-line">
                <Phone size={16} className="text-blue" />
                <span>{pharmData.phone}</span>
              </div>
            </div>
          </div>

          {/* Right Action CTAs */}
          <div className="hero-shop-ctas">
            <a 
              href={pharmData.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${pharmData.lat || 25.5941},${pharmData.lon || 85.1376}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-get-directions"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Navigation size={16} /> Get Directions (Google Maps)
            </a>
            {pharmData.phone && (
              <a 
                href={`tel:${pharmData.phone}`}
                className="btn-call-pharmacy"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Phone size={16} /> Call Pharmacy
              </a>
            )}
            <button 
              className={`btn-save-pharmacy ${isSaved ? 'saved' : ''}`}
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark size={16} /> {isSaved ? 'Saved Store' : 'Save Store'}
            </button>
          </div>
        </div>

        {/* TAB BAR NAVIGATION */}
        <div className="pharmacy-tabs-bar">
          <button 
            className={`tab-btn ${activeTab === 'available-medicines' ? 'active' : ''}`}
            onClick={() => setActiveTab('available-medicines')}
          >
            📋 In-Store Medicine Database ({storeInventory.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Store Info & License
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Customer Reviews ({pharmData.reviewsCount || 142})
          </button>
        </div>

        {/* SEARCH FEEDBACK BANNER */}
        {searchMedicine.trim() && (
          <div className={`store-search-feedback-banner ${filteredMedicines.length > 0 ? 'success' : 'warning'}`}>
            {filteredMedicines.length > 0 ? (
              <div className="banner-content-row">
                <CheckCircle2 size={20} className="text-green" />
                <span>
                  Showing <strong>{filteredMedicines.length}</strong> medicine(s) matching "<strong>{searchMedicine}</strong>" in <strong>{pharmData.name}</strong>'s live stock database.
                </span>
              </div>
            ) : (
              <div className="banner-content-row">
                <AlertTriangle size={20} className="text-orange" />
                <div>
                  <strong>"{searchMedicine}" is currently NOT available in {pharmData.name}.</strong>
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>You can check other nearby medical stores for instant stock availability.</p>
                </div>
                <button className="btn-search-other-stores" onClick={() => onNavigateToPage('medicine-search')}>
                  Check Other Nearby Pharmacies →
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3 COLUMNS MAIN CONTENT GRID */}
        <div className="three-columns-grid">
          
          {/* COLUMN 1: LEFT FILTERS SIDEBAR */}
          <aside className="left-filters-panel">
            <h3 className="filters-title">Search In Store</h3>

            <div className="filter-group">
              <label>Medicine Name / Salt</label>
              <div className="input-search-box">
                <input 
                  type="text" 
                  placeholder="e.g. Paracetamol, Dolo, Mox 500..." 
                  value={searchMedicine}
                  onChange={(e) => setSearchMedicine(e.target.value)}
                />
                <Search size={16} className="search-ic" />
              </div>
            </div>

            <div className="filter-group">
              <label>Availability Filter</label>
              <div className="checkbox-stack">
                <label className="checkbox-item">
                  <input 
                    type="checkbox" 
                    checked={inStockOnly} 
                    onChange={(e) => setInStockOnly(e.target.checked)} 
                  />
                  <span>Show In-Stock Only ({storeInventory.filter(m => m.inStock).length})</span>
                </label>
              </div>
            </div>

            <div className="filter-group">
              <div className="store-inventory-summary">
                <h4>📦 Store Database Info</h4>
                <p>• Total Indexed Medicines: <strong>{storeInventory.length}</strong></p>
                <p>• In Stock: <strong className="text-green">{storeInventory.filter(m => m.inStock).length} Items</strong></p>
                <p>• Out of Stock: <strong className="text-red">{storeInventory.filter(m => !m.inStock).length} Items</strong></p>
                <p>• Live Sync: <strong className="text-blue">Verified Real-time</strong></p>
              </div>
            </div>

            {searchMedicine && (
              <button className="btn-clear-filters" onClick={() => setSearchMedicine('')}>
                <RotateCcw size={14} /> Clear Search
              </button>
            )}
          </aside>

          {/* COLUMN 2: CENTER AVAILABLE MEDICINES TABLE */}
          <main className="center-medicines-table-panel">
            <div className="table-header-bar">
              <h3 className="inventory-count-title">
                Store Medicines ({filteredMedicines.length})
              </h3>
            </div>

            {/* Inventory Table */}
            <div className="inventory-table-wrapper">
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Salt / Composition</th>
                    <th>Availability Status</th>
                    <th>Price & Discount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedicines.length > 0 ? (
                    filteredMedicines.map((med) => (
                      <tr 
                        key={med.id} 
                        className={`table-row-item ${!med.inStock ? 'out-of-stock-row' : ''}`}
                        onClick={() => onSelectMedicine && onSelectMedicine({ title: med.name, price: `₹${med.price}` })}
                      >
                        {/* Medicine Name + Thumb */}
                        <td>
                          <div className="med-name-cell">
                            <img src={med.image} alt={med.name} className="med-thumb" />
                            <div className="med-title-sub">
                              <span className="m-name">{med.name}</span>
                              <span className="m-form">{med.form} • <small>{med.manufacturer}</small></span>
                            </div>
                          </div>
                        </td>

                        {/* Salt / Composition */}
                        <td>
                          <span className="salt-text">{med.genericName || med.salt}</span>
                        </td>

                        {/* Availability Status */}
                        <td>
                          <div className="avail-cell">
                            <span className={`stock-status ${med.inStock ? 'green' : 'red'}`}>
                              {med.inStock ? '✓ IN STOCK' : '✕ OUT OF STOCK'}
                            </span>
                            <span className="qty-sub">{med.stockQty}</span>
                          </div>
                        </td>

                        {/* Price & MRP */}
                        <td>
                          <div className="price-cell">
                            <span className="cur-price">₹{med.price}</span>
                            <span className="mrp-strike">MRP ₹{med.mrp}</span>
                            {med.discount && <span className="discount-tag">{med.discount}</span>}
                          </div>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="actions-cell">
                            {med.inStock ? (
                              <button 
                                className="btn-table-reserve"
                                onClick={(e) => { e.stopPropagation(); handleReserveClick(med); }}
                              >
                                Reserve Medicine
                              </button>
                            ) : (
                              <button 
                                className="btn-table-check-other"
                                onClick={(e) => { e.stopPropagation(); onNavigateToPage('medicine-search'); }}
                              >
                                Find in Other Shops
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="empty-table-cell">
                        <div className="no-medicine-found-box">
                          <AlertCircle size={32} className="text-orange" />
                          <h4>No medicine found matching "{searchMedicine}" in {pharmData.name}</h4>
                          <p>Try searching for generic salt names like "Paracetamol" or "Amoxicillin".</p>
                          <button className="btn-search-other-stores" onClick={() => onNavigateToPage('medicine-search')}>
                            Search Across All Nearby Pharmacies
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>

      {/* RESERVATION MODAL */}
      {reservedItem && (
        <div className="modal-backdrop" onClick={() => setReservedItem(null)}>
          <div className="reservation-modal-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={() => setReservedItem(null)}>✕</button>

            {reservedSuccess ? (
              <div className="reservation-success-state">
                <CheckCircle2 size={54} className="text-green" />
                <h3>Medicine Reserved Successfully!</h3>
                <p>
                  <strong>{reservedItem.name}</strong> is kept on hold for you at <strong>{pharmData.name}</strong>.
                </p>
                <div className="reserve-token-box">
                  <span>Reservation Token ID: <strong>MED-{Math.floor(100000 + Math.random() * 900000)}</strong></span>
                </div>
              </div>
            ) : (
              <div className="reservation-form">
                <h3>Reserve Medicine for Pickup</h3>
                <p className="sub-txt">Keep your medicine reserved at {pharmData.name} before heading to the store.</p>

                <div className="reserved-med-summary">
                  <img src={reservedItem.image} alt={reservedItem.name} />
                  <div>
                    <h4>{reservedItem.name}</h4>
                    <p>{reservedItem.form} • Price: ₹{reservedItem.price}</p>
                    <span className="text-green font-bold">{reservedItem.stockQty}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Patient Full Name</label>
                  <input type="text" defaultValue={user?.name || 'Rahul Sharma'} />
                </div>

                <div className="form-group">
                  <label>Contact Phone Number</label>
                  <input type="tel" defaultValue="+91 98765 43210" />
                </div>

                <button className="btn-confirm-reserve" onClick={confirmReservation}>
                  Confirm 2-Hour Store Hold
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
