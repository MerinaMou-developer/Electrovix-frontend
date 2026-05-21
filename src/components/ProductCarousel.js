import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import { FaChevronLeft, FaChevronRight, FaShoppingBag, FaStar } from "react-icons/fa";
import { getProductImageUrl } from "../config";

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
    const id = setInterval(() => setIndex((i) => (i + 1) % products.length), 5500);
    return () => clearInterval(id);
  }, [products.length]);

  const goTo = (delta) => {
    if (products.length <= 1) return;
    setIndex((i) => {
      const n = products.length;
      return ((i + delta) % n + n) % n;
    });
  };

  if (loading) {
    return (
      <section className="w-full rounded-2xl bg-white border border-accent-light/60 shadow-card min-h-[320px] flex items-center justify-center">
        <Loader />
      </section>
    );
  }
  if (error) return <Message variant="danger">{error}</Message>;
  if (!products?.length) return null;

  const current = products[index];

  return (
    <section className="relative w-full rounded-2xl overflow-hidden bg-white border border-accent-light/60 shadow-card">
      {/* Slide content */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[360px] md:min-h-[400px]">
        {/* Product image — larger, no nested box */}
        <div className="relative flex items-center justify-center min-h-[220px] md:min-h-0 bg-gradient-to-br from-accent-pale via-white to-white order-2 md:order-1 overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 30% 50%, rgba(176, 190, 197, 0.35) 0%, transparent 55%)",
            }}
          />
          <Link
            to={`/product/${current._id}`}
            className="relative z-10 flex items-center justify-center w-full h-full p-6 md:p-10 lg:p-12 group"
          >
            <img
              key={current._id}
              src={getProductImageUrl(current.image)}
              alt={current.name}
              className="w-full max-w-[280px] md:max-w-[340px] lg:max-w-[400px] max-h-[200px] md:max-h-[280px] lg:max-h-[320px] object-contain drop-shadow-lg group-hover:scale-[1.03] transition-transform duration-500 animate-fade-in-fast"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/500x500?text=Product";
              }}
            />
          </Link>
        </div>

        {/* Copy + CTA */}
        <div className="flex flex-col justify-center px-6 sm:px-10 md:px-10 lg:px-14 py-8 md:py-10 order-1 md:order-2 border-t md:border-t-0 md:border-l border-accent-light/40">
          <div key={index} className="animate-fade-in-fast">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-amber-200/80">
                <FaStar className="w-3 h-3" /> Top rated
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                Featured deal
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-primary-dark leading-[1.15] mb-3 line-clamp-2">
              {current.name}
            </h1>

            <p className="text-muted text-sm leading-relaxed mb-5 max-w-md hidden sm:block">
              Fast delivery, secure checkout, and genuine electronics — shop with confidence.
            </p>

            <div className="flex flex-wrap items-end gap-x-4 gap-y-1 mb-6">
              <span className="text-3xl lg:text-4xl font-bold text-primary-dark tracking-tight">
                ৳{current.price}
              </span>
              {current.numReviews > 0 && (
                <span className="text-sm text-muted pb-1">
                  <span className="text-amber-600 font-semibold">★ {current.rating}</span>
                  <span className="text-muted/80"> · {current.numReviews} reviews</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to={`/product/${current._id}`} className="btn-primary no-underline text-sm md:text-base">
                <FaShoppingBag className="w-4 h-4" /> Shop now
              </Link>
              <Link to="/products" className="btn-outline no-underline text-sm">
                Browse all
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows — on full hero, not inside image only */}
      {products.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(-1)}
            className="absolute left-3 bottom-[4.5rem] md:bottom-auto md:left-4 md:top-1/2 md:-translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/95 backdrop-blur border border-accent-light shadow-card flex items-center justify-center text-primary-dark hover:bg-white transition-all"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(1)}
            className="absolute right-3 bottom-[4.5rem] md:bottom-auto md:right-4 md:top-1/2 md:-translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/95 backdrop-blur border border-accent-light shadow-card flex items-center justify-center text-primary-dark hover:bg-white transition-all"
            aria-label="Next slide"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>

          {/* Dots — centered on whole card */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-20">
            {products.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === index
                    ? "h-2 w-7 bg-primary-dark"
                    : "h-2 w-2 bg-accent-light hover:bg-primary/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default ProductCarousel;
