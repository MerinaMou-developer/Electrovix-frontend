/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      colors: {
        /* Tech Savvy palette */
        primary: "#0D47A1",
        "primary-light": "#1976D2",
        "primary-mid": "#42A5F5",
        "primary-dark": "#0A3D8F",
        accent: "#42A5F5",
        "accent-light": "#90CAF9",
        "accent-dark": "#1976D2",
        "accent-pale": "#E1F5FE",
        surface: "#E1F5FE",
        "surface-muted": "#F0F9FF",
        "nav-dark": "#0D47A1",
        "nav-gradient-from": "#0D47A1",
        "nav-gradient-to": "#1976D2",
      },
      backgroundImage: {
        "body-gradient":
          "linear-gradient(180deg, #E1F5FE 0%, #F0F9FF 40%, #ffffff 100%)",
        "nav-gradient":
          "linear-gradient(135deg, #0D47A1 0%, #1976D2 55%, #0D47A1 100%)",
        "hero-gradient":
          "linear-gradient(135deg, #0D47A1 0%, #1976D2 50%, #42A5F5 100%)",
        "deals-gradient":
          "linear-gradient(135deg, #1976D2 0%, #42A5F5 50%, #90CAF9 100%)",
        "mesh-gradient":
          "radial-gradient(at 20% 10%, rgba(66, 165, 245, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(25, 118, 210, 0.1) 0px, transparent 50%), radial-gradient(at 0% 80%, rgba(144, 202, 249, 0.2) 0px, transparent 50%)",
        "card-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(225,245,254,0.6) 100%)",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(13, 71, 161, 0.08), 0 10px 20px -2px rgba(13, 71, 161, 0.05)",
        card: "0 4px 20px -4px rgba(13, 71, 161, 0.12), 0 2px 8px -2px rgba(13, 71, 161, 0.06)",
        "card-hover":
          "0 20px 40px -12px rgba(13, 71, 161, 0.2), 0 0 0 1px rgba(66, 165, 245, 0.15)",
        glow: "0 0 28px rgba(66, 165, 245, 0.35)",
        "nav-shadow": "0 4px 24px rgba(13, 71, 161, 0.25)",
        "inner-glow": "inset 0 1px 0 rgba(255, 255, 255, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-fast": "fadeIn 0.35s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
