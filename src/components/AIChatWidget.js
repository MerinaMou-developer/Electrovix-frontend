import React, { useState } from "react";
import AIChatModal from "./AIChatModal";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AIChatModal open={open} onClose={() => setOpen(false)} />

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed z-40 right-4 bottom-6 md:right-8 md:bottom-8
                   bg-gradient-to-r from-primary to-primary-light text-white shadow-card-hover rounded-full
                   px-5 py-3.5 flex items-center gap-2 border border-white/20
                   hover:shadow-glow hover:scale-105 transition-all duration-200"
        title="Open AI Assistant"
      >
        <span className="text-lg">🤖</span>
        <span className="font-bold text-sm">AI Assistant</span>
      </button>
    </>
  );
}
