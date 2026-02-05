import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import { FaChevronLeft, FaChevronRight, FaShoppingBag } from "react-icons/fa";

import { API_BASE_URL } from "../config";

function ProductCarousel() {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % products.length), 4500);
    return () => clearInterval(id);
  }, [products.length]);

  const goTo = (delta) => {
    if (products.length <= 1) return;
    setIndex((i) => {
      const n = products.length;
      return ((i + delta) % n + n) % n;
    });
  };

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!products?.length) return null;

  const current = products[index];

  return (
    <section className="relative w-full rounded-2xl overflow-hidden shadow-lg">
      {/* Compact hero: warm gradient, single row, image-focused */}
      <div className="grid grid-cols-1 md:grid-cols-5 min-h-[220px] md:min-h-[260px] bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border border-amber-200/60">
        {/* Image: 3 cols on desktop, larger and centered */}
        <div key={`img-${index}`} className="relative md:col-span-3 flex items-center justify-center p-6 md:p-8 order-2 md:order-1">
          <Link to={`/product/${current._id}`} className="block w-full h-full flex items-center justify-center group">
            <img
              src={`${API_BASE_URL}${current.image}`}
              alt={current.name}
              className="max-h-[160px] md:max-h-[200px] w-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
        </div>

        {/* Content: 2 cols, compact */}
        <div className="relative md:col-span-2 flex flex-col justify-center px-6 md:px-8 py-6 md:py-8 order-1 md:order-2">
          <div key={index} className="animate-fade-in-fast">
            <span className="inline-block bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2">
              Featured
            </span>
            <h2 className="text-lg md:text-xl font-bold text-slate-800 leading-tight mb-1 line-clamp-2">
              {current.name}
            </h2>
            <p className="text-amber-700 font-semibold text-lg mb-4">৳{current.price}</p>
            <Link
              to={`/product/${current._id}`}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 px-5 rounded-xl text-sm transition-all duration-200 w-fit no-underline"
            >
              <FaShoppingBag className="w-4 h-4" /> Shop Now
            </Link>
          </div>

          {products.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-slate-700 transition-all"
                aria-label="Previous"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-slate-700 transition-all"
                aria-label="Next"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Dots */}
      {products.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {products.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all ${
                i === index ? "h-1.5 w-6 bg-amber-600" : "h-1.5 w-1.5 bg-amber-300/60 hover:bg-amber-400"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductCarousel;
