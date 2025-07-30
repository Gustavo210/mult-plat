import React, { isValidElement, ReactNode, useMemo } from "react";
import { Header } from "../components/Header";

type ComponentWithDisplayName = React.ComponentType & { displayName?: string };

function isComponentWithDisplayName(
  component: unknown
): component is ComponentWithDisplayName {
  const componentObject = component as ComponentWithDisplayName;
  return componentObject && typeof componentObject.displayName === "string";
}

interface UseCameraLayoutResult {
  headerChildren: ReactNode[];
  mainChildren: ReactNode[];
}

export function useLayout(children: ReactNode): UseCameraLayoutResult {
  const { headerChildren, mainChildren } = useMemo(() => {
    const headerChildren: ReactNode[] = [];
    const mainChildren: ReactNode[] = [];

    let childrenToIterate = children;
    if (React.isValidElement(children) && children.type === React.Fragment) {
      childrenToIterate = (
        children as React.ReactElement<{ children?: ReactNode }>
      ).props.children;
    }

    React.Children.toArray(childrenToIterate).forEach((child) => {
      if (
        isValidElement(child) &&
        isComponentWithDisplayName(child.type) &&
        [Header.Vertical.displayName, Header.Horizontal.displayName].includes(
          child.type.displayName
        )
      ) {
        headerChildren.push(child);
      } else {
        mainChildren.push(child);
      }
    });

    return { headerChildren, mainChildren };
  }, [children]);

  return { headerChildren, mainChildren };
}
