import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import { allStops, allLines } from '../data/transportData';

// Fix pour les icônes Leaflet avec Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Couleurs par opérateur
const operatorColor = {
  DDD: '#3B82F6',
  AFTU: '#F59E0B',
  BRT: '#EC4899',
  TER: '#06B6D4',
};

// Taille du cercle par opérateur
const stopRadius = {
  DDD: 5,
  AFTU: 5,
  BRT: 7,
  TER: 7,
};

// Épaisseur des lignes par opérateur
const lineWeight = {
  DDD: 3,
  AFTU: 3,
  BRT: 5,
  TER: 6,
};

// Icône custom pour marqueurs départ/arrivée
const createEndpointIcon = (color, label) =>
  L.divIcon({
    className: '',
    html: `<div style="
      background: ${color};
      color: white;
      border-radius: 50%;
      width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
      box-shadow: 0 3px 8px rgba(0,0,0,0.4);
      border: 3px solid white;
      font-weight: 700;
    ">${label}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

// Composant pour recentrer la carte
const MapController = ({ origin, destination }) => {
  const map = useMap();
  useEffect(() => {
    if (origin && destination) {
      const bounds = L.latLngBounds(
        [origin.lat, origin.lng],
        [destination.lat, destination.lng]
      );
      map.fitBounds(bounds, { padding: [60, 60] });
    } else if (origin) {
      map.setView([origin.lat, origin.lng], 14, { animate: true });
    } else if (destination) {
      map.setView([destination.lat, destination.lng], 14, { animate: true });
    }
  }, [origin, destination, map]);
  return null;
};

const MapComponent = () => {
  const { origin, destination, selectedMode, route } = useSelector((state) => state.mobility);

  // Filtrer les lignes selon le mode sélectionné
  const visibleLines = allLines.filter((line) => {
    if (selectedMode === 'all') return true;
    return line.operator === selectedMode;
  });

  // Filtrer les arrêts selon le mode sélectionné
  const visibleStops = allStops.filter((stop) => {
    if (selectedMode === 'all') return true;
    return stop.operator === selectedMode;
  });

  // Si un itinéraire est calculé, afficher les segments de l'itinéraire
  const routeSegments = [];
  if (route && route.steps) {
    route.steps.forEach((step) => {
      if (step.type === 'ride' && step.segmentStops) {
        routeSegments.push({ positions: step.segmentStops, color: step.color });
      }
    });
  }

  return (
    <MapContainer
      center={[14.7167, -17.4300]}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ZoomControl position="bottomright" />

      <MapController origin={origin} destination={destination} />

      {/* Tracés des lignes de transport */}
      {visibleLines.map((line) => {
        const positions = line.stops
          .map((stopId) => {
            const s = allStops.find((s) => s.id === stopId);
            return s ? [s.lat, s.lng] : null;
          })
          .filter(Boolean);

        if (positions.length < 2) return null;

        const isDashed = line.operator === 'TER';
        return (
          <Polyline
            key={line.id}
            positions={positions}
            color={line.color}
            weight={lineWeight[line.operator] || 3}
            opacity={0.75}
            dashArray={isDashed ? '10, 5' : undefined}
          >
            <Popup>
              <div style={{ fontFamily: 'Inter, sans-serif' }}>
                <strong style={{ color: line.color }}>{line.name}</strong>
                <br />
                <small>{line.description}</small>
                <br />
                <span style={{
                  background: operatorColor[line.operator],
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  marginTop: '4px',
                  display: 'inline-block'
                }}>
                  {line.operator}
                </span>
              </div>
            </Popup>
          </Polyline>
        );
      })}

      {/* Arrêts de transport */}
      {visibleStops.map((stop) => {
        const color = operatorColor[stop.operator] || '#888';
        const radius = stopRadius[stop.operator] || 5;
        return (
          <CircleMarker
            key={stop.id}
            center={[stop.lat, stop.lng]}
            radius={radius}
            fillColor={color}
            color="#fff"
            weight={2}
            opacity={1}
            fillOpacity={0.9}
          >
            <Popup>
              <div style={{ fontFamily: 'Inter, sans-serif', minWidth: '160px' }}>
                <strong>{stop.name}</strong>
                <br />
                <span style={{
                  background: color,
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  display: 'inline-block',
                  marginBottom: '4px'
                }}>
                  {stop.operator}
                </span>
                <br />
                <small>Lignes: {stop.lines.join(' · ')}</small>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}

      {/* Marqueur de départ */}
      {origin && (
        <Marker
          position={[origin.lat, origin.lng]}
          icon={createEndpointIcon('#10B981', 'A')}
        >
          <Popup>
            <strong>🟢 Départ</strong><br />{origin.name}
          </Popup>
        </Marker>
      )}

      {/* Marqueur d'arrivée */}
      {destination && (
        <Marker
          position={[destination.lat, destination.lng]}
          icon={createEndpointIcon('#EF4444', 'B')}
        >
          <Popup>
            <strong>🔴 Arrivée</strong><br />{destination.name}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
