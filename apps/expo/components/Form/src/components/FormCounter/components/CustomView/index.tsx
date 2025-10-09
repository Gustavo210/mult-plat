import { Container } from "@mobilestock-native/container";
import tools from "@mobilestock-native/tools";
import {
  Children,
  Fragment,
  isValidElement,
  ReactNode,
  useCallback,
} from "react";
import { useCounter } from "../../hooks/useCount";
import { Badge } from "../Badge";
import { ContainerPill } from "../ContainerPiil";
import { Error } from "../Error";
import { Label } from "../Label";

export function CustomView({ children }: { children: React.ReactNode }) {
  const { label, error, labelPosition } = useCounter();

  const externalChildren: ReactNode[] = [];
  const internalChildren: ReactNode[] = [];

  const unwrapFragments = useCallback((node: ReactNode) => {
    if (isValidElement(node) && node.type === Fragment) {
      return unwrapFragments(node.props.children);
    }
    return node;
  }, []);

  const childrenToIterate = unwrapFragments(children);

  Children.toArray(childrenToIterate).forEach((child) => {
    if (
      isValidElement(child) &&
      tools.isComponentWithDisplayName(child.type) &&
      child.type.displayName === Badge.displayName &&
      !child.props.renderInsideThePill
    ) {
      externalChildren.push(child);
    } else {
      internalChildren.push(child);
    }
  });

  return (
    <Container.Vertical align="CENTER_START">
      {labelPosition === "TOP_START" && label && (
        <Container.Horizontal gap="XS">
          <Label>{label}</Label>
          {error && !externalChildren.length && <Error>{error}</Error>}
        </Container.Horizontal>
      )}
      <Container.Vertical align="CENTER">
        {labelPosition !== "TOP_START" && label && <Label>{label}</Label>}
        {labelPosition !== "TOP_START" && error && !externalChildren.length && (
          <Error>{error}</Error>
        )}
        <Container.Horizontal gap="XS" align={"CENTER_START"}>
          {externalChildren}
          <Container.Vertical>
            <ContainerPill>{internalChildren}</ContainerPill>
            {error && !!externalChildren.length && <Error>{error}</Error>}
          </Container.Vertical>
        </Container.Horizontal>
      </Container.Vertical>
    </Container.Vertical>
  );
}
