import { Container } from "@mobilestock-native/container";

export function DragIndicator() {
  return (
    <Container.Horizontal
      style={{
        width: 100,
        height: 4,
        borderRadius: 5,
        backgroundColor: "#cecece",
      }}
    />
  );
}
