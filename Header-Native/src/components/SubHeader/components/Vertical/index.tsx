import { forwardRef } from "react";
import { View } from "react-native";

import { Container } from "@mobilestock-native/container";

import { SubComponentProps } from "../..";
import { useSubHeader } from "../../../../hooks/useSubHeader";

export const Vertical = forwardRef<View, SubComponentProps>(function Vertical(
  { children, ...rest },
  ref
) {
  useSubHeader(
    <Container.Vertical ref={ref} full {...rest}>
      {children}
    </Container.Vertical>
  );

  return null;
});
