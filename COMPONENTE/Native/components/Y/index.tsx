import React from "react";
import { css, DefaultTheme, styled } from "styled-components/native";
import { Resize } from "../Resize";

export function Y({
  children,
  gap = "MD",
}: {
  children?: React.ReactNode;
  gap?: Uppercase<keyof DefaultTheme["gaps"] & string>;
}) {
  return (
    <YContainer gap={gap}>
      <Resize>{children}</Resize>
    </YContainer>
  );
}

const YContainer = styled.View<{
  gap?: Uppercase<keyof DefaultTheme["gaps"] & string>;
}>`
  flex-direction: row;
  ${({ theme, gap }) => {
    if (!gap) return css``;
    const GapTag = gap.toLowerCase() as keyof DefaultTheme["gaps"];
    return css`
      gap: ${theme.gaps[GapTag]};
    `;
  }}
  background-color: red;
`;
