import React from "react";
import { Link } from "react-router-dom";
import { FaTag, FaArrowRight } from "react-icons/fa";

function DealsBanner() {
  return (
    <section className="py-8">
      <Link
        to="/products?filter_by=discount"
        className="group block rounded-3xl overflow-hidden bg-deals-gradient p-6 md:p-10 text-white shadow-card-hover hover:shadow-glow transition-all duration-300 no-underline border border-white/20"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FaTag className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Hot Deals</h3>
              <p className="text-accent-pale/90 text-sm md:text-base mt-1">Up to 50% off on selected electronics</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 font-bold text-lg md:text-xl shrink-0 bg-white/20 backdrop-blur px-5 py-3 rounded-xl border border-white/25 group-hover:bg-white group-hover:text-primary transition-all">
            Shop Deals <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </section>
  );
}

export default DealsBanner;
