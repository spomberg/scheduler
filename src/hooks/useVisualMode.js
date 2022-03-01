import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode) {
    setMode(newMode);
    setHistory(prev => prev.push(newMode));
  }

  function back() {
    if (history.length > 1) {
      setHistory(prev => prev.pop())
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}