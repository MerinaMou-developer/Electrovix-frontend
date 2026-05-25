import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aiChat } from "../actions/aiActions";
import Loader from "./Loader";
import Message from "./Message";
import { useNavigate } from "react-router-dom";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { getProductImageUrl } from "../config";

const SUGGESTIONS = [
  "best phone under 60000",
  "gaming laptop",
  "wireless earbuds",
  "camera deals",
];

function formatBDT(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return `৳${n.toLocaleString()}`;
}

export default function AIChatModal({
  open,
  onClose,
  initialQuery = "",
  onQueryConsumed,
}) {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const consumedRef = useRef(false);

  const aiState = useSelector((state) => state.aiChat);
  const { loading, error, answer, products } = aiState;

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    if (!open || !initialQuery?.trim() || consumedRef.current) return;
    consumedRef.current = true;
    const q = initialQuery.trim();
    setMessage(q);
    dispatch(aiChat(q));
    onQueryConsumed?.();
  }, [open, initialQuery, dispatch, onQueryConsumed]);

  useEffect(() => {
    if (!open) consumedRef.current = false;
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6"
      aria-modal="true"
      role="dialog"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />

      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-white rounded-[1.75rem] shadow-card-hover border border-primary/15 overflow-hidden animate-slide-up">
        <div className="h-1 w-full bg-cta-gradient shrink-0" />

        <div className="px-5 py-4 bg-white border-b border-accent-light flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cta-gradient flex items-center justify-center text-white shadow-pill">
              <FaRobot className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-ink leading-tight">Electrovix AI</p>
              <p className="text-xs text-muted flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Ask anything · hybrid search
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-accent-pale text-ink-soft flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 min-h-0">
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => askSuggestion(s)}
                disabled={loading}
                className="text-xs font-semibold px-3.5 py-2 rounded-full border border-accent-light bg-white text-ink-soft hover:border-primary hover:text-primary hover:bg-accent-pale transition disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          {!answer && !loading && !error && (
            <div className="rounded-2xl bg-accent-pale/60 border border-accent-light px-4 py-3 text-sm text-ink-soft">
              Try natural language — e.g. &quot;best gaming laptop under 80000&quot;
            </div>
          )}

          {loading && (
            <div className="flex gap-2 items-center text-sm text-muted">
              <Loader />
              <span>Searching catalog…</span>
            </div>
          )}

          {error && <Message variant="danger">{error}</Message>}

          {answer && (
            <div className="flex gap-2 items-start">
              <span className="w-8 h-8 rounded-xl bg-cta-gradient flex items-center justify-center text-white shrink-0 mt-0.5">
                <FaRobot className="w-3.5 h-3.5" />
              </span>
              <div className="flex-1 rounded-2xl rounded-tl-md border border-accent-light bg-white px-4 py-3 shadow-soft">
                <p className="text-sm text-ink leading-relaxed">{answer}</p>
                {products?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {products.slice(0, 3).map((p) => (
                      <button
                        key={p._id}
                        type="button"
                        onClick={() => goToProduct(p._id)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-accent-pale text-primary hover:bg-primary hover:text-white transition"
                      >
                        {p.name.length > 24 ? `${p.name.slice(0, 24)}…` : p.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {products?.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-muted px-1">
                Products ({products.length})
              </p>
              {products.slice(0, 5).map((p) => {
                const priceToShow = p.discount_price != null ? p.discount_price : p.price;
                return (
                  <button
                    key={p._id}
                    type="button"
                    onClick={() => goToProduct(p._id)}
                    className="w-full flex gap-3 p-3 rounded-2xl border border-accent-light bg-white hover:border-primary/40 hover:shadow-soft transition text-left"
                  >
                    <img
                      src={getProductImageUrl(p.image)}
                      alt={p.name}
                      className="h-14 w-14 rounded-xl object-cover bg-accent-pale border border-accent-light shrink-0"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/80?text=+";
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-ink text-sm truncate">{p.name}</p>
                      <p className="text-xs text-muted truncate">
                        {[p.brand?.name, p.category?.name].filter(Boolean).join(" · ")}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-bold text-primary">
                          {formatBDT(priceToShow)}
                        </span>
                        {p.rating > 0 && (
                          <span className="text-xs text-muted">⭐ {p.rating}</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <form
          onSubmit={submitHandler}
          className="p-4 border-t border-accent-light bg-surface-muted/50 shrink-0"
        >
          <div className="flex gap-2">
            <input
              ref={inputRef}
              className="flex-1 border border-accent-light rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary bg-white text-sm text-ink"
              placeholder='e.g. "iPhone deals under 70000"'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="shrink-0 bg-cta-gradient text-white font-bold px-5 py-3 rounded-2xl hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
            >
              <FaPaperPlane className="w-4 h-4" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
