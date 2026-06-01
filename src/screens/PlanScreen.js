import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, FlatList, KeyboardAvoidingView, Platform,
  Animated, StatusBar, Dimensions,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import {
  setOrigin, setDestination, setRoute, clearRoute, addToHistory,
  setMapRegion,
} from '../store/store';
import { STOPS, LINES, OPERATORS, POI } from '../data/transportData';
import { COLORS, LIGHT, DARK, FONTS, SPACE, RADIUS, shadow } from '../utils/theme';

const { height: H } = Dimensions.get('window');

// ── Haversine ────────────────────────────────────────────────
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2-lat1)*Math.PI/180, dLng = (lng2-lng1)*Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

// ── Calcul itinéraire ────────────────────────────────────────
function computeRoute(origin, destination) {
  if (!origin || !destination) return null;
  const dist = haversine(origin.lat, origin.lng, destination.lat, destination.lng);

  const getLines = (stop) => {
    if (stop.lines?.length > 0) return stop.lines;
    return STOPS
      .map(s => ({ ...s, d: haversine(stop.lat,stop.lng,s.lat,s.lng) }))
      .sort((a,b)=>a.d-b.d).slice(0,4)
      .flatMap(s=>s.lines||[]);
  };

  const originLines = getLines(origin);
  const destLines   = getLines(destination);

  // Lignes directes
  const directLines = originLines.filter(l=>destLines.includes(l))
    .map(lid=>LINES.find(l=>l.id===lid)).filter(Boolean);

  // Correspondances
  let transfers = [];
  if (directLines.length === 0) {
    const seen = new Map();
    STOPS.forEach(pivot => {
      const l1s = originLines.filter(l=>pivot.lines?.includes(l)).map(lid=>LINES.find(l=>l.id===lid)).filter(Boolean);
      const l2s = destLines.filter(l=>pivot.lines?.includes(l)).map(lid=>LINES.find(l=>l.id===lid)).filter(Boolean);
      l1s.forEach(l1=>l2s.forEach(l2=>{
        if(l1.id===l2.id) return;
        const key=`${l1.id}+${l2.id}`;
        const score=haversine(origin.lat,origin.lng,pivot.lat,pivot.lng)+haversine(pivot.lat,pivot.lng,destination.lat,destination.lng);
        if(!seen.has(key)||score<seen.get(key).score) seen.set(key,{pivot,line1:l1,line2:l2,score});
      }));
    });
    transfers = [...seen.values()].sort((a,b)=>a.score-b.score);
  }

  let alternatives = [];
  if (directLines.length > 0) {
    alternatives = directLines.map((l,i)=>({ type:'direct', lines:[l], color:l.color, operator:l.operator, freq:l.freq, route:l.route, recommended:i===0 }));
  } else if (transfers.length > 0) {
    alternatives = transfers.slice(0,5).map((t,i)=>({ type:'transfer', lines:[t.line1,t.line2], color:t.line1.color, operator:t.line1.operator, freq:t.line1.freq, pivot:t.pivot.name, recommended:i===0 }));
  }

  const best = directLines[0] || (transfers[0] ? transfers[0] : null);
  const tarif = directLines.length > 0
    ? (OPERATORS[directLines[0].operator]?.tarif || 200)
    : transfers[0] ? (OPERATORS[transfers[0].line1.operator]?.tarif||200) + (OPERATORS[transfers[0].line2.operator]?.tarif||200) : 0;

  return {
    origin, destination,
    distance: Math.round(dist*10)/10,
    duration: Math.round(dist*3.5+8),
    tarif,
    direct: directLines.length > 0,
    alternatives,
    transfers: directLines.length > 0 ? 0 : 1,
  };
}

// ── Suggestion d'arrêt ───────────────────────────────────────
const SuggestionItem = React.memo(({ item, onPress, theme }) => {
  const isPOI = !!item.category;
  const mainOp = !isPOI && item.operators?.[0];
  const color  = isPOI ? COLORS.gray500 : (OPERATORS[mainOp]?.color || COLORS.brand);
  return (
    <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.7}
      style={[styles.sugItem, { borderBottomColor: theme.border }]}>
      <View style={[styles.sugIcon, { backgroundColor: color + '18' }]}>
        <Text style={{ fontSize: 16 }}>{isPOI ? item.emoji : (OPERATORS[mainOp]?.emoji || '🚏')}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.sugName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.sugZone, { color: theme.textMuted }]}>
          {isPOI ? item.category : `${item.zone} · ${item.operators?.join(', ')}`}
        </Text>
      </View>
      {!isPOI && (
        <View style={[styles.sugOpBadge, { backgroundColor: color }]}>
          <Text style={styles.sugOpText}>{mainOp}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
});

// ── Résultat itinéraire ──────────────────────────────────────
function RouteResult({ route, theme, onClear }) {
  if (!route) return null;
  return (
    <View style={[styles.routeCard, shadow(COLORS.brand, 8)]}>
      {/* Header gradient */}
      <LinearGradient colors={[COLORS.brandMid, COLORS.brandDark]}
        style={styles.routeHeader}>
        <View style={styles.routeHeaderRow}>
          <Text style={styles.routeOrigin} numberOfLines={1}>{route.origin.name}</Text>
          <Text style={styles.routeArrow}>→</Text>
          <Text style={styles.routeDest} numberOfLines={1}>{route.destination.name}</Text>
        </View>
        {route.direct && (
          <View style={styles.directBadge}>
            <Text style={styles.directBadgeText}>✅ Trajet direct</Text>
          </View>
        )}
      </LinearGradient>

      {/* Métriques */}
      <View style={styles.routeMetrics}>
        <View style={styles.metric}>
          <Text style={styles.metricVal}>⏱ {route.duration} min</Text>
          <Text style={[styles.metricLbl, { color: theme.textMuted }]}>Durée</Text>
        </View>
        <View style={[styles.metricDiv, { backgroundColor: theme.border }]} />
        <View style={styles.metric}>
          <Text style={styles.metricVal}>📏 {route.distance} km</Text>
          <Text style={[styles.metricLbl, { color: theme.textMuted }]}>Distance</Text>
        </View>
        <View style={[styles.metricDiv, { backgroundColor: theme.border }]} />
        <View style={styles.metric}>
          <Text style={[styles.metricVal, { color: COLORS.success }]}>💰 {route.tarif} F</Text>
          <Text style={[styles.metricLbl, { color: theme.textMuted }]}>Tarif est.</Text>
        </View>
      </View>

      {/* Alternatives lignes */}
      {route.alternatives.length > 0 && (
        <View style={[styles.altSection, { borderTopColor: theme.border }]}>
          <Text style={[styles.altTitle, { color: theme.textMuted }]}>
            🚌 Lignes qui desservent ce trajet
          </Text>
          {route.alternatives.map((alt, i) => (
            <View key={i} style={[styles.altRow, {
              backgroundColor: i === 0 ? alt.color + '10' : theme.bgSecondary,
              borderColor:     i === 0 ? alt.color + '40' : theme.border,
            }]}>
              <View style={styles.altRowLeft}>
                {alt.lines.map((l, li) => (
                  <React.Fragment key={l.id}>
                    <View style={[styles.lineBadge, { backgroundColor: l.color }]}>
                      <Text style={styles.lineBadgeText}>{l.name}</Text>
                    </View>
                    {li < alt.lines.length - 1 && (
                      <Text style={[styles.plusSign, { color: theme.textMuted }]}>+</Text>
                    )}
                  </React.Fragment>
                ))}
                {alt.recommended && (
                  <View style={styles.recoBadge}>
                    <Text style={styles.recoBadgeText}>Recommandé</Text>
                  </View>
                )}
              </View>
              <View style={styles.altRowRight}>
                <Text style={[styles.altFreq, { color: theme.textSec }]}>{alt.freq}</Text>
                <Text style={[styles.altType, { color: theme.textMuted }]}>
                  {alt.type === 'direct' ? '✅ Direct' : `🔄 Corr. ${alt.pivot}`}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Boutons action */}
      <View style={[styles.routeActions, { borderTopColor: theme.border }]}>
        <TouchableOpacity style={[styles.actionBtn, { borderColor: theme.border }]}>
          <Text style={[styles.actionBtnText, { color: theme.textSec }]}>🔗 Partager</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClear}
          style={[styles.actionBtn, { borderColor: theme.border }]}>
          <Text style={[styles.actionBtnText, { color: COLORS.danger }]}>✕ Effacer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════
export default function PlanScreen() {
  const dispatch = useDispatch();
  const { darkMode, origin, destination, route, userLocation, searchHistory } = useSelector(s => s.app);
  const theme = darkMode ? DARK : LIGHT;

  const [fromQ, setFromQ] = useState(origin?.name || '');
  const [toQ,   setToQ]   = useState(destination?.name || '');
  const [fromSug, setFromSug] = useState([]);
  const [toSug,   setToSug]   = useState([]);
  const [activeInput, setActiveInput] = useState(null);

  const fromRef = useRef(null);
  const toRef   = useRef(null);

  // Initialiser depuis la position GPS
  useEffect(() => {
    if (userLocation && !origin) {
      const pseudo = { id:'user_location', name:'📍 Ma position actuelle', zone:'GPS', lat:userLocation[0], lng:userLocation[1], operators:['DDD'], lines:[] };
      dispatch(setOrigin(pseudo));
      setFromQ('📍 Ma position actuelle');
    }
  }, [userLocation]);

  const suggest = useCallback((q) => {
    if (q.length < 2) return [];
    const ql = q.toLowerCase();
    const stops = STOPS.filter(s => s.name.toLowerCase().includes(ql) || s.zone.toLowerCase().includes(ql)).slice(0, 5);
    const pois  = POI.filter(p  => p.name.toLowerCase().includes(ql)).slice(0, 3);
    return [...stops, ...pois];
  }, []);

  const handleFromChange = (v) => { setFromQ(v); setFromSug(suggest(v)); };
  const handleToChange   = (v) => { setToQ(v);   setToSug(suggest(v)); };

  const selectFrom = useCallback((item) => {
    Haptics.selectionAsync();
    const stop = item.category
      ? STOPS.find(s => s.id === item.nearestStop) || item
      : item;
    dispatch(setOrigin(stop));
    setFromQ(item.name);
    setFromSug([]);
    setActiveInput(null);
  }, []);

  const selectTo = useCallback((item) => {
    Haptics.selectionAsync();
    const stop = item.category
      ? STOPS.find(s => s.id === item.nearestStop) || item
      : item;
    dispatch(setDestination(stop));
    setToQ(item.name);
    setToSug([]);
    setActiveInput(null);
  }, []);

  const handleSwap = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const tmpQ = fromQ; setFromQ(toQ); setToQ(tmpQ);
    dispatch(setOrigin(destination));
    dispatch(setDestination(origin));
  }, [fromQ, toQ, origin, destination]);

  const handleSearch = useCallback(() => {
    if (!origin || !destination) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const r = computeRoute(origin, destination);
    dispatch(setRoute(r));
    dispatch(addToHistory({ fromName:origin.name, toName:destination.name, fromId:origin.id, toId:destination.id }));
  }, [origin, destination]);

  const handleNearestStop = useCallback(() => {
    if (!userLocation) return;
    const [lat, lng] = userLocation;
    const nearest = STOPS.reduce((b, s) => {
      const d = haversine(lat, lng, s.lat, s.lng);
      return d < b.dist ? { stop:s, dist:d } : b;
    }, { stop:null, dist:Infinity }).stop;
    if (nearest) selectTo(nearest);
  }, [userLocation, selectTo]);

  const suggestions = activeInput === 'from' ? fromSug : toSug;

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />

      {/* ── Header ── */}
      <LinearGradient colors={[COLORS.brand, COLORS.brandDark]}
        style={styles.header}>
        <Text style={styles.headerTitle}>Planifier mon trajet</Text>
        <Text style={styles.headerSub}>Dakar · Sénégal 🇸🇳</Text>
      </LinearGradient>

      <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={{ flex:1 }}>
        <ScrollView keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 120 }}>

          {/* ── Saisie ── */}
          <View style={[styles.searchCard, shadow(COLORS.brand, 6), { backgroundColor: theme.bgCard }]}>
            {/* Départ */}
            <View style={styles.searchRow}>
              <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
              <TextInput
                ref={fromRef}
                style={[styles.searchInput, { color: theme.text }]}
                placeholder="D'où partez-vous ?"
                placeholderTextColor={theme.textMuted}
                value={fromQ}
                onChangeText={handleFromChange}
                onFocus={() => setActiveInput('from')}
              />
              <TouchableOpacity onPress={() => {
                Haptics.selectionAsync();
                const p = { id:'user_location', name:'📍 Ma position actuelle', zone:'GPS', lat:userLocation?.[0]||14.7167, lng:userLocation?.[1]||-17.4677, operators:['DDD'], lines:[] };
                dispatch(setOrigin(p)); setFromQ('📍 Ma position actuelle'); setFromSug([]);
              }}>
                <Text style={{ fontSize: 18 }}>📍</Text>
              </TouchableOpacity>
              {fromQ ? (
                <TouchableOpacity onPress={() => { setFromQ(''); dispatch(setOrigin(null)); }}>
                  <View style={[styles.clearBtn, { backgroundColor: theme.border }]}>
                    <Text style={{ fontSize: 10, color: theme.textMuted, fontWeight:'700' }}>✕</Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Séparateur + swap */}
            <View style={[styles.separator, { backgroundColor: theme.border }]}>
              <TouchableOpacity style={[styles.swapBtn, shadow('#000', 4), { backgroundColor: theme.bgCard }]}
                onPress={handleSwap}>
                <Text style={{ fontSize: 16 }}>⇅</Text>
              </TouchableOpacity>
            </View>

            {/* Arrivée */}
            <View style={styles.searchRow}>
              <View style={[styles.dot, { backgroundColor: COLORS.danger }]} />
              <TextInput
                ref={toRef}
                style={[styles.searchInput, { color: theme.text }]}
                placeholder="Où allez-vous ?"
                placeholderTextColor={theme.textMuted}
                value={toQ}
                onChangeText={handleToChange}
                onFocus={() => setActiveInput('to')}
              />
              {toQ ? (
                <TouchableOpacity onPress={() => { setToQ(''); dispatch(setDestination(null)); }}>
                  <View style={[styles.clearBtn, { backgroundColor: theme.border }]}>
                    <Text style={{ fontSize: 10, color: theme.textMuted, fontWeight:'700' }}>✕</Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <View style={[styles.sugList, shadow('#000', 8), { backgroundColor: theme.bgCard }]}>
              {suggestions.map(item => (
                <SuggestionItem key={item.id} item={item} theme={theme}
                  onPress={activeInput==='from' ? selectFrom : selectTo} />
              ))}
            </View>
          )}

          {/* Bouton arrêt le plus proche */}
          <TouchableOpacity onPress={handleNearestStop} activeOpacity={0.8}
            style={[styles.nearestBtn, { backgroundColor: theme.bgCard, borderColor: theme.border }]}>
            <Text style={{ fontSize: 16 }}>🚏</Text>
            <Text style={[styles.nearestBtnText, { color: theme.textSec }]}>
              Arrêt de bus le plus proche
            </Text>
            <View style={[styles.nearestBadge, { backgroundColor: COLORS.brand }]}>
              <Text style={styles.nearestBadgeText}>→ Destination</Text>
            </View>
          </TouchableOpacity>

          {/* Bouton calculer */}
          <TouchableOpacity onPress={handleSearch} activeOpacity={0.85}
            disabled={!origin || !destination}
            style={[styles.goBtn, (!origin||!destination) && styles.goBtnDisabled]}>
            <LinearGradient
              colors={(!origin||!destination) ? [COLORS.gray200,COLORS.gray300] : [COLORS.brandMid,COLORS.brand,COLORS.brandDark]}
              start={{ x:0,y:0 }} end={{ x:1,y:1 }}
              style={styles.goBtnGrad}>
              <Text style={[styles.goBtnText, (!origin||!destination) && { color: COLORS.gray400 }]}>
                🔍 Calculer l'itinéraire
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Résultat */}
          {route && (
            <RouteResult route={route} theme={theme} onClear={() => dispatch(clearRoute())} />
          )}

          {/* Historique */}
          {!route && searchHistory.length > 0 && (
            <View style={{ marginTop: SPACE.lg, paddingHorizontal: SPACE.lg }}>
              <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>Recherches récentes</Text>
              {searchHistory.map((h, i) => (
                <TouchableOpacity key={i}
                  style={[styles.histItem, { backgroundColor: theme.bgCard, borderColor: theme.border }]}>
                  <Text style={{ fontSize: 14 }}>🕐</Text>
                  <Text style={[styles.histFrom, { color: theme.text }]} numberOfLines={1}>{h.fromName}</Text>
                  <Text style={[styles.histArrow, { color: theme.textMuted }]}>→</Text>
                  <Text style={[styles.histTo, { color: theme.text }]} numberOfLines={1}>{h.toName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* POI rapides */}
          <View style={{ marginTop: SPACE.lg }}>
            <Text style={[styles.sectionTitle, { color: theme.textMuted, paddingHorizontal: SPACE.lg }]}>
              Destinations populaires
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: SPACE.lg, gap: SPACE.sm }}>
              {POI.slice(0, 8).map(poi => (
                <TouchableOpacity key={poi.id} onPress={() => selectTo(poi)}
                  style={[styles.poiPill, { backgroundColor: theme.bgCard, borderColor: theme.border }]}>
                  <Text style={{ fontSize: 16 }}>{poi.emoji}</Text>
                  <Text style={[styles.poiText, { color: theme.text }]} numberOfLines={1}>{poi.name.split(' ')[0]}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1 },
  header: { paddingTop: Platform.OS==='ios'?56:36, paddingBottom:SPACE.xl, paddingHorizontal:SPACE.xl },
  headerTitle: { fontSize:FONTS['2xl'], fontWeight:'700', color:'#fff' },
  headerSub:   { fontSize:FONTS.sm, color:'rgba(255,255,255,.7)', marginTop:2 },

  searchCard: {
    margin: SPACE.lg, borderRadius: RADIUS.xl,
    overflow: 'hidden',
  },
  searchRow: {
    flexDirection:'row', alignItems:'center',
    paddingHorizontal: SPACE.lg, paddingVertical: SPACE.md, gap: SPACE.md,
  },
  dot: { width:10, height:10, borderRadius:5, flexShrink:0 },
  searchInput: { flex:1, fontSize:FONTS.md, fontWeight:'500' },
  clearBtn: {
    width:20, height:20, borderRadius:10,
    alignItems:'center', justifyContent:'center',
  },
  separator: {
    height:1, marginHorizontal:SPACE.lg, position:'relative',
    alignItems:'center', justifyContent:'center',
  },
  swapBtn: {
    width:32, height:32, borderRadius:RADIUS.full,
    alignItems:'center', justifyContent:'center',
    position:'absolute',
  },

  sugList: {
    marginHorizontal:SPACE.lg, borderRadius:RADIUS.lg, overflow:'hidden', zIndex:100,
  },
  sugItem: {
    flexDirection:'row', alignItems:'center', gap:SPACE.md,
    paddingHorizontal:SPACE.lg, paddingVertical:SPACE.md,
    borderBottomWidth:0.5,
  },
  sugIcon: { width:36, height:36, borderRadius:RADIUS.md, alignItems:'center', justifyContent:'center' },
  sugName: { fontSize:FONTS.sm, fontWeight:'500' },
  sugZone: { fontSize:FONTS.xs, marginTop:1 },
  sugOpBadge: { paddingHorizontal:SPACE.sm, paddingVertical:2, borderRadius:RADIUS.xs },
  sugOpText: { color:'#fff', fontSize:FONTS.xs, fontWeight:'700' },

  nearestBtn: {
    marginHorizontal:SPACE.lg, flexDirection:'row', alignItems:'center', gap:SPACE.sm,
    padding:SPACE.md, borderRadius:RADIUS.lg, borderWidth:1.5, borderStyle:'dashed',
    marginBottom:SPACE.sm,
  },
  nearestBtnText: { flex:1, fontSize:FONTS.sm },
  nearestBadge: { paddingHorizontal:SPACE.sm, paddingVertical:3, borderRadius:RADIUS.xs },
  nearestBadgeText: { color:'#fff', fontSize:FONTS.xs, fontWeight:'700' },

  goBtn: { marginHorizontal:SPACE.lg, borderRadius:RADIUS.xl, overflow:'hidden' },
  goBtnDisabled: { opacity:.6 },
  goBtnGrad: { paddingVertical:SPACE.lg, alignItems:'center', justifyContent:'center' },
  goBtnText: { fontSize:FONTS.md, fontWeight:'700', color:'#fff' },

  // Route
  routeCard: { margin:SPACE.lg, borderRadius:RADIUS.xl, overflow:'hidden' },
  routeHeader: { padding:SPACE.lg },
  routeHeaderRow: { flexDirection:'row', alignItems:'center', gap:SPACE.sm },
  routeOrigin: { flex:1, fontSize:FONTS.sm, color:'rgba(255,255,255,.85)', fontWeight:'500' },
  routeArrow: { fontSize:FONTS.lg, color:'#fff' },
  routeDest: { flex:1, fontSize:FONTS.sm, color:'rgba(255,255,255,.85)', fontWeight:'500', textAlign:'right' },
  directBadge: {
    marginTop:SPACE.sm, alignSelf:'flex-start',
    backgroundColor:'rgba(255,255,255,.2)', borderRadius:RADIUS.full,
    paddingHorizontal:SPACE.md, paddingVertical:4,
  },
  directBadgeText: { color:'#fff', fontSize:FONTS.xs, fontWeight:'600' },
  routeMetrics: { flexDirection:'row', padding:SPACE.lg },
  metric: { flex:1, alignItems:'center' },
  metricVal: { fontSize:FONTS.base, fontWeight:'700', color:'#0F172A' },
  metricLbl: { fontSize:FONTS.xs, marginTop:2, textTransform:'uppercase', letterSpacing:.5 },
  metricDiv: { width:1, height:'100%' },

  altSection: { borderTopWidth:0.5, padding:SPACE.lg },
  altTitle: { fontSize:FONTS.xs, fontWeight:'700', textTransform:'uppercase', letterSpacing:.5, marginBottom:SPACE.md },
  altRow: {
    flexDirection:'row', alignItems:'flex-start',
    borderRadius:RADIUS.md, padding:SPACE.md, marginBottom:SPACE.sm,
    borderWidth:1.5,
  },
  altRowLeft: { flex:1, flexDirection:'row', flexWrap:'wrap', gap:SPACE.xs, alignItems:'center' },
  altRowRight: { alignItems:'flex-end', gap:2 },
  lineBadge: { paddingHorizontal:SPACE.sm, paddingVertical:3, borderRadius:RADIUS.full },
  lineBadgeText: { color:'#fff', fontSize:FONTS.xs, fontWeight:'800' },
  plusSign: { fontSize:FONTS.sm, fontWeight:'700' },
  recoBadge: { backgroundColor:COLORS.successLight, borderRadius:RADIUS.full, paddingHorizontal:SPACE.sm, paddingVertical:2 },
  recoBadgeText: { color:COLORS.success, fontSize:FONTS.xs, fontWeight:'700' },
  altFreq: { fontSize:FONTS.xs, fontWeight:'500' },
  altType: { fontSize:FONTS.xs },

  routeActions: { flexDirection:'row', borderTopWidth:0.5, padding:SPACE.md, gap:SPACE.sm },
  actionBtn: { flex:1, padding:SPACE.md, borderRadius:RADIUS.md, borderWidth:1, alignItems:'center' },
  actionBtnText: { fontSize:FONTS.sm, fontWeight:'500' },

  // Historique
  sectionTitle: { fontSize:FONTS.xs, fontWeight:'700', textTransform:'uppercase', letterSpacing:.5, marginBottom:SPACE.sm },
  histItem: {
    flexDirection:'row', alignItems:'center', gap:SPACE.sm,
    padding:SPACE.md, borderRadius:RADIUS.md, borderWidth:1, marginBottom:SPACE.sm,
  },
  histFrom: { flex:1, fontSize:FONTS.sm, fontWeight:'500' },
  histArrow: { fontSize:FONTS.sm },
  histTo: { flex:1, fontSize:FONTS.sm, fontWeight:'500', textAlign:'right' },

  // POI
  poiPill: {
    flexDirection:'row', alignItems:'center', gap:SPACE.xs,
    paddingHorizontal:SPACE.md, paddingVertical:SPACE.sm,
    borderRadius:RADIUS.full, borderWidth:1,
  },
  poiText: { fontSize:FONTS.sm, fontWeight:'500' },
});
