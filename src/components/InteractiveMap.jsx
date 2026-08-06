import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Navigation, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import './InteractiveMap.css';

export default function InteractiveMap({
  center,
  userLocation,
  markers = [],
  height = '420px',
  zoom = 13,
  title = 'Nearby Healthcare Map'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const lat = center?.lat || userLocation?.lat || 25.5941;
    const lon = center?.lon || userLocation?.lon || 85.1376;

    // Destroy previous instance if re-rendering
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create Leaflet Map Instance
    const map = L.map(mapContainerRef.current, {
      center: [lat, lon],
      zoom: zoom,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    mapInstanceRef.current = map;

    // Use high clarity CartoDB Voyager map tile layer (Google Maps aesthetic)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // 1. User Location Pulsing Marker & Radius Circle
    if (userLocation?.lat && userLocation?.lon) {
      const userIcon = L.divIcon({
        className: 'custom-user-marker-container',
        html: `
          <div class="user-pulse-marker">
            <div class="user-marker-dot"></div>
            <div class="user-marker-ring"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      L.marker([userLocation.lat, userLocation.lon], { icon: userIcon })
        .addTo(map)
        .bindPopup(`
          <div class="map-popup-card user-popup">
            <div class="popup-tag user-tag">📍 Your Active Location</div>
            <h4 class="popup-title">${userLocation.name || 'Current Location'}</h4>
            <p class="popup-sub">${userLocation.address || 'Detected via GPS / Search'}</p>
          </div>
        `);

      // 1.5km Accuracy Circle
      L.circle([userLocation.lat, userLocation.lon], {
        color: '#1E60D5',
        fillColor: '#1E60D5',
        fillOpacity: 0.08,
        radius: 1800,
        weight: 1.5,
        dashArray: '4, 4'
      }).addTo(map);
    }

    // 2. Hospital & Pharmacy Custom Markers
    markers.forEach((m) => {
      if (!m.lat || !m.lon) return;

      const isHosp = m.type?.toLowerCase().includes('hospital') || m.emergency !== undefined;
      const markerClass = isHosp ? 'hospital-marker' : 'pharmacy-marker';
      const iconSymbol = isHosp ? '🏥' : '💊';

      const customIcon = L.divIcon({
        className: 'custom-place-marker-wrapper',
        html: `
          <div class="place-marker-pin ${markerClass}">
            <span class="pin-symbol">${iconSymbol}</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -32]
      });

      const popupHtml = `
        <div class="map-popup-card">
          <div class="popup-header-row">
            <span class="popup-badge ${isHosp ? 'badge-hosp' : 'badge-pharm'}">
              ${isHosp ? '🏥 Hospital' : '💊 Medical Store'}
            </span>
            <span class="popup-dist">⚡ ${m.distance || 'Nearby'}</span>
          </div>

          <h4 class="popup-name">${m.name}</h4>
          <p class="popup-address">📍 ${m.address || 'Local Market Area'}</p>

          <div class="popup-meta">
            ${m.rating ? `<span class="popup-rating">⭐ ${m.rating}</span>` : ''}
            <span class="popup-status">${m.openStatus || 'Open Now'}</span>
          </div>

          <div class="popup-actions">
            <a href="${m.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lon}`}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="popup-btn btn-gmaps">
              🧭 Directions (Google Maps)
            </a>
            ${m.phone ? `
              <a href="tel:${m.phone}" class="popup-btn btn-call">
                📞 Call
              </a>
            ` : ''}
          </div>
        </div>
      `;

      L.marker([m.lat, m.lon], { icon: customIcon })
        .addTo(map)
        .bindPopup(popupHtml);
    });

    // Auto-fit bounds if multiple markers exist
    if (markers.length > 0 && userLocation?.lat) {
      const boundsGroup = L.featureGroup([
        L.marker([userLocation.lat, userLocation.lon]),
        ...markers.map(m => L.marker([m.lat, m.lon]))
      ]);
      map.fitBounds(boundsGroup.getBounds().pad(0.2));
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center?.lat, center?.lon, userLocation?.lat, userLocation?.lon, markers, zoom]);

  return (
    <div class="interactive-map-wrapper" style={{ height }}>
      <div class="map-top-bar">
        <div class="map-title-info">
          <MapPin size={18} className="map-icon" />
          <span>{title}</span>
          <span class="map-badge-live">Live Google Maps / OSM</span>
        </div>
        <div class="map-legend">
          <span class="legend-item"><span class="legend-dot dot-user"></span> You</span>
          <span class="legend-item"><span class="legend-dot dot-hosp"></span> Hospital</span>
          <span class="legend-item"><span class="legend-dot dot-pharm"></span> Pharmacy</span>
        </div>
      </div>
      <div ref={mapContainerRef} className="map-leaflet-container" />
    </div>
  );
}
