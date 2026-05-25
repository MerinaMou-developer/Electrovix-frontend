import React from "react";
import { Link } from "react-router-dom";
import { FaTag, FaArrowRight } from "react-icons/fa";

function DealsBanner() {
  return (
    <section className="py-6">
      <Link
        to="/products?filter_by=discount"
        className="group flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-4xl bg-cta-gradient p-6 md:p-8 text-white shadow-card hover:shadow-card-hover transition-all no-underline"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <FaTag className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold">Limited-time deals</h3>
            <p className="text-white/80 text-sm mt-1">Save on laptops, phones & accessories</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 font-semibold bg-white text-primary px-5 py-3 rounded-2xl group-hover:bg-accent-pale transition-colors shrink-0">
          Shop deals <FaArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </Link>
    </section>
  );
}

export default DealsBanner;
