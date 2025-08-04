import { forwardRef } from "react";

import { Container } from "@mobilestockweb/container";

import { SubComponentProps } from "../..";
import { useSubHeader } from "../../../../hooks/useSubHeader";

export const Vertical = forwardRef<HTMLDivElement, SubComponentProps>(
  function Vertical({ children, ...rest }, ref) {
    useSubHeader(
      <Container.Vertical ref={ref} full {...rest}>
        {children}
      </Container.Vertical>
    );

    return null;
  }
);
