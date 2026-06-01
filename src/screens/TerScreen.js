import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { TER_TARIFS, TER_ABONNEMENTS } from '../data/transportData';
import { COLORS, LIGHT, DARK, FONTS, SPACE, RADIUS } from '../utils/theme';
export default function TerScreen({ route: navRoute, navigation }) {
  const { stop } = navRoute.params || {};
  const { darkMode } = useSelector(s => s.app);
  const theme = darkMode ? DARK : LIGHT;
  const [tab, setTab] = useState('tickets');
  const [selected, setSelected] = useState(null);
  const [paid, setPaid] = useState(false);
  const tarifs = TER_TARIFS;
  return (
    <View style={{ flex:1, backgroundColor:theme.bg }}>
      <StatusBar barStyle="light-content"/>
      <LinearGradient colors={[COLORS.ter, '#047857']} style={ts.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={ts.closeBtn}>
          <Text style={{ fontSize:20, color:'#fff' }}>X</Text>
        </TouchableOpacity>
        <Text style={{ fontSize:28 }}>{'🚆'}</Text>
        <Text style={ts.title}>Billetterie TER</Text>
      </LinearGradient>
      <View style={ts.tabs}>
        {['tickets','abonnements'].map(t => (
          <TouchableOpacity key={t} onPress={() => { setTab(t); setSelected(null); setPaid(false); }}
            style={[ts.tab, tab===t && { backgroundColor:'#ECFDF5' }]}>
            <Text style={{ color: tab===t ? '#059669' : theme.textSec, fontSize:13, fontWeight:'600' }}>
              {t==='tickets' ? 'Tickets' : 'Abonnements'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={{ padding:16, paddingBottom:60 }}>
        {!paid ? (
          <>
            {(tab==='tickets' ? tarifs : TER_ABONNEMENTS).map((item,i) => (
              <TouchableOpacity key={i} onPress={() => setSelected(item)}
                style={[ts.card, { backgroundColor:theme.bgCard, borderColor:selected===item?'#059669':theme.border },
                  selected===item && { backgroundColor:'#ECFDF5' }]}>
                <Text style={{ fontSize:22 }}>{'🎫'}</Text>
                <View style={{ flex:1 }}>
                  <Text style={{ fontSize:14, fontWeight:'600', color:theme.text }}>{tab==='tickets' ? item.from+' - '+item.to : item.label}</Text>
                  <Text style={{ fontSize:11, color:theme.textMuted, marginTop:2 }}>{tab==='tickets' ? 'Aller simple' : '30 jours'}</Text>
                </View>
                <Text style={{ fontSize:17, fontWeight:'700', color:'#059669' }}>{item.prix.toLocaleString()} F</Text>
              </TouchableOpacity>
            ))}
            {selected && (
              <TouchableOpacity onPress={() => { setTimeout(()=>setPaid(true),1200); }} style={ts.buyBtn}>
                <Text style={{ color:'#fff', fontSize:15, fontWeight:'700' }}>Acheter - {selected.prix.toLocaleString()} FCFA</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <View style={{ alignItems:'center', paddingTop:32 }}>
            <Text style={{ fontSize:20, fontWeight:'700', color:'#059669', marginBottom:20 }}>Paiement confirme !</Text>
            <View style={{ padding:20, backgroundColor:'#fff', borderRadius:20, borderWidth:3, borderColor:'#059669', marginBottom:16 }}>
              <Text style={{ fontSize:60 }}>{'🎫'}</Text>
            </View>
            <Text style={{ fontSize:15, fontWeight:'700', color:theme.text }}>{selected?.label || selected?.from+' - '+selected?.to}</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop:24, padding:16 }}>
              <Text style={{ color:theme.textSec }}>Fermer</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const ts = StyleSheet.create({
  header: { paddingTop:Platform.OS==='ios'?60:36, paddingBottom:24, paddingHorizontal:16, alignItems:'center' },
  closeBtn: { position:'absolute', top:Platform.OS==='ios'?60:36, right:16, padding:8 },
  title: { fontSize:24, fontWeight:'700', color:'#fff', marginTop:8 },
  tabs: { flexDirection:'row', padding:8, gap:8 },
  tab: { flex:1, padding:12, borderRadius:12, alignItems:'center' },
  card: { flexDirection:'row', alignItems:'center', gap:12, borderRadius:20, borderWidth:1.5, padding:16, marginBottom:8 },
  buyBtn: { backgroundColor:'#059669', borderRadius:20, padding:16, alignItems:'center', marginTop:12 },
});
