import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentCoordinates,
  reverseGeocode,
  searchLocationByQuery,
  fetchNearbyHealthcare,
  generateLocalizedFallback
} from '../services/locationService';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  // Default location: Patna, Bihar (25.5941, 85.1376)
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('medinear_user_location');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: 'Patna, Bihar',
      lat: 25.5941,
      lon: 85.1376,
      address: 'Patna, Bihar, India'
    };
  });

  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [nearbyPharmacies, setNearbyPharmacies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('medinear_user_location', JSON.stringify(location));
    } catch (e) {}
  }, [location]);

  // Load nearby hospitals & pharmacies whenever location lat/lon changes
  useEffect(() => {
    let isMounted = true;
    async function loadPlaces() {
      setIsLoadingPlaces(true);
      try {
        const res = await fetchNearbyHealthcare(location.lat, location.lon, 10);
        if (isMounted) {
          if (res.hospitals && res.hospitals.length > 0) {
            setNearbyHospitals(res.hospitals);
          } else {
            const fb = generateLocalizedFallback(location.lat, location.lon, location.name);
            setNearbyHospitals(fb.hospitals);
          }

          if (res.pharmacies && res.pharmacies.length > 0) {
            setNearbyPharmacies(res.pharmacies);
          } else {
            const fb = generateLocalizedFallback(location.lat, location.lon, location.name);
            setNearbyPharmacies(fb.pharmacies);
          }
        }
      } catch (err) {
        console.error('Error fetching nearby places:', err);
        if (isMounted) {
          const fb = generateLocalizedFallback(location.lat, location.lon, location.name);
          setNearbyHospitals(fb.hospitals);
          setNearbyPharmacies(fb.pharmacies);
        }
      } finally {
        if (isMounted) setIsLoadingPlaces(false);
      }
    }

    loadPlaces();

    return () => {
      isMounted = false;
    };
  }, [location.lat, location.lon, location.name]);

  // Detect Live GPS Location
  const detectLocation = async () => {
    setIsDetectingLocation(true);
    try {
      const coords = await getCurrentCoordinates();
      const geocodeData = await reverseGeocode(coords.lat, coords.lon);
      const newLoc = {
        name: geocodeData.displayName,
        lat: coords.lat,
        lon: coords.lon,
        address: geocodeData.fullAddress
      };
      setLocation(newLoc);
      return newLoc;
    } catch (err) {
      console.warn('Geolocation detection failed or permission denied:', err);
      alert('Could not auto-detect live location. Please allow browser location access or select a location manually.');
      return null;
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Search Location by Name / Query
  const searchLocations = async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    setIsSearchingLocation(true);
    try {
      const results = await searchLocationByQuery(query);
      setSearchResults(results);
    } catch (err) {
      console.error('Location search failed:', err);
    } finally {
      setIsSearchingLocation(false);
    }
  };

  // Select a search result
  const selectSearchResult = (item) => {
    const newLoc = {
      name: item.displayName,
      lat: item.lat,
      lon: item.lon,
      address: item.fullAddress
    };
    setLocation(newLoc);
    setSearchResults([]);
  };

  // Set Location Manually by Name or Coordinates
  const setCustomLocation = async (locationName) => {
    if (!locationName || !locationName.trim()) return;
    setIsLoadingPlaces(true);
    try {
      const results = await searchLocationByQuery(locationName);
      if (results && results.length > 0) {
        selectSearchResult(results[0]);
      } else {
        // Fallback setting text with current lat/lon
        setLocation(prev => ({
          ...prev,
          name: locationName.trim()
        }));
      }
    } catch (e) {
      setLocation(prev => ({
        ...prev,
        name: locationName.trim()
      }));
    } finally {
      setIsLoadingPlaces(false);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        isDetectingLocation,
        isLoadingPlaces,
        nearbyHospitals,
        nearbyPharmacies,
        searchResults,
        isSearchingLocation,
        detectLocation,
        searchLocations,
        selectSearchResult,
        setCustomLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
}
