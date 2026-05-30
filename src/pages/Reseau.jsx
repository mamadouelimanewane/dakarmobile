import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import BottomNav from "../components/BottomNav";
import { useState } from "react";

export default function Reseau() {
  const [currentPage, setCurrentPage] = useState("Réseau");

  const line7Coords = [
    [14.764, -17.373], // Pikine Gare
    [14.740, -17.400], // Pikine Technopole
    [14.716, -17.450], // Liberté 5
    [14.708, -17.460], // Grand Dakar
    [14.700, -17.470], // Centenaire
    [14.690, -17.440], // Marché Sandaga
    [14.675, -17.430], // Plateau Kermel
  ];

  const stops = [
    "Pikine Gare",
    "Pikine Technopole",
    "Liberté 5",
    "Grand Dakar",
    "Centenaire",
    "Marché Sandaga",
    "Plateau Kermel"
  ];

  return (
    <div className="reseau-page p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Réseau - Ligne 7</h2>
      
      <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
        <MapContainer center={[14.708, -17.460]} zoom={12} style={{ height: "50vh" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Polyline positions={line7Coords} color="blue" />
          {line7Coords.map((pos, idx) => (
            <Marker key={idx} position={pos}>
              <Popup>{stops[idx]}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Arrêts desservis :</h3>
        <ul className="list-disc list-inside text-gray-600">
          {stops.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      <BottomNav current={currentPage} onChange={setCurrentPage} />
    </div>
  );
}
