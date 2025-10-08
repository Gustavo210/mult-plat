import { Container, ViewBaseProps } from "@mobilestock-native/container";

export function Item(props: ViewBaseProps) {
  return <Container.Horizontal {...props} />;
}

Item.displayName = "FormCounterItem";
