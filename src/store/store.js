import { configureStore, createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    // Thème
    darkMode: false,
    language: 'fr',        // 'fr' | 'wo' | 'en'

    // Carte
    selectedOperator: 'all',
    focusedLine: null,
    selectedStop: null,
    userLocation: null,
    mapRegion: {
      latitude:      14.7167,
      longitude:    -17.4677,
      latitudeDelta:  0.08,
      longitudeDelta: 0.08,
    },

    // Navigation
    activeTab: 'home',

    // Itinéraire
    origin:      null,
    destination: null,
    route:       null,

    // Favoris
    favoriteStops: [],
    favoriteLines: [],

    // Historique
    searchHistory: [],

    // Notifications
    notificationsEnabled: false,
  },

  reducers: {
    // Thème
    toggleDarkMode: s => { s.darkMode = !s.darkMode; },
    setLanguage:    (s, a) => { s.language = a.payload; },

    // Carte
    setSelectedOperator: (s, a) => { s.selectedOperator = a.payload; },
    setFocusedLine:      (s, a) => { s.focusedLine = s.focusedLine === a.payload ? null : a.payload; },
    clearFocusedLine:    s      => { s.focusedLine = null; },
    setSelectedStop:     (s, a) => { s.selectedStop = a.payload; },
    setUserLocation:     (s, a) => { s.userLocation = a.payload; },
    setMapRegion:        (s, a) => { s.mapRegion = { ...s.mapRegion, ...a.payload }; },

    // Navigation
    setActiveTab: (s, a) => { s.activeTab = a.payload; },

    // Itinéraire
    setOrigin:      (s, a) => { s.origin = a.payload; },
    setDestination: (s, a) => { s.destination = a.payload; },
    setRoute:       (s, a) => { s.route = a.payload; },
    clearRoute:     s      => { s.route = null; s.origin = null; s.destination = null; },

    // Favoris
    toggleFavoriteStop: (s, a) => {
      const i = s.favoriteStops.indexOf(a.payload);
      i === -1 ? s.favoriteStops.push(a.payload) : s.favoriteStops.splice(i, 1);
    },
    toggleFavoriteLine: (s, a) => {
      const i = s.favoriteLines.indexOf(a.payload);
      i === -1 ? s.favoriteLines.push(a.payload) : s.favoriteLines.splice(i, 1);
    },

    // Historique
    addToHistory: (s, a) => {
      const entry = a.payload;
      s.searchHistory = [
        entry,
        ...s.searchHistory.filter(h => h.fromId !== entry.fromId || h.toId !== entry.toId),
      ].slice(0, 5);
    },
    clearHistory: s => { s.searchHistory = []; },

    // Notifications
    setNotifications: (s, a) => { s.notificationsEnabled = a.payload; },
  },
});

export const {
  toggleDarkMode, setLanguage,
  setSelectedOperator, setFocusedLine, clearFocusedLine, setSelectedStop,
  setUserLocation, setMapRegion,
  setActiveTab,
  setOrigin, setDestination, setRoute, clearRoute,
  toggleFavoriteStop, toggleFavoriteLine,
  addToHistory, clearHistory,
  setNotifications,
} = appSlice.actions;

export const store = configureStore({
  reducer: { app: appSlice.reducer },
});
