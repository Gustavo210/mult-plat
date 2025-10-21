import { Container, ViewBaseProps } from "@mobilestockweb/container";

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
