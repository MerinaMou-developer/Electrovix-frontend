import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaHeart } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/90 mt-16 rounded-t-4xl">
      <div className="container mx-auto px-4 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-white no-underline">
              <span className="w-9 h-9 rounded-2xl bg-cta-gradient flex items-center justify-center text-sm font-black shadow-pill">E</span>
              Electrovix
            </Link>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs">
              Your trusted electronics store — quality products, secure checkout, and reliable delivery.
            </p>
          </div>
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Shop</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-white/60 hover:text-white no-underline">All products</Link></li>
              <li><Link to="/products?filter_by=discount" className="text-white/60 hover:text-white no-underline">Deals</Link></li>
              <li><Link to="/cart" className="text-white/60 hover:text-white no-underline">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Company</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-white/60 hover:text-white no-underline">About</Link></li>
              <li><Link to="/contact" className="text-white/60 hover:text-white no-underline">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h5>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/60">
                <FaEnvelope className="w-4 h-4 shrink-0" />
                <a href="mailto:support@electrovix.com" className="hover:text-white no-underline">support@electrovix.com</a>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <FaPhone className="w-4 h-4 shrink-0" />
                <a href="tel:+8801234567890" className="hover:text-white no-underline">+880 123 456 7890</a>
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              {[
                [FaFacebookF, "Facebook"],
                [FaTwitter, "Twitter"],
                [FaInstagram, "Instagram"],
                [FaLinkedinIn, "LinkedIn"],
              ].map(([Icon, label]) => (
                <button
                  key={label}
                  type="button"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors border-0 cursor-pointer text-white"
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-white/50">
          <p>© {currentYear} Electrovix. Made with <FaHeart className="inline w-3 h-3 text-red-400" /> for shoppers.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-white no-underline">Privacy</Link>
            <Link to="/" className="hover:text-white no-underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
