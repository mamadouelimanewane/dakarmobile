import { useState } from "react";
import TicketQR from "../components/TicketQR";
import BottomNav from "../components/BottomNav";

export default function Billet() {
  const [currentPage, setCurrentPage] = useState("Billet");

  return (
    <div className="billet-page p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Mon Billet</h2>
      
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <TicketQR />
      </div>

      <div className="bg-gray-100 rounded-lg p-4 text-gray-700 text-sm">
        <p>⚠️ Ce billet est personnel et doit être présenté à chaque contrôle.</p>
        <p className="mt-2">En cas de problème, contactez le support SunuBus.</p>
      </div>

      <BottomNav current={currentPage} onChange={setCurrentPage} />
    </div>
  );
}
