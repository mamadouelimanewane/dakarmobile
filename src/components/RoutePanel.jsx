import React from 'react';

export const calculateDakarFare = (route) => {
  if (!route || !route.steps) return { total: 0, breakdown: "" };
  let totalFare = 0;
  let details = [];

  route.steps.forEach((step) => {
    // 1. Tarification TER par Zone
    if (step.operator === 'TER') {
      const lastStop = step.stops ? step.stops[step.stops.length - 1] : null;
      let price = 500; // Prix de base (Zone 1)
      
      if (lastStop && lastStop.zone === 2) price = 1000;
      if (lastStop && lastStop.zone === 3) price = 1500;
      
      totalFare += price;
      details.push(`TER (Zone ${lastStop?.zone || 1}): ${price}F`);
    } 
    // 2. Tarification Dakar Dem Dikk
    else if (step.operator === 'DDD') {
      totalFare += 300;
      details.push(`DDD: 300F`);
    } 
    // 3. Tarification AFTU (Tata)
    else if (step.operator === 'AFTU') {
      const stopsCount = step.stops ? step.stops.length : 1;
      let price = 150;
      if (stopsCount > 5 && stopsCount <= 10) price = 200;
      else if (stopsCount > 10) price = 300;
      totalFare += price;
      details.push(`AFTU L.${step.line}: ${price}F`);
    }
  });
  return { total: totalFare, breakdown: details.join(' + ') };
};

export default function RoutePanel({ selectedRoute, t }) {
  if (!selectedRoute) return <div style={{ padding: '20px', color: '#666' }}>{t?.noRoute || "Aucun trajet sélectionné"}</div>;
  const fareInfo = calculateDakarFare(selectedRoute);

  return (
    <div className="route-panel" style={{ padding: '15px', background: 'inherit', borderRadius: '8px', border: '1px solid currentColor' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>{t?.routeEstimate || "Tarif estimé"}</h3>
      
      <div style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '10px', borderRadius: '6px', fontWeight: 'bold', marginBottom: '15px' }}>
        💵 {fareInfo.total} FCFA 
        {fareInfo.breakdown && <span style={{ fontSize: '11px', fontWeight: 'normal', color: '#5f6368', marginLeft: '5px' }}>({fareInfo.breakdown})</span>}
      </div>

      <div className="steps">
        {selectedRoute.steps?.map((step, index) => (
          <div key={index} style={{ borderLeft: '3px solid #137333', paddingLeft: '10px', marginBottom: '10px' }}>
            <strong>{step.operator} - {step.line === 'TER' ? 'Train' : `Ligne ${step.line}`}</strong>
            <p style={{ margin: '4px 0', fontSize: '13px' }}>De: {step.from} ➔ À: {step.to}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
