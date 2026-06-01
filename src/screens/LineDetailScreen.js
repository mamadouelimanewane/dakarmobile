// ══════════════════════════════════════════════════════════════
//  LineDetailScreen.js
// ══════════════════════════════════════════════════════════════
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { STOPS, OPERATORS, getLineStops } from '../data/transportData';
import { LIGHT, DARK, FONTS, SPACE, RADIUS, COLORS } from '../utils/theme';

export function LineDetailScreen({ route: navRoute, navigation }) {
  const { line } = navRoute.params;
  const { darkMode } = useSelector(s => s.app);
  const theme = darkMode ? DARK : LIGHT;
  const stops = getLineStops(line.id);
  const op    = OPERATORS[line.operator];

  return (
    <View style={{ flex:1, backgroundColor:theme.bg }}>
      <StatusBar barStyle="light-content"/>
      <LinearGradient colors={[line.color, line.color + 'CC']} style={lds.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={lds.closeBtn}>
          <Text style={{ fontSize:20, color:'#fff' }}>✕</Text>
        </TouchableOpacity>
        <View style={lds.badgeWrap}>
          <View style={lds.badge}><Text style={lds.badgeText}>{line.name}</Text></View>
        </View>
        <Text style={lds.title}>{line.route}</Text>
        <View style={lds.metaRow}>
          <Text style={lds.meta}>{op.emoji} {op.fullName}</Text>
          <Text style={lds.meta}>⏱ {line.freq}</Text>
          <Text style={lds.meta}>💰 {op.tarif} FCFA</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ padding:SPACE.lg, paddingBottom:60 }}>
        <Text style={[lds.sectionTitle, { color:theme.textMuted }]}>🚏 Arrêts de la ligne ({stops.length})</Text>
        {stops.map((stop, i) => (
          <View key={stop.id} style={lds.stopRow}>
            <View style={lds.stopTimeline}>
              <View style={[lds.stopDot, { backgroundColor: i===0||i===stops.length-1 ? line.color : theme.border, borderColor:line.color }]}/>
              {i < stops.length-1 && <View style={[lds.stopLine, { backgroundColor: line.color + '40' }]}/>}
            </View>
            <View style={[lds.stopCard, { backgroundColor:theme.bgCard, borderColor:theme.border }]}>
              <Text style={[lds.stopName, { color:theme.text }]}>{stop.name}</Text>
              <Text style={[lds.stopZone, { color:theme.textMuted }]}>{stop.zone}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const lds = StyleSheet.create({
  header: { paddingTop:Platform.OS==='ios'?60:36, paddingBottom:SPACE['2xl'], paddingHorizontal:SPACE.lg },
  closeBtn: { alignSelf:'flex-end', padding:SPACE.sm, marginBottom:SPACE.md },
  badgeWrap: { marginBottom:SPACE.sm },
  badge: { alignSelf:'flex-start', backgroundColor:'rgba(255,255,255,.25)', borderRadius:RADIUS.full, paddingHorizontal:SPACE.lg, paddingVertical:SPACE.sm },
  badgeText: { color:'#fff', fontSize:FONTS.xl, fontWeight:'800' },
  title: { fontSize:FONTS.lg, fontWeight:'700', color:'#fff', marginBottom:SPACE.md },
  metaRow: { flexDirection:'row', gap:SPACE.lg },
  meta: { color:'rgba(255,255,255,.85)', fontSize:FONTS.sm },
  sectionTitle: { fontSize:FONTS.xs, fontWeight:'700', textTransform:'uppercase', letterSpacing:.8, marginBottom:SPACE.lg },
  stopRow: { flexDirection:'row', gap:SPACE.md, minHeight:60 },
  stopTimeline: { width:20, alignItems:'center' },
  stopDot: { width:14, height:14, borderRadius:7, borderWidth:2, marginTop:SPACE.md },
  stopLine: { width:2, flex:1 },
  stopCard: { flex:1, borderRadius:RADIUS.lg, borderWidth:1, padding:SPACE.md, marginBottom:SPACE.sm },
  stopName: { fontSize:FONTS.base, fontWeight:'600' },
  stopZone: { fontSize:FONTS.xs, marginTop:2 },
});

// ══════════════════════════════════════════════════════════════
//  StopDetailScreen.js
// ══════════════════════════════════════════════════════════════
export function StopDetailScreen({ route: navRoute, navigation }) {
  const { stop } = navRoute.params;
  const { darkMode } = useSelector(s => s.app);
  const theme = darkMode ? DARK : LIGHT;
  const mainOp = stop.operators[0];
  const op     = OPERATORS[mainOp];
  const deps   = require('../data/transportData').getNextDepartures(stop.id);

  return (
    <View style={{ flex:1, backgroundColor:theme.bg }}>
      <StatusBar barStyle="light-content"/>
      <LinearGradient colors={[op.color, op.color+'CC']} style={sds.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={sds.closeBtn}>
          <Text style={{ fontSize:20, color:'#fff' }}>✕</Text>
        </TouchableOpacity>
        <Text style={{ fontSize:36, marginBottom:SPACE.sm }}>{op.emoji}</Text>
        <Text style={sds.name}>{stop.name}</Text>
        <Text style={sds.zone}>{stop.zone}</Text>
        <View style={{ flexDirection:'row', gap:SPACE.sm, marginTop:SPACE.md }}>
          {stop.operators.map(oid => (
            <View key={oid} style={sds.opBadge}><Text style={sds.opBadgeText}>{oid}</Text></View>
          ))}
        </View>
        {stop.terConnection && (
          <TouchableOpacity style={sds.terBtn} onPress={() => navigation.navigate('TER', { stop })}>
            <Text style={{ color:'#fff', fontSize:FONTS.sm, fontWeight:'700' }}>🚆 Billetterie TER →</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>

      <ScrollView contentContainerStyle={{ padding:SPACE.lg, paddingBottom:60 }}>
        <Text style={[sds.sectionTitle, { color:theme.textMuted }]}>Prochains passages</Text>
        {deps.map((d, i) => (
          <View key={i} style={[sds.depCard, { backgroundColor:theme.bgCard, borderColor:theme.border }]}>
            <View style={[sds.depBadge, { backgroundColor:d.color }]}>
              <Text style={{ color:'#fff', fontSize:FONTS.sm, fontWeight:'800' }}>{d.lineName}</Text>
            </View>
            <Text style={[sds.depRoute, { color:theme.text }]} numberOfLines={1}>{d.route}</Text>
            <Text style={[sds.depTime, { color:theme.textSec }]}>{d.time}</Text>
            <Text style={[sds.depWait, { color:d.waitMin<=5?COLORS.success:d.waitMin<=15?COLORS.warning:COLORS.gray400 }]}>
              {d.waitMin} min
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const sds = StyleSheet.create({
  header: { paddingTop:Platform.OS==='ios'?60:36, paddingBottom:SPACE['2xl'], paddingHorizontal:SPACE.lg },
  closeBtn: { alignSelf:'flex-end', padding:SPACE.sm, marginBottom:SPACE.sm },
  name: { fontSize:FONTS['2xl'], fontWeight:'700', color:'#fff' },
  zone: { fontSize:FONTS.sm, color:'rgba(255,255,255,.7)', marginTop:2 },
  opBadge: { backgroundColor:'rgba(255,255,255,.25)', borderRadius:RADIUS.full, paddingHorizontal:SPACE.md, paddingVertical:4 },
  opBadgeText: { color:'#fff', fontSize:FONTS.xs, fontWeight:'800' },
  terBtn: { marginTop:SPACE.lg, backgroundColor:'rgba(255,255,255,.2)', borderRadius:RADIUS.lg, padding:SPACE.md, alignSelf:'flex-start' },
  sectionTitle: { fontSize:FONTS.xs, fontWeight:'700', textTransform:'uppercase', letterSpacing:.8, marginBottom:SPACE.md },
  depCard: { flexDirection:'row', alignItems:'center', gap:SPACE.md, borderRadius:RADIUS.lg, borderWidth:1, padding:SPACE.md, marginBottom:SPACE.sm },
  depBadge: { paddingHorizontal:SPACE.sm, paddingVertical:3, borderRadius:RADIUS.xs },
  depRoute: { flex:1, fontSize:FONTS.sm, fontWeight:'500' },
  depTime: { fontSize:FONTS.sm },
  depWait: { fontSize:FONTS.base, fontWeight:'700', minWidth:40, textAlign:'right' },
});

// ══════════════════════════════════════════════════════════════
//  TerScreen.js
// ══════════════════════════════════════════════════════════════
import QRCode from 'react-native-qrcode-svg';
import { TER_TARIFS, TER_ABONNEMENTS } from '../data/transportData';

export function TerScreen({ route: navRoute, navigation }) {
  const { stop } = navRoute.params || {};
  const { darkMode } = useSelector(s => s.app);
  const theme = darkMode ? DARK : LIGHT;
  const [tab, setTab] = React.useState('tickets');
  const [selected, setSelected] = React.useState(null);
  const [paid, setPaid] = React.useState(false);

  const tarifs = TER_TARIFS.filter(t => t.from==='Dakar');
  const qrData = selected ? `TER-SN-${Date.now()}-${selected.prix}` : '';

  return (
    <View style={{ flex:1, backgroundColor:theme.bg }}>
      <StatusBar barStyle="light-content"/>
      <LinearGradient colors={[COLORS.ter, '#047857']} style={ts.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={ts.closeBtn}>
          <Text style={{ fontSize:20, color:'#fff' }}>✕</Text>
        </TouchableOpacity>
        <Text style={{ fontSize:28 }}>🚆</Text>
        <Text style={ts.title}>Billetterie TER</Text>
        {stop && <Text style={ts.sub}>Gare de {stop.terInfo?.gare}</Text>}
      </LinearGradient>

      <View style={ts.tabs}>
        {['tickets','abonnements'].map(t => (
          <TouchableOpacity key={t} onPress={() => { setTab(t); setSelected(null); setPaid(false); }}
            style={[ts.tab, tab===t && ts.tabActive]}>
            <Text style={[ts.tabText, { color: tab===t ? COLORS.success : theme.textSec }]}>
              {t==='tickets' ? '🎟️ Tickets' : '📅 Abonnements'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding:SPACE.lg, paddingBottom:60 }}>
        {!paid ? (
          <>
            {(tab==='tickets' ? tarifs : TER_ABONNEMENTS).map((item,i) => (
              <TouchableOpacity key={i} onPress={() => setSelected(item)} activeOpacity={0.85}
                style={[ts.ticketCard, { backgroundColor:theme.bgCard, borderColor:selected===item?COLORS.success:theme.border },
                  selected===item && { backgroundColor:COLORS.successLight }]}>
                <Text style={{ fontSize:22 }}>{tab==='tickets' ? '🎫' : (item.emoji||'🎟️')}</Text>
                <View style={{ flex:1 }}>
                  <Text style={[ts.ticketName, { color:theme.text }]}>{tab==='tickets' ? `${item.from} → ${item.to}` : item.label}</Text>
                  <Text style={[ts.ticketSub, { color:theme.textMuted }]}>{tab==='tickets' ? '2e classe · Aller simple' : item.trajets}</Text>
                </View>
                <Text style={ts.ticketPrice}>{(item.prix).toLocaleString()} F</Text>
              </TouchableOpacity>
            ))}
            {selected && (
              <TouchableOpacity onPress={() => { setTimeout(()=>setPaid(true),1200); }}
                style={ts.buyBtn}>
                <Text style={ts.buyBtnText}>💳 Acheter — {selected.prix.toLocaleString()} FCFA</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <View style={{ alignItems:'center', paddingTop:SPACE['3xl'] }}>
            <Text style={{ fontSize:FONTS.xl, fontWeight:'700', color:COLORS.success, marginBottom:SPACE.xl }}>✅ Paiement confirmé !</Text>
            <View style={ts.qrWrap}>
              <QRCode value={qrData} size={180} color="#000" backgroundColor="#fff"/>
            </View>
            <Text style={[ts.qrLabel, { color:theme.text }]}>{selected?.label || `${selected?.from} → ${selected?.to}`}</Text>
            <View style={ts.validBadge}><Text style={{ color:COLORS.success, fontSize:FONTS.sm, fontWeight:'700' }}>✅ Valable {tab==='abonnements'?'30 jours':'aujourd\'hui'}</Text></View>
            <Text style={[ts.qrSub, { color:theme.textMuted }]}>Présentez ce QR au contrôleur en gare</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={ts.closeQrBtn}>
              <Text style={{ color:theme.textSec, fontSize:FONTS.sm }}>Fermer</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const ts = StyleSheet.create({
  header: { paddingTop:Platform.OS==='ios'?60:36, paddingBottom:SPACE['2xl'], paddingHorizontal:SPACE.lg, alignItems:'center' },
  closeBtn: { position:'absolute', top:Platform.OS==='ios'?60:36, right:SPACE.lg, padding:SPACE.sm },
  title: { fontSize:FONTS['2xl'], fontWeight:'700', color:'#fff', marginTop:SPACE.sm },
  sub: { fontSize:FONTS.sm, color:'rgba(255,255,255,.7)', marginTop:2 },
  tabs: { flexDirection:'row', padding:SPACE.sm, gap:SPACE.sm, borderBottomWidth:0.5 },
  tab: { flex:1, padding:SPACE.md, borderRadius:RADIUS.md, alignItems:'center' },
  tabActive: { backgroundColor:COLORS.successLight },
  tabText: { fontSize:FONTS.sm, fontWeight:'600' },
  ticketCard: { flexDirection:'row', alignItems:'center', gap:SPACE.md, borderRadius:RADIUS.xl, borderWidth:1.5, padding:SPACE.lg, marginBottom:SPACE.sm },
  ticketName: { fontSize:FONTS.base, fontWeight:'600' },
  ticketSub:  { fontSize:FONTS.xs, marginTop:2 },
  ticketPrice: { fontSize:FONTS.lg, fontWeight:'700', color:COLORS.success },
  buyBtn: { backgroundColor:COLORS.success, borderRadius:RADIUS.xl, padding:SPACE.lg, alignItems:'center', marginTop:SPACE.md },
  buyBtnText: { color:'#fff', fontSize:FONTS.md, fontWeight:'700' },
  qrWrap: { padding:SPACE.xl, backgroundColor:'#fff', borderRadius:RADIUS.xl, marginBottom:SPACE.lg, borderWidth:3, borderColor:COLORS.success },
  qrLabel: { fontSize:FONTS.md, fontWeight:'700', marginBottom:SPACE.md, textAlign:'center' },
  validBadge: { backgroundColor:COLORS.successLight, borderRadius:RADIUS.full, paddingHorizontal:SPACE.xl, paddingVertical:SPACE.sm, marginBottom:SPACE.md },
  qrSub: { fontSize:FONTS.sm, textAlign:'center', marginBottom:SPACE.xl },
  closeQrBtn: { padding:SPACE.lg },
});

