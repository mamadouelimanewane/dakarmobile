import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrigin, setDestination, setSearchResults, setRoute } from '../store/store';
import { searchLocation } from '../services/locationIq';
import { allStops } from '../data/transportData';

// Lieux populaires Dakar — affichés sans frappe
const POPULAR_PLACES = [
  { id: 'p1', name: 'Aéroport Blaise Diagne (DSS)', lat: 14.6730, lng: -17.0735, lines: [] },
  { id: 'p2', name: 'Gare Routière Pompiers',        lat: 14.6892, lng: -17.4516, lines: ['1','3','5'] },
  { id: 'p3', name: 'Marché Sandaga',                lat: 14.6708, lng: -17.4456, lines: ['1','2','4'] },
  { id: 'p4', name: 'UCAD Campus',                   lat: 14.6934, lng: -17.4656, lines: ['4','5'] },
  { id: 'p5', name: 'Hôpital Principal',             lat: 14.6822, lng: -17.4489, lines: ['1','2'] },
  { id: 'p6', name: 'Grande Mosquée de Dakar',       lat: 14.6856, lng: -17.4578, lines: ['1','4'] },
  { id: 'p7', name: 'Plateau (Centre)',              lat: 14.6745, lng: -17.4389, lines: ['2','3','4'] },
  { id: 'p8', name: 'Parcelles Assainies',           lat: 14.7389, lng: -17.4556, lines: ['7','8','9'] },
];

const SearchBar = ({ onClose }) => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector((state) => state.mobility);

  const [originTerm, setOriginTerm]   = useState(origin?.name || '');
  const [destTerm, setDestTerm]       = useState(destination?.name || '');
  const [activeInput, setActiveInput] = useState('destination');
  const [isLoading, setIsLoading]     = useState(false);
  const [results, setResults]         = useState([]);
  const [showPopular, setShowPopular] = useState(true);

  const destRef = useRef(null);

  // BUG FIX 6 — focus manuel sans autoFocus (qui bloque Android)
  useEffect(() => {
    if (!origin) {
      setActiveInput('origin');
    } else {
      setActiveInput('destination');
      // Délai pour éviter que le clavier Android apparaisse trop tôt
      setTimeout(() => destRef.current?.focus(), 200);
    }
  }, []);

  const handleSearch = async (term, type) => {
    if (type === 'origin') setOriginTerm(term);
    else setDestTerm(term);

    if (term.length < 2) {
      setResults([]);
      setShowPopular(true);
      return;
    }

    setShowPopular(false);
    setIsLoading(true);

    try {
      // Recherche locale arrêts
      const local = allStops
        .filter(s => s.name.toLowerCase().includes(term.toLowerCase()))
        .map(s => ({ ...s, isLocal: true }));

      // Recherche LocationIQ
      let remote = [];
      try {
        remote = await searchLocation(term);
      } catch { /* silencieux */ }

      setResults([...local, ...remote]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (place) => {
    if (activeInput === 'origin') {
      dispatch(setOrigin(place));
      setOriginTerm(place.name);
      setResults([]);
      setShowPopular(false);
      // Passer auto à destination
      setActiveInput('destination');
      setTimeout(() => destRef.current?.focus(), 150);
    } else {
      dispatch(setDestination(place));
      dispatch(setRoute(null)); // reset route pour recalcul auto
      setDestTerm(place.name);
      setResults([]);
      // Fermer si on a les deux
      if (origin) {
        setTimeout(() => onClose(), 300);
      }
    }
  };

  const handleSwap = () => {
    if (origin && destination) {
      dispatch(setOrigin(destination));
      dispatch(setDestination(origin));
      dispatch(setRoute(null));
      setOriginTerm(destination.name);
      setDestTerm(origin.name);
    }
  };

  const displayList = showPopular && results.length === 0 ? POPULAR_PLACES : results;

  return (
    <div className="expanded-search-panel">
      <div className="search-panel-header">
        <button className="back-btn" onClick={onClose}>←</button>

        <div className="search-inputs">
          {/* Champ départ */}
          <div
            className={`search-input-wrapper ${activeInput === 'origin' ? 'focused' : ''}`}
            onClick={() => setActiveInput('origin')}
          >
            <span>🟢</span>
            <input
              type="text"
              placeholder="Point de départ"
              value={originTerm}
              onChange={(e) => {
                if (origin) dispatch(setOrigin(null));
                handleSearch(e.target.value, 'origin');
              }}
              onFocus={() => setActiveInput('origin')}
            />
            {originTerm && (
              <button
                onClick={(e) => { e.stopPropagation(); dispatch(setOrigin(null)); setOriginTerm(''); setResults([]); setShowPopular(true); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: 16, padding: '0 4px' }}
              >✕</button>
            )}
          </div>

          {/* Bouton swap */}
          <button
            onClick={handleSwap}
            style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '50%',
              width: 28, height: 28, cursor: 'pointer', fontSize: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >⇅</button>

          {/* Champ destination */}
          <div
            className={`search-input-wrapper ${activeInput === 'destination' ? 'focused' : ''}`}
            onClick={() => setActiveInput('destination')}
          >
            <span>🔴</span>
            <input
              ref={destRef}
              type="text"
              placeholder="Où allez-vous ?"
              value={destTerm}
              onChange={(e) => {
                if (destination) dispatch(setDestination(null));
                handleSearch(e.target.value, 'destination');
              }}
              onFocus={() => setActiveInput('destination')}
            />
            {destTerm && (
              <button
                onClick={(e) => { e.stopPropagation(); dispatch(setDestination(null)); setDestTerm(''); setResults([]); setShowPopular(true); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: 16, padding: '0 4px' }}
              >✕</button>
            )}
          </div>
        </div>
      </div>

      <div className="search-results">
        {/* En-tête liste */}
        {showPopular && results.length === 0 && (
          <div style={{ padding: '10px 16px 6px', fontSize: 12, color: '#999', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Lieux populaires
          </div>
        )}

        {isLoading && (
          <div style={{ padding: '16px', textAlign: 'center', color: '#999', fontSize: 14 }}>
            🔍 Recherche en cours…
          </div>
        )}

        {!isLoading && !showPopular && results.length === 0 && originTerm.length >= 2 && (
          <div style={{ padding: '16px', textAlign: 'center', color: '#999', fontSize: 14 }}>
            Aucun résultat pour « {activeInput === 'origin' ? originTerm : destTerm} »
          </div>
        )}

        {displayList.map((result, idx) => (
          <div
            key={result.id || idx}
            className="search-result-item"
            onClick={() => handleSelect(result)}
          >
            <div className="icon">
              {result.isLocal ? '🚏' : result.id?.startsWith('p') ? '⭐' : '📍'}
            </div>
            <div className="details">
              <span className="name">{result.name}</span>
              {result.fullName && result.fullName !== result.name && (
                <span className="address" style={{ fontSize: 12, color: '#999', display: 'block', marginTop: 2 }}>
                  {result.fullName.split(',').slice(1, 3).join(',')}
                </span>
              )}
              {result.lines && result.lines.length > 0 && (
                <span className="stop-lines" style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {result.lines.map(line => (
                    <span key={line} style={{ background: '#e8f5e9', color: '#2e7d32', padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 500 }}>
                      {line}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
