import { forwardRef } from "react";

import { Container } from "@mobilestockweb/container";

import { SubComponentProps } from "../..";
import { useSubHeader } from "../../../../hooks/useSubHeader";

export const Horizontal = forwardRef<HTMLDivElement, SubComponentProps>(
  function Horizontal({ children, ...rest }, ref) {
    useSubHeader(
      <Container.Horizontal ref={ref} full align="CENTER_CENTER" {...rest}>
        {children}
      </Container.Horizontal>
    );

    return null;
  }
);
