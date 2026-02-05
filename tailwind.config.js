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
        "nav-dark": "#0c1222",
        "nav-gradient-from": "#0f172a",
        "nav-gradient-to": "#1e1b4b",
      },
      backgroundImage: {
        "body-gradient": "linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #f8fafc 100%)",
        "nav-gradient": "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
        "mesh-gradient": "radial-gradient(at 40% 20%, rgba(245, 158, 11, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(99, 102, 241, 0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(245, 158, 11, 0.05) 0px, transparent 50%)",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(15, 23, 42, 0.06), 0 10px 20px -2px rgba(15, 23, 42, 0.04)",
        card: "0 4px 14px -2px rgba(15, 23, 42, 0.08), 0 4px 8px -4px rgba(15, 23, 42, 0.04)",
        "card-hover": "0 25px 50px -12px rgba(15, 23, 42, 0.2), 0 0 0 1px rgba(245, 158, 11, 0.1)",
        glow: "0 0 24px rgba(245, 158, 11, 0.25)",
        "hero-overlay": "inset 0 0 80px 40px rgba(15, 23, 42, 0.6)",
        "nav-shadow": "0 4px 30px rgba(0, 0, 0, 0.25)",
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
