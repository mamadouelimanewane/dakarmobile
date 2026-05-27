import React from 'react';
import SearchBar from './components/SearchBar';
import MapComponent from './components/MapComponent';
import RoutePanel from './components/RoutePanel';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🚌</span>
          <h1>Dakar Mobility</h1>
        </div>
        <nav className="app-nav">
          <button className="nav-btn active">Itinéraires</button>
          <button className="nav-btn">Lignes</button>
          <button className="nav-btn">Arrêts</button>
        </nav>
      </header>
      
      <main className="app-main">
        <div className="sidebar">
          <SearchBar />
          <RoutePanel />
          
          <div className="transport-info">
            <h3>Modes de transport</h3>
            <div className="mode-item">
              <span className="mode-icon ddd">🚌</span>
              <div>
                <strong>DDD Bus</strong>
                <p>Transport urbain de Dakar</p>
              </div>
            </div>
            <div className="mode-item">
              <span className="mode-icon aftu">🚐</span>
              <div>
                <strong>AFTU Car</strong>
                <p>Transport interurbain</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="map-container">
          <MapComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
