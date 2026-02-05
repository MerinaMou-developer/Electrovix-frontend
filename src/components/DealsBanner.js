import React from "react";
import { Link } from "react-router-dom";
import { FaTag } from "react-icons/fa";

function DealsBanner() {
  return (
    <section className="py-8">
      <Link
        to="/products?filter_by=discount"
        className="block rounded-2xl overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 md:p-8 text-white shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <FaTag className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Hot Deals</h3>
              <p className="text-amber-100 text-sm">Up to 50% off on selected items</p>
            </div>
          </div>
          <span className="font-bold text-lg md:text-xl shrink-0">Shop Deals →</span>
        </div>
      </Link>
    </section>
  );
}

export default DealsBanner;
