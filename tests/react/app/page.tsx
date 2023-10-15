"use client";
import { useEffect, useState } from "react";
import { useURLState } from "../../../packages/react/useURLState";

function Display() {
  const [urlState, setUrlState] = useURLState();
  return (
    <div>
      {urlState.get("count") ?? "no count"}
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(1);
  const [urlState, setUrlState] = useURLState();
  useEffect(() => {
    const m = new Map();
    m.set("count", count);
    setUrlState(m);
  }, [count])
  return (
    <button
      onClick={() => {
         setCount((c) => c + 1)
      }}
    >
      increment
    </button>
  );
}

export default function Home() {
  return (
    <>
    <Counter />
    <Display />
    </>
  );
}
