import React, { useEffect, useState } from "react";
import { FaRobot } from "react-icons/fa";
import AIChatModal from "./AIChatModal";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState("");

  useEffect(() => {
    const handler = (e) => {
      setOpen(true);
      const q = e.detail?.query;
      if (q && typeof q === "string") {
        setInitialQuery(q);
      }
    };
    window.addEventListener("electrovix:open-ai", handler);
    return () => window.removeEventListener("electrovix:open-ai", handler);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setInitialQuery("");
  };

  return (
    <>
      <AIChatModal
        open={open}
        onClose={handleClose}
        initialQuery={initialQuery}
        onQueryConsumed={() => setInitialQuery("")}
      />

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed z-40 right-4 bottom-6 md:right-8 md:bottom-8
                   bg-cta-gradient text-white shadow-card-hover rounded-full
                   px-5 py-3.5 flex items-center gap-2.5
                   hover:scale-105 hover:shadow-pill transition-all duration-200 border border-white/20"
        title="Open AI Assistant"
      >
        <FaRobot className="w-5 h-5" />
        <span className="font-bold text-sm hidden sm:inline">AI Shop</span>
      </button>
    </>
  );
}
