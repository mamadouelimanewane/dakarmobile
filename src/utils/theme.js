import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// ── Opérateurs ───────────────────────────────────────────────
export const OPERATORS = {
  DDD:  { id:'DDD',  name:'DDD',  fullName:'Dakar Dem Dikk',        emoji:'🚌', color:'#1a56db', light:'#EFF6FF', dark:'#1e3a8a' },
  AFTU: { id:'AFTU', name:'AFTU', fullName:'AFTU Car Rapide',        emoji:'🚐', color:'#e11d48', light:'#FFF1F2', dark:'#9f1239' },
  BRT:  { id:'BRT',  name:'BRT',  fullName:'Bus Rapid Transit',      emoji:'🚍', color:'#7c3aed', light:'#F5F3FF', dark:'#4c1d95' },
  TER:  { id:'TER',  name:'TER',  fullName:'Train Express Régional', emoji:'🚆', color:'#059669', light:'#ECFDF5', dark:'#064e3b' },
};

// ── Palette de couleurs ──────────────────────────────────────
export const COLORS = {
  // Brand
  brand:       '#1a56db',
  brandDark:   '#1e40af',
  brandLight:  '#EFF6FF',
  brandMid:    '#3B82F6',

  // Neutres
  white:       '#FFFFFF',
  black:       '#000000',

  // Gris (light mode)
  gray50:      '#F9FAFB',
  gray100:     '#F3F4F6',
  gray200:     '#E5E7EB',
  gray300:     '#D1D5DB',
  gray400:     '#9CA3AF',
  gray500:     '#6B7280',
  gray600:     '#4B5563',
  gray700:     '#374151',
  gray800:     '#1F2937',
  gray900:     '#111827',

  // Succès
  success:     '#059669',
  successLight:'#ECFDF5',

  // Danger
  danger:      '#DC2626',
  dangerLight: '#FEF2F2',

  // Warning
  warning:     '#D97706',
  warningLight:'#FFFBEB',

  // Transport
  ddd:         '#1a56db',
  aftu:        '#e11d48',
  brt:         '#7c3aed',
  ter:         '#059669',
};

// ── Thème light ──────────────────────────────────────────────
export const LIGHT = {
  bg:          '#F8FAFF',
  bgCard:      '#FFFFFF',
  bgSecondary: '#F0F4FF',
  bgTertiary:  '#E4ECFF',
  text:        '#0F172A',
  textSec:     '#475569',
  textMuted:   '#94A3B8',
  textOnBrand: '#FFFFFF',
  border:      'rgba(26,86,219,0.12)',
  borderStrong:'rgba(26,86,219,0.25)',
  shadow:      '#1a56db',
  tabBar:      '#FFFFFF',
  header:      '#1a56db',
};

// ── Thème dark ───────────────────────────────────────────────
export const DARK = {
  bg:          '#0f1117',
  bgCard:      '#161b27',
  bgSecondary: '#1e2435',
  bgTertiary:  '#252d42',
  text:        '#F1F5F9',
  textSec:     '#94A3B8',
  textMuted:   '#475569',
  textOnBrand: '#FFFFFF',
  border:      'rgba(96,165,250,0.15)',
  borderStrong:'rgba(96,165,250,0.3)',
  shadow:      '#000000',
  tabBar:      '#161b27',
  header:      '#0f1117',
};

// ── Typography ───────────────────────────────────────────────
export const FONTS = {
  // Tailles
  xs:   11,
  sm:   12,
  base: 14,
  md:   15,
  lg:   17,
  xl:   20,
  '2xl':24,
  '3xl':28,
  '4xl':34,

  // Line heights
  tight:   1.2,
  snug:    1.4,
  normal:  1.6,
  relaxed: 1.8,
};

// ── Spacing ──────────────────────────────────────────────────
export const SPACE = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  '2xl':24,
  '3xl':32,
  '4xl':40,
  '5xl':48,
};

// ── Border radius ────────────────────────────────────────────
export const RADIUS = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  '2xl':24,
  full:9999,
};

// ── Ombres ───────────────────────────────────────────────────
export const shadow = (color = '#000', elevation = 4) => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: elevation / 2 },
  shadowOpacity: 0.12,
  shadowRadius: elevation,
  elevation,
});

export const shadowBrand = {
  shadowColor: COLORS.brand,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.35,
  shadowRadius: 12,
  elevation: 8,
};

// ── Dimensions ───────────────────────────────────────────────
export const SCREEN = { W: SCREEN_W, H: SCREEN_H };
export const IS_IOS = Platform.OS === 'ios';
export const TAB_BAR_H = IS_IOS ? 88 : 68;
export const HEADER_H  = IS_IOS ? 100 : 80;
