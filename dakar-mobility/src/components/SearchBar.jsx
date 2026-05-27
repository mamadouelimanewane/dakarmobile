import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrigin, setDestination, setSearchResults } from '../store/store';
import { allStops } from '../data/transportData';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector((state) => state.mobility);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('origin');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 0) {
      const results = allStops.filter(stop => 
        stop.name.toLowerCase().includes(term.toLowerCase())
      );
      dispatch(setSearchResults(results));
      setShowResults(true);
    } else {
      dispatch(setSearchResults([]));
      setShowResults(false);
    }
  };

  const handleSelectStop = (stop) => {
    if (searchType === 'origin') {
      dispatch(setOrigin(stop));
    } else {
      dispatch(setDestination(stop));
    }
    setSearchTerm('');
    setShowResults(false);
  };

  const swapLocations = () => {
    if (origin && destination) {
      dispatch(setOrigin(destination));
      dispatch(setDestination(origin));
    }
  };

  return (
    <div className="search-bar">
      <div className="search-inputs">
        <div className="input-wrapper">
          <span className="input-icon origin-icon">🟢</span>
          <input
            type="text"
            placeholder="Départ"
            value={origin ? origin.name : searchTerm}
            onChange={handleSearch}
            onFocus={() => setSearchType('origin')}
            className="search-input"
          />
        </div>
        
        <button className="swap-button" onClick={swapLocations}>
          ⇅
        </button>
        
        <div className="input-wrapper">
          <span className="input-icon destination-icon">🔴</span>
          <input
            type="text"
            placeholder="Arrivée"
            value={destination ? destination.name : ''}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSearchType('destination');
              if (e.target.value.length > 0) {
                const results = allStops.filter(stop => 
                  stop.name.toLowerCase().includes(e.target.value.toLowerCase())
                );
                dispatch(setSearchResults(results));
                setShowResults(true);
              } else {
                dispatch(setSearchResults([]));
                setShowResults(false);
              }
            }}
            onFocus={() => setSearchType('destination')}
            className="search-input"
          />
        </div>
      </div>
      
      {showResults && (
        <div className="search-results">
          {useSelector((state) => state.mobility.searchResults).map((stop) => (
            <div
              key={stop.id}
              className="search-result-item"
              onClick={() => handleSelectStop(stop)}
            >
              <span className="stop-icon">🚏</span>
              <span className="stop-name">{stop.name}</span>
              <span className="stop-lines">
                {stop.lines.map(line => (
                  <span key={line} className="line-badge">{line}</span>
                ))}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
