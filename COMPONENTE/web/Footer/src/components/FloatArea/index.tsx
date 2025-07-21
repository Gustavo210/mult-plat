import { ReactNode } from "react";
import styled from "styled-components";

import { Container, ViewBaseProps } from "@mobilestockweb/container";

import { useFooterContext } from "../../../footerContext";

interface FloatAreaProps extends Omit<ViewBaseProps, "align"> {
  children: ReactNode;
  align?: "LEFT" | "RIGHT";
}

export function FloatArea({
  children,
  align = "LEFT",
  gap = "XS",
  ...rest
}: FloatAreaProps) {
  const { footerHeight } = useFooterContext();

  if (!footerHeight) return null;

  return (
    <StyledFloatArea
      $align={align}
      $footerHeight={footerHeight}
      gap={gap}
      {...rest}
    >
      {children}
    </StyledFloatArea>
  );
}

const StyledFloatArea = styled(Container.Vertical)<{
  $align: FloatAreaProps["align"];
  $footerHeight: number;
}>`
  position: fixed;
  bottom: ${({ $footerHeight }) => `${$footerHeight}px`};
  ${({ $align }) => ($align === "RIGHT" ? "right: 20px" : "left: 20px")};
  max-width: 7rem;
  z-index: 15;
  overflow: hidden;
`;
