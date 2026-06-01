// AlertsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { LIGHT, DARK, FONTS, SPACE, RADIUS, COLORS, shadow } from '../utils/theme';

const ALERTS = [
  { id:1, type:'warning', emoji:'⚠️', title:'Travaux VDN',           desc:'Ralentissements entre Liberté VI et Grand Yoff. Prévoir +10 min sur DDD Ligne 2.',  time:'Actif jusqu\'au 15 juin', lines:['L2A','L6'], color:'#d97706' },
  { id:2, type:'info',    emoji:'ℹ️', title:'BRT — Fréquence renforcée', desc:'Ligne BRT-L1 toutes les 3 min aux heures de pointe (7h-9h et 17h-20h).', time:'Lun–Ven', lines:['BRT-L1'], color:'#1a56db' },
  { id:3, type:'success', emoji:'✅', title:'TER — Service normal',   desc:'Tous les trains circulent normalement. Prochain départ de Dakar : 08h45.', time:'Aujourd\'hui', lines:['TER-01'], color:'#059669' },
  { id:4, type:'warning', emoji:'🚧', title:'AFTU-A2 — Déviation',   desc:'Déviation par Thiaroye km 14. Prévoir +15 min.',                               time:'Depuis 06h00', lines:['A2'], color:'#d97706' },
];

const TIPS = [
  { emoji:'💡', title:'Heures de pointe', text:'7h–9h et 17h–20h. Préférez le BRT pour un trajet plus rapide.' },
  { emoji:'📱', title:'Payer sans monnaie', text:'Le TER accepte la carte bancaire et Orange Money en gare.' },
  { emoji:'🌞', title:'Météo & transport', text:'En hivernage (juil–oct), prévoir +15 min sur les lignes banlieue.' },
  { emoji:'♿', title:'Accessibilité', text:'Stations BRT et gares TER équipées pour PMR.' },
];

export function AlertsScreen() {
  const { darkMode } = useSelector(s => s.app);
  const theme = darkMode ? DARK : LIGHT;
  return (
    <View style={{ flex:1, backgroundColor:theme.bg }}>
      <StatusBar barStyle={darkMode?'light-content':'dark-content'}/>
      <View style={[sty.header, { backgroundColor:theme.bgCard, borderBottomColor:theme.border }]}>
        <Text style={[sty.headerTitle, { color:theme.text }]}>Alertes & Infos</Text>
        <Text style={[sty.headerSub, { color:theme.textMuted }]}>Mises à jour en temps réel</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding:SPACE.lg, paddingBottom:100 }}>
        <Text style={[sty.sectionLabel, { color:theme.textMuted }]}>⚠️ Alertes trafic</Text>
        {ALERTS.map(a => (
          <View key={a.id} style={[sty.alertCard, { backgroundColor:theme.bgCard, borderLeftColor:a.color, borderColor:theme.border }]}>
            <View style={sty.alertTop}>
              <Text style={{ fontSize:20 }}>{a.emoji}</Text>
              <Text style={[sty.alertTitle, { color:theme.text }]}>{a.title}</Text>
              <Text style={[sty.alertTime, { color:theme.textMuted }]}>{a.time}</Text>
            </View>
            <Text style={[sty.alertDesc, { color:theme.textSec }]}>{a.desc}</Text>
            <View style={{ flexDirection:'row', gap:SPACE.xs, marginTop:SPACE.sm }}>
              {a.lines.map(l => (
                <View key={l} style={[sty.linePill, { backgroundColor:a.color }]}>
                  <Text style={{ color:'#fff', fontSize:FONTS.xs, fontWeight:'800' }}>{l}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
        <Text style={[sty.sectionLabel, { color:theme.textMuted, marginTop:SPACE.xl }]}>💡 Conseils voyageurs</Text>
        {TIPS.map((t,i) => (
          <View key={i} style={[sty.tipCard, { backgroundColor:theme.bgCard, borderColor:theme.border }]}>
            <Text style={{ fontSize:24, marginRight:SPACE.md }}>{t.emoji}</Text>
            <View style={{ flex:1 }}>
              <Text style={[sty.tipTitle, { color:theme.text }]}>{t.title}</Text>
              <Text style={[sty.tipText, { color:theme.textSec }]}>{t.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const sty = StyleSheet.create({
  header: { paddingTop:Platform.OS==='ios'?56:32, paddingBottom:SPACE.md, paddingHorizontal:SPACE.lg, borderBottomWidth:0.5 },
  headerTitle: { fontSize:FONTS.xl, fontWeight:'700', marginBottom:2 },
  headerSub: { fontSize:FONTS.sm },
  sectionLabel: { fontSize:FONTS.xs, fontWeight:'700', textTransform:'uppercase', letterSpacing:.8, marginBottom:SPACE.md },
  alertCard: {
    borderRadius:RADIUS.xl, borderWidth:1, borderLeftWidth:4,
    padding:SPACE.lg, marginBottom:SPACE.md,
  },
  alertTop: { flexDirection:'row', alignItems:'center', gap:SPACE.sm, marginBottom:SPACE.sm },
  alertTitle: { flex:1, fontSize:FONTS.base, fontWeight:'700' },
  alertTime: { fontSize:FONTS.xs },
  alertDesc: { fontSize:FONTS.sm, lineHeight:20 },
  linePill: { paddingHorizontal:SPACE.sm, paddingVertical:2, borderRadius:RADIUS.full },
  tipCard: { flexDirection:'row', alignItems:'flex-start', borderRadius:RADIUS.xl, borderWidth:1, padding:SPACE.lg, marginBottom:SPACE.sm },
  tipTitle: { fontSize:FONTS.sm, fontWeight:'700', marginBottom:2 },
  tipText:  { fontSize:FONTS.sm, lineHeight:20 },
});

export default AlertsScreen;
