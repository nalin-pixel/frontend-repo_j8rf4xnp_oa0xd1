import React from "react";

function Key({ label, variant = "default", onClick, span = 1 }) {
  const base =
    "flex items-center justify-center rounded-xl text-lg font-medium h-14 transition-colors select-none";
  const styles = {
    default:
      "bg-slate-800/70 hover:bg-slate-700/70 active:bg-slate-700 text-white border border-slate-700",
    accent:
      "bg-blue-600/90 hover:bg-blue-500 active:bg-blue-500 text-white border border-blue-500/80",
    warn:
      "bg-rose-600/90 hover:bg-rose-500 active:bg-rose-500 text-white border border-rose-500/80",
    ghost:
      "bg-transparent hover:bg-slate-800/50 text-slate-200 border border-slate-700",
  };

  const spanClass = span === 2 ? "col-span-2" : span === 3 ? "col-span-3" : "";

  return (
    <button
      className={`${base} ${styles[variant]} ${spanClass}`}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </button>
  );
}

export default Key;
