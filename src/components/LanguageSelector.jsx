import React from 'react';

export const LanguageSelector = ({ currentLang, onLangChange }) => {
  return (
    <div className="language-selector" style={{
      position: 'absolute',
      top: '15px',
      right: '15px',
      zIndex: 1000,
      display: 'flex',
      gap: '5px',
      background: 'white',
      padding: '4px',
      borderRadius: '20px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
    }}>
      <button 
        onClick={() => onLangChange('fr')}
        style={{
          border: 'none',
          background: currentLang === 'fr' ? '#137333' : 'transparent',
          color: currentLang === 'fr' ? 'white' : '#333',
          padding: '5px 12px',
          borderRadius: '15px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '12px'
        }}
      >
        FR
      </button>
      <button 
        onClick={() => onLangChange('wo')}
        style={{
          border: 'none',
          background: currentLang === 'wo' ? '#137333' : 'transparent',
          color: currentLang === 'wo' ? 'white' : '#333',
          padding: '5px 12px',
          borderRadius: '15px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '12px'
        }}
      >
        WO
      </button>
    </div>
  );
};
