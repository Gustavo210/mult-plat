import { forwardRef } from "react";
import { View } from "react-native";

import { Container } from "@mobilestock-native/container";

import { HeaderSubComponentProps } from "../..";

export const Vertical = forwardRef<View, HeaderSubComponentProps>(
  function Vertical({ children, ...rest }, ref) {
    return (
      <Container.Vertical ref={ref} {...rest}>
        {children}
      </Container.Vertical>
    );
  }
);

Vertical.displayName = "Header.Vertical";
