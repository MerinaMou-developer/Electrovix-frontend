import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aiChat } from "../actions/aiActions";
import Product from "./Product";
import Loader from "./Loader";
import Message from "./Message";

const SUGGESTIONS = [
  "best phone",
  "gaming laptop",
  "cheap mouse",
  "camera under 1000",
  "best apple product",
];

function AIChatBox() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const aiState = useSelector((state) => state.aiChat);
  const { loading, error, answer, products } = aiState;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    dispatch(aiChat(message));
  };

  const askSuggestion = (text) => {
    setMessage(text);
    dispatch(aiChat(text));
  };

  return (
    <section className="my-10">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-primary/10 to-transparent border-b border-slate-200/80">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-primary">
                🤖 AI Shopping Assistant
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Ask in natural language and get smart product suggestions.
              </p>
            </div>

            {/* Input */}
            <form onSubmit={submitHandler} className="w-full md:w-[520px]">
              <div className="flex gap-2">
                <input
                  className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder='Try: "best phone"'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition"
                >
                  Ask
                </button>
              </div>
            </form>
          </div>

          {/* Suggestions */}
          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => askSuggestion(s)}
                className="text-xs md:text-sm px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white transition"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {loading && (
            <div className="mb-4">
              <Loader />
            </div>
          )}

          {error && (
            <div className="mb-4">
              <Message variant="danger">{error}</Message>
            </div>
          )}

          {answer && (
            <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-slate-800">
                <span className="font-bold text-primary">AI:</span> {answer}
              </p>
            </div>
          )}

          {/* Products grid */}
          {products && products.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-800">
                  Recommended Products
                </h3>
                <span className="text-sm text-slate-500">
                  {products.length} results
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </>
          ) : (
            answer && (
              <p className="text-sm text-slate-500">
                No products matched. Try adding brand/category like: “iphone”, “laptop”, “sony”.
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default AIChatBox;