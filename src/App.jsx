import React, { useState } from 'react';
import { translations } from './data/translations';
import { realTransportData } from './data/realTransportData';
import RoutePanel, { calculateDakarFare } from './components/RoutePanel';
import TrackingAndPayment from './components/TrackingAndPayment';
import MapRoute from './components/MapRoute';
import { DriverDashboard, CommandCenter } from './components/AdminAndDriver';
import './MobileApp.css'; // Changement vers les styles mobiles épurés

function App() {
  const [lang, setLang] = useState('fr');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);
  
  // Profil sélectionné par défaut
  const [appMode, setAppMode] = useState('client'); 
  const [globalFeedbacks, setGlobalFeedbacks] = useState([]);

  const [userCoords, setUserCoords] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [nearestStopMsg, setNearestStopMsg] = useState('');

  const t = translations[lang];

  const handleNewFeedback = (feedbackObject) => {
    setGlobalFeedbacks(prev => [...prev, feedbackObject]);
  };

  const locateUserAndFindStop = () => {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const uLat = position.coords.latitude;
      const uLng = position.coords.longitude;
      setUserCoords({ lat: uLat, lng: uLng });
      setGeoLoading(false);

      let closestStop = null;
      let minDistance = Infinity;
      let targetLine = null;

      realTransportData.lines.forEach(line => {
        line.stops.forEach(stop => {
          const d = Math.sqrt(Math.pow(stop.lat - uLat, 2) + Math.pow(stop.lng - uLng, 2));
          if (d < minDistance) {
            minDistance = d;
            closestStop = stop;
            targetLine = line;
          }
        });
      });

      if (closestStop && targetLine) {
        setNearestStopMsg(`${t.nearestStop}: ${closestStop.name}`);
        handleSelectLine(targetLine);
      }
    }, () => setGeoLoading(false));
  };

  let displayLines = realTransportData.lines.filter(line => 
    line.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    line.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLine = (line) => {
    setSelectedRoute({
      steps: [{
        operator: line.operator,
        line: line.number,
        from: line.stops[0].name,
        to: line.stops[line.stops.length - 1].name,
        stops: line.stops
      }]
    });
  };

  const currentFarePrice = selectedRoute ? calculateDakarFare(selectedRoute).total : 300;

  return (
    <div className="mobile-app-shell">
      
      {/* CONTENU FLUIDE ADAPTÉ AU DOIGT */}
      <div className="mobile-content">
        
        {appMode === 'client' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Header Client Épuré */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '20px', color: '#137333' }}>🇸🇳 DakarMobile</h2>
                <span style={{ fontSize: '12px', color: '#666' }}>Tickets & Itinéraires</span>
              </div>
              <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: '6px', borderRadius: '8px', border: '1px solid #ccc' }}>
                <option value="fr">Français</option>
                <option value="wo">Wolof</option>
              </select>
            </div>

            <MapRoute selectedRoute={selectedRoute} userCoords={userCoords} />
            
            <div className="mobile-card" style={{ textAlign: 'center' }}>
              <button onClick={locateUserAndFindStop} disabled={geoLoading} className="mobile-btn" style={{ backgroundColor: '#137333', color: 'white' }}>
                {geoLoading ? "📍 Recherche du réseau..." : "🔍 Trouver l'arrêt le plus proche"}
              </button>
              {nearestStopMsg && <p style={{ margin: '12px 0 0 0', fontSize: '13px', color: '#137333', fontWeight: '500' }}>📍 {nearestStopMsg}</p>}
            </div>

            <div className="mobile-card">
              <input type="text" placeholder="Rechercher une ligne (ex: 24, 32, TER...)" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ccc', boxSizing: 'border-box', marginBottom: '10px', fontSize: '14px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '130px', overflowY: 'auto' }}>
                {displayLines.map((line, idx) => (
                  <button key={idx} onClick={() => handleSelectLine(line)} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', border: '1px solid #f0f0f0', background: '#fdfdfd', cursor: 'pointer', borderRadius: '8px', textAlign: 'left' }}>
                    <strong style={{ color: '#137333' }}>{line.operator} {line.number}</strong>
                    <span style={{ fontSize: '12px', color: '#555' }}>{line.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <RoutePanel selectedRoute={selectedRoute} t={t} />
            <TrackingAndPayment selectedRoute={selectedRoute} t={t} farePrice={currentFarePrice} onNewFeedback={handleNewFeedback} />
          </div>
        )}

        {appMode === 'driver' && (
          <div>
            <div style={{ marginBottom: '15px' }}>
              <h2 style={{ margin: 0, color: '#4caf50' }}>🚏 Espace Conducteur</h2>
              <span style={{ fontSize: '12px', color: '#aaa' }}>Réseau Connecté Dakar</span>
            </div>
            <DriverDashboard />
          </div>
        )}

        {appMode === 'admin' && (
          <div>
            <div style={{ marginBottom: '15px' }}>
              <h2 style={{ margin: 0, color: '#1a73e8' }}>🏢 Poste de Régulation</h2>
              <span style={{ fontSize: '12px', color: '#666' }}>Dashboard National DDD & AFTU</span>
            </div>
            <CommandCenter liveFeedbackList={globalFeedbacks} />
          </div>
        )}

      </div>

      {/* BARRE DE NAVIGATION BASSE NATIVE */}
      <div className="mobile-bottom-nav">
        <button className={`nav-item ${appMode === 'client' ? 'active-client' : ''}`} onClick={() => setAppMode('client')}>
          <span className="nav-icon">👤</span>
          <span>Espace Voyageur</span>
        </button>
        <button className={`nav-item ${appMode === 'driver' ? 'active-driver' : ''}`} onClick={() => setAppMode('driver')}>
          <span className="nav-icon">🚏</span>
          <span>Chauffeur</span>
        </button>
        <button className={`nav-item ${appMode === 'admin' ? 'active-admin' : ''}`} onClick={() => setAppMode('admin')}>
          <span className="nav-icon">🏢</span>
          <span>Régulation</span>
        </button>
      </div>

    </div>
  );
}

export default App;
