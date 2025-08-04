import { forwardRef } from "react";
import { View } from "react-native";

import { Container } from "@mobilestock-native/container";

import { SubComponentProps } from "../..";
import { useSubHeader } from "../../../../hooks/useSubHeader";

export const Horizontal = forwardRef<View, SubComponentProps>(
  function Horizontal({ children, ...rest }, ref) {
    useSubHeader(
      <Container.Horizontal ref={ref} full align="CENTER_CENTER" {...rest}>
        {children}
      </Container.Horizontal>
    );

    return null;
  }
);
