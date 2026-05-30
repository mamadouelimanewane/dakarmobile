import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import { allStops, allLines } from '../data/transportData';
import lineGeometries from '../data/lineGeometries.json';

// Fix pour les icônes Leaflet avec Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Sous-composant pour zoomer automatiquement quand le centre change
const MapCentre = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

// Icône point bleu pour la géolocalisation
const userIcon = L.divIcon({
  className: '',
  html: `<div class="user-location-marker"></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11]
});

// Icône de départ (vert) 
const originIcon = L.divIcon({
  className: '',
  html: `<div style="background:#3EA142;width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Icône d'arrivée (rouge)
const destIcon = L.divIcon({
  className: '',
  html: `<div style="background:#e00000;width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const MapComponent = () => {
  const { origin, destination, mapCenter, mapZoom, selectedMode, userLocation, route } = useSelector((state) => state.mobility);

  const filteredStops = allStops.filter(stop => {
    if (selectedMode === 'all') return true;
    const isDDD = stop.id <= 20;
    return selectedMode === 'ddd' ? isDDD : !isDDD;
  });

  const filteredLines = allLines.filter(line => {
    if (selectedMode === 'all') return true;
    return line.operator.toLowerCase() === selectedMode;
  });

  // Convertit les coordonnées LocationIQ [lon, lat] -> [lat, lon] pour Leaflet
  const routePositions = route && route.geometry 
    ? route.geometry.map(([lon, lat]) => [lat, lon])
    : null;

  return (
    <MapContainer 
      center={mapCenter} 
      zoom={mapZoom} 
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Repositionner la carte quand le centre change */}
      <MapCentre center={mapCenter} />
      
      {/* Position de l'utilisateur */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup><strong>Votre position</strong></Popup>
        </Marker>
      )}

      {/* Tracé de l'itinéraire (route réelle LocationIQ) */}
      {routePositions && (
        <Polyline
          positions={routePositions}
          color="#3EA142"
          weight={6}
          opacity={0.9}
          dashArray={route.type === 'walking' ? '8, 12' : null}
        />
      )}

      {/* Arrêts de bus filtrés */}
      {!routePositions && filteredStops.map((stop) => (
        <CircleMarker
          key={stop.id}
          center={[stop.lat, stop.lng]}
          radius={5}
          fillColor={stop.id <= 20 ? '#0066CC' : '#FF6600'}
          color="#fff"
          weight={2}
          opacity={1}
          fillOpacity={0.8}
        >
          <Popup>
            <strong>{stop.name}</strong><br />
            Lignes: {stop.lines.join(', ')}<br />
            {stop.id <= 20 ? 'DDD Bus' : 'AFTU Car'}
          </Popup>
        </CircleMarker>
      ))}
      
      {/* Lignes de transport */}
      {!routePositions && filteredLines.map((line) => {
        // Essayer d'utiliser la géométrie de route réelle LocationIQ
        let positions = null;
        if (lineGeometries && lineGeometries[line.id]) {
          positions = lineGeometries[line.id].map(([lon, lat]) => [lat, lon]);
        } else {
          // Fallback : connecter les arrêts par des lignes droites
          positions = line.stops.map(stopId => {
            const stop = allStops.find(s => s.id === stopId);
            return stop ? [stop.lat, stop.lng] : null;
          }).filter(Boolean);
        }
        
        if (!positions || positions.length < 2) return null;
        
        return (
          <Polyline
            key={line.id}
            positions={positions}
            color={line.color}
            weight={4}
            opacity={0.8}
          >
            <Popup>
              <strong>{line.name}</strong><br />
              Opérateur: {line.operator}
            </Popup>
          </Polyline>
        );
      })}
      
      {/* Marqueur de départ */}
      {origin && (
        <Marker position={[origin.lat, origin.lng]} icon={originIcon}>
          <Popup><strong>Départ:</strong> {origin.name}</Popup>
        </Marker>
      )}
      
      {/* Marqueur d'arrivée */}
      {destination && (
        <Marker position={[destination.lat, destination.lng]} icon={destIcon}>
          <Popup><strong>Arrivée:</strong> {destination.name}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
