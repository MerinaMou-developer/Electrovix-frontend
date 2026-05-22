import React from "react";
import { Link } from "react-router-dom";
import { FaBolt, FaShieldAlt, FaTruck } from "react-icons/fa";

function AuthLayout({
  title,
  subtitle,
  children,
  illustration = "/images/login-rafiki.png",
  illustrationAlt = "Authentication",
  maxWidth = "max-w-md",
}) {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Brand panel */}
        <div className="hidden lg:flex flex-col justify-center auth-panel-gradient rounded-3xl p-10 xl:p-12 text-white shadow-card-hover min-h-[520px] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-accent/20 blur-2xl" />

          <Link to="/" className="relative flex items-center gap-3 no-underline text-white mb-8">
            <span className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center text-lg font-black border border-white/20">
              E
            </span>
            <span className="text-2xl font-extrabold tracking-tight">Electrovix</span>
          </Link>

          <h2 className="relative text-3xl xl:text-4xl font-bold leading-tight mb-4">
            Smart shopping for modern electronics
          </h2>
          <p className="relative text-white/75 text-base leading-relaxed mb-10 max-w-md">
            Sign in to track orders, save your cart, and get personalized recommendations from our AI assistant.
          </p>

          <ul className="relative space-y-4 mb-10">
            {[
              [FaShieldAlt, "Secure checkout & SSL payment"],
              [FaTruck, "Fast delivery on qualifying orders"],
              [FaBolt, "AI-powered product discovery"],
            ].map(([Icon, text]) => (
              <li key={text} className="flex items-center gap-3 text-sm text-white/90">
                <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>

          {illustration && (
            <img
              src={illustration}
              alt={illustrationAlt}
              className="relative w-full max-w-sm mx-auto drop-shadow-2xl opacity-95"
            />
          )}
        </div>

        {/* Form panel */}
        <div className={`w-full ${maxWidth} mx-auto lg:mx-0 lg:ml-auto`}>
          <div className="auth-form-card rounded-3xl p-8 md:p-10 shadow-card-hover border border-accent-light/50 bg-white relative">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
              <span className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-sm font-black text-white">
                E
              </span>
              <span className="text-xl font-bold text-primary-dark">Electrovix</span>
            </div>

            <div className="text-center lg:text-left mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-primary-dark tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted text-sm md:text-base mt-2">{subtitle}</p>
              )}
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
