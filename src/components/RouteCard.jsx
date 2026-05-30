export default function RouteCard({ line, duration, price, stops }) {
  return (
    <div className="bg-white shadow-card rounded-lg p-4 mb-4">
      <h3 className="text-lg font-bold text-sunubus-indigo">{line}</h3>
      <p className="text-sunubus-gray">{duration} • <span className="text-sunubus-green">{price} FCFA</span></p>
      <ul className="mt-2 list-disc list-inside text-sm text-sunubus-gray">
        {stops.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
}
