import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRoute } from '../store/store';
import { allStops, allLines, dddLines, aftuLines, brtLines, terLines } from '../data/transportData';

// Calcul de distance Haversine entre deux points (en km)
const haversine = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Estimation de la durée de marche (5 km/h en moyenne)
const walkTime = (dist) => Math.ceil((dist / 5) * 60);

// Estimation de la durée de trajet (bus/train)
const rideTime = (stops, lineOp) => {
  const avgSpeed = lineOp === 'TER' ? 80 : lineOp === 'BRT' ? 25 : 18; // km/h
  let total = 0;
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i], b = stops[i + 1];
    total += haversine(a.lat, a.lng, b.lat, b.lng);
  }
  return Math.ceil((total / avgSpeed) * 60);
};

// Trouver le stop le plus proche d'un arrêt
const nearestStop = (stop, candidates) => {
  let best = null, bestDist = Infinity;
  for (const s of candidates) {
    const d = haversine(stop.lat, stop.lng, s.lat, s.lng);
    if (d < bestDist) { bestDist = d; best = s; }
  }
  return { stop: best, dist: bestDist };
};

const operatorIcon = { DDD: '🚌', AFTU: '🚐', BRT: '🚍', TER: '🚆' };
const operatorColor = {
  DDD: '#3B82F6', AFTU: '#F59E0B', BRT: '#EC4899', TER: '#06B6D4'
};

// ============================================================
// Algorithme de calcul d'itinéraire
// ============================================================
const computeRoute = (origin, destination) => {
  // Récupérer les lignes de chaque arrêt
  const originLineIds = origin.lines || [];
  const destLineIds   = destination.lines || [];

  // 1. Chercher une ligne directe
  const directLineId = originLineIds.find((l) => destLineIds.includes(l));
  if (directLineId) {
    const line = allLines.find((l) => l.id === directLineId);
    const lineStopObjects = line.stops.map((id) => allStops.find((s) => s.id === id)).filter(Boolean);

    const originIdx = line.stops.indexOf(origin.id);
    const destIdx   = line.stops.indexOf(destination.id);
    const segment   = lineStopObjects.slice(
      Math.min(originIdx, destIdx),
      Math.max(originIdx, destIdx) + 1
    );
    const duration = rideTime(segment, line.operator);

    return {
      type: 'direct',
      duration: duration + 4,
      totalDistance: parseFloat(segment.reduce((acc, s, i) =>
        i === 0 ? acc : acc + haversine(segment[i-1].lat, segment[i-1].lng, s.lat, s.lng), 0
      ).toFixed(1)),
      steps: [
        { type: 'walk', duration: 2, instruction: `Rejoignez l'arrêt "${origin.name}"` },
        {
          type: 'ride',
          duration,
          operator: line.operator,
          lineId: line.id,
          lineName: line.name,
          from: origin.name,
          to: destination.name,
          stops: segment.length,
          color: line.color,
        },
        { type: 'walk', duration: 2, instruction: `Arrivée à "${destination.name}"` },
      ]
    };
  }

  // 2. Chercher une correspondance (1 changement)
  let bestTransfer = null;
  let bestDuration = Infinity;

  for (const lineA_id of originLineIds) {
    const lineA = allLines.find((l) => l.id === lineA_id);
    if (!lineA) continue;

    for (const lineB_id of destLineIds) {
      const lineB = allLines.find((l) => l.id === lineB_id);
      if (!lineB) continue;

      // Chercher des arrêts communs entre lineA et lineB
      const sharedIds = lineA.stops.filter((id) => lineB.stops.includes(id));
      for (const transferId of sharedIds) {
        const transferStop = allStops.find((s) => s.id === transferId);
        if (!transferStop) continue;

        const lineAStops = lineA.stops.map((id) => allStops.find((s) => s.id === id)).filter(Boolean);
        const lineBStops = lineB.stops.map((id) => allStops.find((s) => s.id === id)).filter(Boolean);

        const aOriginIdx = lineA.stops.indexOf(origin.id);
        const aTransferIdx = lineA.stops.indexOf(transferId);
        const bTransferIdx = lineB.stops.indexOf(transferId);
        const bDestIdx = lineB.stops.indexOf(destination.id);

        if (aOriginIdx === -1 || aTransferIdx === -1 || bTransferIdx === -1 || bDestIdx === -1) continue;

        const segA = lineAStops.slice(Math.min(aOriginIdx, aTransferIdx), Math.max(aOriginIdx, aTransferIdx) + 1);
        const segB = lineBStops.slice(Math.min(bTransferIdx, bDestIdx), Math.max(bTransferIdx, bDestIdx) + 1);

        const dur = rideTime(segA, lineA.operator) + 3 + rideTime(segB, lineB.operator) + 4;
        if (dur < bestDuration) {
          bestDuration = dur;
          bestTransfer = {
            type: 'transfer',
            duration: dur,
            transferStop,
            lineA,
            lineB,
            segA,
            segB,
          };
        }
      }
    }
  }

  if (bestTransfer) {
    const { transferStop, lineA, lineB, segA, segB } = bestTransfer;
    return {
      type: 'transfer',
      duration: bestDuration,
      totalDistance: parseFloat((
        segA.reduce((acc, s, i) => i === 0 ? acc : acc + haversine(segA[i-1].lat, segA[i-1].lng, s.lat, s.lng), 0) +
        segB.reduce((acc, s, i) => i === 0 ? acc : acc + haversine(segB[i-1].lat, segB[i-1].lng, s.lat, s.lng), 0)
      ).toFixed(1)),
      steps: [
        { type: 'walk', duration: 2, instruction: `Rejoignez l'arrêt "${origin.name}"` },
        {
          type: 'ride',
          duration: rideTime(segA, lineA.operator),
          operator: lineA.operator,
          lineId: lineA.id,
          lineName: lineA.name,
          from: origin.name,
          to: transferStop.name,
          stops: segA.length,
          color: lineA.color,
        },
        { type: 'transfer', duration: 3, instruction: `Correspondance à "${transferStop.name}"` },
        {
          type: 'ride',
          duration: rideTime(segB, lineB.operator),
          operator: lineB.operator,
          lineId: lineB.id,
          lineName: lineB.name,
          from: transferStop.name,
          to: destination.name,
          stops: segB.length,
          color: lineB.color,
        },
        { type: 'walk', duration: 2, instruction: `Arrivée à "${destination.name}"` },
      ]
    };
  }

  // 3. Aucun itinéraire trouvé
  return { type: 'none' };
};

// ============================================================
// Composants UI des étapes
// ============================================================
const StepItem = ({ step }) => {
  if (step.type === 'walk') return (
    <div className="step-item step-walk">
      <div className="step-icon-wrapper walk-icon">🚶</div>
      <div className="step-content">
        <span className="step-label">{step.instruction}</span>
        <span className="step-duration">{step.duration} min</span>
      </div>
    </div>
  );

  if (step.type === 'transfer') return (
    <div className="step-item step-transfer">
      <div className="step-icon-wrapper transfer-icon">🔄</div>
      <div className="step-content">
        <span className="step-label">{step.instruction}</span>
        <span className="step-duration">{step.duration} min d'attente</span>
      </div>
    </div>
  );

  if (step.type === 'ride') return (
    <div className="step-item step-ride" style={{ borderLeft: `4px solid ${step.color}` }}>
      <div className="step-icon-wrapper" style={{ backgroundColor: step.color + '22' }}>
        <span>{operatorIcon[step.operator]}</span>
      </div>
      <div className="step-content">
        <div className="step-ride-header">
          <span className="line-badge-large" style={{ backgroundColor: step.color }}>
            {step.lineId}
          </span>
          <span className="step-label">{step.from} → {step.to}</span>
        </div>
        <span className="step-meta">{step.stops - 1} arrêts · {step.duration} min · {step.lineName.split('—')[0].trim()}</span>
      </div>
    </div>
  );

  return null;
};

// ============================================================
// RoutePanel principal
// ============================================================
const RoutePanel = () => {
  const dispatch = useDispatch();
  const { origin, destination, route } = useSelector((state) => state.mobility);

  const handlePlanTrip = () => {
    if (origin && destination) {
      const result = computeRoute(origin, destination);
      dispatch(setRoute(result));
    }
  };

  // Pas de départ/destination sélectionnés
  if (!origin && !destination) {
    return (
      <div className="route-panel empty">
        <div className="empty-illustration">🗺️</div>
        <h3>Planifier un trajet</h3>
        <p>Saisissez un point de départ et une destination pour calculer votre itinéraire en transport en commun à Dakar.</p>
        <div className="network-info">
          <div className="network-item">
            <span>🚌</span>
            <div>
              <strong>DDD Bus</strong>
              <small>10 lignes urbaines</small>
            </div>
          </div>
          <div className="network-item">
            <span>🚐</span>
            <div>
              <strong>AFTU Car</strong>
              <small>9 lignes périurbaines</small>
            </div>
          </div>
          <div className="network-item">
            <span>🚍</span>
            <div>
              <strong>BRT</strong>
              <small>11 stations · Site propre</small>
            </div>
          </div>
          <div className="network-item">
            <span>🚆</span>
            <div>
              <strong>TER</strong>
              <small>9 gares · Dakar ↔ AIBD</small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="route-panel">
      {/* Résumé du trajet */}
      <div className="trip-summary">
        <div className="trip-point">
          <span className="trip-dot origin-dot-sm" />
          <span className="trip-name">{origin ? origin.name : '—'}</span>
        </div>
        <div className="trip-line-connector" />
        <div className="trip-point">
          <span className="trip-dot dest-dot-sm" />
          <span className="trip-name">{destination ? destination.name : '—'}</span>
        </div>
      </div>

      {(!origin || !destination) && (
        <p className="select-hint">
          {!origin ? 'Sélectionnez un point de départ' : 'Sélectionnez une destination'}
        </p>
      )}

      {origin && destination && !route && (
        <button className="plan-trip-btn" onClick={handlePlanTrip} id="btn-plan-trip">
          <span>🔍</span> Calculer l'itinéraire
        </button>
      )}

      {route && route.type === 'none' && (
        <div className="no-route">
          <span>😕</span>
          <p>Aucun itinéraire trouvé entre ces deux points avec les lignes disponibles.</p>
          <p><small>Essayez des arrêts plus proches du réseau DDD/AFTU/BRT/TER.</small></p>
        </div>
      )}

      {route && route.type !== 'none' && (
        <div className="route-details">
          {/* En-tête avec résumé */}
          <div className="route-header">
            <div className="route-metric">
              <span className="metric-value">⏱️ {route.duration}</span>
              <span className="metric-label">min</span>
            </div>
            <div className="route-metric">
              <span className="metric-value">📍 {route.totalDistance}</span>
              <span className="metric-label">km</span>
            </div>
            <div className="route-type-badge">
              {route.type === 'direct'
                ? <span className="badge-direct">✅ Direct</span>
                : <span className="badge-transfer">🔄 1 correspondance</span>
              }
            </div>
          </div>

          {/* Étapes */}
          <div className="steps">
            {route.steps.map((step, i) => (
              <StepItem key={i} step={step} />
            ))}
          </div>

          {/* Bouton recalculer */}
          <button className="reset-route-btn" onClick={() => dispatch(setRoute(null))}>
            ↩ Modifier le trajet
          </button>
        </div>
      )}
    </div>
  );
};

export default RoutePanel;
