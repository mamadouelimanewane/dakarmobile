import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { BlurView } from 'expo-blur';
import { COLORS, LIGHT, DARK, FONTS, SPACE, RADIUS } from '../utils/theme';

// Screens
import HomeScreen      from '../screens/HomeScreen';
import PlanScreen      from '../screens/PlanScreen';
import LinesScreen     from '../screens/LinesScreen';
import StopsScreen     from '../screens/StopsScreen';
import AlertsScreen    from '../screens/AlertsScreen';
import LineDetailScreen from '../screens/LineDetailScreen';
import StopDetailScreen from '../screens/StopDetailScreen';
import TerScreen       from '../screens/TerScreen';
import ProfileScreen   from '../screens/ProfileScreen';

const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();

const TAB_ITEMS = [
  { name:'Home',   label:'Accueil', icon:'🏠', screen: HomeScreen  },
  { name:'Plan',   label:'Planifier',icon:'🗺️', screen: PlanScreen  },
  { name:'Lines',  label:'Lignes',  icon:'🛤️', screen: LinesScreen  },
  { name:'Stops',  label:'Arrêts',  icon:'🚏', screen: StopsScreen  },
  { name:'Alerts', label:'Alertes', icon:'⚠️', screen: AlertsScreen },
];

function TabIcon({ icon, label, focused, color }) {
  return (
    <View style={styles.tabItem}>
      <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>{icon}</Text>
      <Text style={[styles.tabLabel, { color }, focused && styles.tabLabelActive]}>
        {label}
      </Text>
      {focused && <View style={[styles.tabDot, { backgroundColor: color }]} />}
    </View>
  );
}

function MainTabs() {
  const { darkMode } = useSelector(s => s.app);
  const theme = darkMode ? DARK : LIGHT;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const item = TAB_ITEMS.find(t => t.name === route.name);
        return {
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            borderTopWidth: 0,
            backgroundColor: 'transparent',
            elevation: 0,
            height: Platform.OS === 'ios' ? 88 : 68,
          },
          tabBarBackground: () => (
            Platform.OS === 'ios'
              ? <BlurView intensity={80} tint={darkMode ? 'dark' : 'light'}
                  style={[StyleSheet.absoluteFill, { borderTopWidth: 0.5, borderTopColor: theme.border }]} />
              : <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.tabBar, borderTopWidth: 0.5, borderTopColor: theme.border }]} />
          ),
          tabBarActiveTintColor:   COLORS.brand,
          tabBarInactiveTintColor: theme.textMuted,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon={item?.icon} label={item?.label} focused={focused} color={color} />
          ),
        };
      }}
    >
      {TAB_ITEMS.map(item => (
        <Tab.Screen key={item.name} name={item.name} component={item.screen} />
      ))}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { darkMode } = useSelector(s => s.app);
  const theme = darkMode ? DARK : LIGHT;

  return (
    <NavigationContainer
      theme={{
        dark: darkMode,
        colors: {
          primary:    COLORS.brand,
          background: theme.bg,
          card:       theme.bgCard,
          text:       theme.text,
          border:     theme.border,
          notification: COLORS.danger,
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs"    component={MainTabs} />
        <Stack.Screen name="LineDetail"  component={LineDetailScreen}
          options={{ presentation: 'modal', gestureEnabled: true }} />
        <Stack.Screen name="StopDetail"  component={StopDetailScreen}
          options={{ presentation: 'modal', gestureEnabled: true }} />
        <Stack.Screen name="TER"         component={TerScreen}
          options={{ presentation: 'modal', gestureEnabled: true }} />
        <Stack.Screen name="Profile"     component={ProfileScreen}
          options={{ presentation: 'card' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    width: 60,
    position: 'relative',
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 2,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: FONTS.xs,
    fontWeight: '500',
  },
  tabLabelActive: {
    fontWeight: '700',
  },
  tabDot: {
    position: 'absolute',
    top: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
