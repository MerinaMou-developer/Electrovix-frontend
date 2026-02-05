import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="py-12 bg-slate-800 rounded-2xl px-6 md:px-12 text-white">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 mb-4">
          <FaEnvelope className="w-6 h-6" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-2">Stay Updated</h2>
        <p className="text-slate-300 text-sm mb-6">Get exclusive offers and product updates. No spam.</p>
        {submitted ? (
          <p className="text-amber-400 font-medium">Thanks for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default NewsletterSignup;
