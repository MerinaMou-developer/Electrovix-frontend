import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import { FaChevronLeft, FaChevronRight, FaShoppingBag, FaTruck, FaShieldAlt } from "react-icons/fa";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

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
    <section className="relative w-full rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-card-hover">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[340px] md:min-h-[400px]">
        {/* Left: pure white product shot — like major e‑commerce sites */}
        <div key={`img-${index}`} className="relative order-2 md:order-1 bg-white flex items-center justify-center p-8 md:p-12 border-r border-slate-100">
          <Link to={`/product/${current._id}`} className="block w-full h-full flex items-center justify-center group">
            <img
              src={`${BASE_URL}${current.image}`}
              alt={current.name}
              className="max-h-[200px] md:max-h-[260px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
        </div>

        {/* Right: dark panel with clear hierarchy + CTA */}
        <div className="relative order-1 md:order-2 bg-gradient-to-b from-primary to-primary-dark flex flex-col justify-center px-6 md:px-12 py-8 md:py-12">
          <div key={index} className="animate-fade-in-fast">
            <span className="inline-block bg-accent text-white font-bold text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded mb-4">
              Featured
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-2">
              {current.name}
            </h2>
            <p className="text-slate-300 text-base md:text-lg mb-5">
              ৳{current.price} — Fast delivery & secure payment
            </p>
            <Link
              to={`/product/${current._id}`}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-glow w-fit no-underline"
            >
              <FaShoppingBag className="w-4 h-4" /> Shop Now
            </Link>
            <div className="mt-5 flex items-center gap-4 text-slate-400 text-xs">
              <span className="flex items-center gap-1.5">
                <FaTruck className="w-3.5 h-3.5 text-accent" /> Free delivery over ৳500
              </span>
              <span className="flex items-center gap-1.5">
                <FaShieldAlt className="w-3.5 h-3.5 text-accent" /> Secure payment
              </span>
            </div>
          </div>

          {products.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10"
                aria-label="Next slide"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Pagination dots — active orange, inactive dark gray */}
      {products.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? "h-2 w-8 bg-accent"
                  : "h-2 w-2 bg-slate-500 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductCarousel;
