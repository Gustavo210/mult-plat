import { ViewBaseProps } from "@mobilestock-native/container";
import { ReactNode } from "react";
import { Horizontal } from "./components/Horizontal";
import { Vertical } from "./components/Vertical";

export interface HeaderSubComponentProps extends ViewBaseProps {
  children: ReactNode;
}

function HeaderRoot() {
  throw new Error(
    "The Header component should not be used directly. Use Header.Vertical or Header.Horizontal instead."
  );
}

export const Header = Object.assign(HeaderRoot, {
  Horizontal,
  Vertical,
});
