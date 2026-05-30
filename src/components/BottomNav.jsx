import { Home, DirectionsBus, ConfirmationNumber, CreditCard } from "@mui/icons-material";

export default function BottomNav({ current, onChange }) {
  const tabs = [
    { name: "Accueil", icon: <Home />, path: "/" },
    { name: "Réseau", icon: <DirectionsBus />, path: "/reseau" },
    { name: "Billet", icon: <ConfirmationNumber />, path: "/billet" },
    { name: "MesTitres", icon: <CreditCard />, path: "/titres" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-2">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => onChange(tab.name)}
          className={lex flex-col items-center text-sm }
        >
          {tab.icon}
          <span>{tab.name}</span>
        </button>
      ))}
    </nav>
  );
}
