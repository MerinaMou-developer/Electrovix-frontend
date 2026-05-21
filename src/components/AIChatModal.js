import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aiChat } from "../actions/aiActions";
import Loader from "./Loader";
import Message from "./Message";
import { useNavigate } from "react-router-dom";

const SUGGESTIONS = ["best phone", "gaming laptop", "cheap mouse", "camera under 1000"];

function formatBDT(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return `৳${n.toLocaleString()}`;
}

function snippet(text, n = 120) {
  const t = (text || "").trim();
  if (!t) return "";
  return t.length > n ? t.slice(0, n) + "..." : t;
}

export default function AIChatModal({ open, onClose }) {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const aiState = useSelector((state) => state.aiChat);
  const { loading, error, answer, products } = aiState;

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  const submitHandler = (e) => {
    e.preventDefault();
    const q = message.trim();
    if (!q) return;
    dispatch(aiChat(q));
  };

  const askSuggestion = (text) => {
    setMessage(text);
    dispatch(aiChat(text));
  };

  const goToProduct = (id) => {
    onClose?.();
    navigate(`/product/${id}`);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      aria-modal="true"
      role="dialog"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="absolute right-4 bottom-24 md:right-8 md:bottom-28 w-[92vw] max-w-md">
        <div className="bg-white rounded-2xl shadow-card-hover border border-accent-light/50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-hero-gradient text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <div>
                <p className="font-bold leading-5">AI Assistant</p>
                <p className="text-xs opacity-90">Ask & get product suggestions</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="h-9 w-9 rounded-xl hover:bg-white/15 flex items-center justify-center"
              title="Close"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
            {/* Suggestions */}
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => askSuggestion(s)}
                  className="text-xs px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white transition"
                >
                  {s}
                </button>
              ))}
            </div>

            {loading && <Loader />}

            {error && <Message variant="danger">{error}</Message>}

            {/* AI Answer */}
            {answer && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-slate-800 text-sm">
                  <span className="font-bold text-primary">AI:</span> {answer}
                </p>

                {/* quick “links” */}
                {products?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {products.slice(0, 3).map((p) => (
                      <button
                        key={p._id}
                        type="button"
                        onClick={() => goToProduct(p._id)}
                        className="text-xs font-semibold px-3 py-1 rounded-full
                                   border border-primary/20 bg-white text-primary
                                   hover:bg-primary hover:text-white transition"
                        title="Open product"
                      >
                        {p.name.length > 22 ? p.name.slice(0, 22) + "…" : p.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Product cards inside chat */}
            {products?.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-600">
                  Products you can open ({products.length})
                </p>

                {products.slice(0, 6).map((p) => {
                  const priceToShow =
                    p.discount_price != null ? p.discount_price : p.price;

                  return (
                    <div
                      key={p._id}
                      className="rounded-xl border border-slate-200 hover:border-primary/40 transition bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => goToProduct(p._id)}
                        className="w-full text-left p-3"
                        title="Open product details"
                      >
                        <div className="flex gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-14 w-14 rounded-lg object-cover border border-slate-200 bg-white"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-slate-900 text-sm truncate">
                              {p.name}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {p.brand?.name ? `${p.brand.name} • ` : ""}
                              {p.category?.name || ""}
                            </p>

                            <p className="mt-1 text-xs text-slate-600">
                              {snippet(p.description, 110)}
                            </p>

                            <div className="mt-2 flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-bold text-primary">
                                {formatBDT(priceToShow)}
                              </span>
                              {p.rating && (
                                <span className="text-xs text-slate-600">
                                  ⭐ {p.rating}
                                </span>
                              )}
                              <span className="text-xs text-slate-500">
                                stock: {p.countInStock}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Footer action */}
                      <div className="px-3 pb-3">
                        <button
                          type="button"
                          onClick={() => goToProduct(p._id)}
                          className="w-full bg-primary text-white text-sm font-semibold py-2 rounded-xl hover:opacity-90 transition"
                        >
                          View details
                        </button>
                      </div>
                    </div>
                  );
                })}

                {products.length > 6 && (
                  <p className="text-xs text-slate-500">
                    Showing top 6. Refine your query for better results.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-200">
            <form onSubmit={submitHandler} className="flex gap-2">
              <input
                ref={inputRef}
                className="flex-1 border border-slate-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary bg-white text-sm"
                placeholder='Try: "best phone under 60000"'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary text-white font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition text-sm"
              >
                Ask
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}