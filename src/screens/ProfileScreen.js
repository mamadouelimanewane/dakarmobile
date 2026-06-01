// ══════════════════════════════════════════════════════════════
//  ProfileScreen.js
// ══════════════════════════════════════════════════════════════
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, StatusBar, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { toggleDarkMode, setLanguage, clearHistory } from '../store/store';
import { COLORS, LIGHT, DARK, FONTS, SPACE, RADIUS } from '../utils/theme';

export function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { darkMode, language, searchHistory, favoriteStops, favoriteLines } = useSelector(s => s.app);
  const theme = darkMode ? DARK : LIGHT;

  const LANGS = [{ id:'fr', label:'Français', emoji:'🇫🇷' }, { id:'wo', label:'Wolof', emoji:'🇸🇳' }, { id:'en', label:'English', emoji:'🇬🇧' }];

  const Section = ({ title, children }) => (
    <View style={{ marginBottom: SPACE.xl }}>
      <Text style={[ps.sectionTitle, { color: theme.textMuted }]}>{title}</Text>
      <View style={[ps.sectionCard, { backgroundColor: theme.bgCard, borderColor: theme.border }]}>
        {children}
      </View>
    </View>
  );

  const Row = ({ emoji, label, right, onPress, separator=true }) => (
    <TouchableOpacity onPress={onPress} disabled={!onPress} activeOpacity={onPress?0.7:1}
      style={[ps.row, separator && { borderBottomWidth:0.5, borderBottomColor: theme.border }]}>
      <Text style={{ fontSize:20 }}>{emoji}</Text>
      <Text style={[ps.rowLabel, { color: theme.text }]}>{label}</Text>
      {right}
    </TouchableOpacity>
  );

  return (
    <View style={[ps.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle="light-content"/>
      <LinearGradient colors={[COLORS.brand, COLORS.brandDark]} style={ps.profileHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={ps.backBtn}>
          <Text style={{ fontSize:20, color:'#fff' }}>←</Text>
        </TouchableOpacity>
        <View style={ps.avatar}>
          <Text style={{ fontSize:32 }}>👤</Text>
        </View>
        <Text style={ps.profileName}>Voyageur SenBus</Text>
        <Text style={ps.profileSub}>Dakar, Sénégal 🇸🇳</Text>
        <View style={ps.statsRow}>
          <View style={ps.stat}><Text style={ps.statNum}>{searchHistory.length}</Text><Text style={ps.statLbl}>Trajets</Text></View>
          <View style={ps.stat}><Text style={ps.statNum}>{favoriteStops.length}</Text><Text style={ps.statLbl}>Arrêts fav.</Text></View>
          <View style={ps.stat}><Text style={ps.statNum}>{favoriteLines.length}</Text><Text style={ps.statLbl}>Lignes fav.</Text></View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ padding: SPACE.lg, paddingBottom: 100 }}>
        <Section title="Préférences">
          <Row emoji="🌙" label="Mode sombre"
            right={<Switch value={darkMode} onValueChange={() => dispatch(toggleDarkMode())} trackColor={{ true: COLORS.brand }}/>} separator/>
          <Row emoji="🔔" label="Notifications" right={<Switch value={false} trackColor={{ true: COLORS.brand }}/>} separator={false}/>
        </Section>

        <Section title="Langue">
          {LANGS.map((l, i) => (
            <Row key={l.id} emoji={l.emoji} label={l.label} separator={i < LANGS.length - 1}
              right={language === l.id ? <Text style={{ color: COLORS.brand, fontWeight:'700' }}>✓</Text> : null}
              onPress={() => dispatch(setLanguage(l.id))}/>
          ))}
        </Section>

        <Section title="Données">
          <Row emoji="🕐" label={`Historique (${searchHistory.length} trajets)`}
            right={<Text style={{ color: COLORS.danger, fontSize: FONTS.sm }}>Effacer</Text>}
            onPress={() => dispatch(clearHistory())} separator/>
          <Row emoji="⭐" label={`${favoriteStops.length} arrêts favoris`} separator/>
          <Row emoji="🛤️" label={`${favoriteLines.length} lignes favorites`} separator={false}/>
        </Section>

        <Section title="À propos">
          <Row emoji="📱" label="SenBus v2.0.0" separator/>
          <Row emoji="🔒" label="Politique de confidentialité" onPress={() => {}} separator/>
          <Row emoji="📧" label="Contact : contact@senbus.sn" separator={false}/>
        </Section>
      </ScrollView>
    </View>
  );
}

const ps = StyleSheet.create({
  container: { flex:1 },
  profileHeader: { paddingTop:Platform.OS==='ios'?60:36, paddingBottom:SPACE['3xl'], paddingHorizontal:SPACE.lg, alignItems:'center' },
  backBtn: { position:'absolute', top:Platform.OS==='ios'?60:36, left:SPACE.lg, padding:SPACE.sm },
  avatar: { width:72, height:72, borderRadius:36, backgroundColor:'rgba(255,255,255,.2)', alignItems:'center', justifyContent:'center', marginBottom:SPACE.sm },
  profileName: { fontSize:FONTS.xl, fontWeight:'700', color:'#fff', marginBottom:2 },
  profileSub: { fontSize:FONTS.sm, color:'rgba(255,255,255,.7)', marginBottom:SPACE.xl },
  statsRow: { flexDirection:'row', gap:SPACE['3xl'] },
  stat: { alignItems:'center' },
  statNum: { fontSize:FONTS.xl, fontWeight:'700', color:'#fff' },
  statLbl: { fontSize:FONTS.xs, color:'rgba(255,255,255,.7)', marginTop:2 },
  sectionTitle: { fontSize:FONTS.xs, fontWeight:'700', textTransform:'uppercase', letterSpacing:.8, marginBottom:SPACE.sm, paddingLeft:SPACE.xs },
  sectionCard: { borderRadius:RADIUS.xl, borderWidth:1, overflow:'hidden' },
  row: { flexDirection:'row', alignItems:'center', gap:SPACE.md, paddingHorizontal:SPACE.lg, paddingVertical:SPACE.md },
  rowLabel: { flex:1, fontSize:FONTS.base },
});

export default ProfileScreen;
