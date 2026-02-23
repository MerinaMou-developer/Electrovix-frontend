import React, { useState } from "react";
import AIChatModal from "./AIChatModal";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AIChatModal open={open} onClose={() => setOpen(false)} />

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed z-40 right-4 bottom-6 md:right-8 md:bottom-8
                   bg-primary text-white shadow-2xl rounded-full
                   px-4 py-3 flex items-center gap-2
                   hover:opacity-90 transition"
        title="Open AI Assistant"
      >
        <span className="text-lg">🤖</span>
        <span className="font-semibold">AI</span>
      </button>
    </>
  );
}