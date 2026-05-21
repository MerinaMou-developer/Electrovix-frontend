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
    <section className="py-10 md:py-12 rounded-2xl bg-primary-dark text-white px-6 md:px-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4">
          <FaEnvelope className="w-5 h-5 text-accent-light" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Get deals in your inbox</h2>
        <p className="text-white/70 text-sm md:text-base mb-8">
          New arrivals, exclusive offers, and tech news — unsubscribe anytime.
        </p>
        {submitted ? (
          <p className="text-accent-light font-medium">Thanks for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg px-4 py-3 text-primary-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent-light"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-primary-dark font-bold hover:bg-accent-pale transition-colors"
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
