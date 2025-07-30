import { Typography, TypographyProps } from "@mobilestock-native/typography";
import React from "react";
import { styled } from "styled-components/native";

interface OverlayProps extends Omit<TypographyProps, "children"> {
  text: string;
}

export function Overlay({ text, ...rest }: OverlayProps) {
  return (
    <OverlayContent>
      <Typography color="CONTRAST" {...rest}>
        {text}
      </Typography>
    </OverlayContent>
  );
}

const OverlayContent = styled.View`
  background-color: ${({ theme }) => theme.colors.container.shadow};
  padding: 10px 20px;
  border-radius: 4px;
  margin: 5px;
`;
