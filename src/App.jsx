import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import MedicineSearchPage from './pages/MedicineSearchPage';
import MedicineDetailPage from './pages/MedicineDetailPage';
import HospitalsListPage from './pages/HospitalsListPage';
import HospitalDetailPage from './pages/HospitalDetailPage';
import PharmaciesListPage from './pages/PharmaciesListPage';
import PharmacyDetailPage from './pages/PharmacyDetailPage';
import MyReviewsPage from './pages/MyReviewsPage';
import UserProfilePage from './pages/UserProfilePage';
import EmergencyPage from './pages/EmergencyPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'login' | 'signup' | 'dashboard' | 'medicine-search' | 'medicine-detail' | 'hospitals' | 'hospital-detail' | 'pharmacies' | 'pharmacy-detail' | 'reviews' | 'profile' | 'emergency'
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [user, setUser] = useState({ name: 'Rahul Kumar', role: 'Premium User', email: 'rahulkumar@gmail.com' });

  const handleNavigateToLogin = () => {
    setCurrentPage('login');
  };

  const handleNavigateToSignUp = () => {
    setCurrentPage('signup');
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleSelectMedicine = (medItem) => {
    setSelectedMedicine(medItem);
    setCurrentPage('medicine-detail');
  };

  const handleSelectHospital = (hospitalItem) => {
    setSelectedHospital(hospitalItem);
    setCurrentPage('hospital-detail');
  };

  const handleSelectPharmacy = (pharmacyItem) => {
    setSelectedPharmacy(pharmacyItem);
    setCurrentPage('pharmacy-detail');
  };

  // Render Page 2: Login Screen
  if (currentPage === 'login') {
    return (
      <LoginPage 
        onLoginSuccess={handleAuthSuccess}
        onNavigateToSignUp={handleNavigateToSignUp}
        onBackToHome={() => setCurrentPage('home')}
      />
    );
  }

  // Render Page 3: Sign Up Screen
  if (currentPage === 'signup') {
    return (
      <SignUpPage 
        onNavigateToLogin={handleNavigateToLogin}
        onSignUpSuccess={handleAuthSuccess}
        onBackToHome={() => setCurrentPage('home')}
      />
    );
  }

  // Render Page 4: User Dashboard Screen
  if (currentPage === 'dashboard') {
    return (
      <DashboardPage 
        user={user}
        onLogout={handleLogout}
        onNavigateToPage={(pageId) => {
          if (pageId === 'search-medicine') setCurrentPage('medicine-search');
          else if (pageId === 'hospitals') setCurrentPage('hospitals');
          else if (pageId === 'pharmacies') setCurrentPage('pharmacies');
          else if (pageId === 'reviews') setCurrentPage('reviews');
          else if (pageId === 'profile') setCurrentPage('profile');
          else if (pageId === 'emergency') setCurrentPage('emergency');
        }}
      />
    );
  }

  // Render Page 5: Medicine Search Screen
  if (currentPage === 'medicine-search') {
    return (
      <MedicineSearchPage 
        user={user}
        onLogout={handleLogout}
        onSelectMedicine={handleSelectMedicine}
        onNavigateToPage={(pageId) => {
          if (pageId === 'home') setCurrentPage('home');
          else if (pageId === 'dashboard') setCurrentPage('dashboard');
          else if (pageId === 'medicine-search') setCurrentPage('medicine-search');
          else if (pageId === 'hospitals') setCurrentPage('hospitals');
          else if (pageId === 'pharmacies') setCurrentPage('pharmacies');
          else if (pageId === 'reviews') setCurrentPage('reviews');
          else if (pageId === 'profile') setCurrentPage('profile');
          else if (pageId === 'emergency') setCurrentPage('emergency');
          else alert(`Navigating to ${pageId}...`);
        }}
      />
    );
  }

  // Render Page 6: Medicine Detail Screen
  if (currentPage === 'medicine-detail') {
    return (
      <MedicineDetailPage 
        medicine={selectedMedicine}
        user={user}
        onSelectMedicine={handleSelectMedicine}
        onNavigateToPage={(pageId) => {
          if (pageId === 'home') setCurrentPage('home');
          else if (pageId === 'dashboard') setCurrentPage('dashboard');
          else if (pageId === 'medicine-search') setCurrentPage('medicine-search');
          else if (pageId === 'hospitals') setCurrentPage('hospitals');
          else if (pageId === 'pharmacies') setCurrentPage('pharmacies');
          else if (pageId === 'reviews') setCurrentPage('reviews');
          else if (pageId === 'profile') setCurrentPage('profile');
          else if (pageId === 'emergency') setCurrentPage('emergency');
          else alert(`Navigating to ${pageId}...`);
        }}
      />
    );
  }

  // Render Page 7: Best Hospitals List Screen
  if (currentPage === 'hospitals') {
    return (
      <HospitalsListPage 
        user={user}
        onSelectHospital={handleSelectHospital}
        onNavigateToPage={(pageId) => {
          if (pageId === 'home') setCurrentPage('home');
          else if (pageId === 'dashboard') setCurrentPage('dashboard');
          else if (pageId === 'medicine-search') setCurrentPage('medicine-search');
          else if (pageId === 'hospitals') setCurrentPage('hospitals');
          else if (pageId === 'pharmacies') setCurrentPage('pharmacies');
          else if (pageId === 'reviews') setCurrentPage('reviews');
          else if (pageId === 'profile') setCurrentPage('profile');
          else if (pageId === 'emergency') setCurrentPage('emergency');
          else alert(`Navigating to ${pageId}...`);
        }}
      />
    );
  }

  // Render Page 8: Hospital Details Screen
  if (currentPage === 'hospital-detail') {
    return (
      <HospitalDetailPage 
        hospital={selectedHospital}
        user={user}
        onNavigateToPage={(pageId) => {
          if (pageId === 'home') setCurrentPage('home');
          else if (pageId === 'dashboard') setCurrentPage('dashboard');
          else if (pageId === 'medicine-search') setCurrentPage('medicine-search');
          else if (pageId === 'hospitals') setCurrentPage('hospitals');
          else if (pageId === 'pharmacies') setCurrentPage('pharmacies');
          else if (pageId === 'reviews') setCurrentPage('reviews');
          else if (pageId === 'profile') setCurrentPage('profile');
          else if (pageId === 'emergency') setCurrentPage('emergency');
          else alert(`Navigating to ${pageId}...`);
        }}
      />
    );
  }

  // Render Page 9: Near Pharmacies List Screen
  if (currentPage === 'pharmacies') {
    return (
      <PharmaciesListPage 
        user={user}
        onSelectPharmacy={handleSelectPharmacy}
        onNavigateToPage={(pageId) => {
          if (pageId === 'home') setCurrentPage('home');
          else if (pageId === 'dashboard') setCurrentPage('dashboard');
          else if (pageId === 'medicine-search') setCurrentPage('medicine-search');
          else if (pageId === 'hospitals') setCurrentPage('hospitals');
          else if (pageId === 'pharmacies') setCurrentPage('pharmacies');
          else if (pageId === 'reviews') setCurrentPage('reviews');
          else if (pageId === 'profile') setCurrentPage('profile');
          else if (pageId === 'emergency') setCurrentPage('emergency');
          else alert(`Navigating to ${pageId}...`);
        }}
      />
    );
  }

  // Render Page 10: Pharmacy Shop Details Screen
  if (currentPage === 'pharmacy-detail') {
    return (
      <PharmacyDetailPage 
        pharmacy={selectedPharmacy}
        user={user}
        onSelectMedicine={handleSelectMedicine}
        onNavigateToPage={(pageId) => {
          if (pageId === 'home') setCurrentPage('home');
          else if (pageId === 'dashboard') setCurrentPage('dashboard');
          else if (pageId === 'medicine-search') setCurrentPage('medicine-search');
          else if (pageId === 'hospitals') setCurrentPage('hospitals');
          else if (pageId === 'pharmacies') setCurrentPage('pharmacies');
          else if (pageId === 'reviews') setCurrentPage('reviews');
          else if (pageId === 'profile') setCurrentPage('profile');
          else if (pageId === 'emergency') setCurrentPage('emergency');
          else alert(`Navigating to ${pageId}...`);
        }}
      />
    );
  }

  // Render Page 11: My Reviews Screen
  if (currentPage === 'reviews') {
    return (
      <MyReviewsPage 
        user={user}
        onNavigateToPage={(pageId) => {
          if (pageId === 'home') setCurrentPage('home');
          else if (pageId === 'dashboard') setCurrentPage('dashboard');
          else if (pageId === 'medicine-search') setCurrentPage('medicine-search');
          else if (pageId === 'hospitals') setCurrentPage('hospitals');
          else if (pageId === 'pharmacies') setCurrentPage('pharmacies');
          else if (pageId === 'reviews') setCurrentPage('reviews');
          else if (pageId === 'profile') setCurrentPage('profile');
          else if (pageId === 'emergency') setCurrentPage('emergency');
          else alert(`Navigating to ${pageId}...`);
        }}
      />
    );
  }

  // Render Page 12: User Profile Management Screen
  if (currentPage === 'profile') {
    return (
      <UserProfilePage 
        user={user}
        onLogout={handleLogout}
        onNavigateToPage={(pageId) => {
          if (pageId === 'home') setCurrentPage('home');
          else if (pageId === 'dashboard') setCurrentPage('dashboard');
          else if (pageId === 'medicine-search') setCurrentPage('medicine-search');
          else if (pageId === 'hospitals') setCurrentPage('hospitals');
          else if (pageId === 'pharmacies') setCurrentPage('pharmacies');
          else if (pageId === 'reviews') setCurrentPage('reviews');
          else if (pageId === 'profile') setCurrentPage('profile');
          else if (pageId === 'emergency') setCurrentPage('emergency');
          else alert(`Navigating to ${pageId}...`);
        }}
      />
    );
  }

  // Render Page 13: Emergency Services Screen
  if (currentPage === 'emergency') {
    return (
      <EmergencyPage 
        user={user}
        onNavigateToPage={(pageId) => {
          if (pageId === 'home') setCurrentPage('home');
          else if (pageId === 'dashboard') setCurrentPage('dashboard');
          else if (pageId === 'medicine-search') setCurrentPage('medicine-search');
          else if (pageId === 'hospitals') setCurrentPage('hospitals');
          else if (pageId === 'pharmacies') setCurrentPage('pharmacies');
          else if (pageId === 'reviews') setCurrentPage('reviews');
          else if (pageId === 'profile') setCurrentPage('profile');
          else if (pageId === 'emergency') setCurrentPage('emergency');
          else alert(`Navigating to ${pageId}...`);
        }}
      />
    );
  }

  // Render Page 1: Home Page
  return (
    <HomePage 
      onNavigateToLogin={handleNavigateToLogin}
      onNavigateToSignUp={handleNavigateToSignUp}
    />
  );
}
