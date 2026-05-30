import React, { useState } from 'react';

export function CustomerFeedback({ operator, lineNumber, onFeedbackSubmitted }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [tags, setTags] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (tag) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onFeedbackSubmitted) {
      onFeedbackSubmitted({
        id: Date.now(),
        operator,
        line: lineNumber,
        rating,
        comment,
        tags,
        date: 'À l\'instant'
      });
    }
  };

  if (submitted) {
    return (
      <div style={{ padding: '15px', backgroundColor: '#e6f4ea', borderRadius: '8px', textAlign: 'center', marginTop: '10px', border: '1px solid #137333' }}>
        <p style={{ color: '#137333', fontWeight: 'bold', margin: 0 }}>Jërëjëf ! Votre avis a bien été partagé avec le régulateur.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e0e0e0', marginTop: '15px' }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>⭐ Notez ce trajet ({operator} - Ligne {lineNumber})</h4>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)} style={{ fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer', color: star <= rating ? '#f4b400' : '#ccc' }}>★</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px', justifyContent: 'center' }}>
          {['Conduite prudente', 'Bus propre', 'Climatisation', 'Retard', 'Surcharge'].map(tag => {
            const isSelected = tags.includes(tag);
            return (
              <button key={tag} type="button" onClick={() => toggleTag(tag)} style={{ padding: '5px 10px', fontSize: '11px', borderRadius: '15px', border: '1px solid #ccc', backgroundColor: isSelected ? '#137333' : 'white', color: isSelected ? 'white' : '#555', cursor: 'pointer' }}>{tag}</button>
            );
          })}
        </div>
        <input type="text" placeholder="Commentaire optionnel..." value={comment} onChange={(e) => setComment(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', marginBottom: '10px', fontSize: '13px' }} />
        <button type="submit" style={{ width: '100%', padding: '8px', backgroundColor: '#137333', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Envoyer l'évaluation</button>
      </form>
    </div>
  );
}

export function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [passengersCount, setPassengersCount] = useState(28);

  return (
    <div style={{ background: '#1a1a1a', color: '#fff', padding: '20px', borderRadius: '12px', marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#4caf50' }}>🚏 Terminal Chauffeur #4029</h3>
        <button onClick={() => setIsOnline(!isOnline)} style={{ padding: '6px 12px', borderRadius: '20px', border: 'none', backgroundColor: isOnline ? '#2e7d32' : '#c62828', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
          {isOnline ? '● En Route' : '○ Hors ligne'}
        </button>
      </div>
      {isOnline ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ background: '#2d2d2d', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#aaa' }}>ABONNÉS PASS À BORD</span>
            <strong style={{ fontSize: '20px', color: '#2196f3', display: 'block', marginTop: '4px' }}>12 voyageurs</strong>
          </div>
          <div style={{ background: '#2d2d2d', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#aaa' }}>NOTE MOYENNE DU CAPITAINE</span>
            <strong style={{ fontSize: '20px', color: '#ffb300', display: 'block', marginTop: '4px' }}>4.9 ★</strong>
          </div>
        </div>
      ) : <p style={{ textAlignment: 'center', color: '#aaa' }}>Passez en ligne pour débuter votre service.</p>}
    </div>
  );
}

export function CommandCenter({ liveFeedbackList }) {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div style={{ background: '#ffffff', border: '2px solid #1a73e8', padding: '20px', borderRadius: '12px', marginTop: '20px' }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#1a73e8', borderBottom: '2px solid #1a73e8', paddingBottom: '8px' }}>🏢 Centre de Supervision et Tracking</h3>
      
      {/* KPIs mis à jour avec les nouveaux Abonnements */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '15px' }}>
        <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '6px', textAlign: 'center', border: '1px solid #eee' }}>
          <span style={{ fontSize: '11px', color: '#666' }}>TAUX D'ABONNÉS</span>
          <strong style={{ fontSize: '16px', color: '#1a73e8', display: 'block' }}>34.2 % (Flotte)</strong>
        </div>
        <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '6px', textAlign: 'center', border: '1px solid #eee' }}>
          <span style={{ fontSize: '11px', color: '#666' }}>PASS MENSUELS VENDUS</span>
          <strong style={{ fontSize: '16px', color: '#137333', display: 'block' }}>+4,850</strong>
        </div>
        <div style={{ background: '#fce8e6', padding: '10px', borderRadius: '6px', textAlign: 'center', border: '1px solid #fad2cf' }}>
          <span style={{ fontSize: '11px', color: '#c5221f' }}>VALIDATIONS PASS / JOUR</span>
          <strong style={{ fontSize: '16px', color: '#c5221f', display: 'block' }}>24,910</strong>
        </div>
      </div>

      <div style={{ maxHeight: '150px', overflowY: 'auto', background: '#fafafa', border: '1px solid #ddd', padding: '8px', borderRadius: '6px' }}>
        <h5 style={{ margin: '0 0 5px 0', fontSize: '12px' }}>💬 Derniers retours clients (Transports ID) :</h5>
        {liveFeedbackList.length === 0 ? (
          <p style={{ fontSize: '12px', color: '#888', margin: '10px 0' }}>En attente de feedback voyageur...</p>
        ) : (
          [...liveFeedbackList].reverse().map((feed) => (
            <div key={feed.id} style={{ padding: '6px 0', borderBottom: '1px solid #eee', fontSize: '11px' }}>
              <strong>Ligne {feed.line} ({feed.operator}) :</strong> {feed.comment || 'Note sans commentaire'} — <span style={{ color: '#f4b400' }}>{feed.rating}★</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
