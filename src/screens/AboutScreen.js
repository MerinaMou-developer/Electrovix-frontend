import React from "react";
import { Link } from "react-router-dom";
import { FaTruck, FaShieldAlt, FaHeadset, FaAward, FaHeart } from "react-icons/fa";

function AboutScreen() {
  const values = [
    {
      icon: FaTruck,
      title: "Fast Delivery",
      text: "We ship across Bangladesh with reliable partners so you get your orders on time.",
    },
    {
      icon: FaShieldAlt,
      title: "Secure Payment",
      text: "Your payments are protected with SSL and trusted payment gateways.",
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      text: "Our team is here to help with orders, returns, and any questions.",
    },
    {
      icon: FaAward,
      title: "Quality Assured",
      text: "We partner with trusted brands to bring you genuine products only.",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white py-16 md:py-24 px-6 md:px-12 mb-12 shadow-card-hover">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            About Electrovix
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
            We’re your trusted e-commerce partner in Bangladesh — offering a simple, secure, and enjoyable shopping experience.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-6 bg-accent hover:bg-accent-light text-primary font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-glow no-underline"
          >
            Shop Now
          </Link>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      </section>

      {/* Story */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-primary mb-6">Our Story</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-card">
            <p className="text-slate-600 leading-relaxed mb-4">
              Electrovix started with a simple idea: make online shopping fast, safe, and easy for everyone in Bangladesh. We work with trusted brands and sellers so you get real products at fair prices.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Today we offer electronics, fashion, home goods, and more — all with clear policies, secure payment, and support when you need it.
            </p>
          </div>
          <div className="bg-gradient-to-br from-accent/10 to-teal/10 rounded-2xl border border-amber-100 p-8 flex items-center justify-center">
            <FaHeart className="w-24 h-24 text-accent/40" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section>
        <h2 className="text-2xl font-bold text-primary mb-8">Why Choose Us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutScreen;
