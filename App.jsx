import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMode, setActiveTab } from './store/store';
import SearchBar from './components/SearchBar';
import MapComponent from './components/MapComponent';
import RoutePanel from './components/RoutePanel';
import './App.css';

const TABS = [
  { id: 'itineraires', label: 'Itinéraires', icon: '🗺️' },
  { id: 'lignes', label: 'Lignes', icon: '🛤️' },
  { id: 'arrets', label: 'Arrêts', icon: '🚏' },
];

const MODES = [
  { id: 'all', label: 'Tout', icon: '🌐', color: '#6B7280' },
  { id: 'DDD', label: 'DDD Bus', icon: '🚌', color: '#3B82F6' },
  { id: 'AFTU', label: 'AFTU Car', icon: '🚐', color: '#F59E0B' },
  { id: 'BRT', label: 'BRT', icon: '🚍', color: '#EC4899' },
  { id: 'TER', label: 'TER', icon: '🚆', color: '#06B6D4' },
];

function App() {
  const dispatch = useDispatch();
  const { selectedMode, activeTab } = useSelector((state) => state.mobility);

  const handleTabClick = (tabId) => {
    dispatch(setActiveTab(tabId));
  };

  const handleModeClick = (modeId) => {
    dispatch(setSelectedMode(modeId));
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon-wrapper">
              <span className="logo-icon">🚌</span>
            </div>
            <div className="logo-text">
              <h1>Dakar<span className="logo-accent">Mobile</span></h1>
              <span className="logo-tagline">Transport en commun · Sénégal</span>
            </div>
          </div>

          {/* Onglets principaux */}
          <nav className="app-nav" role="navigation" aria-label="Navigation principale">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Filtres de modes de transport */}
      <div className="mode-filter-bar">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            id={`filter-${mode.id}`}
            className={`mode-filter-btn ${selectedMode === mode.id ? 'active' : ''}`}
            style={{
              '--mode-color': mode.color,
            }}
            onClick={() => handleModeClick(mode.id)}
          >
            <span>{mode.icon}</span>
            <span>{mode.label}</span>
          </button>
        ))}
      </div>

      {/* Corps principal */}
      <main className="app-main">
        {/* Panneau latéral gauche */}
        <aside className="sidebar">
          {activeTab === 'itineraires' && (
            <>
              <SearchBar />
              <RoutePanel />
            </>
          )}

          {activeTab === 'lignes' && (
            <LignesPanel selectedMode={selectedMode} />
          )}

          {activeTab === 'arrets' && (
            <ArretsPanel selectedMode={selectedMode} />
          )}
        </aside>

        {/* Carte */}
        <div className="map-container">
          <MapComponent />
        </div>
      </main>
    </div>
  );
}

// ============================================================
// Panneau Lignes
// ============================================================
import { dddLines, aftuLines, brtLines, terLines } from './data/transportData';

const operatorSections = [
  { operator: 'DDD', label: 'DDD Bus', icon: '🚌', color: '#3B82F6', lines: dddLines },
  { operator: 'AFTU', label: 'AFTU Car', icon: '🚐', color: '#F59E0B', lines: aftuLines },
  { operator: 'BRT', label: 'BRT', icon: '🚍', color: '#EC4899', lines: brtLines },
  { operator: 'TER', label: 'TER', icon: '🚆', color: '#06B6D4', lines: terLines },
];

const LignesPanel = ({ selectedMode }) => {
  const sections = selectedMode === 'all'
    ? operatorSections
    : operatorSections.filter((s) => s.operator === selectedMode);

  return (
    <div className="lignes-panel">
      <h2 className="panel-title">Lignes de transport</h2>
      {sections.map((section) => (
        <div key={section.operator} className="lignes-section">
          <div className="section-header" style={{ borderColor: section.color }}>
            <span>{section.icon}</span>
            <span>{section.label}</span>
            <span className="line-count">{section.lines.length} lignes</span>
          </div>
          {section.lines.map((line) => (
            <div key={line.id} className="line-card" style={{ borderLeft: `4px solid ${line.color}` }}>
              <div className="line-card-header">
                <span className="line-id-badge" style={{ background: line.color }}>{line.id}</span>
                <span className="line-card-name">{line.name.split('—')[1]?.trim() || line.name}</span>
              </div>
              <p className="line-card-desc">{line.description}</p>
              <span className="line-stop-count">{line.stops.length} arrêts</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// ============================================================
// Panneau Arrêts
// ============================================================
import { allStops } from './data/transportData';

const ArretsPanel = ({ selectedMode }) => {
  const [search, setSearch] = useState('');
  const filtered = allStops.filter((s) => {
    const matchMode = selectedMode === 'all' || s.operator === selectedMode;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchMode && matchSearch;
  });

  const opColor = { DDD: '#3B82F6', AFTU: '#F59E0B', BRT: '#EC4899', TER: '#06B6D4' };
  const opIcon = { DDD: '🚌', AFTU: '🚐', BRT: '🚍', TER: '🚆' };

  return (
    <div className="arrets-panel">
      <h2 className="panel-title">Arrêts & Gares</h2>
      <input
        type="text"
        className="arrets-search"
        placeholder="Filtrer les arrêts…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="arrets-count">{filtered.length} arrêt{filtered.length > 1 ? 's' : ''}</div>
      <div className="arrets-list">
        {filtered.map((stop) => (
          <div key={stop.id} className="arret-item">
            <span className="arret-emoji">{opIcon[stop.operator]}</span>
            <div className="arret-info">
              <span className="arret-name">{stop.name}</span>
              <div className="arret-meta">
                <span
                  className="arret-op-badge"
                  style={{ background: opColor[stop.operator] }}
                >
                  {stop.operator}
                </span>
                {stop.lines.slice(0, 4).map((l) => (
                  <span key={l} className="arret-line-pill">{l}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
