import { useField } from "@unform/core";
import { createContext, useContext, useEffect, useState } from "react";
import { CounterRootProps } from "..";
import { Error } from "../components/Error";

export type CounterVariant = "DEFAULT" | "GROUPED" | "NAKED";

export type CounterEventName = "INCREMENT" | "DECREMENT";

interface CounterContextType extends Omit<CounterRootProps, "name"> {
  count: number;
  increment: (multiplier?: number) => void;
  decrement: (multiplier?: number) => void;
  setCount: (value: number) => void;
  error?: string;
}
const CounterContext = createContext<CounterContextType | undefined>(undefined);

export function CounterProvider(props: CounterRootProps) {
  const { fieldName, registerField, error } = useField(props.name);
  const [count, setCount] = useState(Number(props.initialCount) || 0);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => count,
      setValue: (_, value) => setCount(value),
      clearValue: () => setCount(0),
    });
  }, [fieldName, registerField, count]);

  function increment(multiplier = 1) {
    setCount((lastVal) => {
      const newVal = lastVal + 1 * multiplier;
      if (props.maxCount !== undefined && newVal > props.maxCount) {
        return lastVal;
      }
      props.onChange?.({
        value: newVal,
        event: "INCREMENT",
      });
      return newVal;
    });
  }

  function decrement(multiplier = 1) {
    setCount((lastVal) => {
      const newVal = lastVal - 1 * multiplier;
      if (props.minCount !== undefined && newVal < props.minCount) {
        return lastVal;
      }
      props.onChange?.({
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
        maxCount: props.maxCount,
        minCount: props.minCount,
        editable: props.editable,
        label: props.label,
        labelPosition: props.labelPosition,
        buttonTransparent: props.buttonTransparent,
        groupElements: props.groupElements,
        error,
      }}
    >
      {props.children}
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
