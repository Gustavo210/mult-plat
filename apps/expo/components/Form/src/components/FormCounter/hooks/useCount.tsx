import { Container } from "@mobilestock-native/container";
import { useField } from "@unform/core";
import { createContext, useContext, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ContainerPill } from "../components/ContainerPiil";
import { Display } from "../components/Display";
import { Error } from "../components/Error";
import { Label } from "../components/Label";

interface CounterContextType {
  count: number;
  increment: (multiplier?: number) => void;
  decrement: (multiplier?: number) => void;
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
      value={{
        count,
        increment,
        decrement,
        maxCount,
        minCount,
        editable,
        label,
        labelPosition,
        variant,
        error,
      }}
    >
      {children ? (
        <Container.Vertical align="CENTER_START">
          <ContainerPill align={undefined}>{children}</ContainerPill>
          {error && <Error>{error}</Error>}
        </Container.Vertical>
      ) : (
        <Container.Vertical align="CENTER_START">
          {labelPosition === "TOP_START" && label && (
            <Container.Horizontal gap="XS">
              <Label>{label}</Label>
              {error && <Error>{error}</Error>}
            </Container.Horizontal>
          )}
          {labelPosition !== "LEFT" && (
            <Container.Vertical align="CENTER">
              {labelPosition === "TOP_CENTER" && label && (
                <>
                  <Label>{label}</Label>
                  {error && <Error>{error}</Error>}
                </>
              )}
              <ContainerPill>
                <Button type="MINUS" />
                <Display />
                <Button type="PLUS" />
              </ContainerPill>
            </Container.Vertical>
          )}
          {labelPosition === "LEFT" && (
            <Container.Vertical>
              <Container.Horizontal gap="XS" align="CENTER">
                <Container.Vertical>
                  {label && <Label>{label}</Label>}
                  {error && <Error>{error}</Error>}
                </Container.Vertical>
                <ContainerPill>
                  <Button type="MINUS" />
                  <Display />
                  <Button type="PLUS" />
                </ContainerPill>
              </Container.Horizontal>
            </Container.Vertical>
          )}
        </Container.Vertical>
      )}
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
