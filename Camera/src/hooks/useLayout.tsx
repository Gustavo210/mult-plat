import React, { isValidElement, ReactNode, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { Header } from "../components/Header";

type ComponentWithDisplayName = React.ComponentType & { displayName?: string };

function isComponentWithDisplayName(
  component: unknown
): component is ComponentWithDisplayName {
  const componentObject = component as ComponentWithDisplayName;
  return componentObject && typeof componentObject.displayName === "string";
}

interface UseCameraLayoutResult {
  headerHeight: number;
  headerChildren: ReactNode[];
  mainChildren: ReactNode[];
}

export function useLayout(children: ReactNode): UseCameraLayoutResult {
  const [headerHeight, setHeaderHeight] = useState(0);

  function handleHeaderLayout(event: LayoutChangeEvent): void {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  }

  const headerChildren: ReactNode[] = [];
  const mainChildren: ReactNode[] = [];

  let childrenToIterate = children;
  if (React.isValidElement(children) && children.type === React.Fragment) {
    childrenToIterate = (
      children as React.ReactElement<{ children?: ReactNode }>
    ).props.children;
  }

  React.Children.toArray(childrenToIterate).forEach((child) => {
    if (isValidElement(child) && isComponentWithDisplayName(child.type)) {
      if (
        [Header.Vertical.displayName, Header.Horizontal.displayName].includes(
          child.type.displayName
        )
      ) {
        const clonedHeader = React.cloneElement(
          child as React.ReactElement<{
            onLayout?: (event: LayoutChangeEvent) => void;
          }>,
          {
            onLayout: handleHeaderLayout,
          }
        );
        headerChildren.push(clonedHeader);
      }
    } else {
      mainChildren.push(child);
    }
  });

  return { headerHeight, headerChildren, mainChildren };
}
