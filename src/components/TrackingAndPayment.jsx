import React, { useState, useEffect } from 'react';
import { CustomerFeedback } from './AdminAndDriver';

export default function TrackingAndPayment({ selectedRoute, t, farePrice, onNewFeedback }) {
  const [eta, setEta] = useState(7);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  
  const [walletBalance, setWalletBalance] = useState(15000); 
  const [activeSubscription, setActiveSubscription] = useState(null); 
  const [purchaseType, setPurchaseType] = useState('ticket'); 
  const [subTypeSelected, setSubTypeSelected] = useState('mensuel'); 

  const [showOMModal, setShowOMModal] = useState(false);
  const [omCode, setOmCode] = useState('');
  const [pendingAmount, setPendingAmount] = useState(0);

  useEffect(() => {
    if (!selectedRoute) return;
    const timer = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 12));
    }, 15000);
    return () => clearInterval(timer);
  }, [selectedRoute]);

  if (!selectedRoute) return null;

  const currentFare = farePrice || 300;
  const operatorName = selectedRoute.steps[0].operator || 'DDD';
  const lineNumber = selectedRoute.steps[0].line || '24';

  const subPrices = {
    mensuel: 12000,
    annuel: 110000
  };

  const handleWalletPayment = (amount, type, subKind = null) => {
    if (walletBalance >= amount) {
      setLoadingPayment(true);
      setTimeout(() => {
        setWalletBalance(prev => prev - amount);
        setPaymentMethod('Wallet');
        setLoadingPayment(false);
        if (type === 'subscription') {
          setActiveSubscription(subKind);
          alert(`Félicitations ! Votre Pass Abonnement ${subKind === 'mensuel' ? 'Mensuel' : 'Annuel'} est désormais actif.`);
        } else {
          setIsPaid(true);
        }
      }, 1000);
    } else {
      alert("Solde insuffisant dans votre Wallet. Veuillez le recharger via Wave ou Orange Money.");
    }
  };

  const triggerExternalPayment = (amount, method) => {
    setPendingAmount(amount);
    if (method === 'wave') {
      setLoadingPayment(true);
      setPaymentMethod('Wave');
      setTimeout(() => {
        setLoadingPayment(false);
        if (purchaseType === 'subscription') {
          setActiveSubscription(subTypeSelected);
          alert(`Abonnement ${subTypeSelected} activé via Wave !`);
        } else {
          setIsPaid(true);
        }
      }, 1200);
    } else if (method === 'om') {
      setShowOMModal(true);
    }
  };

  const handleOMPaymentSubmit = (e) => {
    e.preventDefault();
    if (omCode.length >= 4) {
      setLoadingPayment(true);
      setShowOMModal(false);
      setPaymentMethod('OrangeMoney');
      setTimeout(() => {
        setLoadingPayment(false);
        if (purchaseType === 'subscription') {
          setActiveSubscription(subTypeSelected);
          alert(`Abonnement ${subTypeSelected} activé via Orange Money !`);
        } else {
          setIsPaid(true);
        }
      }, 1500);
    } else {
      alert("Code secret invalide.");
    }
  };

  const renderPaymentContent = () => {
    if (loadingPayment) {
      return <p style={{ color: '#137333', fontWeight: 'bold', textAlign: 'center' }}>🔄 Validation de la transaction en cours...</p>;
    }

    if (purchaseType === 'ticket') {
      return (
        <div>
          <h4 style={{ margin: '0 0 10px 0' }}>💳 Acheter un ticket ({currentFare} FCFA)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => handleWalletPayment(currentFare, 'ticket')} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #137333', backgroundColor: '#e6f4ea', color: '#137333', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
              <span>📱 Débiter mon Wallet</span>
              <span>{currentFare}F</span>
            </button>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => triggerExternalPayment(currentFare, 'wave')} style={{ flex: 1, padding: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#1aa3ff', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>🌊 Wave</button>
              <button onClick={() => triggerExternalPayment(currentFare, 'om')} style={{ flex: 1, padding: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#ff6600', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>🍊 O. Money</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h4 style={{ margin: '0 0 5px 0' }}>💎 Souscrire à un forfait Illimité</h4>
        <p style={{ fontSize: '11px', color: '#666', margin: '0 0 12px 0' }}>Valable instantanément sur les réseaux DDD, AFTU, BRT et TER.</p>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
          <div onClick={() => setSubTypeSelected('mensuel')} style={{ flex: 1, border: `2px solid ${subTypeSelected === 'mensuel' ? '#1a73e8' : '#ddd'}`, padding: '10px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', backgroundColor: subTypeSelected === 'mensuel' ? '#f1f6fe' : '#fff' }}>
            <strong style={{ display: 'block', fontSize: '14px' }}>Mensuel</strong>
            <span style={{ fontSize: '12px', color: '#1a73e8', fontWeight: 'bold' }}>12.000 F / mois</span>
          </div>
          <div onClick={() => setSubTypeSelected('annuel')} style={{ flex: 1, border: `2px solid ${subTypeSelected === 'annuel' ? '#1a73e8' : '#ddd'}`, padding: '10px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', backgroundColor: subTypeSelected === 'annuel' ? '#f1f6fe' : '#fff' }}>
            <strong style={{ display: 'block', fontSize: '14px' }}>Annuel (🇸🇳 Eco)</strong>
            <span style={{ fontSize: '12px', color: '#1a73e8', fontWeight: 'bold' }}>110.000 F / an</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={() => handleWalletPayment(subPrices[subTypeSelected], 'subscription', subTypeSelected)} style={{ width: '100%', padding: '12px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            💳 Activer via mon Wallet ({subPrices[subTypeSelected]}F)
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => triggerExternalPayment(subPrices[subTypeSelected], 'wave')} style={{ flex: 1, padding: '10px', backgroundColor: '#1aa3ff', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>🌊 Via Wave</button>
            <button onClick={() => triggerExternalPayment(subPrices[subTypeSelected], 'om')} style={{ flex: 1, padding: '10px', backgroundColor: '#ff6600', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>🍊 Via Orange</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', background: 'var(--card-bg, white)', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', marginTop: '15px' }}>
      
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#137333', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🔄</span> {t?.etaBus || "Arrivée du bus dans"} : <span style={{ color: '#d93025', fontSize: '18px', fontWeight: 'bold' }}>{eta} {t?.minutes || "min"}</span>
        </h4>
        <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '10px', height: '8px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ width: `${100 - (eta * 8)}%`, backgroundColor: '#137333', height: '100%', position: 'absolute', right: 0 }} />
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', border: '1px solid #e0e0e0', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: activeSubscription ? '8px' : '0' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#666', display: 'block' }}>MON WALLET DAKARMOBILE</span>
            <strong style={{ fontSize: '18px', color: '#137333' }}>{walletBalance} FCFA</strong>
          </div>
          <button onClick={() => setWalletBalance(prev => prev + 5000)} style={{ padding: '5px 10px', fontSize: '11px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            + Recharger
          </button>
        </div>
        {activeSubscription && (
          <div style={{ borderTop: '1px solid #ddd', paddingTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', backgroundColor: '#e6f4ea', color: '#137333', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
              🌟 PASS {activeSubscription.toUpperCase()} ACTIF (Voyages Illimités)
            </span>
          </div>
        )}
      </div>

      {!isPaid && (
        <div style={{ display: 'flex', gap: '5px', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <button 
            onClick={() => setPurchaseType('ticket')}
            style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: purchaseType === 'ticket' ? '#137333' : '#fff', color: purchaseType === 'ticket' ? 'white' : '#333', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            🎫 Ticket Unique
          </button>
          <button 
            onClick={() => setPurchaseType('subscription')}
            style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: purchaseType === 'subscription' ? '#1a73e8' : '#fff', color: purchaseType === 'subscription' ? 'white' : '#333', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            💎 Pass Abonnements
          </button>
        </div>
      )}

      {activeSubscription && purchaseType === 'ticket' ? (
        <div style={{ textAlign: 'center', backgroundColor: '#e8f0fe', padding: '15px', borderRadius: '8px', border: '2px solid #1a73e8' }}>
          <span style={{ color: '#1a73e8', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>🚀 Accès Autorisé via votre Pass</span>
          <p style={{ fontSize: '12px', margin: '0 0 10px 0' }}>Votre abonnement couvre à 100% ce trajet ({operatorName} - Ligne {lineNumber}).</p>
          <button onClick={() => setIsPaid(true)} style={{ padding: '10px 15px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
            Générer mon QR Code d'embarquement
          </button>
        </div>
      ) : !isPaid ? (
        renderPaymentContent()
      ) : (
        <div>
          <div style={{ textAlign: 'center', backgroundColor: '#f4fbf7', padding: '15px', borderRadius: '8px', border: '2px dashed #137333', marginBottom: '15px' }}>
            <span style={{ color: '#137333', fontWeight: 'bold', fontSize: '16px', display: 'block' }}>✅ {activeSubscription ? 'PASS ABONNEMENT VALIDÉ' : 'TICKET UNIQUE VALIDE'}</span>
            <span style={{ fontSize: '12px', color: '#555' }}>
              {activeSubscription ? `Accès illimité via formule ${activeSubscription}` : `Payé via : ${paymentMethod} (${currentFare}F)`}
            </span>
            
            <div style={{ margin: '15px auto', width: '100px', height: '100px', backgroundColor: '#222', border: '4px solid #137333', display: 'flex', flexWrap: 'wrap', padding: '4px', boxSizing: 'border-box' }}>
              {[...Array(16)].map((_, i) => (
                <div key={i} style={{ width: '25%', height: '25%', backgroundColor: (i * 7 + (activeSubscription ? 5 : 2)) % 2 === 0 ? '#fff' : '#000' }} />
              ))}
            </div>
            <p style={{ margin: 0, fontSize: '12px', fontWeight: '500' }}>Présentez cet écran devant la borne de validation à bord.</p>
          </div>

          <CustomerFeedback operator={operatorName} lineNumber={lineNumber} onFeedbackSubmitted={onNewFeedback} />
        </div>
      )}

      {showOMModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <form onSubmit={handleOMPaymentSubmit} style={{ background: 'white', padding: '20px', borderRadius: '12px', maxWidth: '320px', width: '90%', textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#ff6600' }}>Paiement Sécurisé Orange Money</h4>
            <p style={{ fontSize: '12px', margin: '0 0 12px 0' }}>Montant de l'opération : <strong>{pendingAmount} FCFA</strong></p>
            <input type="password" maxLength={4} placeholder="Code Secret (4 chiffres)" value={omCode} onChange={(e) => setOmCode(e.target.value)} style={{ width: '100%', padding: '10px', textAlign: 'center', fontSize: '16px', marginBottom: '15px', letterSpacing: '3px' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={() => setShowOMModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc', background: 'none' }}>Annuler</button>
              <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '6px', backgroundColor: '#ff6600', color: 'white', border: 'none', fontWeight: 'bold' }}>Confirmer</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
