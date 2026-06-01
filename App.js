import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/utils/theme';

SplashScreen.preventAutoHideAsync();

// ── Splash screen animé ──────────────────────────────────────
function AnimatedSplash({ onFinish }) {
  const scale   = new Animated.Value(0.8);
  const opacity = new Animated.Value(0);
  const slideUp = new Animated.Value(30);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale,   { toValue: 1, tension: 50, friction: 6, useNativeDriver: true }),
      Animated.timing(opacity,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideUp,  { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }).start(onFinish);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
      <LinearGradient colors={[COLORS.brandMid, COLORS.brand, COLORS.brandDark]}
        style={splash.container}>
        <Animated.View style={{ transform: [{ scale }, { translateY: slideUp }], alignItems: 'center' }}>
          <View style={splash.iconWrap}>
            <Text style={splash.icon}>🚌</Text>
          </View>
          <Text style={splash.title}>SenBus</Text>
          <Text style={splash.sub}>Transport en commun · Dakar 🇸🇳</Text>
          <View style={splash.dotsRow}>
            {[0,1,2].map(i => (
              <View key={i} style={[splash.dot, i === 1 && splash.dotActive]} />
            ))}
          </View>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}

const splash = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center' },
  iconWrap: {
    width:100, height:100, borderRadius:28,
    backgroundColor:'rgba(255,255,255,0.2)',
    alignItems:'center', justifyContent:'center',
    marginBottom:20,
    shadowColor:'#000', shadowOffset:{width:0,height:8}, shadowOpacity:.2, shadowRadius:16,
  },
  icon:  { fontSize:56 },
  title: { fontSize:40, fontWeight:'800', color:'#fff', letterSpacing:-0.5 },
  sub:   { fontSize:15, color:'rgba(255,255,255,0.75)', marginTop:6 },
  dotsRow: { flexDirection:'row', gap:8, marginTop:40 },
  dot:   { width:6, height:6, borderRadius:3, backgroundColor:'rgba(255,255,255,0.35)' },
  dotActive: { backgroundColor:'#fff', width:20 },
});

// ── Root app ─────────────────────────────────────────────────
function Root() {
  const [showSplash, setShowSplash] = useState(true);

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <View style={{ flex:1 }} onLayout={onLayoutRootView}>
      <AppNavigator />
      {showSplash && (
        <AnimatedSplash onFinish={() => setShowSplash(false)} />
      )}
    </View>
  );
}

// ── Entry point ───────────────────────────────────────────────
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <Root />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
