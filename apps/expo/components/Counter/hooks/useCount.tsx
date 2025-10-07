import { createContext, useContext, useState } from "react";

interface CounterContextType {
  count: number;
  increment: (multiplier?: number) => void;
  decrement: (multiplier?: number) => void;
  maxCount?: number;
  minCount?: number;
}
const CounterContext = createContext<CounterContextType | undefined>(undefined);

export function CounterProvider({
  children,
  initialCount,
  maxCount,
  minCount,
}: {
  children: React.ReactNode;
  initialCount?: number;
  maxCount?: number;
  minCount?: number;
}) {
  const [count, setCount] = useState(initialCount || 0);

  function increment(multiplier = 1) {
    setCount((lastVal) => {
      const newVal = lastVal + 1 * multiplier;
      if (maxCount !== undefined && newVal > maxCount) {
        return lastVal;
      }
      return newVal;
    });
  }

  function decrement(multiplier = 1) {
    setCount((lastVal) => {
      const newVal = lastVal - 1 * multiplier;
      if (minCount !== undefined && newVal < minCount) {
        return lastVal;
      }
      return newVal;
    });
  }

  return (
    <CounterContext.Provider
      value={{ count, increment, decrement, maxCount, minCount }}
    >
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
}
