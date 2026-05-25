import React from "react";
import { FaBrain, FaSearch, FaComments, FaShieldAlt } from "react-icons/fa";

const FEATURES = [
  {
    icon: FaSearch,
    title: "Hybrid search",
    desc: "Keyword matching first, then semantic similarity—find products even when wording doesn't match exactly.",
  },
  {
    icon: FaBrain,
    title: "Vector embeddings",
    desc: "Every product is embedded with MiniLM so meaning-based discovery works across your catalog.",
  },
  {
    icon: FaComments,
    title: "AI shopping assistant",
    desc: "Natural language queries like “best phone under 20k” return ranked products plus a clear answer.",
  },
  {
    icon: FaShieldAlt,
    title: "Secure checkout",
    desc: "JWT auth, SSLCommerz payments, and order tracking—built for real e-commerce, not just demos.",
  },
];

function AIFeatureShowcase() {
  return (
    <section className="py-16 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-primary font-bold text-sm uppercase tracking-wider mb-2">Why Electrovix</p>
        <h2 className="section-title">Built like a modern AI commerce product</h2>
        <p className="section-subtitle mt-3">
          The same patterns used in semantic search demos—production-ready on your stack.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="glass-card p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-accent-pale text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-ink mb-2">{title}</h3>
            <p className="text-sm text-muted leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AIFeatureShowcase;
