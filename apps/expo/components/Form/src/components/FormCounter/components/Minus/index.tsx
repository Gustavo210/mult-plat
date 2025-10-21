import { Button, TypeButton } from "../Button";

export function Minus(props: Partial<TypeButton>) {
  return <Button {...props} size="SM" type="MINUS" />;
}

Minus.displayName = "Form.Counter.Minus";
