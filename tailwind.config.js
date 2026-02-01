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
        primary: "#0f172a",
        "primary-light": "#1e293b",
        "primary-dark": "#020617",
        accent: "#f59e0b",
        "accent-light": "#fbbf24",
        "accent-dark": "#d97706",
        teal: "#0d9488",
        "teal-light": "#14b8a6",
        surface: "#f8fafc",
        "surface-warm": "#fefce8",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(15, 23, 42, 0.06), 0 10px 20px -2px rgba(15, 23, 42, 0.04)",
        card: "0 4px 14px -2px rgba(15, 23, 42, 0.08), 0 4px 8px -4px rgba(15, 23, 42, 0.04)",
        "card-hover": "0 25px 50px -12px rgba(15, 23, 42, 0.15)",
        glow: "0 0 24px rgba(245, 158, 11, 0.2)",
        "hero-overlay": "inset 0 0 80px 40px rgba(15, 23, 42, 0.6)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-fast": "fadeIn 0.35s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideInRight: { "0%": { opacity: "0", transform: "translateX(30px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
      },
    },
  },
  plugins: [],
};
