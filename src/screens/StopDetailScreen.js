import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { STOPS, OPERATORS, getNextDepartures } from '../data/transportData';
import { COLORS, LIGHT, DARK, FONTS, SPACE, RADIUS } from '../utils/theme';
export default function StopDetailScreen({ route: navRoute, navigation }) {
  const { stop } = navRoute.params;
  const { darkMode } = useSelector(s => s.app);
  const theme = darkMode ? DARK : LIGHT;
  const mainOp = stop.operators[0];
  const op = OPERATORS[mainOp];
  const deps = getNextDepartures(stop.id);
  return (
    <View style={{ flex:1, backgroundColor:theme.bg }}>
      <StatusBar barStyle="light-content"/>
      <LinearGradient colors={[op.color, op.color+'CC']} style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.closeBtn}>
          <Text style={{ fontSize:20, color:'#fff' }}>X</Text>
        </TouchableOpacity>
        <Text style={{ fontSize:36, marginBottom:8 }}>{op.emoji}</Text>
        <Text style={s.name}>{stop.name}</Text>
        <Text style={s.zone}>{stop.zone}</Text>
        {stop.terConnection && (
          <TouchableOpacity style={s.terBtn} onPress={() => navigation.navigate('TER', { stop })}>
            <Text style={{ color:'#fff', fontSize:13, fontWeight:'700' }}>Billetterie TER</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
      <ScrollView contentContainerStyle={{ padding:16, paddingBottom:60 }}>
        <Text style={[s.title, { color:theme.textMuted }]}>Prochains passages</Text>
        {deps.map((d, i) => (
          <View key={i} style={[s.depCard, { backgroundColor:theme.bgCard, borderColor:theme.border }]}>
            <View style={[s.depBadge, { backgroundColor:d.color }]}>
              <Text style={{ color:'#fff', fontSize:12, fontWeight:'800' }}>{d.lineName}</Text>
            </View>
            <Text style={[s.depRoute, { color:theme.text }]} numberOfLines={1}>{d.route}</Text>
            <Text style={[s.depWait, { color:d.waitMin<=5?'#059669':d.waitMin<=15?'#d97706':'#9CA3AF' }]}>{d.waitMin} min</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  header: { paddingTop:Platform.OS==='ios'?60:36, paddingBottom:24, paddingHorizontal:16 },
  closeBtn: { alignSelf:'flex-end', padding:8, marginBottom:8 },
  name: { fontSize:24, fontWeight:'700', color:'#fff' },
  zone: { fontSize:13, color:'rgba(255,255,255,.7)', marginTop:2 },
  terBtn: { marginTop:16, backgroundColor:'rgba(255,255,255,.2)', borderRadius:12, padding:12, alignSelf:'flex-start' },
  title: { fontSize:11, fontWeight:'700', textTransform:'uppercase', letterSpacing:.8, marginBottom:12 },
  depCard: { flexDirection:'row', alignItems:'center', gap:12, borderRadius:12, borderWidth:1, padding:12, marginBottom:8 },
  depBadge: { paddingHorizontal:8, paddingVertical:3, borderRadius:4 },
  depRoute: { flex:1, fontSize:13, fontWeight:'500' },
  depWait: { fontSize:14, fontWeight:'700', minWidth:40, textAlign:'right' },
});
