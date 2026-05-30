// Données de transport enrichies pour Dakar et sa banlieue (DDD Bus, AFTU Car Rapide)

// ============================================================
// ARRÊTS BUS DDD (Transport urbain de Dakar)
// ============================================================
export const busStops = [
  // Plateau / Centre-ville
  { id: 1,  name: "Place de l'Indépendance",      lat: 14.6729, lng: -17.4467, lines: ['1','2','3','5'] },
  { id: 2,  name: "Marché Sandaga",                lat: 14.6708, lng: -17.4456, lines: ['1','2','4'] },
  { id: 3,  name: "Gare Routière Pompiers",        lat: 14.6892, lng: -17.4516, lines: ['1','3','5','7'] },
  { id: 4,  name: "Plateau",                       lat: 14.6745, lng: -17.4389, lines: ['2','3','4'] },
  { id: 5,  name: "Médina",                        lat: 14.6856, lng: -17.4589, lines: ['1','4','5'] },
  { id: 6,  name: "Grand Yoff",                    lat: 14.7156, lng: -17.4689, lines: ['5','7','8'] },
  { id: 7,  name: "Parcelles Assainies",           lat: 14.7389, lng: -17.4556, lines: ['7','8','9'] },
  { id: 8,  name: "Guédiawaye",                   lat: 14.7689, lng: -17.4123, lines: ['8','9'] },
  { id: 9,  name: "Pikine",                        lat: 14.7556, lng: -17.3889, lines: ['9','10'] },
  { id: 10, name: "Thiaroye",                      lat: 14.7823, lng: -17.3556, lines: ['10'] },
  { id: 11, name: "Ouakam",                        lat: 14.7089, lng: -17.4889, lines: ['6','7'] },
  { id: 12, name: "Ngor",                          lat: 14.7456, lng: -17.5123, lines: ['6'] },
  { id: 13, name: "Yoff",                          lat: 14.7356, lng: -17.4889, lines: ['6','7'] },
  { id: 14, name: "Liberté 6",                     lat: 14.7123, lng: -17.4456, lines: ['5','8'] },
  { id: 15, name: "Sicap Liberté",                 lat: 14.7056, lng: -17.4523, lines: ['4','5'] },
  { id: 16, name: "Point E",                       lat: 14.7089, lng: -17.4389, lines: ['3','4'] },
  { id: 17, name: "Fann Résidence",               lat: 14.6989, lng: -17.4556, lines: ['2','3'] },
  { id: 18, name: "Université Cheikh Anta Diop",  lat: 14.6923, lng: -17.4623, lines: ['2','4','5'] },
  { id: 19, name: "HLM",                           lat: 14.7023, lng: -17.4689, lines: ['4','5','7'] },
  { id: 20, name: "Colobane",                      lat: 14.6956, lng: -17.4523, lines: ['1','4'] },
  // Dakar périphérie
  { id: 21, name: "Almadies",                      lat: 14.7350, lng: -17.5120, lines: ['6','A1'] },
  { id: 22, name: "Mermoz",                        lat: 14.7189, lng: -17.4767, lines: ['5','8','A2'] },
  { id: 23, name: "Fass",                          lat: 14.6878, lng: -17.4534, lines: ['1','3'] },
  { id: 24, name: "Gibraltar",                     lat: 14.6812, lng: -17.4423, lines: ['2','3'] },
  { id: 25, name: "Gueule Tapée",                  lat: 14.6934, lng: -17.4578, lines: ['1','5'] },
  { id: 26, name: "Patte d'Oie",                   lat: 14.7234, lng: -17.4623, lines: ['7','8','A2'] },
  { id: 27, name: "Golf Sud",                      lat: 14.7178, lng: -17.4156, lines: ['8','A3'] },
  { id: 28, name: "Sam Notaire",                   lat: 14.7412, lng: -17.4423, lines: ['7','9'] },
  { id: 29, name: "Cambérène",                    lat: 14.7523, lng: -17.4234, lines: ['9','A3'] },
  { id: 30, name: "Aéroport Léopold Sédar Senghor", lat: 14.7397, lng: -17.4902, lines: ['6','A1'] },
];

// ============================================================
// ARRÊTS AFTU / CAR RAPIDE (Transport interurbain)
// ============================================================
export const carAftuStops = [
  // Banlieue proche
  { id: 101, name: "Gare AFTU Colobane",         lat: 14.6967, lng: -17.4534, lines: ['C1','C2','C3'] },
  { id: 102, name: "AFTU Parcelles",              lat: 14.7378, lng: -17.4567, lines: ['C1','C2'] },
  { id: 103, name: "AFTU Guédiawaye",            lat: 14.7678, lng: -17.4134, lines: ['C2','C3'] },
  { id: 104, name: "AFTU Pikine",                 lat: 14.7567, lng: -17.3900, lines: ['C3','C4'] },
  { id: 105, name: "AFTU Thiaroye",               lat: 14.7834, lng: -17.3567, lines: ['C4'] },
  { id: 106, name: "AFTU Grand Yoff",             lat: 14.7167, lng: -17.4700, lines: ['C1','C5'] },
  { id: 107, name: "AFTU Ouakam",                 lat: 14.7100, lng: -17.4900, lines: ['C5'] },
  { id: 108, name: "AFTU Yoff",                   lat: 14.7367, lng: -17.4900, lines: ['C5'] },
  // Banlieue éloignée
  { id: 109, name: "Rufisque",                    lat: 14.7167, lng: -17.2722, lines: ['C6','C7'] },
  { id: 110, name: "Keur Massar",                 lat: 14.7700, lng: -17.3100, lines: ['C6'] },
  { id: 111, name: "Mbao",                         lat: 14.7512, lng: -17.3234, lines: ['C6','C7'] },
  { id: 112, name: "Bargny",                       lat: 14.7000, lng: -17.2278, lines: ['C7'] },
  { id: 113, name: "Sébikotane",                  lat: 14.7333, lng: -17.1500, lines: ['C8'] },
  { id: 114, name: "Diamniadio",                   lat: 14.7167, lng: -17.1500, lines: ['C8'] },
  { id: 115, name: "Lac Rose (Retba)",             lat: 14.8400, lng: -17.2300, lines: ['C9'] },
  { id: 116, name: "Tivaouane Peul",              lat: 14.8100, lng: -17.3500, lines: ['C9'] },
  // Points notables (arrêts demandés fréquemment)
  { id: 117, name: "Marché Sandaga Banlieue",     lat: 14.7789, lng: -17.3812, lines: ['C4'] },
  { id: 118, name: "Hôpital Principal",            lat: 14.6822, lng: -17.4489, lines: ['1','2'] },
  { id: 119, name: "Centre Hospitalier Le Dantec", lat: 14.6867, lng: -17.4600, lines: ['3','5'] },
  { id: 120, name: "UCAD Campus",                  lat: 14.6934, lng: -17.4656, lines: ['4','5'] },
];

// ============================================================
// LIGNES DE BUS DDD
// ============================================================
export const busLines = [
  { id: '1',  name: 'Ligne 1 (Pompiers ↔ Médina)',   color: '#FF5733', stops: [2,1,23,3,20,25,5],     operator: 'DDD' },
  { id: '2',  name: 'Ligne 2 (Plateau ↔ UCAD)',       color: '#33FF57', stops: [2,1,4,24,17,18],       operator: 'DDD' },
  { id: '3',  name: 'Ligne 3 (Place Indé ↔ Point E)', color: '#3357FF', stops: [1,4,24,3,23,17,16],    operator: 'DDD' },
  { id: '4',  name: 'Ligne 4 (Sandaga ↔ HLM)',        color: '#FF33F5', stops: [4,2,5,18,20,15,16,19], operator: 'DDD' },
  { id: '5',  name: 'Ligne 5 (Plateau ↔ Grand Yoff)', color: '#FFD700', stops: [1,3,25,18,5,19,6,15,14], operator: 'DDD' },
  { id: '6',  name: 'Ligne 6 (Ouakam ↔ Almadies)',    color: '#00CED1', stops: [11,13,30,21,12],        operator: 'DDD' },
  { id: '7',  name: 'Ligne 7 (Parcelles ↔ GY)',       color: '#FF8C00', stops: [3,19,6,26,28,13,11],    operator: 'DDD' },
  { id: '8',  name: 'Ligne 8 (GY ↔ Guédiawaye)',     color: '#8B4513', stops: [22,6,26,7,14,27,8],     operator: 'DDD' },
  { id: '9',  name: 'Ligne 9 (Parcelles ↔ Pikine)',   color: '#4B0082', stops: [7,28,29,8,9],           operator: 'DDD' },
  { id: '10', name: 'Ligne 10 (Pikine ↔ Thiaroye)',   color: '#DC143C', stops: [9,10],                  operator: 'DDD' },
];

// ============================================================
// LIGNES AFTU
// ============================================================
export const carAftuLines = [
  { id: 'C1', name: 'Car C1 (Dakar ↔ Parcelles)',    color: '#2E8B57', stops: [101,106,102],        operator: 'AFTU' },
  { id: 'C2', name: 'Car C2 (Dakar ↔ Guédiawaye)', color: '#4682B4', stops: [101,102,103],         operator: 'AFTU' },
  { id: 'C3', name: 'Car C3 (Dakar ↔ Pikine)',       color: '#DAA520', stops: [101,103,104],         operator: 'AFTU' },
  { id: 'C4', name: 'Car C4 (Pikine ↔ Thiaroye)',    color: '#CD5C5C', stops: [104,117,105],         operator: 'AFTU' },
  { id: 'C5', name: 'Car C5 (GY ↔ Yoff ↔ Ouakam)', color: '#9370DB', stops: [106,107,108],          operator: 'AFTU' },
  { id: 'C6', name: 'Car C6 (Dakar ↔ Keur Massar)', color: '#008080', stops: [101,104,111,110,109], operator: 'AFTU' },
  { id: 'C7', name: 'Car C7 (Dakar ↔ Rufisque)',     color: '#E07B39', stops: [101,104,111,109,112], operator: 'AFTU' },
  { id: 'C8', name: 'Car C8 (Dakar ↔ Diamniadio)',   color: '#5F4B8B', stops: [101,109,114,113],     operator: 'AFTU' },
  { id: 'C9', name: 'Car C9 (Banlieue ↔ Lac Rose)', color: '#B5651D', stops: [103,116,115],          operator: 'AFTU' },
];

export const allStops = [...busStops, ...carAftuStops];
export const allLines = [...busLines, ...carAftuLines];

export default { busStops, busLines, carAftuStops, carAftuLines, allStops, allLines };
