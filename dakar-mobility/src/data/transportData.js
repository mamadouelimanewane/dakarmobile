// Données de transport pour Dakar (DDD Bus et AFTU Car)

export const busStops = [
  { id: 1, name: "Place de l'Indépendance", lat: 14.6729, lng: -17.4467, lines: ['1', '2', '3', '5'] },
  { id: 2, name: "Marché Sandaga", lat: 14.6708, lng: -17.4456, lines: ['1', '2', '4'] },
  { id: 3, name: "Gare Routière Pompiers", lat: 14.6892, lng: -17.4516, lines: ['1', '3', '5', '7'] },
  { id: 4, name: "Plateau", lat: 14.6745, lng: -17.4389, lines: ['2', '3', '4'] },
  { id: 5, name: "Médina", lat: 14.6856, lng: -17.4589, lines: ['1', '4', '5'] },
  { id: 6, name: "Grand Yoff", lat: 14.7156, lng: -17.4689, lines: ['5', '7', '8'] },
  { id: 7, name: "Parcelles Assainies", lat: 14.7389, lng: -17.4556, lines: ['7', '8', '9'] },
  { id: 8, name: "Guédiawaye", lat: 14.7689, lng: -17.4123, lines: ['8', '9'] },
  { id: 9, name: "Pikine", lat: 14.7556, lng: -17.3889, lines: ['9', '10'] },
  { id: 10, name: "Thiaroye", lat: 14.7823, lng: -17.3556, lines: ['10'] },
  { id: 11, name: "Ouakam", lat: 14.7089, lng: -17.4889, lines: ['6', '7'] },
  { id: 12, name: "Ngor", lat: 14.7456, lng: -17.5123, lines: ['6'] },
  { id: 13, name: "Yoff", lat: 14.7356, lng: -17.4889, lines: ['6', '7'] },
  { id: 14, name: "Liberté 6", lat: 14.7123, lng: -17.4456, lines: ['5', '8'] },
  { id: 15, name: "Sicap Liberté", lat: 14.7056, lng: -17.4523, lines: ['4', '5'] },
  { id: 16, name: "Point E", lat: 14.7089, lng: -17.4389, lines: ['3', '4'] },
  { id: 17, name: "Fann Résidence", lat: 14.6989, lng: -17.4556, lines: ['2', '3'] },
  { id: 18, name: "Université Cheikh Anta Diop", lat: 14.6923, lng: -17.4623, lines: ['2', '4', '5'] },
  { id: 19, name: "HLM", lat: 14.7023, lng: -17.4689, lines: ['4', '5', '7'] },
  { id: 20, name: "Colobane", lat: 14.6956, lng: -17.4523, lines: ['1', '4'] }
];

export const busLines = [
  { id: '1', name: 'Ligne 1', color: '#FF5733', stops: [1, 2, 3, 5, 20], operator: 'DDD' },
  { id: '2', name: 'Ligne 2', color: '#33FF57', stops: [1, 2, 4, 17, 18], operator: 'DDD' },
  { id: '3', name: 'Ligne 3', color: '#3357FF', stops: [1, 3, 4, 16, 17], operator: 'DDD' },
  { id: '4', name: 'Ligne 4', color: '#FF33F5', stops: [2, 4, 5, 15, 16, 18, 19, 20], operator: 'DDD' },
  { id: '5', name: 'Ligne 5', color: '#FFD700', stops: [1, 3, 5, 6, 14, 15, 18, 19], operator: 'DDD' },
  { id: '6', name: 'Ligne 6', color: '#00CED1', stops: [11, 12, 13], operator: 'AFTU' },
  { id: '7', name: 'Ligne 7', color: '#FF8C00', stops: [3, 6, 11, 13, 19], operator: 'AFTU' },
  { id: '8', name: 'Ligne 8', color: '#8B4513', stops: [6, 7, 8, 14], operator: 'AFTU' },
  { id: '9', name: 'Ligne 9', color: '#4B0082', stops: [7, 8, 9], operator: 'AFTU' },
  { id: '10', name: 'Ligne 10', color: '#DC143C', stops: [9, 10], operator: 'AFTU' }
];

export const carAftuStops = [
  { id: 101, name: "Gare AFTU Colobane", lat: 14.6967, lng: -17.4534, lines: ['C1', 'C2', 'C3'] },
  { id: 102, name: "AFTU Parcelles", lat: 14.7378, lng: -17.4567, lines: ['C1', 'C2'] },
  { id: 103, name: "AFTU Guédiawaye", lat: 14.7678, lng: -17.4134, lines: ['C2', 'C3'] },
  { id: 104, name: "AFTU Pikine", lat: 14.7567, lng: -17.3900, lines: ['C3', 'C4'] },
  { id: 105, name: "AFTU Thiaroye", lat: 14.7834, lng: -17.3567, lines: ['C4'] },
  { id: 106, name: "AFTU Grand Yoff", lat: 14.7167, lng: -17.4700, lines: ['C1', 'C5'] },
  { id: 107, name: "AFTU Ouakam", lat: 14.7100, lng: -17.4900, lines: ['C5'] },
  { id: 108, name: "AFTU Yoff", lat: 14.7367, lng: -17.4900, lines: ['C5'] }
];

export const carAftuLines = [
  { id: 'C1', name: 'Car C1', color: '#2E8B57', stops: [101, 102, 106], operator: 'AFTU' },
  { id: 'C2', name: 'Car C2', color: '#4682B4', stops: [101, 102, 103], operator: 'AFTU' },
  { id: 'C3', name: 'Car C3', color: '#DAA520', stops: [101, 103, 104], operator: 'AFTU' },
  { id: 'C4', name: 'Car C4', color: '#CD5C5C', stops: [104, 105], operator: 'AFTU' },
  { id: 'C5', name: 'Car C5', color: '#9370DB', stops: [106, 107, 108], operator: 'AFTU' }
];

export const allStops = [...busStops, ...carAftuStops];
export const allLines = [...busLines, ...carAftuLines];

export default {
  busStops,
  busLines,
  carAftuStops,
  carAftuLines,
  allStops,
  allLines
};
