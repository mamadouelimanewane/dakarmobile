import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Animated, Platform, Dimensions,
} from 'react-native';
import MapView, { Marker, Polyline, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import {
  setUserLocation, setMapRegion, setSelectedOperator,
  setFocusedLine, clearFocusedLine, setOrigin, setActiveTab,
} from '../store/store';
import { STOPS, LINES, OPERATORS, getNextDepartures } from '../data/transportData';
import { COLORS, LIGHT, DARK, FONTS, SPACE, RADIUS, shadow } from '../utils/theme';

const { width: W, height: H } = Dimensions.get('window');
const CARD_W = W * 0.72;

// ── Marqueur d'arrêt personnalisé ────────────────────────────
const StopMarker = React.memo(({ stop, onPress }) => {
  const mainOp = stop.operators[0];
  const color  = OPERATORS[mainOp]?.color || COLORS.brand;
  return (
    <Marker coordinate={{ latitude: stop.lat, longitude: stop.lng }}
      onPress={() => onPress(stop)} anchor={{ x: 0.5, y: 0.5 }}>
      <View style={[styles.marker, { borderColor: color }]}>
        <View style={[styles.markerDot, { backgroundColor: color }]} />
      </View>
    </Marker>
  );
});

// ── Marqueur utilisateur ─────────────────────────────────────
const UserMarker = React.memo(({ coordinate }) => (
  <Marker coordinate={coordinate} anchor={{ x: 0.5, y: 0.5 }}>
    <View style={styles.userMarkerOuter}>
      <View style={styles.userMarkerInner} />
    </View>
  </Marker>
));

// ── Pill de ligne rapide ──────────────────────────────────────
const LinePill = React.memo(({ line, focused, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[styles.linePill, { backgroundColor: line.color }, focused && styles.linePillActive]}
  >
    <Text style={styles.linePillText}>{line.name}</Text>
  </TouchableOpacity>
));

// ── Carte arrêt à proximité ───────────────────────────────────
function NearbyStopCard({ stop, onPress }) {
  const deps    = getNextDepartures(stop.id).slice(0, 2);
  const mainOp  = stop.operators[0];
  const op      = OPERATORS[mainOp];
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}
      style={[styles.nearbyCard, shadow(COLORS.brand, 8)]}>
      <LinearGradient
        colors={[op.color + '18', op.color + '08']}
        style={styles.nearbyCardGrad}
      >
        <View style={styles.nearbyCardHeader}>
          <View style={[styles.opBadge, { backgroundColor: op.color }]}>
            <Text style={styles.opBadgeText}>{op.name}</Text>
          </View>
          <Text style={styles.nearbyCardName} numberOfLines={1}>{stop.name}</Text>
          <Text style={styles.nearbyCardZone}>{stop.zone}</Text>
        </View>
        <View style={styles.nearbyCardDeps}>
          {deps.map((d, i) => (
            <View key={i} style={styles.depRow}>
              <View style={[styles.depBadge, { backgroundColor: d.color }]}>
                <Text style={styles.depBadgeText}>{d.lineName}</Text>
              </View>
              <Text style={styles.depTime} numberOfLines={1}>{d.route.split('↔')[1]?.trim()}</Text>
              <Text style={[styles.depWait, {
                color: d.waitMin <= 5 ? COLORS.success : d.waitMin <= 15 ? COLORS.warning : COLORS.gray400,
              }]}>
                {d.waitMin} min
              </Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// ═══════════════════════════════════════════════════════════════
export default function HomeScreen({ navigation }) {
  const dispatch  = useDispatch();
  const mapRef    = useRef(null);
  const scrollRef = useRef(null);
  const { darkMode, userLocation, mapRegion, selectedOperator, focusedLine } = useSelector(s => s.app);
  const theme     = darkMode ? DARK : LIGHT;

  const [nearbyStops,   setNearbyStops]   = useState([]);
  const [locationReady, setLocationReady] = useState(false);
  const [searchQuery,   setSearchQuery]   = useState('');
  const headerAnim = useRef(new Animated.Value(0)).current;

  // ── Géolocalisation ─────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const coords = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
      dispatch(setUserLocation([coords.latitude, coords.longitude]));
      dispatch(setMapRegion({ ...mapRegion, latitude: coords.latitude, longitude: coords.longitude }));
      setLocationReady(true);

      // Arrêts les plus proches
      const withDist = STOPS.map(s => ({
        ...s,
        dist: Math.sqrt((s.lat - coords.latitude)**2 + (s.lng - coords.longitude)**2),
      })).sort((a, b) => a.dist - b.dist).slice(0, 6);
      setNearbyStops(withDist);
    })();
  }, []);

  // ── Centrer sur ma position ──────────────────────────────────
  const handleLocate = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!userLocation) return;
    mapRef.current?.animateToRegion({
      latitude:      userLocation[0],
      longitude:     userLocation[1],
      latitudeDelta:  0.02,
      longitudeDelta: 0.02,
    }, 800);
  }, [userLocation]);

  const visibleStops = selectedOperator === 'all'
    ? STOPS : STOPS.filter(s => s.operators.includes(selectedOperator));

  const visibleLines = focusedLine
    ? LINES.filter(l => l.id === focusedLine)
    : (selectedOperator === 'all' ? LINES : LINES.filter(l => l.operator === selectedOperator));

  const handleStopPress = useCallback((stop) => {
    Haptics.selectionAsync();
    navigation.navigate('StopDetail', { stop });
  }, []);

  const handleLinePress = useCallback((line) => {
    Haptics.selectionAsync();
    dispatch(setFocusedLine(line.id));
    const stops = STOPS.filter(s => line.stops.includes(s.id));
    if (stops.length > 0) {
      const lats = stops.map(s => s.lat);
      const lngs = stops.map(s => s.lng);
      mapRef.current?.animateToRegion({
        latitude:      (Math.min(...lats) + Math.max(...lats)) / 2,
        longitude:     (Math.min(...lngs) + Math.max(...lngs)) / 2,
        latitudeDelta:  (Math.max(...lats) - Math.min(...lats)) * 1.4 + 0.01,
        longitudeDelta: (Math.max(...lngs) - Math.min(...lngs)) * 1.4 + 0.01,
      }, 1000);
    }
    navigation.navigate('LineDetail', { line });
  }, []);

  const handleGoToPlan = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Plan');
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'light-content'} />

      {/* ── Carte plein écran ── */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={mapRegion}
        showsUserLocation={false}
        showsCompass={false}
        showsMyLocationButton={false}
        customMapStyle={darkMode ? DARK_MAP_STYLE : []}
      >
        {/* Lignes de bus */}
        {visibleLines.slice(0, 20).map(line => {
          const coords = line.stops
            .map(sid => STOPS.find(s => s.id === sid))
            .filter(Boolean)
            .map(s => ({ latitude: s.lat, longitude: s.lng }));
          if (coords.length < 2) return null;
          const isFoc = focusedLine === line.id;
          return (
            <React.Fragment key={line.id}>
              <Polyline coordinates={coords} strokeColor={line.color + (isFoc ? 'FF' : '99')}
                strokeWidth={isFoc ? 5 : 2.5} lineDashPattern={line.operator==='TER'?[10,5]:null}/>
            </React.Fragment>
          );
        })}

        {/* Arrêts */}
        {visibleStops.slice(0, 40).map(stop => (
          <StopMarker key={stop.id} stop={stop} onPress={handleStopPress} />
        ))}

        {/* Position utilisateur */}
        {userLocation && (
          <>
            <UserMarker coordinate={{ latitude: userLocation[0], longitude: userLocation[1] }} />
            <Circle center={{ latitude: userLocation[0], longitude: userLocation[1] }}
              radius={300} strokeColor={COLORS.brand + '40'} fillColor={COLORS.brand + '15'} strokeWidth={1} />
          </>
        )}
      </MapView>

      {/* ── Header flottant ── */}
      <View style={styles.headerFloat}>
        <BlurView intensity={darkMode ? 60 : 80} tint={darkMode ? 'dark' : 'light'} style={styles.headerBlur}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerEmoji}>🚌</Text>
              <View>
                <Text style={[styles.headerTitle, { color: theme.text }]}>SenBus</Text>
                <Text style={[styles.headerSub, { color: theme.textSec }]}>Dakar · Sénégal 🇸🇳</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}
              style={[styles.headerBtn, { backgroundColor: COLORS.brand }]}>
              <Text style={{ fontSize: 16 }}>👤</Text>
            </TouchableOpacity>
          </View>

          {/* Filtres opérateurs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.opFilters}>
            {[{ id:'all', name:'Tous', emoji:'🌐', color:COLORS.gray500 }, ...Object.values(OPERATORS)].map(op => (
              <TouchableOpacity key={op.id}
                onPress={() => {
                  Haptics.selectionAsync();
                  dispatch(setSelectedOperator(op.id));
                }}
                style={[styles.opPill,
                  selectedOperator === op.id && { backgroundColor: op.color, borderColor: op.color }
                ]}>
                <Text style={styles.opPillEmoji}>{op.emoji}</Text>
                <Text style={[styles.opPillText,
                  { color: selectedOperator === op.id ? '#fff' : theme.textSec }]}>
                  {op.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </BlurView>
      </View>

      {/* ── Bouton planifier (centre bas) ── */}
      <View style={styles.planBtnWrap}>
        <TouchableOpacity onPress={handleGoToPlan} activeOpacity={0.9}
          style={[styles.planBtn, shadow(COLORS.brand, 16)]}>
          <LinearGradient colors={[COLORS.brandMid, COLORS.brand, COLORS.brandDark]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.planBtnGrad}>
            <Text style={styles.planBtnIcon}>🔍</Text>
            <Text style={styles.planBtnText}>Où allez-vous ?</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* ── Bouton géolocalisation ── */}
      <TouchableOpacity style={[styles.locBtn, shadow('#000', 8)]} onPress={handleLocate}>
        <BlurView intensity={80} tint={darkMode ? 'dark' : 'light'} style={styles.locBtnBlur}>
          <Text style={{ fontSize: 20 }}>📍</Text>
        </BlurView>
      </TouchableOpacity>

      {/* ── Focus ligne actif ── */}
      {focusedLine && (() => {
        const fl = LINES.find(l => l.id === focusedLine);
        return fl ? (
          <TouchableOpacity style={[styles.focusBanner, { backgroundColor: fl.color }]}
            onPress={() => dispatch(clearFocusedLine())}>
            <Text style={styles.focusBannerText}>{fl.name} — {fl.route.split('↔')[0].trim()}</Text>
            <Text style={styles.focusBannerClose}>✕ Tout</Text>
          </TouchableOpacity>
        ) : null;
      })()}

      {/* ── Bottom sheet : arrêts à proximité ── */}
      <View style={[styles.bottomSheet, { backgroundColor: 'transparent' }]}>
        {nearbyStops.length > 0 && (
          <>
            <View style={[styles.sheetHandle, { backgroundColor: theme.border }]} />
            <Text style={[styles.sheetTitle, { color: theme.text }]}>À proximité</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: SPACE.lg, gap: SPACE.md }}>
              {nearbyStops.map(stop => (
                <NearbyStopCard key={stop.id} stop={stop}
                  onPress={() => navigation.navigate('StopDetail', { stop })} />
              ))}
            </ScrollView>
          </>
        )}

        {/* Lignes rapides */}
        <Text style={[styles.sheetTitle, { color: theme.text, marginTop: SPACE.md }]}>Lignes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SPACE.lg, gap: SPACE.sm, paddingBottom: 100 }}>
          {LINES.filter(l => selectedOperator === 'all' || l.operator === selectedOperator)
            .slice(0, 25).map(line => (
            <LinePill key={line.id} line={line} focused={focusedLine === line.id}
              onPress={() => handleLinePress(line)} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
  headerFloat: {
    position: 'absolute', top: 0, left: 0, right: 0,
    zIndex: 100,
    paddingTop: Platform.OS === 'ios' ? 52 : 28,
  },
  headerBlur: {
    marginHorizontal: SPACE.lg,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingBottom: SPACE.sm,
  },
  headerRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: SPACE.lg, paddingVertical: SPACE.md,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACE.sm, flex: 1 },
  headerEmoji: { fontSize: 28 },
  headerTitle: { fontSize: FONTS.lg, fontWeight: '700' },
  headerSub:   { fontSize: FONTS.xs, marginTop: 1 },
  headerBtn: {
    width: 36, height: 36, borderRadius: RADIUS.full,
    alignItems: 'center', justifyContent: 'center',
  },

  // Filtres opérateurs
  opFilters: {
    paddingHorizontal: SPACE.lg,
    gap: SPACE.sm,
    paddingBottom: SPACE.sm,
  },
  opPill: {
    flexDirection: 'row', alignItems: 'center', gap: SPACE.xs,
    paddingHorizontal: SPACE.md, paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
  },
  opPillEmoji: { fontSize: 14 },
  opPillText: { fontSize: FONTS.sm, fontWeight: '600' },

  // Marqueurs
  marker: {
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: '#fff', borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  markerDot: { width: 5, height: 5, borderRadius: 3 },
  userMarkerOuter: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: COLORS.brand + '30',
    alignItems: 'center', justifyContent: 'center',
  },
  userMarkerInner: {
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: COLORS.brand,
    borderWidth: 2, borderColor: '#fff',
  },

  // Bouton planifier
  planBtnWrap: {
    position: 'absolute', bottom: 160, left: SPACE.lg, right: SPACE.lg, zIndex: 50,
  },
  planBtn: { borderRadius: RADIUS.xl, overflow: 'hidden' },
  planBtnGrad: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: SPACE.xl, paddingVertical: SPACE.md, gap: SPACE.md,
  },
  planBtnIcon: { fontSize: 20 },
  planBtnText: {
    fontSize: FONTS.md, fontWeight: '600', color: '#fff', flex: 1,
  },

  // Bouton géoloc
  locBtn: {
    position: 'absolute', bottom: 224, right: SPACE.lg,
    width: 48, height: 48, borderRadius: RADIUS.md, overflow: 'hidden', zIndex: 50,
  },
  locBtnBlur: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.3)',
  },

  // Focus bannière
  focusBanner: {
    position: 'absolute', top: Platform.OS === 'ios' ? 160 : 130,
    left: SPACE.lg, right: SPACE.lg,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: SPACE.lg, paddingVertical: SPACE.sm,
    borderRadius: RADIUS.lg, zIndex: 200,
    gap: SPACE.sm,
  },
  focusBannerText: { color: '#fff', fontSize: FONTS.sm, fontWeight: '600', flex: 1 },
  focusBannerClose: { color: 'rgba(255,255,255,0.8)', fontSize: FONTS.sm, fontWeight: '700' },

  // Bottom sheet
  bottomSheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
  },
  sheetHandle: {
    width: 36, height: 4, borderRadius: 2,
    alignSelf: 'center', marginBottom: SPACE.sm,
    marginTop: SPACE.md,
  },
  sheetTitle: {
    fontSize: FONTS.sm, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 0.8,
    paddingHorizontal: SPACE.xl, marginBottom: SPACE.sm,
  },

  // Carte arrêt proche
  nearbyCard: {
    width: CARD_W, borderRadius: RADIUS.xl,
    overflow: 'hidden',
  },
  nearbyCardGrad: { padding: SPACE.lg },
  nearbyCardHeader: { marginBottom: SPACE.sm },
  opBadge: {
    alignSelf: 'flex-start', paddingHorizontal: SPACE.sm, paddingVertical: 2,
    borderRadius: RADIUS.xs, marginBottom: SPACE.xs,
  },
  opBadgeText: { color: '#fff', fontSize: FONTS.xs, fontWeight: '800' },
  nearbyCardName: { fontSize: FONTS.base, fontWeight: '700', color: '#0F172A' },
  nearbyCardZone: { fontSize: FONTS.xs, color: COLORS.gray500, marginTop: 1 },
  nearbyCardDeps: { gap: SPACE.xs },
  depRow: { flexDirection: 'row', alignItems: 'center', gap: SPACE.sm },
  depBadge: { paddingHorizontal: SPACE.sm, paddingVertical: 1, borderRadius: RADIUS.xs },
  depBadgeText: { color: '#fff', fontSize: FONTS.xs, fontWeight: '700' },
  depTime: { flex: 1, fontSize: FONTS.xs, color: COLORS.gray600 },
  depWait: { fontSize: FONTS.sm, fontWeight: '700' },

  // Pills lignes
  linePill: {
    paddingHorizontal: SPACE.md, paddingVertical: SPACE.sm,
    borderRadius: RADIUS.full,
  },
  linePillActive: { transform: [{ scale: 1.05 }] },
  linePillText: { color: '#fff', fontSize: FONTS.xs, fontWeight: '800' },
});

// Style de carte sombre Google Maps
const DARK_MAP_STYLE = [
  { elementType:'geometry', stylers:[{ color:'#1d2c4d' }] },
  { elementType:'labels.text.fill', stylers:[{ color:'#8ec3b9' }] },
  { elementType:'labels.text.stroke', stylers:[{ color:'#1a3646' }] },
  { featureType:'road', elementType:'geometry', stylers:[{ color:'#304a7d' }] },
  { featureType:'road', elementType:'labels.text.fill', stylers:[{ color:'#98a5be' }] },
  { featureType:'water', elementType:'geometry', stylers:[{ color:'#0e1626' }] },
  { featureType:'water', elementType:'labels.text.fill', stylers:[{ color:'#4e6d70' }] },
];
