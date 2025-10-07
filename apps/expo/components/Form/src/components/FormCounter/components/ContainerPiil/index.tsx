import { Container as ContainerRaw } from "@mobilestock-native/container";
import { useCounter } from "../../hooks/useCount";

export function ContainerPill({ children }: { children: React.ReactNode }) {
  const { variant } = useCounter();
  return (
    <ContainerRaw.Horizontal
      align="CENTER"
      gap="XS"
      style={
        variant === "GROUPED"
          ? {
              backgroundColor: "#e5e5e5",
              borderColor: "#888",
              borderWidth: 1,
              borderRadius: 8,
              overflow: "hidden",
            }
          : {}
      }
    >
      {children}
    </ContainerRaw.Horizontal>
  );
}
