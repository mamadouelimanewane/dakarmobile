import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import BottomNav from "../components/BottomNav";

export default function Accueil() {
  const [currentPage, setCurrentPage] = useState("Accueil");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    alert(Trajet de  à  planifié !);
  };

  return (
    <div className="accueil-page p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Bienvenue sur SunuBus</h2>
      
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
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Planifier mon trajet
        </button>
      </div>

      <div className="bg-white shadow-md rounded-xl overflow-hidden mb-6">
        <MapContainer center={[14.6928, -17.4467]} zoom={12} style={{ height: "50vh" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[14.6928, -17.4467]}>
            <Popup>Dakar Plateau</Popup>
          </Marker>
        </MapContainer>
      </div>

      <BottomNav current={currentPage} onChange={setCurrentPage} />
    </div>
  );
}
