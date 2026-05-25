import React, { useState, useEffect } from "react";
import { FaRobot, FaStar, FaShoppingBag } from "react-icons/fa";

const SUGGESTIONS = ["Gaming laptop", "iPhone deals", "Wireless earbuds"];

const MOCK_PRODUCTS = [
  { name: "ASUS ROG Strix", price: "৳72,500", rating: "4.8", tag: "Top match" },
  { name: "Lenovo Legion 5", price: "৳68,900", rating: "4.6", tag: "Semantic" },
];

function HeroAIShowcase({ onOpenAI, onTryQuery }) {
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setTyping(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleChip = (text) => {
    if (onTryQuery) onTryQuery(text);
    else onOpenAI?.();
  };

  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
      {/* Purple glow */}
      <div
        className="absolute -inset-3 md:-inset-4 rounded-[2.25rem] opacity-60 blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(124, 58, 237, 0.35) 0%, transparent 70%)",
        }}
      />

      <div className="relative bg-white rounded-[1.75rem] md:rounded-[2rem] border border-primary/15 shadow-card-hover overflow-hidden">
        {/* Top accent line */}
        <div className="h-1 w-full bg-cta-gradient" />

        <div className="p-5 md:p-7">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-cta-gradient flex items-center justify-center text-white shadow-pill shrink-0">
                <FaRobot className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-ink text-base md:text-lg leading-tight">
                  Electrovix AI
                </p>
                <p className="text-xs text-muted flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Online · Semantic search ready
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider text-primary bg-accent-pale px-2.5 py-1 rounded-full border border-primary/15">
              Hybrid
            </span>
          </div>

          {/* Chat */}
          <div className="space-y-3 min-h-[140px]">
            <div className="flex gap-2 items-end">
              <span className="w-7 h-7 rounded-full bg-accent-pale flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                You
              </span>
              <div className="bg-accent-pale/90 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-ink max-w-[88%] shadow-soft">
                Best gaming laptop under ৳80,000?
              </div>
            </div>

            <div className="flex gap-2 items-end justify-end">
              <div className="bg-white border border-accent-light rounded-2xl rounded-br-md px-4 py-3 text-sm text-ink max-w-[92%] shadow-soft">
                {typing ? (
                  <span className="inline-flex gap-1 items-center text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
                  </span>
                ) : (
                  <>
                    Found <strong className="text-primary">6 matches</strong> — ASUS ROG,
                    Lenovo Legion, ranked by rating & reviews.
                  </>
                )}
              </div>
              <span className="w-7 h-7 rounded-full bg-cta-gradient flex items-center justify-center text-white shrink-0">
                <FaRobot className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {SUGGESTIONS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChip(chip)}
                className="text-xs font-semibold px-3.5 py-2 rounded-full bg-white border border-accent-light text-ink-soft hover:border-primary hover:text-primary hover:bg-accent-pale transition-all cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Mini product previews */}
          <div className="mt-5 p-3 md:p-4 rounded-2xl bg-gradient-to-br from-slate-50 via-accent-pale/40 to-white border border-accent-light/80">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-3">
              Top picks from search
            </p>
            <div className="space-y-2">
              {MOCK_PRODUCTS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => onOpenAI?.()}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-white/90 border border-white hover:border-primary/30 hover:shadow-soft transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-pale flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <FaShoppingBag className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink truncate">{p.name}</p>
                    <p className="text-xs text-muted flex items-center gap-2">
                      <span className="font-bold text-primary">{p.price}</span>
                      <span className="flex items-center gap-0.5">
                        <FaStar className="w-3 h-3 text-amber-400" />
                        {p.rating}
                      </span>
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-primary bg-accent-pale px-2 py-0.5 rounded-full shrink-0">
                    {p.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroAIShowcase;
