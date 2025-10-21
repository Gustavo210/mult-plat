import { Button, TypeButton } from "../Button";

export function Minus(props: TypeButton) {
  return <Button {...props} size="SM" type="MINUS" />;
}

Minus.displayName = "Form.Counter.Minus";
