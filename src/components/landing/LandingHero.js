import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaRobot, FaSearch, FaBolt } from "react-icons/fa";
import HeroAIShowcase from "./HeroAIShowcase";

function LandingHero({ onOpenAI, onTryQuery }) {
  return (
    <section className="hero-full-width relative bg-hero-mesh pt-10 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute top-0 right-0 w-[min(520px,55vw)] h-[min(520px,55vw)] rounded-full bg-primary/10 blur-3xl -translate-y-1/3 translate-x-1/4" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary-light/15 blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="animate-slide-up max-w-xl lg:max-w-none">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider shadow-soft mb-6">
              <FaBolt className="w-3.5 h-3.5" />
              AI-powered shopping
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-ink leading-[1.1] tracking-tight">
              Discover tech that{" "}
              <span className="text-transparent bg-clip-text bg-cta-gradient">
                actually fits
              </span>{" "}
              you
            </h1>
            <p className="mt-5 text-lg text-ink-soft max-w-lg leading-relaxed">
              Electrovix combines smart search, semantic product matching, and an AI assistant
              so you find laptops, phones, and gear in seconds—not hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary text-base px-8 py-4">
                Start shopping
                <FaArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={onOpenAI}
                className="btn-outline text-base px-8 py-4 border-primary/40"
              >
                <FaRobot className="w-4 h-4" />
                Ask AI assistant
              </button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 text-sm text-muted max-w-md">
              <div className="glass-card p-4 text-center sm:text-left sm:pl-5">
                <p className="text-2xl font-bold text-ink">10k+</p>
                <p className="text-xs mt-0.5">Happy shoppers</p>
              </div>
              <div className="glass-card p-4 text-center sm:text-left sm:pl-5">
                <p className="text-2xl font-bold text-ink">500+</p>
                <p className="text-xs mt-0.5">Products</p>
              </div>
              <div className="glass-card p-4 text-center sm:text-left sm:pl-5 col-span-3 sm:col-span-1">
                <p className="text-xl font-bold text-ink flex items-center justify-center sm:justify-start gap-1">
                  <FaSearch className="w-4 h-4 text-primary" />
                  Hybrid AI
                </p>
                <p className="text-xs mt-0.5">Keyword + semantic</p>
              </div>
            </div>
          </div>

          <div className="animate-fade-in lg:pt-2">
            <HeroAIShowcase onOpenAI={onOpenAI} onTryQuery={onTryQuery} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
