// ══════════════════════════════════════════════════════════════
//  StopsScreen.js
// ══════════════════════════════════════════════════════════════
import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  FlatList, StatusBar, Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavoriteStop } from '../store/store';
import { STOPS, OPERATORS, getNextDepartures } from '../data/transportData';
import { COLORS, LIGHT, DARK, FONTS, SPACE, RADIUS, shadow } from '../utils/theme';

const StopCard = React.memo(({ stop, isFav, onPress, onFav, theme }) => {
  const mainOp = stop.operators[0];
  const op     = OPERATORS[mainOp];
  const deps   = getNextDepartures(stop.id).slice(0, 2);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}
      style={[styles.stopCard, { backgroundColor: isFav ? op.color + '08' : theme.bgCard, borderColor: isFav ? op.color + '40' : theme.border }]}>
      <View style={[styles.stopIconWrap, { backgroundColor: op.color + '18' }]}>
        <Text style={{ fontSize: 22 }}>{op.emoji}</Text>
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={styles.stopTop}>
          <Text style={[styles.stopName, { color: theme.text }]} numberOfLines={1}>{stop.name}</Text>
          <TouchableOpacity onPress={onFav} hitSlop={{ top:8,bottom:8,left:8,right:8 }}>
            <Text style={{ fontSize: 16 }}>{isFav ? '⭐' : '☆'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.stopZone, { color: theme.textMuted }]}>{stop.zone}</Text>
        <View style={styles.stopOps}>
          {stop.operators.map(opId => (
            <View key={opId} style={[styles.opTag, { backgroundColor: OPERATORS[opId]?.color }]}>
              <Text style={styles.opTagText}>{opId}</Text>
            </View>
          ))}
        </View>
        <View style={styles.depsRow}>
          {deps.map((d, i) => (
            <View key={i} style={styles.depItem}>
              <View style={[styles.depBadge, { backgroundColor: d.color }]}>
                <Text style={styles.depBadgeText}>{d.lineName}</Text>
              </View>
              <Text style={[styles.depWait, { color: d.waitMin<=5?COLORS.success:d.waitMin<=15?COLORS.warning:COLORS.gray400 }]}>
                {d.waitMin} min
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
});

export function StopsScreen({ navigation }) {
  const dispatch = useDispatch();
  const { darkMode, selectedOperator, favoriteStops } = useSelector(s => s.app);
  const theme = darkMode ? DARK : LIGHT;
  const [search, setSearch] = useState('');

  const filtered = STOPS
    .filter(s => selectedOperator === 'all' || s.operators.includes(selectedOperator))
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.zone.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aFav = favoriteStops.includes(a.id) ? -1 : 0;
      const bFav = favoriteStops.includes(b.id) ? -1 : 0;
      return aFav - bFav;
    });

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <View style={[styles.header, { backgroundColor: theme.bgCard, borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Arrêts & Gares</Text>
        <Text style={[styles.headerSub, { color: theme.textMuted }]}>
          {filtered.length} arrêt{filtered.length > 1 ? 's' : ''}
          {favoriteStops.length > 0 ? ` · ${favoriteStops.filter(f => filtered.some(s => s.id === f)).length} favoris ⭐` : ''}
        </Text>
        <View style={[styles.searchBar, { backgroundColor: theme.bgSecondary, borderColor: theme.border }]}>
          <Text style={{ fontSize: 14 }}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Rechercher un arrêt ou quartier…"
            placeholderTextColor={theme.textMuted}
            value={search} onChangeText={setSearch}
          />
        </View>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: SPACE.lg, paddingBottom: 100, paddingTop: SPACE.md }}
        ItemSeparatorComponent={() => <View style={{ height: SPACE.sm }} />}
        renderItem={({ item }) => (
          <StopCard stop={item}
            isFav={favoriteStops.includes(item.id)}
            theme={theme}
            onPress={() => { Haptics.selectionAsync(); navigation.navigate('StopDetail', { stop: item }); }}
            onFav={() => { Haptics.selectionAsync(); dispatch(toggleFavoriteStop(item.id)); }}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 40, marginBottom: SPACE.md }}>🚏</Text>
            <Text style={[styles.emptyText, { color: theme.textMuted }]}>Aucun arrêt trouvé</Text>
          </View>
        }
      />
    </View>
  );
}

// ── Styles partagés ──────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: Platform.OS==='ios'?56:32, paddingBottom: SPACE.md,
    paddingHorizontal: SPACE.lg, borderBottomWidth: 0.5,
  },
  headerTitle: { fontSize: FONTS.xl, fontWeight: '700', marginBottom: 2 },
  headerSub:   { fontSize: FONTS.sm, marginBottom: SPACE.md },
  searchBar: {
    flexDirection:'row', alignItems:'center', gap: SPACE.sm,
    paddingHorizontal: SPACE.md, paddingVertical: SPACE.sm,
    borderRadius: RADIUS.lg, borderWidth: 1.5,
  },
  searchInput: { flex: 1, fontSize: FONTS.base },
  stopCard: {
    flexDirection: 'row', gap: SPACE.md, alignItems: 'flex-start',
    padding: SPACE.md, borderRadius: RADIUS.xl, borderWidth: 1.5,
  },
  stopIconWrap: { width:44, height:44, borderRadius:RADIUS.md, alignItems:'center', justifyContent:'center', flexShrink:0 },
  stopTop: { flexDirection:'row', alignItems:'center', gap: SPACE.sm, marginBottom: 2 },
  stopName: { flex:1, fontSize:FONTS.base, fontWeight:'600' },
  stopZone: { fontSize:FONTS.xs, marginBottom:SPACE.xs },
  stopOps:  { flexDirection:'row', gap: SPACE.xs, marginBottom: SPACE.xs },
  opTag: { paddingHorizontal:SPACE.sm, paddingVertical:1, borderRadius:RADIUS.xs },
  opTagText: { color:'#fff', fontSize:FONTS.xs, fontWeight:'800' },
  depsRow: { flexDirection:'row', gap:SPACE.sm, flexWrap:'wrap' },
  depItem: { flexDirection:'row', alignItems:'center', gap:SPACE.xs },
  depBadge: { paddingHorizontal:SPACE.sm, paddingVertical:1, borderRadius:RADIUS.xs },
  depBadgeText: { color:'#fff', fontSize:FONTS.xs, fontWeight:'700' },
  depWait: { fontSize:FONTS.sm, fontWeight:'700' },
  emptyState: { flex:1, alignItems:'center', justifyContent:'center', paddingTop: 80 },
  emptyText: { fontSize:FONTS.md },
});

export default StopsScreen;
