import React from "react";
import Key from "./Key";

function Keypad({ onKey }) {
  const handle = (val) => () => onKey(val);

  return (
    <div className="grid grid-cols-4 gap-3">
      <Key label="C" variant="warn" onClick={handle("C")} />
      <Key label="±" variant="ghost" onClick={handle("neg")} />
      <Key label="%" variant="ghost" onClick={handle("%")}/>
      <Key label="÷" variant="accent" onClick={handle("/")} />

      <Key label="7" onClick={handle("7")} />
      <Key label="8" onClick={handle("8")} />
      <Key label="9" onClick={handle("9")} />
      <Key label="×" variant="accent" onClick={handle("*")} />

      <Key label="4" onClick={handle("4")} />
      <Key label="5" onClick={handle("5")} />
      <Key label="6" onClick={handle("6")} />
      <Key label="−" variant="accent" onClick={handle("-")} />

      <Key label="1" onClick={handle("1")} />
      <Key label="2" onClick={handle("2")} />
      <Key label="3" onClick={handle("3")} />
      <Key label="+" variant="accent" onClick={handle("+")} />

      <Key label="0" onClick={handle("0")} span={2} />
      <Key label="." onClick={handle(".")} />
      <Key label="=" variant="accent" onClick={handle("=")} />
    </div>
  );
}

export default Keypad;