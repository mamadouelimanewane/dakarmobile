import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRoute } from '../store/store';

const RoutePanel = () => {
  const dispatch = useDispatch();
  const { origin, destination, route } = useSelector((state) => state.mobility);

  // Algorithme simple de calcul d'itinéraire
  const calculateRoute = () => {
    if (!origin || !destination) return null;

    // Trouver les lignes qui desservent l'origine et la destination
    const originLines = origin.lines || [];
    const destLines = destination.lines || [];

    // Vérifier s'il y a une ligne directe
    const directLines = originLines.filter(line => destLines.includes(line));
    
    if (directLines.length > 0) {
      return {
        type: 'direct',
        lines: directLines,
        duration: Math.floor(Math.random() * 20 + 15), // 15-35 min
        walks: [],
        steps: [
          { type: 'walk', duration: 2, instruction: `Marchez vers l'arrêt ${origin.name}` },
          { type: 'bus', line: directLines[0], duration: Math.floor(Math.random() * 15 + 10), from: origin.name, to: destination.name },
          { type: 'walk', duration: 3, instruction: `Marchez vers votre destination` }
        ]
      };
    }

    // Sinon, proposer un itinéraire avec correspondance
    return {
      type: 'transfer',
      lines: [originLines[0], destLines[0]],
      duration: Math.floor(Math.random() * 30 + 30), // 30-60 min
      walks: [],
      steps: [
        { type: 'walk', duration: 2, instruction: `Marchez vers l'arrêt ${origin.name}` },
        { type: 'bus', line: originLines[0], duration: 15, from: origin.name, to: 'Correspondance' },
        { type: 'walk', duration: 5, instruction: 'Changez de ligne' },
        { type: 'bus', line: destLines[0], duration: 15, from: 'Correspondance', to: destination.name },
        { type: 'walk', duration: 3, instruction: `Marchez vers votre destination` }
      ]
    };
  };

  const handlePlanTrip = () => {
    if (origin && destination) {
      const newRoute = calculateRoute();
      dispatch(setRoute(newRoute));
    }
  };

  if (!origin || !destination) {
    return (
      <div className="route-panel empty">
        <h3>Planifier un trajet</h3>
        <p>Sélectionnez un point de départ et une destination pour voir les itinéraires disponibles.</p>
        <div className="info-box">
          <p>🚌 DDD Bus - Transport urbain de Dakar</p>
          <p>🚐 AFTU Car - Transport interurbain</p>
        </div>
      </div>
    );
  }

  return (
    <div className="route-panel">
      <div className="trip-summary">
        <div className="location">
          <span className="dot start"></span>
          <span>{origin.name}</span>
        </div>
        <div className="location">
          <span className="dot end"></span>
          <span>{destination.name}</span>
        </div>
      </div>

      {!route ? (
        <button className="plan-trip-btn" onClick={handlePlanTrip}>
          Calculer l'itinéraire
        </button>
      ) : (
        <div className="route-details">
          <div className="route-header">
            <span className="duration">⏱️ {route.duration} min</span>
            <span className="type">{route.type === 'direct' ? '✅ Direct' : '🔄 Avec correspondance'}</span>
          </div>
          
          <div className="steps">
            {route.steps.map((step, index) => (
              <div key={index} className={`step ${step.type}`}>
                {step.type === 'walk' && (
                  <>
                    <span className="step-icon">🚶</span>
                    <span>{step.instruction} ({step.duration} min)</span>
                  </>
                )}
                {step.type === 'bus' && (
                  <>
                    <span className="step-icon">🚌</span>
                    <span>Ligne <strong style={{color: '#0066CC'}}>{step.line}</strong>: {step.from} → {step.to} ({step.duration} min)</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutePanel;
