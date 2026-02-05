import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaHeart } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nav-gradient text-white border-t border-white/5">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-extrabold text-white no-underline hover:text-accent transition-colors">
              Electrovix
            </Link>
            <p className="mt-4 text-gray-300 text-sm leading-relaxed max-w-xs">
              Your trusted e-commerce destination. Fast delivery, secure payment, and a seamless shopping experience.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-gray-300 hover:bg-accent hover:text-white transition-all duration-200" aria-label="Facebook">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-gray-300 hover:bg-accent hover:text-white transition-all duration-200" aria-label="Twitter">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-gray-300 hover:bg-accent hover:text-white transition-all duration-200" aria-label="Instagram">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-gray-300 hover:bg-accent hover:text-white transition-all duration-200" aria-label="LinkedIn">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h5>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-gray-300 hover:text-accent text-sm no-underline transition-colors">Shop All</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text-accent text-sm no-underline transition-colors">Cart</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-accent text-sm no-underline transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-accent text-sm no-underline transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-accent text-sm no-underline transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Support</h5>
            <ul className="space-y-3">
              <li><a href="/faq" className="text-gray-300 hover:text-accent text-sm no-underline transition-colors">FAQ</a></li>
              <li><a href="/shipping" className="text-gray-300 hover:text-accent text-sm no-underline transition-colors">Shipping Info</a></li>
              <li><a href="/returns" className="text-gray-300 hover:text-accent text-sm no-underline transition-colors">Returns</a></li>
              <li><a href="/track" className="text-gray-300 hover:text-accent text-sm no-underline transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h5>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <FaEnvelope className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:support@electrovix.com" className="hover:text-accent transition-colors no-underline">support@electrovix.com</a>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <FaPhone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+8801234567890" className="hover:text-accent transition-colors no-underline">+880 123 456 7890</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Electrovix. All rights reserved. Made with <FaHeart className="inline-block w-3.5 h-3.5 text-accent" /> for shoppers.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/" className="text-gray-400 hover:text-accent transition-colors no-underline">Terms</Link>
            <Link to="/" className="text-gray-400 hover:text-accent transition-colors no-underline">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
