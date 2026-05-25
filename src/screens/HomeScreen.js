import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import LandingHero from "../components/landing/LandingHero";
import AIFeatureShowcase from "../components/landing/AIFeatureShowcase";
import FeaturedProducts from "../components/landing/FeaturedProducts";
import ShopByCategory from "../components/ShopByCategory";
import DealsBanner from "../components/DealsBanner";
import WhyShopWithUs from "../components/WhyShopWithUs";
import NewsletterSignup from "../components/NewsletterSignup";
import TrustBar from "../components/TrustBar";

function HomeScreen() {
  const openAI = () => {
    window.dispatchEvent(new Event("electrovix:open-ai"));
  };

  const tryQuery = (query) => {
    window.dispatchEvent(
      new CustomEvent("electrovix:open-ai", { detail: { query } })
    );
  };

  return (
    <div className="animate-fade-in">
      <LandingHero onOpenAI={openAI} onTryQuery={tryQuery} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrustBar />
        <FeaturedProducts />
        <ShopByCategory />
        <AIFeatureShowcase />

        <section className="my-12 md:my-16">
          <DealsBanner />
        </section>

        <section className="rounded-4xl bg-cta-gradient p-8 md:p-12 text-center text-white shadow-card-hover mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Ready to explore the catalog?</h2>
          <p className="text-white/80 max-w-lg mx-auto mb-6">
            Browse with filters, semantic search, and our AI assistant—built for real shopping.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-primary font-bold py-3.5 px-8 rounded-2xl no-underline hover:shadow-card transition-all"
          >
            Shop all products <FaArrowRight />
          </Link>
        </section>

        <WhyShopWithUs />
        <NewsletterSignup />
      </div>
    </div>
  );
}

export default HomeScreen;
