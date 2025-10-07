import { Container } from "@mobilestock-native/container";
import { Button } from "./components/Button";
import { ContainerPill } from "./components/ContainerPiil";
import { Counter as CounterRaw } from "./components/Counter";
import { Error } from "./components/Error";
import { Label } from "./components/Label";
import { CounterProvider } from "./hooks/useCount";

interface CounterProps {
  multiplier?: number;
  initialCount?: number;
  maxCount?: number;
  minCount?: number;
  editable?: boolean;
  label?: string;
  labelPosition?: "TOP_START" | "LEFT" | "TOP_CENTER";
  variant?: "GROUPED" | "NAKED" | "DEFAULT";
}

export function FormCounter({
  initialCount,
  maxCount,
  minCount,
  label,
  variant = "DEFAULT",
  editable,
  labelPosition = "TOP_START",
}: CounterProps) {
  return (
    <CounterProvider
      initialCount={initialCount}
      maxCount={maxCount}
      minCount={minCount}
      editable={editable}
      label={label}
      labelPosition={labelPosition}
      variant={variant}
    >
      <Container.Vertical align="CENTER_START">
        {labelPosition === "TOP_START" && label && (
          <Container.Horizontal gap="XS">
            <Label>{label}</Label>
            <Error>Este é um erro</Error>
          </Container.Horizontal>
        )}
        {labelPosition !== "LEFT" && (
          <Container.Vertical align="CENTER">
            {labelPosition === "TOP_CENTER" && label && (
              <>
                <Label>{label}</Label>
                <Error>Este é um erro</Error>
              </>
            )}
            <ContainerPill>
              <Button type="MINUS" />
              <CounterRaw />
              <Button type="PLUS" />
            </ContainerPill>
          </Container.Vertical>
        )}
        {labelPosition === "LEFT" && (
          <Container.Vertical>
            <Container.Horizontal gap="XS" align="CENTER">
              {label && <Label>{label}</Label>}
              <ContainerPill>
                <Button type="MINUS" />
                <CounterRaw />
                <Button type="PLUS" />
              </ContainerPill>
            </Container.Horizontal>
            <Error>Este é um erro</Error>
          </Container.Vertical>
        )}
      </Container.Vertical>
    </CounterProvider>
  );
}
