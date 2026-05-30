import { useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import RouteCard from "../components/RouteCard";
import BottomNav from "../components/BottomNav";

export default function Trajet() {
  const [currentPage, setCurrentPage] = useState("Trajet");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState(null);

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

  const handlePlan = () => {
    setRoute({
      line: "Ligne 7 Pikine ↔ Plateau Kermel",
      duration: "8 min",
      price: 300,
      stops: stops,
      coords: line7Coords
    });
  };

  return (
    <div className="trajet-page p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Planifier un Trajet</h2>
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <input
          type="text"
          placeholder="Départ..."
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Destination..."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handlePlan}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Planifier
        </button>
      </div>

      {route && (
        <>
          <RouteCard
            line={route.line}
            duration={route.duration}
            price={route.price}
            stops={route.stops}
          />
          <div className="bg-white shadow-md rounded-xl overflow-hidden mt-4">
            <MapContainer center={[14.708, -17.460]} zoom={12} style={{ height: "40vh" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Polyline positions={route.coords} color="blue" />
              {route.coords.map((pos, idx) => (
                <Marker key={idx} position={pos}>
                  <Popup>{route.stops[idx]}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </>
      )}

      <BottomNav current={currentPage} onChange={setCurrentPage} />
    </div>
  );
}
