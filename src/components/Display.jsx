import React from "react";

function Display({ expression, result }) {
  return (
    <div className="w-full bg-slate-900/60 border border-slate-700 rounded-xl p-4 text-right">
      <div className="text-slate-400 text-sm truncate min-h-[20px]">{expression || "0"}</div>
      <div className="text-white text-3xl font-semibold mt-1 select-all" data-testid="result">
        {result}
      </div>
    </div>
  );
}

export default Display;