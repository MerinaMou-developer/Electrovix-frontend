import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "New Season Arrivals",
    subtitle: "Discover the latest in electronics & gadgets",
    cta: "Shop Now",
    ctaLink: "/",
    bg: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    textLight: true,
  },
  {
    id: 2,
    title: "Up to 40% Off",
    subtitle: "Limited time deals on top brands",
    cta: "View Deals",
    ctaLink: "/?filter_by=discount",
    bg: "linear-gradient(135deg, #b45309 0%, #d97706 40%, #f59e0b 100%)",
    textLight: true,
  },
  {
    id: 3,
    title: "Free Delivery",
    subtitle: "On orders over ৳5,000 across Bangladesh",
    cta: "Start Shopping",
    ctaLink: "/",
    bg: "linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0369a1 100%)",
    textLight: true,
  },
];

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  const go = (dir) => {
    setIndex((i) => {
      if (dir === "prev") return i === 0 ? slides.length - 1 : i - 1;
      return i === slides.length - 1 ? 0 : i + 1;
    });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-card-hover my-6 md:my-8">
      <div className="relative aspect-[21/9] min-h-[280px] md:min-h-[380px] flex">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: i === index ? 1 : 0,
              background: slide.bg,
              zIndex: i === index ? 1 : 0,
            }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 md:px-12 lg:px-16">
                <div className="max-w-xl">
                  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${slide.textLight ? "text-white" : "text-primary"}`}>
                    {slide.title}
                  </h2>
                  <p className={`mt-3 md:mt-4 text-lg md:text-xl ${slide.textLight ? "text-white/90" : "text-muted"}`}>
                    {slide.subtitle}
                  </p>
                  <Link
                    to={slide.ctaLink}
                    className="inline-block mt-6 md:mt-8 px-6 py-3.5 bg-white text-primary font-semibold rounded-xl hover:bg-accent-light hover:text-accent-hover transition-all duration-300 shadow-card no-underline"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => go("prev")}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-primary shadow-card flex items-center justify-center transition-all"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => go("next")}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-primary shadow-card flex items-center justify-center transition-all"
        aria-label="Next slide"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
