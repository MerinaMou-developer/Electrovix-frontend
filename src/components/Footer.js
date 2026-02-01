import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-primary text-gray-200 pt-8 pb-6 text-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h5 className="text-white uppercase font-bold mb-3 border-b-2 border-yellow-400 inline-block pb-1">About Us</h5>
            <p className="text-gray-300 leading-relaxed">
              YourStore is your one-stop destination for the best shopping experience. We provide high-quality products at unbeatable prices with fast delivery services.
            </p>
          </div>
          <div>
            <h5 className="text-white uppercase font-bold mb-3 border-b-2 border-yellow-400 inline-block pb-1">Quick Links</h5>
            <ul className="list-none space-y-1">
              <li><a href="/shop" className="text-gray-300 hover:text-yellow-400 no-underline">Shop</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-yellow-400 no-underline">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-yellow-400 no-underline">Contact Us</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-yellow-400 no-underline">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white uppercase font-bold mb-3 border-b-2 border-yellow-400 inline-block pb-1">Contact Us</h5>
            <p className="text-gray-300 flex items-center gap-2"><FaEnvelope /> support@yourstore.com</p>
            <p className="text-gray-300 flex items-center gap-2"><FaPhone /> +123 456 7890</p>
            <h6 className="text-white mt-4 mb-2">Follow Us</h6>
            <div className="flex gap-3">
              <a href="https://facebook.com" className="text-gray-300 hover:text-yellow-400" aria-label="Facebook"><FaFacebook size={24} /></a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-yellow-400" aria-label="Twitter"><FaTwitter size={24} /></a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-yellow-400" aria-label="Instagram"><FaInstagram size={24} /></a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-yellow-400" aria-label="LinkedIn"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>
        <hr className="border-gray-600 my-4" />
        <div className="text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} YourStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
