import React, { useState } from 'react';
import { LocationProvider } from './context/LocationContext';
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
import UserProfilePage from './pages/UserProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'login' | 'signup' | 'dashboard' | 'medicine-search' | 'medicine-detail' | 'hospitals' | 'hospital-detail' | 'pharmacies' | 'pharmacy-detail' | 'profile'
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

  const handleNavigateToPage = (pageId) => {
    if (pageId === 'home') setCurrentPage('home');
    else if (pageId === 'dashboard') setCurrentPage('dashboard');
    else if (pageId === 'medicine-search' || pageId === 'search-medicine') setCurrentPage('medicine-search');
    else if (pageId === 'hospitals') setCurrentPage('hospitals');
    else if (pageId === 'pharmacies') setCurrentPage('pharmacies');
    else if (pageId === 'profile') setCurrentPage('profile');
  };

  const renderCurrentPage = () => {
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
          onNavigateToPage={handleNavigateToPage}
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
          onNavigateToPage={handleNavigateToPage}
        />
      );
    }

    // Render Page 6: Medicine Detail Screen
    if (currentPage === 'medicine-detail') {
      return (
        <MedicineDetailPage 
          medicine={selectedMedicine}
          user={user}
          onLogout={handleLogout}
          onSelectMedicine={handleSelectMedicine}
          onNavigateToPage={handleNavigateToPage}
        />
      );
    }

    // Render Page 7: Best Hospitals List Screen
    if (currentPage === 'hospitals') {
      return (
        <HospitalsListPage 
          user={user}
          onLogout={handleLogout}
          onSelectHospital={handleSelectHospital}
          onNavigateToPage={handleNavigateToPage}
        />
      );
    }

    // Render Page 8: Hospital Details Screen
    if (currentPage === 'hospital-detail') {
      return (
        <HospitalDetailPage 
          hospital={selectedHospital}
          user={user}
          onLogout={handleLogout}
          onNavigateToPage={handleNavigateToPage}
        />
      );
    }

    // Render Page 9: Nearby Pharmacies List Screen
    if (currentPage === 'pharmacies') {
      return (
        <PharmaciesListPage 
          user={user}
          onLogout={handleLogout}
          onSelectPharmacy={handleSelectPharmacy}
          onNavigateToPage={handleNavigateToPage}
        />
      );
    }

    // Render Page 10: Pharmacy Details Screen
    if (currentPage === 'pharmacy-detail') {
      return (
        <PharmacyDetailPage 
          pharmacy={selectedPharmacy}
          user={user}
          onLogout={handleLogout}
          onNavigateToPage={handleNavigateToPage}
        />
      );
    }

    // Render Page 11: User Profile Settings Screen
    if (currentPage === 'profile') {
      return (
        <UserProfilePage 
          user={user}
          onLogout={handleLogout}
          onNavigateToPage={handleNavigateToPage}
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
  };

  return (
    <LocationProvider>
      {renderCurrentPage()}
    </LocationProvider>
  );
}
