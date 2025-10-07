import { Badge } from "./components/Badge";
import { Button, TypeButton } from "./components/Button";
import { Display } from "./components/Display";
import { CounterProvider } from "./hooks/useCount";

export const FormCounter = Object.assign(CounterProvider, {
  Display,
  Plusle: (props: Partial<TypeButton>) => (
    <Button {...props} size="SM" type="MINUS" />
  ),
  Minun: (props: Partial<TypeButton>) => (
    <Button {...props} size="SM" type="PLUS" />
  ),
  Badge,
});
