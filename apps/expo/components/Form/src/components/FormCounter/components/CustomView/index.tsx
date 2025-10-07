import { Container } from "@mobilestock-native/container";
import tools from "@mobilestock-native/tools";
import {
  Children,
  Fragment,
  isValidElement,
  ReactNode,
  useCallback,
} from "react";
import { Badge } from "../Badge";
import { ContainerPill } from "../ContainerPiil";

export function CustomView({ children }: { children: React.ReactNode }) {
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
      child.props.label
    ) {
      externalChildren.push(child);
    } else {
      internalChildren.push(child);
    }
  });

  return (
    <Container.Vertical>
      <Container.Horizontal
        gap="XS"
        align={externalChildren.length ? "CENTER_START" : "CENTER"}
      >
        {externalChildren}
        <ContainerPill>{internalChildren}</ContainerPill>
      </Container.Horizontal>
    </Container.Vertical>
  );
}
