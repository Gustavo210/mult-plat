import { Container, ViewBaseProps } from "@mobilestock-native/container";

export function Slot(props: ViewBaseProps) {
  return (
    <Container.Vertical
      style={{
        minWidth: 40,
        height: 34,
        userSelect: "none",
      }}
      align="CENTER"
      {...props}
    />
  );
}
