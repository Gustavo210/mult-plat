import { Container } from "@mobilestock-native/container";
import tools from "@mobilestock-native/tools";
import { Typography } from "@mobilestock-native/typography";
import {
  Children,
  Fragment,
  isValidElement,
  ReactNode,
  useCallback,
} from "react";
import { Minun, Plusle } from "../..";
import { useCounter } from "../../hooks/useCount";
import { Badge } from "../Badge";
import { ContainerPill } from "../ContainerPiil";
import { Display } from "../Display";
import { Error } from "../Error";
import { Item } from "../Item";
import { Label } from "../Label";

export function CustomView({ children }: { children: React.ReactNode }) {
  const { label, error, labelPosition } = useCounter();

  const externalChildren: ReactNode[] = [];
  const internalChildren: ReactNode[] = [];
  const itemChildren: ReactNode[] = [];

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
    } else if (
      isValidElement(child) &&
      tools.isComponentWithDisplayName(child.type) &&
      child.type.displayName === Item.displayName
    ) {
      itemChildren.push(child);
    } else {
      internalChildren.push(child);
    }
  });

  if (itemChildren.length) {
    const orderRender: string[] = [];
    const render = {
      [Badge.displayName!]: [],
      [Plusle.displayName!]: [],
      [Minun.displayName!]: [],
      [Display.displayName!]: [],
    };
    const headers = {
      [Badge.displayName!]: "Badge",
      [Plusle.displayName!]: "Plusle",
      [Minun.displayName!]: "Minun",
      [Display.displayName!]: "Display",
    };

    Children.toArray(itemChildren.map((child) => child.props.children)).forEach(
      (child) => {
        if (
          !isValidElement(child) &&
          !tools.isComponentWithDisplayName(child.type)
        ) {
          return;
        }
        switch (child.type.displayName) {
          case Badge.displayName:
            render[Badge.displayName!].push(child);
            orderRender.push(Badge.displayName!);
            break;
          case Plusle.displayName:
            render[Plusle.displayName!].push(child);
            orderRender.push(Plusle.displayName!);
            break;
          case Minun.displayName:
            render[Minun.displayName!].push(child);
            orderRender.push(Minun.displayName!);
            break;
          case Display.displayName:
            render[Display.displayName!].push(child);
            orderRender.push(Display.displayName!);
            break;
          default:
            break;
        }
      }
    );

    return (
      <Container.Horizontal gap="XS">
        {Object.entries(render)
          .sort(([a], [b]) => {
            return orderRender.indexOf(a) - orderRender.indexOf(b);
          })
          .map(([component, children]) => {
            return (
              <Container.Vertical key={component} gap="2XS">
                <Container.Horizontal align="CENTER">
                  <Typography>{headers[component]}</Typography>
                </Container.Horizontal>
                <Container.Vertical gap="2XS">{children}</Container.Vertical>
              </Container.Vertical>
            );
          })}
      </Container.Horizontal>
    );
  }
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
