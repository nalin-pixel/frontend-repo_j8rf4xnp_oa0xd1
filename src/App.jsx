import React, { useMemo, useState } from "react";
import Display from "./components/Display";
import Keypad from "./components/Keypad";

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [lastPressedEquals, setLastPressedEquals] = useState(false);

  const append = (val) => {
    if (val === "C") {
      setExpression("");
      setResult("0");
      setLastPressedEquals(false);
      return;
    }

    if (val === "neg") {
      // toggle sign of the current number segment
      const parts = expression.split(/([+\-*/%])/);
      const last = parts.pop() ?? "";
      const toggled = last.startsWith("-") ? last.slice(1) : last ? `-${last}` : "-";
      const rebuilt = [...parts, toggled].join("");
      setExpression(rebuilt);
      tryEval(rebuilt);
      return;
    }

    if (val === "=") {
      tryEval(expression, true);
      setLastPressedEquals(true);
      return;
    }

    // handle percent as divide by 100 on the current number
    if (val === "%") {
      const parts = expression.split(/([+\-*/%])/);
      const last = parts.pop() ?? "";
      if (last) {
        const num = parseFloat(last);
        if (!Number.isNaN(num)) {
          const pct = (num / 100).toString();
          const rebuilt = [...parts, pct].join("");
          setExpression(rebuilt);
          tryEval(rebuilt);
          return;
        }
      }
      return;
    }

    // If equals was last and next input is a number, start new expression
    if (lastPressedEquals && /[0-9.]/.test(val)) {
      const next = val === "." ? "0." : val;
      setExpression(next);
      setLastPressedEquals(false);
      tryEval(next);
      return;
    }

    // Prevent multiple decimals in the current number
    if (val === ".") {
      const parts = expression.split(/([+\-*/%])/);
      const last = parts[parts.length - 1] || "";
      if (last.includes(".")) return;
    }

    // Prevent duplicate operators
    if (/[+\-*/]/.test(val)) {
      if (expression === "" && val !== "-") return; // can't start with operator except minus
      if (/[+\-*/]$/.test(expression)) {
        setExpression(expression.slice(0, -1) + val);
        return;
      }
    }

    const next = expression + val;
    setExpression(next);
    setLastPressedEquals(false);
    tryEval(next);
  };

  const tryEval = (exp, finalize = false) => {
    const safe = exp.replace(/[^0-9+\-*/%.]/g, "");
    if (!safe) {
      setResult("0");
      return;
    }
    // Avoid trailing operator for interim evaluation
    const interim = /[+\-*/.]$/.test(safe) ? safe.slice(0, -1) : safe;
    if (!interim) return;
    try {
      // Use Function for evaluation in a restricted expression
      // Replace division symbol if needed (already using /)
      const computed = Function(`"use strict"; return (${interim})`)();
      const formatted =
        typeof computed === "number" && Number.isFinite(computed)
          ? (Math.round(computed * 1e10) / 1e10).toString()
          : "Error";
      setResult(formatted);
      if (finalize) setExpression(formatted);
    } catch {
      if (finalize) setResult("Error");
    }
  };

  const header = useMemo(
    () => (
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">Calculator</h1>
        <p className="text-blue-200/80 text-sm">Basic arithmetic with a clean, modern look</p>
      </div>
    ),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-md mx-auto">
        {header}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-5 shadow-xl space-y-4">
          <Display expression={expression} result={result} />
          <Keypad onKey={append} />
        </div>
        <p className="text-center text-xs text-blue-300/60 mt-4">Use keyboard numbers and operators too</p>
      </div>
    </div>
  );
}

export default App;
