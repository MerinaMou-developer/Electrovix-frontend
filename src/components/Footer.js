import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaHeart, FaGlobe } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nav-gradient text-white border-t border-white/10 mt-8">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-white no-underline hover:text-accent-light transition-colors">
              <span className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-accent-light font-black">E</span>
              Electrovix
            </Link>
            <p className="mt-4 text-accent-pale/90 text-sm leading-relaxed max-w-xs">
              Premium electronics e-commerce — fast delivery, secure checkout, and a polished experience built for shoppers worldwide.
            </p>
            <div className="mt-4 flex items-center gap-2 text-accent-light text-xs font-medium">
              <FaGlobe className="w-3.5 h-3.5" /> Serving customers globally
            </div>
            <div className="mt-6 flex gap-3">
              {[
                { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
                { href: "https://twitter.com", label: "Twitter", Icon: FaTwitter },
                { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
                { href: "https://linkedin.com", label: "LinkedIn", Icon: FaLinkedinIn },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-accent-pale hover:bg-accent hover:text-white hover:border-accent transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h5>
            <ul className="space-y-3">
              {[
                { to: "/products", label: "Shop All" },
                { to: "/cart", label: "Cart" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-accent-pale hover:text-accent-light text-sm no-underline transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Support</h5>
            <ul className="space-y-3">
              {["FAQ", "Shipping Info", "Returns", "Track Order"].map((label) => (
                <li key={label}>
                  <a href="/" className="text-accent-pale hover:text-accent-light text-sm no-underline transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h5>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-accent-pale text-sm">
                <FaEnvelope className="w-4 h-4 text-accent-light shrink-0" />
                <a href="mailto:support@electrovix.com" className="hover:text-accent-light transition-colors no-underline">
                  support@electrovix.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-accent-pale text-sm">
                <FaPhone className="w-4 h-4 text-accent-light shrink-0" />
                <a href="tel:+8801234567890" className="hover:text-accent-light transition-colors no-underline">
                  +880 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-accent-pale/80 text-sm">
            © {currentYear} Electrovix. All rights reserved. Made with{" "}
            <FaHeart className="inline-block w-3.5 h-3.5 text-accent-light" /> for shoppers.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/" className="text-accent-pale/80 hover:text-accent-light transition-colors no-underline">Terms</Link>
            <Link to="/" className="text-accent-pale/80 hover:text-accent-light transition-colors no-underline">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
