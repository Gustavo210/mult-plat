import { Button, TypeButton } from "../Button";

export function Plus(props: TypeButton) {
  return <Button {...props} size="SM" type="PLUS" />;
}

Plus.displayName = "Form.Counter.Plus";
