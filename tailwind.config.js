/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      colors: {
        /* Modern Minimalist */
        primary: "#455A64",
        "primary-light": "#546E7A",
        "primary-dark": "#263238",
        accent: "#455A64",
        "accent-light": "#B0BEC5",
        "accent-dark": "#37474F",
        "accent-pale": "#F7F7F7",
        surface: "#FFFFFF",
        "surface-muted": "#F7F7F7",
        muted: "#78909C",
        "nav-dark": "#263238",
      },
      backgroundImage: {
        "body-gradient": "linear-gradient(180deg, #F7F7F7 0%, #FFFFFF 100%)",
        "hero-panel": "linear-gradient(135deg, #FFFFFF 0%, #F7F7F7 100%)",
        "deals-panel": "linear-gradient(135deg, #455A64 0%, #37474F 100%)",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(38, 50, 56, 0.06), 0 4px 12px rgba(38, 50, 56, 0.04)",
        card: "0 4px 24px -4px rgba(38, 50, 56, 0.08), 0 2px 8px -2px rgba(38, 50, 56, 0.04)",
        "card-hover": "0 12px 32px -8px rgba(38, 50, 56, 0.14)",
        glow: "0 0 0 3px rgba(69, 90, 100, 0.15)",
        "nav-shadow": "0 1px 0 rgba(176, 190, 197, 0.5), 0 4px 16px rgba(38, 50, 56, 0.06)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-fast": "fadeIn 0.35s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
