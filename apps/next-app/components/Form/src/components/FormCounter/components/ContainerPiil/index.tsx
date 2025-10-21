import {
  Container as ContainerRaw,
  ViewBaseProps,
} from "@mobilestockweb/container";
import styled, { css } from "styled-components";
import { useCounter } from "../../hooks/useCount";

export function ContainerPill({ children, ...props }: ViewBaseProps) {
  const { groupElements, error } = useCounter();
  return (
    <Container
      align="CENTER"
      gap="XS"
      $groupElements={groupElements}
      $error={!!error}
      {...props}
    >
      {children}
    </Container>
  );
}

const Container = styled(ContainerRaw.Horizontal)<{
  $groupElements?: boolean;
  $error?: boolean;
}>`
  border-radius: 8px;
  overflow: hidden;
  background-color: #f0f0f0;
  ${({ $groupElements, theme }) =>
    $groupElements &&
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
