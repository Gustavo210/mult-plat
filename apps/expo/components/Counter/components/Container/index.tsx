import { Container as ContainerRaw } from "@mobilestock-native/container";

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <ContainerRaw.Horizontal
      align="CENTER"
      gap="XS"
      style={{ userSelect: "none" }}
    >
      {children}
    </ContainerRaw.Horizontal>
  );
}
