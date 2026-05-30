export default function PassCard({ balance, validUntil, trips, spent }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-4">
      <h3 className="text-xl font-bold text-indigo-600">SunuBus Pass Mensuel</h3>
      <p className="text-green-600 font-semibold mt-2">
        Solde disponible: {balance} FCFA
      </p>
      <p className="text-gray-600">Valide jusqu'au {validUntil}</p>
      <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        Recharger mon Pass
      </button>
      <p className="mt-2 text-sm text-gray-700">
        {trips} trajets effectués • {spent} FCFA dépensés
      </p>
    </div>
  );
}
