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
        primary: {
          DEFAULT: "#7C3AED",
          light: "#8B5CF6",
          dark: "#6D28D9",
          muted: "#A78BFA",
        },
        accent: {
          DEFAULT: "#7C3AED",
          light: "#EDE9FE",
          pale: "#F5F3FF",
          dark: "#5B21B6",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F8F7FC",
          card: "#FFFFFF",
        },
        muted: "#64748B",
        ink: "#1E1B4B",
        "ink-soft": "#4C4669",
      },
      backgroundImage: {
        "body-gradient": "linear-gradient(180deg, #F8F7FC 0%, #FFFFFF 50%)",
        "hero-mesh":
          "radial-gradient(ellipse 90% 70% at 15% 0%, rgba(124, 58, 237, 0.22) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 95% 15%, rgba(139, 92, 246, 0.16) 0%, transparent 50%), linear-gradient(180deg, #F3EEFF 0%, #FAFAFF 45%, #F8F7FC 100%)",
        "cta-gradient": "linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #5B21B6 100%)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,233,254,0.4) 100%)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(30, 27, 75, 0.04), 0 4px 16px rgba(124, 58, 237, 0.06)",
        card: "0 4px 24px -6px rgba(30, 27, 75, 0.08), 0 2px 8px rgba(124, 58, 237, 0.04)",
        "card-hover": "0 20px 40px -12px rgba(124, 58, 237, 0.2), 0 8px 16px -8px rgba(30, 27, 75, 0.08)",
        glow: "0 0 0 4px rgba(124, 58, 237, 0.15)",
        "nav-shadow": "0 1px 0 rgba(237, 233, 254, 0.8), 0 8px 24px rgba(30, 27, 75, 0.04)",
        pill: "0 2px 8px rgba(124, 58, 237, 0.25)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-fast": "fadeIn 0.35s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
