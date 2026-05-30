// Données de transport réelles pour Dakar
// Sources: DDD (Dakar Dem Dikk) et AFTU (Association de Financement des Transports Urbains)
// + correspondances BRT (Bus Rapid Transit) et TER (Train Express Régional)

// ============================================================
// ARRÊTS DDD (Dakar Dem Dikk) - Lignes urbaines
// ============================================================
export const dddStops = [
  // Terminus et grands nœuds
  { id: 1,  name: "Plateau / Place de l'Indépendance", lat: 14.6729, lng: -17.4467, operator: 'DDD', lines: ['DD1','DD2','DD3','DD5','DD6'] },
  { id: 2,  name: "Marché Sandaga",                   lat: 14.6708, lng: -17.4456, operator: 'DDD', lines: ['DD1','DD2','DD4','DD7'] },
  { id: 3,  name: "Gare Routière Petersen",            lat: 14.6812, lng: -17.4478, operator: 'DDD', lines: ['DD1','DD3','DD5','DD8'] },
  { id: 4,  name: "Colobane Gare",                    lat: 14.6956, lng: -17.4523, operator: 'DDD', lines: ['DD1','DD4','DD6','DD7'] },
  { id: 5,  name: "Médina Marché",                    lat: 14.6856, lng: -17.4589, operator: 'DDD', lines: ['DD1','DD4','DD5'] },
  { id: 6,  name: "UCAD / Fann",                      lat: 14.6923, lng: -17.4623, operator: 'DDD', lines: ['DD2','DD4','DD5'] },
  { id: 7,  name: "HLM Grand-Yoff Marché",            lat: 14.7023, lng: -17.4689, operator: 'DDD', lines: ['DD4','DD5','DD7'] },
  { id: 8,  name: "Grand-Yoff Liberté 6",             lat: 14.7156, lng: -17.4689, operator: 'DDD', lines: ['DD5','DD7','DD8'] },
  { id: 9,  name: "Parcelles Assainies U17",          lat: 14.7389, lng: -17.4556, operator: 'DDD', lines: ['DD7','DD8','DD9'] },
  { id: 10, name: "Golf Sud Marché",                  lat: 14.7450, lng: -17.4434, operator: 'DDD', lines: ['DD8','DD9'] },
  { id: 11, name: "Guédiawaye Marché",                lat: 14.7689, lng: -17.4123, operator: 'DDD', lines: ['DD8','DD9','DD10'] },
  { id: 12, name: "Sam-Notaire",                      lat: 14.7756, lng: -17.3956, operator: 'DDD', lines: ['DD9','DD10'] },
  { id: 13, name: "Pikine Marché Central",            lat: 14.7556, lng: -17.3889, operator: 'DDD', lines: ['DD9','DD10'] },
  { id: 14, name: "Thiaroye Gare",                    lat: 14.7723, lng: -17.3556, operator: 'DDD', lines: ['DD10'] },
  { id: 15, name: "Ouakam Village",                   lat: 14.7089, lng: -17.4889, operator: 'DDD', lines: ['DD6','DD7'] },
  { id: 16, name: "Ngor Village",                     lat: 14.7456, lng: -17.5123, operator: 'DDD', lines: ['DD6'] },
  { id: 17, name: "Yoff Marché",                      lat: 14.7356, lng: -17.4889, operator: 'DDD', lines: ['DD6','DD7'] },
  { id: 18, name: "Aéroport Léopold Sédar Senghor",  lat: 14.7397, lng: -17.4902, operator: 'DDD', lines: ['DD6'] },
  { id: 19, name: "Sicap Liberté",                    lat: 14.7056, lng: -17.4523, operator: 'DDD', lines: ['DD4','DD5'] },
  { id: 20, name: "Liberté 5",                        lat: 14.7089, lng: -17.4456, operator: 'DDD', lines: ['DD3','DD4'] },
  { id: 21, name: "Fann Résidence",                   lat: 14.6989, lng: -17.4556, operator: 'DDD', lines: ['DD2','DD3'] },
  { id: 22, name: "Tilène Marché",                    lat: 14.6889, lng: -17.4556, operator: 'DDD', lines: ['DD2','DD3','DD4'] },
  { id: 23, name: "Point E",                          lat: 14.7089, lng: -17.4389, operator: 'DDD', lines: ['DD3','DD4'] },
  { id: 24, name: "Dieuppeul",                        lat: 14.7000, lng: -17.4612, operator: 'DDD', lines: ['DD4','DD5'] },
  { id: 25, name: "Sacré-Cœur",                       lat: 14.7178, lng: -17.4567, operator: 'DDD', lines: ['DD5','DD7'] },
  { id: 26, name: "Cambérène",                        lat: 14.7278, lng: -17.4678, operator: 'DDD', lines: ['DD7','DD8'] },
  { id: 27, name: "Rufisque Centre",                  lat: 14.7167, lng: -17.2733, operator: 'DDD', lines: ['DD10'] },
  { id: 28, name: "Dakar Port",                       lat: 14.6678, lng: -17.4300, operator: 'DDD', lines: ['DD1','DD2'] },
  { id: 29, name: "Corniche Ouest (Soumbédioune)",    lat: 14.6878, lng: -17.4756, operator: 'DDD', lines: ['DD2','DD6'] },
  { id: 30, name: "Zone de Captage",                  lat: 14.7200, lng: -17.4323, operator: 'DDD', lines: ['DD8','DD9'] },
];

// ============================================================
// LIGNES DDD (10 lignes principales)
// ============================================================
export const dddLines = [
  {
    id: 'DD1',
    name: 'DD1 — Plateau ↔ Colobane',
    shortName: 'DD1',
    color: '#E74C3C',
    operator: 'DDD',
    stops: [1, 28, 2, 3, 5, 4],
    description: 'Plateau → Port → Sandaga → Petersen → Médina → Colobane'
  },
  {
    id: 'DD2',
    name: 'DD2 — Plateau ↔ Fann',
    shortName: 'DD2',
    color: '#3498DB',
    operator: 'DDD',
    stops: [1, 28, 2, 22, 21, 6],
    description: 'Plateau → Port → Sandaga → Tilène → Fann Résidence → UCAD'
  },
  {
    id: 'DD3',
    name: 'DD3 — Plateau ↔ Liberté',
    shortName: 'DD3',
    color: '#2ECC71',
    operator: 'DDD',
    stops: [1, 3, 5, 22, 21, 23, 20],
    description: 'Plateau → Petersen → Médina → Tilène → Fann → Point E → Liberté 5'
  },
  {
    id: 'DD4',
    name: 'DD4 — Colobane ↔ Grand-Yoff',
    shortName: 'DD4',
    color: '#9B59B6',
    operator: 'DDD',
    stops: [4, 5, 22, 6, 24, 19, 20, 23, 7],
    description: 'Colobane → Médina → Tilène → UCAD → Dieuppeul → Sicap → HLM'
  },
  {
    id: 'DD5',
    name: 'DD5 — Plateau ↔ Grand-Yoff',
    shortName: 'DD5',
    color: '#F39C12',
    operator: 'DDD',
    stops: [1, 3, 5, 6, 24, 19, 25, 8],
    description: 'Plateau → Petersen → Médina → UCAD → Dieuppeul → Sicap → Grand-Yoff'
  },
  {
    id: 'DD6',
    name: 'DD6 — Plateau ↔ Yoff / Ngor',
    shortName: 'DD6',
    color: '#1ABC9C',
    operator: 'DDD',
    stops: [1, 29, 15, 17, 18, 16],
    description: 'Plateau → Corniche Ouest → Ouakam → Yoff → Aéroport → Ngor'
  },
  {
    id: 'DD7',
    name: 'DD7 — Colobane ↔ Parcelles',
    shortName: 'DD7',
    color: '#E67E22',
    operator: 'DDD',
    stops: [4, 7, 25, 26, 8, 15, 17, 9],
    description: 'Colobane → HLM → Sacré-Cœur → Cambérène → Grand-Yoff → Ouakam → Yoff → Parcelles'
  },
  {
    id: 'DD8',
    name: 'DD8 — Grand-Yoff ↔ Guédiawaye',
    shortName: 'DD8',
    color: '#C0392B',
    operator: 'DDD',
    stops: [8, 26, 9, 30, 10, 11],
    description: 'Grand-Yoff → Cambérène → Parcelles → Zone Captage → Golf Sud → Guédiawaye'
  },
  {
    id: 'DD9',
    name: 'DD9 — Parcelles ↔ Pikine',
    shortName: 'DD9',
    color: '#2980B9',
    operator: 'DDD',
    stops: [9, 30, 10, 11, 12, 13],
    description: 'Parcelles → Zone Captage → Golf Sud → Guédiawaye → Sam-Notaire → Pikine'
  },
  {
    id: 'DD10',
    name: 'DD10 — Pikine ↔ Rufisque',
    shortName: 'DD10',
    color: '#8E44AD',
    operator: 'DDD',
    stops: [13, 12, 14, 27],
    description: 'Pikine → Sam-Notaire → Thiaroye → Rufisque'
  },
];

// ============================================================
// ARRÊTS AFTU (Cars rapides / Ndiaga Ndiaye réorganisés)
// ============================================================
export const aftuStops = [
  // Réseau AFTU dans les banlieues et zones périurbaines
  { id: 101, name: "Gare Routière Colobane (AFTU)",  lat: 14.6967, lng: -17.4534, operator: 'AFTU', lines: ['AF1','AF2','AF3'] },
  { id: 102, name: "Marché HLM AFTU",                lat: 14.7034, lng: -17.4678, operator: 'AFTU', lines: ['AF1','AF4'] },
  { id: 103, name: "Parcelles AFTU Nord",             lat: 14.7400, lng: -17.4500, operator: 'AFTU', lines: ['AF1','AF2','AF5'] },
  { id: 104, name: "Guédiawaye Terminus",             lat: 14.7700, lng: -17.4089, operator: 'AFTU', lines: ['AF2','AF3','AF6'] },
  { id: 105, name: "Pikine Est Marché",               lat: 14.7567, lng: -17.3789, operator: 'AFTU', lines: ['AF3','AF6','AF7'] },
  { id: 106, name: "Thiaroye sur Mer",                lat: 14.7600, lng: -17.3445, operator: 'AFTU', lines: ['AF7','AF8'] },
  { id: 107, name: "Rufisque Gare Routière",          lat: 14.7156, lng: -17.2700, operator: 'AFTU', lines: ['AF8','AF9'] },
  { id: 108, name: "Keur Massar",                     lat: 14.7900, lng: -17.3234, operator: 'AFTU', lines: ['AF6','AF9'] },
  { id: 109, name: "Malika",                          lat: 14.8050, lng: -17.3100, operator: 'AFTU', lines: ['AF9'] },
  { id: 110, name: "Bambilor",                        lat: 14.8323, lng: -17.2845, operator: 'AFTU', lines: ['AF9'] },
  { id: 111, name: "Yeumbeul Nord",                   lat: 14.7956, lng: -17.3445, operator: 'AFTU', lines: ['AF6','AF7','AF9'] },
  { id: 112, name: "Diamaguene Sicap-Mbao",           lat: 14.7367, lng: -17.3345, operator: 'AFTU', lines: ['AF7','AF8'] },
  { id: 113, name: "Grand-Médine AFTU",               lat: 14.6934, lng: -17.4512, operator: 'AFTU', lines: ['AF1','AF2','AF4'] },
  { id: 114, name: "Ouakam AFTU",                     lat: 14.7100, lng: -17.4867, operator: 'AFTU', lines: ['AF4','AF5'] },
  { id: 115, name: "Yoff AFTU",                       lat: 14.7378, lng: -17.4856, operator: 'AFTU', lines: ['AF5'] },
  { id: 116, name: "Aéroport AIBD",                   lat: 14.7397, lng: -17.4902, operator: 'AFTU', lines: ['AF5'] },
  { id: 117, name: "Dalifort",                        lat: 14.7189, lng: -17.3934, operator: 'AFTU', lines: ['AF7','AF8'] },
  { id: 118, name: "Mbao Gare",                       lat: 14.7289, lng: -17.3589, operator: 'AFTU', lines: ['AF7','AF8'] },
];

// ============================================================
// LIGNES AFTU (9 lignes)
// ============================================================
export const aftuLines = [
  {
    id: 'AF1',
    name: 'AF1 — Colobane ↔ Parcelles',
    shortName: 'AF1',
    color: '#27AE60',
    operator: 'AFTU',
    stops: [101, 113, 102, 103],
    description: 'Colobane → Grand-Médine → HLM → Parcelles Assainies'
  },
  {
    id: 'AF2',
    name: 'AF2 — Colobane ↔ Guédiawaye',
    shortName: 'AF2',
    color: '#16A085',
    operator: 'AFTU',
    stops: [101, 113, 103, 104],
    description: 'Colobane → Grand-Médine → Parcelles → Guédiawaye'
  },
  {
    id: 'AF3',
    name: 'AF3 — Colobane ↔ Pikine',
    shortName: 'AF3',
    color: '#D35400',
    operator: 'AFTU',
    stops: [101, 113, 104, 105],
    description: 'Colobane → Grand-Médine → Guédiawaye → Pikine Est'
  },
  {
    id: 'AF4',
    name: 'AF4 — Colobane ↔ Ouakam',
    shortName: 'AF4',
    color: '#7D3C98',
    operator: 'AFTU',
    stops: [101, 113, 102, 114],
    description: 'Colobane → Grand-Médine → HLM → Ouakam'
  },
  {
    id: 'AF5',
    name: 'AF5 — Parcelles ↔ Yoff/Aéroport',
    shortName: 'AF5',
    color: '#117A65',
    operator: 'AFTU',
    stops: [103, 114, 115, 116],
    description: 'Parcelles → Ouakam → Yoff → Aéroport AIBD'
  },
  {
    id: 'AF6',
    name: 'AF6 — Guédiawaye ↔ Keur Massar',
    shortName: 'AF6',
    color: '#1A5276',
    operator: 'AFTU',
    stops: [104, 105, 111, 108],
    description: 'Guédiawaye → Pikine Est → Yeumbeul → Keur Massar'
  },
  {
    id: 'AF7',
    name: 'AF7 — Pikine ↔ Thiaroye',
    shortName: 'AF7',
    color: '#7B241C',
    operator: 'AFTU',
    stops: [105, 111, 117, 118, 112, 106],
    description: 'Pikine Est → Yeumbeul → Dalifort → Mbao → Diamaguene → Thiaroye'
  },
  {
    id: 'AF8',
    name: 'AF8 — Thiaroye ↔ Rufisque',
    shortName: 'AF8',
    color: '#6E2F1A',
    operator: 'AFTU',
    stops: [106, 112, 118, 117, 107],
    description: 'Thiaroye sur Mer → Diamaguene → Mbao → Dalifort → Rufisque'
  },
  {
    id: 'AF9',
    name: 'AF9 — Keur Massar ↔ Bambilor',
    shortName: 'AF9',
    color: '#154360',
    operator: 'AFTU',
    stops: [108, 111, 109, 110],
    description: 'Keur Massar → Yeumbeul → Malika → Bambilor'
  },
];

// ============================================================
// STATIONS BRT (Bus Rapid Transit Dakar)
// Ligne BRT: Petersen ↔ Guédiawaye (14 stations)
// ============================================================
export const brtStops = [
  { id: 201, name: "BRT Petersen",             lat: 14.6812, lng: -17.4478, operator: 'BRT', lines: ['BRT1'], isBRT: true },
  { id: 202, name: "BRT Médina Gare",          lat: 14.6867, lng: -17.4534, operator: 'BRT', lines: ['BRT1'], isBRT: true },
  { id: 203, name: "BRT Colobane",             lat: 14.6956, lng: -17.4523, operator: 'BRT', lines: ['BRT1'], isBRT: true },
  { id: 204, name: "BRT HLM",                  lat: 14.7023, lng: -17.4689, operator: 'BRT', lines: ['BRT1'], isBRT: true },
  { id: 205, name: "BRT Grand-Yoff",           lat: 14.7156, lng: -17.4689, operator: 'BRT', lines: ['BRT1'], isBRT: true },
  { id: 206, name: "BRT Liberté 6",            lat: 14.7189, lng: -17.4534, operator: 'BRT', lines: ['BRT1'], isBRT: true },
  { id: 207, name: "BRT Liberté 5",            lat: 14.7056, lng: -17.4456, operator: 'BRT', lines: ['BRT1'], isBRT: true },
  { id: 208, name: "BRT Parcelles Assainies",  lat: 14.7378, lng: -17.4534, operator: 'BRT', lines: ['BRT1'], isBRT: true },
  { id: 209, name: "BRT Cambérène",            lat: 14.7278, lng: -17.4678, operator: 'BRT', lines: ['BRT1'], isBRT: true },
  { id: 210, name: "BRT Golf Sud",             lat: 14.7456, lng: -17.4434, operator: 'BRT', lines: ['BRT1'], isBRT: true },
  { id: 211, name: "BRT Guédiawaye Centre",    lat: 14.7689, lng: -17.4123, operator: 'BRT', lines: ['BRT1'], isBRT: true },
];

export const brtLines = [
  {
    id: 'BRT1',
    name: 'BRT — Petersen ↔ Guédiawaye',
    shortName: 'BRT',
    color: '#E91E63',
    operator: 'BRT',
    stops: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211],
    description: 'Bus Rapid Transit en site propre: Petersen → Médina → Colobane → HLM → Grand-Yoff → Parcelles → Guédiawaye'
  }
];

// ============================================================
// STATIONS TER (Train Express Régional)
// Ligne TER: Dakar ↔ AIBD (35 km, 14 gares)
// ============================================================
export const terStops = [
  { id: 301, name: "TER Dakar Gare (Plateau)",    lat: 14.6766, lng: -17.4413, operator: 'TER', lines: ['TER1'], isTER: true },
  { id: 302, name: "TER Hann",                    lat: 14.7067, lng: -17.4078, operator: 'TER', lines: ['TER1'], isTER: true },
  { id: 303, name: "TER Thiaroye",                lat: 14.7478, lng: -17.3556, operator: 'TER', lines: ['TER1'], isTER: true },
  { id: 304, name: "TER Mbao",                    lat: 14.7411, lng: -17.3456, operator: 'TER', lines: ['TER1'], isTER: true },
  { id: 305, name: "TER Rufisque",                lat: 14.7167, lng: -17.2733, operator: 'TER', lines: ['TER1'], isTER: true },
  { id: 306, name: "TER Bargny",                  lat: 14.6989, lng: -17.2311, operator: 'TER', lines: ['TER1'], isTER: true },
  { id: 307, name: "TER Sendou",                  lat: 14.6878, lng: -17.1878, operator: 'TER', lines: ['TER1'], isTER: true },
  { id: 308, name: "TER Diamniadio",              lat: 14.7256, lng: -17.1689, operator: 'TER', lines: ['TER1'], isTER: true },
  { id: 309, name: "TER AIBD (Aéroport International)",  lat: 14.7397, lng: -17.0589, operator: 'TER', lines: ['TER1'], isTER: true },
];

export const terLines = [
  {
    id: 'TER1',
    name: 'TER — Dakar ↔ AIBD',
    shortName: 'TER',
    color: '#00BCD4',
    operator: 'TER',
    stops: [301, 302, 303, 304, 305, 306, 307, 308, 309],
    description: 'Train Express Régional: Dakar Plateau → Hann → Thiaroye → Mbao → Rufisque → Bargny → Diamniadio → Aéroport AIBD'
  }
];

// ============================================================
// EXPORTS COMBINÉS
// ============================================================
export const allStops = [...dddStops, ...aftuStops, ...brtStops, ...terStops];
export const allLines = [...dddLines, ...aftuLines, ...brtLines, ...terLines];

// Nœuds de correspondance (arrêts où plusieurs modes se croisent)
export const transferNodes = {
  'Petersen-BRT': { ddd: [3], brt: [201], name: 'Correspondance Petersen (DD ↔ BRT)' },
  'Colobane-BRT': { ddd: [4], aftu: [101], brt: [203], name: 'Correspondance Colobane (DD ↔ AFTU ↔ BRT)' },
  'HLM-BRT':      { ddd: [7], brt: [204], name: 'Correspondance HLM (DD ↔ BRT)' },
  'Grand-Yoff-BRT': { ddd: [8], brt: [205], name: 'Correspondance Grand-Yoff (DD ↔ BRT)' },
  'Parcelles-BRT': { ddd: [9], brt: [208], name: 'Correspondance Parcelles (DD ↔ BRT)' },
  'Guediawaye-BRT': { ddd: [11], aftu: [104], brt: [211], name: 'Correspondance Guédiawaye (DD ↔ AFTU ↔ BRT)' },
  'Thiaroye-TER': { ddd: [14], aftu: [106], ter: [303], name: 'Correspondance Thiaroye (DD ↔ AFTU ↔ TER)' },
  'Rufisque-TER': { ddd: [27], aftu: [107], ter: [305], name: 'Correspondance Rufisque (DD ↔ AFTU ↔ TER)' },
};

export default {
  dddStops,
  dddLines,
  aftuStops,
  aftuLines,
  brtStops,
  brtLines,
  terStops,
  terLines,
  allStops,
  allLines,
  transferNodes,
};
