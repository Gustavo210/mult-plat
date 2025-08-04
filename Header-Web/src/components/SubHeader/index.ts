import { ViewBaseProps } from "@mobilestockweb/container";
import { ReactNode } from "react";

import { HeaderButton } from "./components/Button";
import { Horizontal } from "./components/Horizontal";
import { Vertical } from "./components/Vertical";

export interface SubComponentProps extends ViewBaseProps {
  children: ReactNode;
}

function SubHeaderRoot(): never {
  throw new Error(
    "The SubHeader component should not be used directly. Use SubHeader.Vertical or SubHeader.Horizontal."
  );
}

export const SubHeader = Object.assign(SubHeaderRoot, {
  Vertical,
  Horizontal,
  Button: HeaderButton,
});
