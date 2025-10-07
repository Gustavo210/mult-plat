import { Container } from "@mobilestock-native/container";
import { ContainerPill } from "../ContainerPiil";

export function CustomView({ children }: { children: React.ReactNode }) {
  return (
    <Container.Vertical>
      <Container.Horizontal gap="XS" align="CENTER">
        <ContainerPill>{children}</ContainerPill>
      </Container.Horizontal>
    </Container.Vertical>
  );
}
