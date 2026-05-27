import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  origin: null,
  destination: null,
  selectedMode: 'all',
  searchResults: [],
  route: null,
  mapCenter: [14.7167, -17.4677],
  mapZoom: 12
};

const mobilitySlice = createSlice({
  name: 'mobility',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setSelectedMode: (state, action) => {
      state.selectedMode = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setRoute: (state, action) => {
      state.route = action.payload;
    },
    setMapCenter: (state, action) => {
      state.mapCenter = action.payload;
    },
    setMapZoom: (state, action) => {
      state.mapZoom = action.payload;
    },
    clearSearch: (state) => {
      state.origin = null;
      state.destination = null;
      state.searchResults = [];
      state.route = null;
    }
  }
});

export const {
  setOrigin,
  setDestination,
  setSelectedMode,
  setSearchResults,
  setRoute,
  setMapCenter,
  setMapZoom,
  clearSearch
} = mobilitySlice.actions;

const store = configureStore({
  reducer: {
    mobility: mobilitySlice.reducer
  }
});

export default store;
