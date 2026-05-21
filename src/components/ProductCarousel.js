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
    <section className="relative w-full rounded-3xl overflow-hidden shadow-card-hover border border-accent-light/30">
      <div className="grid grid-cols-1 md:grid-cols-5 min-h-[240px] md:min-h-[300px] bg-hero-gradient">
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]" />

        <div
          key={`img-${index}`}
          className="relative md:col-span-3 flex items-center justify-center p-8 md:p-10 order-2 md:order-1 z-10"
        >
          <Link to={`/product/${current._id}`} className="block w-full h-full flex items-center justify-center group">
            <div className="relative rounded-2xl bg-white/10 backdrop-blur-sm p-6 border border-white/20 animate-float">
              <img
                src={getProductImageUrl(current.image)}
                alt={current.name}
                className="max-h-[140px] md:max-h-[200px] w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Link>
        </div>

        <div className="relative md:col-span-2 flex flex-col justify-center px-6 md:px-10 py-8 md:py-10 order-1 md:order-2 z-10 text-white">
          <div key={index} className="animate-fade-in-fast">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/25 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              <FaStar className="w-3 h-3 text-accent-light" /> Top Rated
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold leading-tight mb-2 line-clamp-2">
              {current.name}
            </h2>
            <p className="text-accent-pale text-sm mb-1">Premium tech · Fast delivery</p>
            <p className="text-2xl md:text-3xl font-bold text-accent-light mb-5">৳{current.price}</p>
            <Link
              to={`/product/${current._id}`}
              className="inline-flex items-center gap-2 bg-white text-primary hover:bg-accent-pale font-bold py-3 px-6 rounded-xl text-sm transition-all duration-200 w-fit no-underline shadow-lg hover:shadow-glow"
            >
              <FaShoppingBag className="w-4 h-4" /> Shop Now
            </Link>
          </div>

          {products.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 flex items-center justify-center text-white transition-all z-20"
                aria-label="Previous"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 flex items-center justify-center text-white transition-all z-20"
                aria-label="Next"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {products.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all ${
                i === index ? "h-2 w-8 bg-white shadow-glow" : "h-2 w-2 bg-white/40 hover:bg-white/70"
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
