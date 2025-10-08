import { Badge } from "./components/Badge";
import { Button, TypeButton } from "./components/Button";
import { Display } from "./components/Display";
import { Item } from "./components/Item";
import { CounterProvider } from "./hooks/useCount";

export function Plusle(props: Partial<TypeButton>) {
  return <Button {...props} size="SM" type="PLUS" />;
}

export function Minun(props: Partial<TypeButton>) {
  return <Button {...props} size="SM" type="MINUS" />;
}

Plusle.displayName = "FormCounterPlusle";
Minun.displayName = "FormCounterMinun";

export const FormCounter = Object.assign(CounterProvider, {
  Display,
  Plusle,
  Minun,
  Badge,
  Item,
});
