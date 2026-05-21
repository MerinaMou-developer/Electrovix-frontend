import React, { useState } from "react";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="py-12 md:py-14 rounded-3xl px-6 md:px-12 bg-hero-gradient text-white shadow-card-hover border border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-mesh-gradient pointer-events-none" />
      <div className="relative z-10 max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 border border-white/25 text-accent-light mb-5">
          <FaEnvelope className="w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Stay in the Loop</h2>
        <p className="text-accent-pale/90 text-sm md:text-base mb-8">
          Exclusive offers, new arrivals, and tech news — no spam, unsubscribe anytime.
        </p>
        {submitted ? (
          <p className="text-accent-light font-semibold text-lg">Thanks for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-light shadow-inner"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-primary hover:bg-accent-pale font-bold transition-all shadow-lg hover:shadow-glow"
            >
              <FaPaperPlane className="w-4 h-4" /> Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default NewsletterSignup;
