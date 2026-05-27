import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
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

const MapComponent = () => {
  const { origin, destination, mapCenter, mapZoom } = useSelector((state) => state.mobility);

  const createBusStopIcon = (operator) => {
    const color = operator === 'DDD' ? '#0066CC' : '#FF6600';
    return L.divIcon({
      className: 'custom-bus-stop',
      html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
  };

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
      
      {/* Affichage des arrêts de bus */}
      {allStops.map((stop) => (
        <CircleMarker
          key={stop.id}
          center={[stop.lat, stop.lng]}
          radius={6}
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
      
      {/* Affichage des lignes de transport */}
      {allLines.map((line) => {
        const lineStops = line.stops.map(stopId => {
          const stop = allStops.find(s => s.id === stopId);
          return stop ? [stop.lat, stop.lng] : null;
        }).filter(Boolean);
        
        if (lineStops.length < 2) return null;
        
        return (
          <Polyline
            key={line.id}
            positions={lineStops}
            color={line.color}
            weight={3}
            opacity={0.7}
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
        <Marker position={[origin.lat, origin.lng]}>
          <Popup>
            <strong>Départ:</strong> {origin.name}
          </Popup>
        </Marker>
      )}
      
      {/* Marqueur d'arrivée */}
      {destination && (
        <Marker position={[destination.lat, destination.lng]}>
          <Popup>
            <strong>Arrivée:</strong> {destination.name}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
