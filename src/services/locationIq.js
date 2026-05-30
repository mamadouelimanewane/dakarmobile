const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

// Bounding box approximative de Dakar et sa banlieue (MinLon, MinLat, MaxLon, MaxLat)
const DAKAR_VIEWBOX = '-17.55,14.65,-17.20,14.85';

export const searchLocation = async (query) => {
  if (!query || query.length < 3) return [];
  
  try {
    const response = await fetch(
      `https://api.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${encodeURIComponent(query)}&viewbox=${DAKAR_VIEWBOX}&bounded=1&countrycodes=SN&limit=5&format=json`
    );
    if (!response.ok) throw new Error('Erreur API LocationIQ');
    const data = await response.json();
    
    // Formater pour correspondre à notre structure de données
    return data.map(place => ({
      id: place.place_id,
      name: place.display_name.split(',')[0], // Prendre le nom court
      fullName: place.display_name,
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      lines: [] // Indique que ce n'est pas un arrêt de bus, mais un lieu géographique
    }));
  } catch (error) {
    console.error("LocationIQ Autocomplete Error:", error);
    return [];
  }
};

export const getRouteGeometry = async (originLon, originLat, destLon, destLat) => {
  try {
    const coordinates = `${originLon},${originLat};${destLon},${destLat}`;
    const response = await fetch(
      `https://us1.locationiq.com/v1/directions/driving/${coordinates}?key=${API_KEY}&geometries=geojson&overview=full`
    );
    if (!response.ok) throw new Error('Erreur API Directions');
    const data = await response.json();
    
    if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
      return {
        duration: Math.ceil(data.routes[0].duration / 60), // en minutes
        distance: (data.routes[0].distance / 1000).toFixed(1), // en km
        geometry: data.routes[0].geometry.coordinates // Array of [lon, lat]
      };
    }
    return null;
  } catch (error) {
    console.error("LocationIQ Directions Error:", error);
    return null;
  }
};
