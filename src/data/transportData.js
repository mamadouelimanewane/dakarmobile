// ══════════════════════════════════════════════════════════════
//  SenBus Mobile — Données transport Dakar
// ══════════════════════════════════════════════════════════════

export const OPERATORS = {
  DDD:  { id:'DDD',  name:'DDD',  fullName:'Dakar Dem Dikk',        emoji:'🚌', color:'#1a56db', light:'#EFF6FF', tarif:200 },
  AFTU: { id:'AFTU', name:'AFTU', fullName:'AFTU Car Rapide',        emoji:'🚐', color:'#e11d48', light:'#FFF1F2', tarif:150 },
  BRT:  { id:'BRT',  name:'BRT',  fullName:'Bus Rapid Transit',      emoji:'🚍', color:'#7c3aed', light:'#F5F3FF', tarif:300 },
  TER:  { id:'TER',  name:'TER',  fullName:'Train Express Régional', emoji:'🚆', color:'#059669', light:'#ECFDF5', tarif:500 },
};

export const STOPS = [
  // PLATEAU / CENTRE
  { id:'p01', name:'Gare Palais (Rebeuss)',      zone:'Plateau',    lat:14.6697, lng:-17.4386, operators:['DDD','TER'],       lines:['L6','L7','L8','L9','L10','L12','L15','L23','TER-01'], terConnection:true,
    terInfo:{ gare:'Dakar', horaires:'04h30–23h30', freq:'30 min', services:['Guichet','Distributeur','WiFi'] }},
  { id:'p02', name:'Avenue Petersen',            zone:'Plateau',    lat:14.6811, lng:-17.4464, operators:['DDD','AFTU','BRT'], lines:['A2','A3','A5','BRT-L1'] },
  { id:'p03', name:'Sandaga',                    zone:'Plateau',    lat:14.6756, lng:-17.4436, operators:['DDD'],             lines:['L6','L9','L10'] },
  { id:'p04', name:'Colobane Gare',              zone:'Médina',     lat:14.6908, lng:-17.4478, operators:['DDD','AFTU'],      lines:['L9','A30','A33'] },
  { id:'p05', name:'Tilène',                     zone:'Médina',     lat:14.6788, lng:-17.4428, operators:['DDD'],             lines:['L9','L10'] },
  { id:'p06', name:'Lat Dior (UCAD)',            zone:'Fann',       lat:14.6944, lng:-17.4594, operators:['AFTU'],            lines:['A1','A34'] },

  // LECLERC / LIBERTÉ
  { id:'lc1', name:'Leclerc Terminus',           zone:'Liberté',    lat:14.7117, lng:-17.4567, operators:['DDD'],             lines:['L1A','L2A','L11','L14','L121'] },
  { id:'lc2', name:'HLM Grand Yoff',             zone:'HLM',        lat:14.7183, lng:-17.4553, operators:['DDD','AFTU'],      lines:['L121','A1'] },
  { id:'lb5', name:'Terminus Liberté 5',         zone:'Liberté 5',  lat:14.7242, lng:-17.4528, operators:['DDD'],             lines:['L10','L13','L18','L20'] },
  { id:'lb6', name:'Rond-Point Liberté 6',       zone:'Liberté 6',  lat:14.7200, lng:-17.4450, operators:['DDD','AFTU'],      lines:['L9','L13','A57'] },

  // PARCELLES ASSAINIES
  { id:'pa1', name:'Terminus Parcelles',         zone:'Parcelles',  lat:14.7583, lng:-17.4308, operators:['DDD','AFTU'],      lines:['L1A','L23','A2','A5','A25','A29'] },
  { id:'pa2', name:'Parcelles Unité 17',         zone:'Parcelles',  lat:14.7533, lng:-17.4275, operators:['DDD'],             lines:['L1A','L23'] },

  // YOFF / OUAKAM
  { id:'yf1', name:'Yoff Village',               zone:'Yoff',       lat:14.7467, lng:-17.4903, operators:['DDD','AFTU'],      lines:['L8','A3','A4','A66'] },
  { id:'ok1', name:'Ouakam Terminus',            zone:'Ouakam',     lat:14.7183, lng:-17.5058, operators:['DDD','AFTU'],      lines:['L7','A42','A44'] },
  { id:'ng1', name:'Ngor Village',               zone:'Ngor',       lat:14.7464, lng:-17.5178, operators:['AFTU'],            lines:['A35','A49'] },

  // GRAND YOFF / SICAP
  { id:'gy1', name:'Grand Yoff Terminus',        zone:'Grand Yoff', lat:14.7268, lng:-17.4553, operators:['DDD','AFTU'],      lines:['L121','L20','A3'] },
  { id:'sc1', name:'Sicap Liberté',              zone:'Sicap',      lat:14.7133, lng:-17.4603, operators:['DDD'],             lines:['L10','L13'] },

  // HANN / BAUX
  { id:'ha2', name:'Front de Terre',             zone:'Hann',       lat:14.7172, lng:-17.4069, operators:['DDD'],             lines:['L8','L9'] },
  { id:'bm1', name:'Baux Maraîchers',            zone:'Hann',       lat:14.7192, lng:-17.3997, operators:['DDD','AFTU'],      lines:['L8','A51'] },

  // GUÉDIAWAYE
  { id:'gd1', name:'Guédiawaye Marché',          zone:'Guédiawaye', lat:14.7769, lng:-17.3986, operators:['DDD','BRT','AFTU'],lines:['L12','BRT-L1','A27','A64'] },
  { id:'gd2', name:'Wakhinane Nimzat',           zone:'Guédiawaye', lat:14.7833, lng:-17.4025, operators:['DDD'],             lines:['L12'] },

  // PIKINE
  { id:'pk1', name:'Pikine Gare Routière',       zone:'Pikine',     lat:14.7499, lng:-17.3858, operators:['DDD','BRT','AFTU'],lines:['L15','L45','BRT-L1','A35'] },

  // KEUR MASSAR / YEUMBEUL
  { id:'km1', name:'Keur Massar Marché',         zone:'Keur Massar',lat:14.7833, lng:-17.3183, operators:['DDD','AFTU'],      lines:['L11','A52','A61','A71'] },
  { id:'km2', name:'Yeumbeul',                   zone:'Yeumbeul',   lat:14.7633, lng:-17.3500, operators:['AFTU'],            lines:['A26','A68'] },

  // DAROUKHANE / CAMBERÈNE
  { id:'dk1', name:'Daroukhane Terminus',        zone:'Daroukhane', lat:14.7850, lng:-17.4175, operators:['DDD','AFTU'],      lines:['L2A','A70'] },
  { id:'cb1', name:'Camberène Cité Nations',     zone:'Camberène',  lat:14.7633, lng:-17.4292, operators:['DDD','AFTU'],      lines:['L6','A29','A79'] },

  // RUFISQUE / THIAROYE
  { id:'rf1', name:'Rufisque Gare Routière',     zone:'Rufisque',   lat:14.7153, lng:-17.2747, operators:['DDD','TER','AFTU'],lines:['L15','TER-01','A55','A57','A64'], terConnection:true,
    terInfo:{ gare:'Rufisque', horaires:'04h50–23h10', freq:'30 min', services:['Guichet','Distributeur'] }},
  { id:'th1', name:'Thiaroye Marché',            zone:'Thiaroye',   lat:14.7358, lng:-17.3533, operators:['DDD','TER'],       lines:['TER-01'] },
  { id:'ml1', name:'Malika Terminus',            zone:'Malika',     lat:14.7958, lng:-17.3475, operators:['DDD','AFTU'],      lines:['L16A','A50','A75'] },
  { id:'mb1', name:'Grand Mbao',                 zone:'Mbao',       lat:14.7500, lng:-17.2917, operators:['DDD','AFTU'],      lines:['L45','A40','A44'] },

  // BRT STATIONS
  { id:'b01', name:'Petersen (BRT)',             zone:'Plateau',    lat:14.6811, lng:-17.4464, operators:['BRT'],             lines:['BRT-L1'] },
  { id:'b02', name:'Stèle Mermoz (BRT)',         zone:'Mermoz',     lat:14.7125, lng:-17.4761, operators:['BRT'],             lines:['BRT-L1'] },
  { id:'b03', name:'CICES (BRT)',                zone:'CICES',      lat:14.7342, lng:-17.4681, operators:['BRT'],             lines:['BRT-L1'] },

  // TER GARES
  { id:'t01', name:'Dakar Gare TER',             zone:'Plateau',    lat:14.6697, lng:-17.4386, operators:['TER'],             lines:['TER-01'], terConnection:true,
    terInfo:{ gare:'Dakar', horaires:'04h30–23h30', freq:'30 min', services:['Guichet','WiFi','Boutiques'] }},
  { id:'t02', name:'Thiaroye Gare TER',          zone:'Thiaroye',   lat:14.7300, lng:-17.3558, operators:['TER'],             lines:['TER-01'], terConnection:true,
    terInfo:{ gare:'Thiaroye', horaires:'04h45–23h15', freq:'30 min', services:['Guichet'] }},
  { id:'t03', name:'Rufisque Gare TER',          zone:'Rufisque',   lat:14.7142, lng:-17.2753, operators:['TER'],             lines:['TER-01'], terConnection:true,
    terInfo:{ gare:'Rufisque', horaires:'04h50–23h10', freq:'30 min', services:['Guichet','Distributeur'] }},
  { id:'t04', name:'Diamniadio Gare TER',        zone:'Diamniadio', lat:14.7289, lng:-17.1742, operators:['TER'],             lines:['TER-01'], terConnection:true,
    terInfo:{ gare:'Diamniadio', horaires:'05h00–23h00', freq:'30 min', services:['Guichet','WiFi','Parking'] }},
  { id:'t05', name:'AIBD Aéroport',              zone:'AIBD',       lat:14.7411, lng:-17.0900, operators:['TER'],             lines:['TER-01'], terConnection:true,
    terInfo:{ gare:'AIBD', horaires:'05h00–23h30', freq:'30 min', services:['Guichet','WiFi','Boutiques','Restaurants'] }},
];

// ── POI populaires de Dakar ───────────────────────────────────
export const POI = [
  { id:'poi-ucad',    name:'UCAD — Université',       lat:14.6925, lng:-17.4628, category:'Éducation',   emoji:'🎓', nearestStop:'p06' },
  { id:'poi-aibd',    name:'Aéroport AIBD',           lat:14.7411, lng:-17.0900, category:'Transport',   emoji:'✈️', nearestStop:'t05' },
  { id:'poi-hop',     name:'Hôpital Principal',        lat:14.6889, lng:-17.4469, category:'Santé',       emoji:'🏥', nearestStop:'p03' },
  { id:'poi-fann',    name:'Hôpital de Fann',          lat:14.6956, lng:-17.4700, category:'Santé',       emoji:'🏥', nearestStop:'p06' },
  { id:'poi-sand',    name:'Marché Sandaga',           lat:14.6756, lng:-17.4436, category:'Commerce',    emoji:'🛒', nearestStop:'p03' },
  { id:'poi-tilen',   name:'Marché Tilène',            lat:14.6788, lng:-17.4428, category:'Commerce',    emoji:'🛒', nearestStop:'p05' },
  { id:'poi-port',    name:'Port de Dakar',            lat:14.6678, lng:-17.4247, category:'Transport',   emoji:'⚓', nearestStop:'p01' },
  { id:'poi-stade',   name:'Stade Léopold Sédar Senghor', lat:14.7050, lng:-17.4383, category:'Sport',   emoji:'⚽', nearestStop:'lb5' },
  { id:'poi-cices',   name:'CICES (Foire)',            lat:14.7342, lng:-17.4681, category:'Culture',     emoji:'🎪', nearestStop:'b03' },
  { id:'poi-place',   name:'Place de l\'Indépendance', lat:14.6712, lng:-17.4444, category:'Tourisme',   emoji:'🏛️', nearestStop:'p02' },
  { id:'poi-gorée',   name:'Île de Gorée (Embarcadère)', lat:14.6742, lng:-17.4278, category:'Tourisme', emoji:'🏝️', nearestStop:'p01' },
  { id:'poi-vdn',     name:'VDN — Voie Dégagement Nord', lat:14.7300, lng:-17.4200, category:'Transport', emoji:'🛣️', nearestStop:'lb5' },
  { id:'poi-hlm',     name:'Marché HLM',               lat:14.7008, lng:-17.4575, category:'Commerce',   emoji:'🛒', nearestStop:'lc2' },
  { id:'poi-almad',   name:'Les Almadies',              lat:14.7481, lng:-17.5289, category:'Tourisme',   emoji:'🌊', nearestStop:'ng1' },
  { id:'poi-guichet', name:'Guichet TER Dakar',         lat:14.6697, lng:-17.4386, category:'Transport',  emoji:'🚆', nearestStop:'t01' },
];

// ── Lignes DDD ────────────────────────────────────────────────
const DDD = [
  { id:'L1A', name:'Ligne 1A', route:'Parcelles Assainies ↔ Leclerc',    color:'#1a56db', freq:'8 min',  tarif:200, stops:['pa1','pa2','lb5','lc1'] },
  { id:'L2A', name:'Ligne 2A', route:'Daroukhane ↔ Leclerc',             color:'#2563eb', freq:'10 min', tarif:200, stops:['dk1','gd1','lb5','lc1'] },
  { id:'L6',  name:'Ligne 6',  route:'Camberène ↔ Palais',               color:'#1d4ed8', freq:'12 min', tarif:200, stops:['cb1','pa1','lb5','lb6','lc1','p03','p01'] },
  { id:'L7',  name:'Ligne 7',  route:'Ouakam ↔ Palais',                  color:'#3b82f6', freq:'15 min', tarif:200, stops:['ok1','lb6','p03','p01'] },
  { id:'L8',  name:'Ligne 8',  route:'Yoff ↔ Palais',                    color:'#60a5fa', freq:'15 min', tarif:200, stops:['yf1','bm1','ha2','p03','p01'] },
  { id:'L9',  name:'Ligne 9',  route:'Liberté 6 ↔ Palais',               color:'#2563eb', freq:'10 min', tarif:200, stops:['lb6','sc1','ha2','p05','p03','p01'] },
  { id:'L10', name:'Ligne 10', route:'Liberté 5 ↔ Palais',               color:'#1e40af', freq:'12 min', tarif:200, stops:['lb5','sc1','p05','p03','p01'] },
  { id:'L11', name:'Ligne 11', route:'Keur Massar ↔ Leclerc',            color:'#1e3a8a', freq:'15 min', tarif:250, stops:['km1','km2','gd1','lb5','lc1'] },
  { id:'L12', name:'Ligne 12', route:'Guédiawaye ↔ Palais',              color:'#1a56db', freq:'12 min', tarif:200, stops:['gd1','gd2','pk1','p03','p01'] },
  { id:'L13', name:'Ligne 13', route:'Liberté 5 ↔ Palais (Sicap)',       color:'#3b82f6', freq:'10 min', tarif:200, stops:['lb5','lb6','sc1','p05','p03','p01'] },
  { id:'L15', name:'Ligne 15', route:'Rufisque ↔ Palais',                color:'#1d4ed8', freq:'20 min', tarif:300, stops:['rf1','th1','pk1','ha2','p03','p01'] },
  { id:'L16A',name:'Ligne 16A',route:'Malika ↔ Palais',                  color:'#60a5fa', freq:'25 min', tarif:300, stops:['ml1','gd2','gd1','pk1','p01'] },
  { id:'L20', name:'Ligne 20', route:'Liberté 5 (express)',               color:'#2563eb', freq:'10 min', tarif:200, stops:['lb5','gy1','lc2','lc1','lb5'] },
  { id:'L23', name:'Ligne 23', route:'Parcelles Assainies ↔ Palais',     color:'#1a56db', freq:'12 min', tarif:200, stops:['pa1','pa2','lb5','lb6','p05','p03','p01'] },
  { id:'L45', name:'Ligne 45', route:'Mbao ↔ Palais',                    color:'#1e40af', freq:'20 min', tarif:300, stops:['mb1','pk1','ha2','p03','p01'] },
  { id:'L121',name:'Ligne 121',route:'HLM Grand Yoff ↔ Leclerc',         color:'#3b82f6', freq:'15 min', tarif:200, stops:['lc2','gy1','lb5','lc1'] },
].map(l => ({ ...l, operator:'DDD' }));

// ── Lignes AFTU ───────────────────────────────────────────────
const AFTU = [
  { id:'A1',  name:'AFTU 1',  route:'Lat Dior ↔ HLM Grand Yoff',          color:'#e11d48', freq:'8 min',  tarif:150, stops:['p06','lc2','gy1'] },
  { id:'A2',  name:'AFTU 2',  route:'Parcelles ↔ Petersen',                color:'#f43f5e', freq:'6 min',  tarif:150, stops:['pa1','lb5','lb6','p04','p02'] },
  { id:'A3',  name:'AFTU 3',  route:'Yoff ↔ Petersen',                     color:'#e11d48', freq:'10 min', tarif:150, stops:['yf1','ok1','gy1','lb6','p04','p02'] },
  { id:'A4',  name:'AFTU 4',  route:'Yoff Village ↔ Petersen',             color:'#be123c', freq:'10 min', tarif:150, stops:['yf1','ok1','p04','p02'] },
  { id:'A5',  name:'AFTU 5',  route:'Parcelles ↔ Petersen',                color:'#9f1239', freq:'8 min',  tarif:150, stops:['pa1','cb1','lb5','p02'] },
  { id:'A25', name:'AFTU 25', route:'Parcelles ↔ Petersen (express)',       color:'#f43f5e', freq:'8 min',  tarif:150, stops:['pa1','lb5','p02'] },
  { id:'A26', name:'AFTU 26', route:'Parcelles ↔ Thiaroye',                color:'#be123c', freq:'12 min', tarif:150, stops:['pa1','km2','th1'] },
  { id:'A27', name:'AFTU 27', route:'Guédiawaye ↔ Petersen',               color:'#e11d48', freq:'12 min', tarif:150, stops:['gd1','lb6','p04','p02'] },
  { id:'A29', name:'AFTU 29', route:'Cité Nations ↔ Petersen',             color:'#f43f5e', freq:'10 min', tarif:150, stops:['cb1','pa1','lb5','p04','p02'] },
  { id:'A30', name:'AFTU 30', route:'Gadaye ↔ Colobane',                   color:'#9f1239', freq:'15 min', tarif:150, stops:['gd1','pk1','p04'] },
  { id:'A33', name:'AFTU 33', route:'Colobane ↔ Guédiawaye',               color:'#e11d48', freq:'12 min', tarif:150, stops:['p04','lb6','gy1','gd1'] },
  { id:'A35', name:'AFTU 35', route:'Ngor ↔ Pikine',                       color:'#f43f5e', freq:'20 min', tarif:150, stops:['ng1','ok1','gy1','pk1'] },
  { id:'A42', name:'AFTU 42', route:'Gadaye ↔ Ouakam',                     color:'#be123c', freq:'20 min', tarif:150, stops:['gd1','gy1','ok1'] },
  { id:'A44', name:'AFTU 44', route:'Grand Mbao ↔ Ouakam',                 color:'#e11d48', freq:'25 min', tarif:200, stops:['mb1','pk1','gy1','ok1'] },
  { id:'A50', name:'AFTU 50', route:'Petersen ↔ Malika',                   color:'#9f1239', freq:'25 min', tarif:200, stops:['p02','gd1','ml1'] },
  { id:'A51', name:'AFTU 51', route:'Jaxaay ↔ Baux Maraîchers',            color:'#f43f5e', freq:'20 min', tarif:200, stops:['mb1','bm1'] },
  { id:'A52', name:'AFTU 52', route:'Pikine ↔ Keur Massar',                color:'#e11d48', freq:'15 min', tarif:150, stops:['pk1','km2','km1'] },
  { id:'A55', name:'AFTU 55', route:'Rufisque ↔ Petersen',                 color:'#be123c', freq:'20 min', tarif:250, stops:['rf1','pk1','ha2','p02'] },
  { id:'A57', name:'AFTU 57', route:'Liberté 6 ↔ Rufisque',               color:'#e11d48', freq:'20 min', tarif:250, stops:['lb6','pk1','rf1'] },
  { id:'A61', name:'AFTU 61', route:'Almadies ↔ Keur Massar',             color:'#9f1239', freq:'25 min', tarif:200, stops:['ng1','ok1','gy1','km1'] },
  { id:'A64', name:'AFTU 64', route:'Guédiawaye ↔ Rufisque',              color:'#f43f5e', freq:'20 min', tarif:200, stops:['gd1','pk1','rf1'] },
  { id:'A66', name:'AFTU 66', route:'Yoff ↔ Gorom',                       color:'#be123c', freq:'30 min', tarif:200, stops:['yf1','rf1'] },
  { id:'A68', name:'AFTU 68', route:'Yeumbeul ↔ Sébikotane',              color:'#e11d48', freq:'30 min', tarif:250, stops:['km2','rf1','t04'] },
  { id:'A70', name:'AFTU 70', route:'Daroukhane ↔ Jaxaay',               color:'#9f1239', freq:'25 min', tarif:200, stops:['dk1','gd1','km1'] },
  { id:'A71', name:'AFTU 71', route:'Keur Massar ↔ Claudel',              color:'#f43f5e', freq:'20 min', tarif:150, stops:['km1','gd1','lb5'] },
  { id:'A75', name:'AFTU 75', route:'Malika ↔ Colobane',                  color:'#e11d48', freq:'25 min', tarif:200, stops:['ml1','gd1','pk1','p04'] },
  { id:'A79', name:'AFTU 79', route:'Sangalkam ↔ Camberène',              color:'#be123c', freq:'30 min', tarif:200, stops:['km1','cb1'] },
].map(l => ({ ...l, operator:'AFTU' }));

const BRT = [{
  id:'BRT-L1', operator:'BRT', name:'BRT L1', route:'Petersen ↔ Guédiawaye',
  color:'#7c3aed', freq:'5 min', tarif:300,
  stops:['b01','p02','b02','b03','pk1','gd1'],
}];

const TER = [{
  id:'TER-01', operator:'TER', name:'TER 01', route:'Dakar ↔ AIBD',
  color:'#059669', freq:'30 min', tarif:500,
  stops:['t01','t02','t03','t04','t05'],
}];

export const LINES = [...DDD, ...AFTU, ...BRT, ...TER];

// ── Helpers ───────────────────────────────────────────────────
export const getLineStops = (lineId) => {
  const line = LINES.find(l => l.id === lineId);
  if (!line) return [];
  return line.stops.map(sid => STOPS.find(s => s.id === sid)).filter(Boolean);
};

export const getStopsByOperator = (op) =>
  op === 'all' ? STOPS : STOPS.filter(s => s.operators.includes(op));

export const getLinesByOperator = (op) =>
  op === 'all' ? LINES : LINES.filter(l => l.operator === op);

// Prochains passages simulés
export const getNextDepartures = (stopId) => {
  const now  = new Date();
  const stop = STOPS.find(s => s.id === stopId);
  if (!stop) return [];
  const waits = [3, 8, 14, 22, 35];
  return stop.lines.slice(0, 5).map((lineId, i) => {
    const line = LINES.find(l => l.id === lineId);
    const wait = waits[i % waits.length] + Math.floor(Math.random() * 3);
    const dep  = new Date(now.getTime() + wait * 60000);
    return {
      lineId, lineName: line?.name || lineId,
      operator: line?.operator || 'DDD',
      color: line?.color || '#1a56db',
      route: line?.route || '',
      waitMin: wait,
      time: `${dep.getHours().toString().padStart(2,'0')}:${dep.getMinutes().toString().padStart(2,'0')}`,
    };
  }).sort((a, b) => a.waitMin - b.waitMin);
};

// Tarifs TER
export const TER_TARIFS = [
  { from:'Dakar', to:'Thiaroye',   prix:500  },
  { from:'Dakar', to:'Rufisque',   prix:900  },
  { from:'Dakar', to:'Diamniadio', prix:1500 },
  { from:'Dakar', to:'AIBD',       prix:2000 },
];

export const TER_ABONNEMENTS = [
  { id:'m-dakar-thia',  label:'Mensuel Dakar ↔ Thiaroye',   prix:12000, emoji:'🚆' },
  { id:'m-dakar-ruf',   label:'Mensuel Dakar ↔ Rufisque',   prix:20000, emoji:'🚆' },
  { id:'m-dakar-diam',  label:'Mensuel Dakar ↔ Diamniadio', prix:30000, emoji:'🚆' },
  { id:'m-dakar-aibd',  label:'Pass AIBD mensuel',          prix:38000, emoji:'✈️' },
  { id:'c10-ruf',       label:'Carnet 10 trajets Rufisque', prix:8000,  emoji:'🎟️' },
];
