import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrigin, setDestination, setSearchResults, clearSearch } from '../store/store';
import { allStops } from '../data/transportData';

const operatorEmoji = {
  DDD: '🚌',
  AFTU: '🚐',
  BRT: '🚍',
  TER: '🚆',
};

const operatorColor = {
  DDD: '#3B82F6',
  AFTU: '#F59E0B',
  BRT: '#EC4899',
  TER: '#06B6D4',
};

const SearchBar = () => {
  const dispatch = useDispatch();
  const { origin, destination, searchResults } = useSelector((state) => state.mobility);

  const [originText, setOriginText] = useState('');
  const [destText, setDestText] = useState('');
  const [activeField, setActiveField] = useState(null); // 'origin' | 'dest'
  const [showResults, setShowResults] = useState(false);

  const originRef = useRef(null);
  const destRef = useRef(null);
  const resultsRef = useRef(null);

  // Update displayed text when origin/destination change
  useEffect(() => {
    if (origin) setOriginText(origin.name);
  }, [origin]);

  useEffect(() => {
    if (destination) setDestText(destination.name);
  }, [destination]);

  const filterStops = (term) =>
    allStops.filter((stop) =>
      stop.name.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 8);

  const handleOriginChange = (e) => {
    const val = e.target.value;
    setOriginText(val);
    setActiveField('origin');
    if (val.length > 1) {
      dispatch(setSearchResults(filterStops(val)));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleDestChange = (e) => {
    const val = e.target.value;
    setDestText(val);
    setActiveField('dest');
    if (val.length > 1) {
      dispatch(setSearchResults(filterStops(val)));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleSelect = (stop) => {
    if (activeField === 'origin') {
      dispatch(setOrigin(stop));
      setOriginText(stop.name);
    } else {
      dispatch(setDestination(stop));
      setDestText(stop.name);
    }
    setShowResults(false);
    dispatch(setSearchResults([]));
  };

  const swapLocations = () => {
    if (origin && destination) {
      const tmpOrigin = origin;
      const tmpDest = destination;
      dispatch(setOrigin(tmpDest));
      dispatch(setDestination(tmpOrigin));
      setOriginText(tmpDest.name);
      setDestText(tmpOrigin.name);
    }
  };

  const handleClear = () => {
    dispatch(clearSearch());
    setOriginText('');
    setDestText('');
    setShowResults(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        resultsRef.current && !resultsRef.current.contains(e.target) &&
        originRef.current && !originRef.current.contains(e.target) &&
        destRef.current && !destRef.current.contains(e.target)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-bar">
      <div className="search-inputs">
        {/* Départ */}
        <div className="input-wrapper">
          <span className="input-dot origin-dot" />
          <input
            ref={originRef}
            type="text"
            placeholder="Point de départ…"
            value={originText}
            onChange={handleOriginChange}
            onFocus={() => {
              setActiveField('origin');
              if (originText.length > 1) {
                dispatch(setSearchResults(filterStops(originText)));
                setShowResults(true);
              }
            }}
            className="search-input"
            id="input-origin"
          />
          {originText && (
            <button className="clear-btn" onClick={() => {
              setOriginText('');
              dispatch(setOrigin(null));
              setShowResults(false);
            }}>✕</button>
          )}
        </div>

        {/* Séparateur vertical avec bouton swap */}
        <div className="swap-connector">
          <div className="connector-line" />
          <button
            className="swap-button"
            onClick={swapLocations}
            title="Inverser départ et arrivée"
          >
            ⇅
          </button>
          <div className="connector-line" />
        </div>

        {/* Arrivée */}
        <div className="input-wrapper">
          <span className="input-dot dest-dot" />
          <input
            ref={destRef}
            type="text"
            placeholder="Destination…"
            value={destText}
            onChange={handleDestChange}
            onFocus={() => {
              setActiveField('dest');
              if (destText.length > 1) {
                dispatch(setSearchResults(filterStops(destText)));
                setShowResults(true);
              }
            }}
            className="search-input"
            id="input-destination"
          />
          {destText && (
            <button className="clear-btn" onClick={() => {
              setDestText('');
              dispatch(setDestination(null));
              setShowResults(false);
            }}>✕</button>
          )}
        </div>
      </div>

      {/* Dropdown résultats */}
      {showResults && searchResults.length > 0 && (
        <div className="search-results" ref={resultsRef}>
          {searchResults.map((stop) => (
            <div
              key={stop.id}
              className="search-result-item"
              onMouseDown={() => handleSelect(stop)}
            >
              <span className="stop-emoji">{operatorEmoji[stop.operator] || '🚏'}</span>
              <div className="stop-info">
                <span className="stop-name">{stop.name}</span>
                <div className="stop-meta">
                  <span
                    className="operator-badge"
                    style={{ backgroundColor: operatorColor[stop.operator] }}
                  >
                    {stop.operator}
                  </span>
                  {stop.lines.slice(0, 3).map((line) => (
                    <span key={line} className="line-pill">{line}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchResults.length === 0 && showResults && (
        <div className="search-results">
          <div className="no-results">Aucun arrêt trouvé</div>
        </div>
      )}

      {/* Bouton reset si trajet défini */}
      {(origin || destination) && (
        <button className="clear-all-btn" onClick={handleClear}>
          Effacer le trajet
        </button>
      )}
    </div>
  );
};

export default SearchBar;
