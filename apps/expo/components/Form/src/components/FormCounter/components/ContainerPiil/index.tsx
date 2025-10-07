import { Container as ContainerRaw } from "@mobilestock-native/container";
import styled, { css } from "styled-components/native";
import { useCounter } from "../../hooks/useCount";

export function ContainerPill({ children }: { children: React.ReactNode }) {
  const { variant, error } = useCounter();
  return (
    <Container align="CENTER" gap="XS" $variant={variant} $error={!!error}>
      {children}
    </Container>
  );
}

const Container = styled(ContainerRaw.Horizontal)<{
  $variant?: "DEFAULT" | "GROUPED" | "NAKED";
  $error?: boolean;
}>`
  border-radius: 8px;
  overflow: hidden;
  background-color: #f0f0f0;
  ${({ $variant, theme }) =>
    $variant === "GROUPED" &&
    css`
      background-color: #e5e5e5;

      border: 1px solid ${theme.colors.input.border};
    `}
  ${({ $error, theme }) =>
    $error &&
    css`
      background-color: ${theme.colors.input.error};
      border: 1px solid ${theme.colors.input.error};
    `}
`;
