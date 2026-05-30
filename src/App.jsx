import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import Accueil from "./pages/Accueil";
import Billet from "./pages/Billet";
import MesTitres from "./pages/MesTitres";
import Reseau from "./pages/Reseau";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/billet" element={<Billet />} />
          <Route path="/titres" element={<MesTitres />} />
          <Route path="/reseau" element={<Reseau />} />
        </Routes>
      </Router>
    </Provider>
  );
}
