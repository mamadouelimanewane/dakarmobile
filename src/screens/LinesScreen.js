import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  SectionList, StatusBar, Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavoriteLine, setFocusedLine } from '../store/store';
import { LINES, OPERATORS, getLineStops } from '../data/transportData';
import { COLORS, LIGHT, DARK, FONTS, SPACE, RADIUS, shadow } from '../utils/theme';

const LineCard = React.memo(({ line, isFav, isFocused, onPress, onFav, theme }) => {
  const op = OPERATORS[line.operator];
  const stops = getLineStops(line.id);
  const freqColor = (line.freq||'').startsWith('5') || (line.freq||'').startsWith('6') || (line.freq||'').startsWith('8') ? COLORS.success
    : (line.freq||'').match(/^1[0-5]/) ? COLORS.warning : COLORS.gray400;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}
      style={[styles.lineCard,
        { backgroundColor: theme.bgCard, borderColor: isFocused ? line.color : theme.border },
        isFocused && { borderWidth:2, ...shadow(line.color, 8) }
      ]}>
      <View style={[styles.lineAccent, { backgroundColor: line.color }]} />
      <View style={styles.lineBody}>
        <View style={styles.lineTop}>
          <View style={[styles.lineBadge, { backgroundColor: line.color }]}>
            <Text style={styles.lineBadgeText}>{line.name}</Text>
          </View>
          <Text style={[styles.lineRoute, { color: theme.text }]} numberOfLines={1}>{line.route}</Text>
          <TouchableOpacity onPress={onFav} hitSlop={{ top:10,bottom:10,left:10,right:10 }}>
            <Text style={{ fontSize:18 }}>{isFav ? '⭐' : '☆'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lineMeta}>
          <View style={styles.metaChip}>
            <Text style={[styles.metaChipText, { color: theme.textSec }]}>🚏 {stops.length} arrêts</Text>
          </View>
          <View style={styles.metaChip}>
            <View style={[styles.freqDot, { backgroundColor: freqColor }]} />
            <Text style={[styles.metaChipText, { color: theme.textSec }]}>{line.freq}</Text>
          </View>
          <View style={styles.metaChip}>
            <Text style={[styles.metaChipText, { color: theme.textSec }]}>💰 {op.tarif} F</Text>
          </View>
        </View>
        {isFocused && (
          <Text style={[styles.focusHint, { color: line.color }]}>
            🗺️ Tracé affiché sur la carte · Cliquer pour fermer
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
});

export default function LinesScreen({ navigation }) {
  const dispatch = useDispatch();
  const { darkMode, selectedOperator, favoriteLines, focusedLine } = useSelector(s => s.app);
  const theme = darkMode ? DARK : LIGHT;
  const [search, setSearch] = useState('');

  const filtered = LINES
    .filter(l => selectedOperator === 'all' || l.operator === selectedOperator)
    .filter(l =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.route.toLowerCase().includes(search.toLowerCase()) ||
      l.id.toLowerCase().includes(search.toLowerCase())
    );

  const sections = Object.entries(
    filtered.reduce((acc, l) => {
      if (!acc[l.operator]) acc[l.operator] = [];
      acc[l.operator].push(l);
      return acc;
    }, {})
  ).map(([opId, data]) => ({
    key: opId,
    op: OPERATORS[opId],
    data,
  }));

  const handleLinePress = useCallback((line) => {
    Haptics.selectionAsync();
    dispatch(setFocusedLine(line.id));
    navigation.navigate('LineDetail', { line });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.bgCard, borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Lignes de transport</Text>
        <Text style={[styles.headerSub, { color: theme.textMuted }]}>
          {filtered.length} ligne{filtered.length > 1 ? 's' : ''}
        </Text>
        <View style={[styles.searchBar, { backgroundColor: theme.bgSecondary, borderColor: theme.border }]}>
          <Text style={{ fontSize: 14 }}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Rechercher une ligne…"
            placeholderTextColor={theme.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={{ fontSize: 14, color: theme.textMuted }}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {sections.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={{ fontSize: 40, marginBottom: SPACE.md }}>🔍</Text>
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>Aucune ligne trouvée</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: SPACE.lg }}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => (
            <View style={[styles.sectionHeader, { backgroundColor: section.op.color + '15' }]}>
              <Text style={{ fontSize: 18 }}>{section.op.emoji}</Text>
              <Text style={[styles.sectionTitle, { color: section.op.color }]}>{section.op.fullName}</Text>
              <Text style={[styles.sectionCount, { color: section.op.color }]}>
                {section.data.length} ligne{section.data.length > 1 ? 's' : ''}
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <LineCard
              line={item}
              isFav={favoriteLines.includes(item.id)}
              isFocused={focusedLine === item.id}
              theme={theme}
              onPress={() => handleLinePress(item)}
              onFav={(e) => {
                Haptics.selectionAsync();
                dispatch(toggleFavoriteLine(item.id));
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: SPACE.sm }} />}
          SectionSeparatorComponent={() => <View style={{ height: SPACE.lg }} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: Platform.OS === 'ios' ? 56 : 32,
    paddingBottom: SPACE.md,
    paddingHorizontal: SPACE.lg,
    borderBottomWidth: 0.5,
  },
  headerTitle: { fontSize: FONTS.xl, fontWeight: '700', marginBottom: 2 },
  headerSub:   { fontSize: FONTS.sm, marginBottom: SPACE.md },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: SPACE.sm,
    paddingHorizontal: SPACE.md, paddingVertical: SPACE.sm,
    borderRadius: RADIUS.lg, borderWidth: 1.5,
  },
  searchInput: { flex: 1, fontSize: FONTS.base },

  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACE.sm,
    padding: SPACE.md, borderRadius: RADIUS.md, marginBottom: SPACE.sm, marginTop: SPACE.md,
  },
  sectionTitle: { flex: 1, fontSize: FONTS.base, fontWeight: '700' },
  sectionCount: { fontSize: FONTS.xs, fontWeight: '400', opacity: .7 },

  lineCard: {
    flexDirection: 'row', borderRadius: RADIUS.xl,
    borderWidth: 1.5, overflow: 'hidden',
  },
  lineAccent: { width: 5 },
  lineBody: { flex: 1, padding: SPACE.md },
  lineTop: { flexDirection: 'row', alignItems: 'center', gap: SPACE.sm, marginBottom: SPACE.sm },
  lineBadge: { paddingHorizontal: SPACE.md, paddingVertical: 4, borderRadius: RADIUS.full },
  lineBadgeText: { color: '#fff', fontSize: FONTS.xs, fontWeight: '800' },
  lineRoute: { flex: 1, fontSize: FONTS.sm, fontWeight: '600' },
  lineMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACE.xs },
  metaChip: {
    flexDirection: 'row', alignItems: 'center', gap: SPACE.xs,
    paddingHorizontal: SPACE.sm, paddingVertical: 2,
    backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: RADIUS.full,
  },
  metaChipText: { fontSize: FONTS.xs },
  freqDot: { width: 6, height: 6, borderRadius: 3 },
  focusHint: { fontSize: FONTS.xs, fontWeight: '600', marginTop: SPACE.xs },

  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: FONTS.md },
});
