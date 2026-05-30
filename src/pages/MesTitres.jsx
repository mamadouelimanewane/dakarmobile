import { useState } from "react";
import PassCard from "../components/PassCard";
import BottomNav from "../components/BottomNav";

export default function MesTitres() {
  const [currentPage, setCurrentPage] = useState("MesTitres");

  return (
    <div className="mes-titres-page p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Mes Titres de Transport</h2>
      
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <PassCard balance={4500} validUntil="28 juin 2026" trips={5} spent={1500} />
      </div>

      <div className="bg-gray-100 rounded-lg p-4 text-gray-700 text-sm">
        <p>ℹ️ Votre pass est rechargeable à tout moment.</p>
        <p className="mt-2">Consultez vos trajets et dépenses pour mieux gérer votre budget transport.</p>
      </div>

      <BottomNav current={currentPage} onChange={setCurrentPage} />
    </div>
  );
}
