export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sunubus: {
          blue: "#2563eb",   // Bleu principal
          indigo: "#4f46e5", // Indigo pour titres
          green: "#16a34a",  // Vert pour solde
          gray: "#6b7280",   // Gris pour texte secondaire
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 6px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
}
