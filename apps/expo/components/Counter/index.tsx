import { Button } from "./components/Button";
import { Container } from "./components/Container";
import { Counter as CounterRaw } from "./components/Counter";
import { CounterProvider } from "./hooks/useCount";

interface CounterProps {
  multiplier?: number;
  initialCount?: number;
  maxCount?: number;
  minCount?: number;
  editable?: boolean;
}

export function Counter({ initialCount, maxCount, minCount }: CounterProps) {
  return (
    <CounterProvider
      initialCount={initialCount}
      maxCount={maxCount}
      minCount={minCount}
    >
      <Container>
        <Button type="MINUS" />
        <CounterRaw />
        <Button type="PLUS" />
      </Container>
    </CounterProvider>
  );
}
