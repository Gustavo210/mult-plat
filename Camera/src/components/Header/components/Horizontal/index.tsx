import { forwardRef } from "react";
import { View } from "react-native";

import { Container } from "@mobilestock-native/container";

import { HeaderSubComponentProps } from "../..";

export const Horizontal = forwardRef<View, HeaderSubComponentProps>(
  function Horizontal({ children, ...rest }, ref) {
    return (
      <Container.Horizontal ref={ref} {...rest}>
        {children}
      </Container.Horizontal>
    );
  }
);

Horizontal.displayName = "Header.Horizontal";
