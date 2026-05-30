# Dakar Mobility - Application de Transport en Commun

Une application web de mobilité inspirée de Citymapper, spécialement conçue pour Dakar, Sénégal.

## 🚌 Modes de Transport Pris en Charge

- **DDD Bus** (Dakar Dem Dikk) - Transport urbain de Dakar
- **AFTU Car** - Transport interurbain et régional

## ✨ Fonctionnalités

- 🔍 Recherche d'arrêts de bus et de stations
- 🗺️ Carte interactive avec Leaflet
- 📍 Planification d'itinéraires point à point
- 🚌 Visualisation des lignes de transport
- ⏱️ Estimation du temps de trajet
- 🔄 Détection des correspondances
- 📱 Interface responsive (mobile et desktop)

## 🛠️ Technologies Utilisées

- **Frontend**: React 19
- **Build Tool**: Vite
- **Cartographie**: Leaflet + React-Leaflet
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: CSS3 moderne

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

```bash
cd dakar-mobility
npm install
```

### Démarrage en mode développement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

### Build de production

```bash
npm run build
```

### Preview de la build

```bash
npm run preview
```

## 📁 Structure du Projet

```
dakar-mobility/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx      # Barre de recherche d'arrêts
│   │   ├── MapComponent.jsx   # Carte interactive
│   │   └── RoutePanel.jsx     # Panneau d'itinéraire
│   ├── data/
│   │   └── transportData.js   # Données des lignes et arrêts
│   ├── store/
│   │   └── store.js           # Configuration Redux
│   ├── App.jsx                # Composant principal
│   ├── App.css                # Styles globaux
│   └── main.jsx               # Point d'entrée
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🗺️ Couverture Géographique

L'application couvre les zones suivantes de Dakar:
- Plateau
- Médina
- Grand Yoff
- Parcelles Assainies
- Guédiawaye
- Pikine
- Thiaroye
- Ouakam
- Ngor
- Yoff
- HLM
- Sicap Liberté
- Point E
- Fann Résidence
- Colobane

## 🎯 Fonctionnalités Clones de Citymapper

1. **Recherche Intelligente**: Recherche d'arrêts par nom
2. **Planification Multi-modale**: Combinaison DDD Bus et AFTU Car
3. **Carte Interactive**: Zoom, pan, markers personnalisés
4. **Instructions Détaillées**: Steps-by-step directions
5. **Temps Estimé**: Calcul de durée de trajet
6. **Interface Moderne**: Design épuré et intuitif

## 🔄 Prochaines Améliorations Possibles

- [ ] Intégration API temps réel
- [ ] Horaires de passage en direct
- [ ] Informations sur le trafic
- [ ] Favoris et historique
- [ ] Mode hors ligne
- [ ] Accessibilité améliorée
- [ ] Support multilingue (Français, Wolof, Anglais)

## 📄 Licence

MIT License

## 👨‍💻 Contributeurs

Développé pour améliorer la mobilité urbaine à Dakar, Sénégal.

---

**Dakar Mobility** - Votre compagnon de transport à Dakar 🇸🇳
