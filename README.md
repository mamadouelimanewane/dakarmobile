# SenBus Mobile v2.0 🚌
**Transport en commun à Dakar, Sénégal**

## Stack technique
- **Framework** : React Native 0.74 + Expo SDK 51
- **Navigation** : React Navigation 6 (Bottom Tabs + Stack)
- **Carte** : react-native-maps (Google Maps / Apple Maps)
- **État** : Redux Toolkit
- **UI** : Design system custom (LinearGradient, BlurView, Reanimated)
- **Build** : EAS Build (Expo Application Services)

## Structure du projet
```
senbus-app/
├── App.js                    ← Entry point + splash screen animé
├── app.json                  ← Config Expo (permissions, icônes, splash)
├── eas.json                  ← Config EAS Build (APK/IPA)
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js   ← Bottom tabs + Stack navigator
│   ├── screens/
│   │   ├── HomeScreen.js     ← Carte + arrêts proches + filtres
│   │   ├── PlanScreen.js     ← Planification itinéraire
│   │   ├── LinesScreen.js    ← Liste toutes les lignes
│   │   ├── StopsScreen.js    ← Liste tous les arrêts + favoris
│   │   ├── AlertsScreen.js   ← Alertes trafic
│   │   ├── ProfileScreen.js  ← Profil + paramètres
│   │   ├── LineDetailScreen.js ← Détail ligne + arrêts
│   │   ├── StopDetailScreen.js ← Détail arrêt + prochains passages
│   │   └── TerScreen.js      ← Billetterie TER + QR code
│   ├── store/
│   │   └── store.js          ← Redux store
│   ├── data/
│   │   └── transportData.js  ← Données DDD, AFTU, BRT, TER, POI
│   └── utils/
│       └── theme.js          ← Design system (couleurs, fonts, spacing)
```

## Installation locale

### Prérequis
- Node.js 18+
- npm ou yarn
- Expo CLI : `npm install -g @expo/cli`
- EAS CLI (pour le build APK) : `npm install -g eas-cli`

### Lancer en développement
```bash
# 1. Installer les dépendances
npm install

# 2. Lancer Expo (scanner le QR avec Expo Go)
npm start

# 3. Ou lancer directement sur Android (USB/émulateur)
npm run android

# 4. Ou sur iOS (Mac uniquement)
npm run ios
```

## Générer l'APK Android

### Option A — EAS Build (recommandé, en cloud)
```bash
# 1. Se connecter à Expo
eas login

# 2. Configurer le projet (première fois)
eas init

# 3. Build APK preview (installation directe)
eas build --platform android --profile preview

# 4. Ou build production
eas build --platform android --profile production
```
Le build se fait dans le cloud Expo (gratuit pour les builds preview).
L'APK est téléchargeable depuis https://expo.dev/accounts/[username]/projects/senbus

### Option B — Build local (nécessite Android Studio)
```bash
# 1. Générer le projet Android natif
npx expo prebuild --platform android

# 2. Builder avec Gradle
cd android && ./gradlew assembleRelease

# APK généré dans : android/app/build/outputs/apk/release/
```

## Fonctionnalités de l'app

### Écran Accueil (HomeScreen)
- Carte plein écran Google Maps / Apple Maps
- Style de carte sombre en mode nuit
- Filtres opérateurs (DDD / AFTU / BRT / TER)
- Marqueurs d'arrêts colorés par opérateur
- Tracés des lignes sur la carte
- Géolocalisation avec cercle de précision
- Cartes des arrêts à proximité (scroll horizontal)
- Pills de lignes rapides
- Bouton "Où allez-vous ?" → PlanScreen
- Bouton géoloc flottant
- Bannière de ligne focalisée

### Écran Planifier (PlanScreen)
- Saisie départ/arrivée avec autocomplete
- Suggestions arrêts + POI populaires
- Bouton "Ma position" comme départ
- Arrêt le plus proche comme destination
- Calcul itinéraire (direct ou correspondance)
- Affichage de toutes les lignes alternatives
- Historique des 5 dernières recherches
- Destinations populaires (POI Dakar)

### Écran Lignes (LinesScreen)
- Recherche dans les lignes
- Groupement par opérateur
- Fréquence + nombre d'arrêts + tarif
- Favoris (⭐)
- Clic → LineDetailScreen

### Écran Arrêts (StopsScreen)
- Recherche par nom ou quartier
- Prochains passages en temps réel (simulés)
- Favoris triés en premier
- Clic → StopDetailScreen

### Écran Alertes (AlertsScreen)
- Alertes trafic en cours
- Conseils voyageurs (heures de pointe, météo...)

### Profil (ProfileScreen)
- Mode sombre toggle
- Choix de langue (FR / WO / EN)
- Statistiques personnelles
- Gestion de l'historique

### Billetterie TER (TerScreen)
- Tickets aller simple avec tarifs réels
- Abonnements mensuels
- QR code généré après paiement
- Infos gare (horaires, services, correspondances)

## Variables d'environnement
Créer un fichier `.env` à la racine :
```
EXPO_PUBLIC_MAPS_API_KEY=votre_cle_google_maps
```

## Mise à jour des données
Modifier `src/data/transportData.js` :
- `STOPS` : ajouter/modifier des arrêts
- `LINES` (DDD/AFTU/BRT/TER) : modifier les lignes
- `POI` : lieux populaires de Dakar

## Contact
- Email : contact@senbus.sn
- GitHub : github.com/senbus/senbus-app
