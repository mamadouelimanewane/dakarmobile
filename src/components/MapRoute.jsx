import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapRoute({ selectedRoute, userCoords }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersLayer = useRef(L.layerGroup());
  const polylineLayer = useRef(L.layerGroup());

  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [14.7150, -17.4400], // Centré au cœur de la presqu'île
        zoom: 12,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstance.current);

      markersLayer.current.addTo(mapInstance.current);
      polylineLayer.current.addTo(mapInstance.current);
    }
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    markersLayer.current.clearLayers();
    polylineLayer.current.clearLayers();

    const bounds = [];

    // Marqueur de position utilisateur de haute précision
    if (userCoords) {
      const userMarker = L.marker([userCoords.lat, userCoords.lng], {
        icon: L.divIcon({
          className: 'user-marker',
          html: `<div style="background-color: #2b6cb0; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.4);"></div>`,
          iconSize: [20, 20]
        })
      }).bindPopup("<b>Fi nga nekk (Votre position précise)</b>");
      
      markersLayer.current.addLayer(userMarker);
      bounds.push([userCoords.lat, userCoords.lng]);
    }

    // Dessin de l'itinéraire précis au sol
    if (selectedRoute && selectedRoute.steps && selectedRoute.steps[0].stops) {
      const stops = selectedRoute.steps[0].stops;
      const coordinates = stops.map(stop => [stop.lat, stop.lng]);

      const polyline = L.polyline(coordinates, {
        color: selectedRoute.steps[0].operator === 'TER' ? '#8e44ad' : 
               selectedRoute.steps[0].operator === 'DDD' ? '#137333' : '#e67e22',
        weight: 6,
        opacity: 0.85,
        smoothFactor: 1.2 // Améliore le suivi des virages sur les axes dakarois
      });
      polylineLayer.current.addLayer(polyline);

      // Traitement de chaque arrêt physique à quelques dizaines de mètres près
      stops.forEach((stop, index) => {
        const isTerminal = index === 0 || index === stops.length - 1;
        
        const stopMarker = L.marker([stop.lat, stop.lng], {
          icon: L.divIcon({
            className: 'stop-marker',
            html: `<div style="background-color: ${isTerminal ? '#e53e3e' : '#ffffff'}; width: 12px; height: 12px; border-radius: 50%; border: 3px solid #2d3748; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          })
        }).bindPopup(`
          <div style="font-family: sans-serif; padding: 2px;">
            <strong style="color:#137333;">${stop.name}</strong><br/>
            <span style="font-size:12px; color:#555;">${selectedRoute.steps[0].operator} — Arrêt n°${index + 1}</span>
          </div>
        `);

        markersLayer.current.addLayer(stopMarker);
        bounds.push([stop.lat, stop.lng]);
      });
    }

    if (bounds.length > 0) {
      mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [selectedRoute, userCoords]);

  return (
    <div className="map-container">
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
