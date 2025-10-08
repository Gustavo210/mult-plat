import { useField } from "@unform/core";
import { createContext, useContext, useEffect, useState } from "react";
import { CustomView } from "../components/CustomView";
import { DefaultView } from "../components/DefaultView";
import { Error } from "../components/Error";

export type CounterEventName = "INCREMENT" | "DECREMENT";

interface CounterContextType {
  count: number;
  increment: (multiplier?: number) => void;
  decrement: (multiplier?: number) => void;
  onChange?: (data: { value: number; event: CounterEventName }) => void;
  setCount: (value: number) => void;
  maxCount?: number;
  minCount?: number;
  editable?: boolean;
  label?: string;
  labelPosition?: "TOP_START" | "LEFT" | "TOP_CENTER";
  variant?: "GROUPED" | "NAKED" | "DEFAULT";
  error?: string;
}
const CounterContext = createContext<CounterContextType | undefined>(undefined);

export function CounterProvider({
  children,
  initialCount,
  maxCount,
  minCount,
  editable,
  label,
  labelPosition = "TOP_START",
  variant = "DEFAULT",
  name,
  onChange,
}: {
  children?: React.ReactNode;
  initialCount?: number;
  maxCount?: number;
  minCount?: number;
  editable?: boolean;
  label?: string;
  labelPosition?: "TOP_START" | "LEFT" | "TOP_CENTER";
  variant?: "GROUPED" | "NAKED" | "DEFAULT";
  name: string;
  onChange?: (data: { value: number; event: CounterEventName }) => void;
}) {
  const { fieldName, registerField, error } = useField(name);
  const [count, setCount] = useState(initialCount || 0);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => count,
      setValue: (_, value) => {
        if (value) {
          setCount(value);
        }
      },
      clearValue: () => {
        setCount(0);
      },
    });
  }, [fieldName, registerField, count]);

  function increment(multiplier = 1) {
    setCount((lastVal) => {
      const newVal = lastVal + 1 * multiplier;
      if (maxCount !== undefined && newVal > maxCount) {
        return lastVal;
      }
      onChange?.({
        value: newVal,
        event: "INCREMENT",
      });
      return newVal;
    });
  }

  function decrement(multiplier = 1) {
    setCount((lastVal) => {
      const newVal = lastVal - 1 * multiplier;
      if (minCount !== undefined && newVal < minCount) {
        return lastVal;
      }
      onChange?.({
        value: newVal,
        event: "DECREMENT",
      });
      return newVal;
    });
  }

  return (
    <CounterContext.Provider
      value={{
        count,
        increment,
        decrement,
        setCount,
        maxCount,
        minCount,
        editable,
        label,
        labelPosition,
        variant,
        error,
      }}
    >
      {children ? <CustomView>{children}</CustomView> : <DefaultView />}
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
