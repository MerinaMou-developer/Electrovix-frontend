import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import Message from "../components/Message";

function ContactScreen() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contacts = [
    { icon: FaEnvelope, label: "Email", value: "support@electrovix.com", href: "mailto:support@electrovix.com" },
    { icon: FaPhone, label: "Phone", value: "+880 123 456 7890", href: "tel:+8801234567890" },
    { icon: FaMapMarkerAlt, label: "Address", value: "Dhaka, Bangladesh", href: null },
  ];

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">Contact Us</h1>
        <p className="text-slate-600 text-lg">We’d love to hear from you. Send us a message and we’ll respond as soon as we can.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {contacts.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl border border-slate-100 p-6 shadow-card text-center hover:shadow-card-hover transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-3">
              <item.icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-primary mb-1">{item.label}</h3>
            {item.href ? (
              <a href={item.href} className="text-slate-600 text-sm hover:text-accent transition-colors no-underline">
                {item.value}
              </a>
            ) : (
              <p className="text-slate-600 text-sm">{item.value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="bg-gradient-to-br from-primary to-primary-light p-8 md:p-12 text-white">
            <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
            <p className="text-slate-200 text-sm leading-relaxed mb-6">
              Use the form to send us your questions, feedback, or support requests. We typically reply within 24 hours.
            </p>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-center gap-2">
                <FaEnvelope className="w-4 h-4 text-accent shrink-0" />
                support@electrovix.com
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="w-4 h-4 text-accent shrink-0" />
                +880 123 456 7890
              </li>
            </ul>
          </div>
          <div className="p-8 md:p-12">
            {submitted ? (
              <Message variant="success">
                Thank you! We’ve received your message and will get back to you soon.
              </Message>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-accent text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-glow"
                >
                  <FaPaperPlane className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactScreen;
