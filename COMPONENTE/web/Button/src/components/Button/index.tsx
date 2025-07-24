import React, { ElementType, ReactElement, useRef } from "react";
import styled, { DefaultTheme, css } from "styled-components";

import { Clickable, ClickableProps } from "@mobilestockweb/clickable";
import { Container, ViewBaseProps } from "@mobilestockweb/container";
import { IconName } from "@mobilestockweb/icons";
import tools, { ComponentWithTarget } from "@mobilestockweb/tools";
import { Typography, TypographyProps } from "@mobilestockweb/typography";

import {
  calculateBackgroundColor,
  getActiveStyles,
  getHoverStyles,
  getIconAlign,
  getSizeAndWidthStyles,
  getTextAlign,
  getVariantStyles,
} from "../../utils";
import { IconContainer } from "../IconContainer";
import { NotificationBadge } from "../NotificationBadge";
import { TextContainer } from "../TextContainer";

export type Sizes = Uppercase<keyof DefaultTheme["font"]["size"] & string>;

type ButtonColor = Uppercase<keyof DefaultTheme["colors"]["button"] & string>;

export type Shade = "LIGHT" | "DARK";

export type BackgroundColor = `${ButtonColor}_${Shade}` | ButtonColor;

export type Variant = "DEFAULT" | "LINK" | "TRANSPARENT" | "OUTLINE";

export type IconAlign =
  | "START"
  | "BEFORE-TEXT"
  | "AFTER-TEXT"
  | "ABOVE-TEXT"
  | "END";

export type TextAlign = "START" | "CENTER" | "END";

export type NotificationPosition = "ICON" | "TEXT" | "END";

export interface ButtonProps extends Omit<ClickableProps, "children"> {
  text?: string | ReactElement;
  disabled?: boolean;
  circular?: boolean;
  notification?: number;
  size?: Sizes;
  icon?: IconName;
  fontWeight?: TypographyProps["weight"];
  variant?: Variant;
  iconAlign?: IconAlign;
  textAlign?: TextAlign;
  notificationPosition?: NotificationPosition;
  backgroundColor?: BackgroundColor;
  padding?: ViewBaseProps["padding"];
}

type ChildrenListItem = {
  name: string;
  component: ElementType;
};

const VALID_CHILDREN_LIST: ChildrenListItem[] = [
  {
    name: "div",
    component: "div",
  },
  {
    name: "Container",
    component: Container,
  },
  {
    name: "Typography",
    component: Typography,
  },
];

const VALID_COMPONENTS_ARRAY = VALID_CHILDREN_LIST.map(
  (item) => item.component
);

export const Button = React.memo(function Button({
  variant = "DEFAULT",
  size = "MD",
  iconAlign = "BEFORE-TEXT",
  backgroundColor = "DEFAULT",
  notificationPosition = "ICON",
  fontWeight = "REGULAR",
  textAlign = "CENTER",
  circular = false,
  notification,
  text,
  isLoading,
  icon,
  disabled,
  padding,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (typeof text !== "string" && !!text) {
    const isValidJSX = tools.validateJSXTree(text, VALID_COMPONENTS_ARRAY);
    if (!isValidJSX) {
      throw new Error(
        `Invalid jsx text props. Expected one of ${VALID_CHILDREN_LIST.map(
          (item) => item.name
        ).join(", ")}, but received: ${
          (text.type as ComponentWithTarget).target || text.type
        }`
      );
    }
  }

  return (
    <ButtonComponent
      {...props}
      ref={buttonRef}
      isLoading={isLoading}
      disabled={disabled || isLoading}
      $backgroundColor={backgroundColor}
      $size={size}
      $variant={variant}
      $circular={circular}
    >
      <ButtonContent
        padding={padding}
        gap={size}
        align="CENTER"
        $textAlign={textAlign}
        $iconAlign={iconAlign}
      >
        {iconAlign !== "START" && iconAlign !== "END" ? (
          <FlexContainer
            gap={iconAlign === "ABOVE-TEXT" ? "NONE" : size}
            align="CENTER"
            $iconAlign={iconAlign}
          >
            <IconContainer
              icon={icon}
              size={size}
              notification={notification}
              notificationPosition={notificationPosition}
            />

            <TextContainer
              text={text}
              fontWeight={fontWeight}
              size={size}
              withUnderline={variant === "LINK"}
              notification={notification}
              notificationPosition={notificationPosition}
            />
          </FlexContainer>
        ) : (
          <>
            <IconContainer
              icon={icon}
              size={size}
              notification={notification}
              notificationPosition={notificationPosition}
            />

            <TextContainer
              text={text}
              fontWeight={fontWeight}
              size={size}
              withUnderline={variant === "LINK"}
              notification={notification}
              notificationPosition={notificationPosition}
            />
          </>
        )}

        {!!notification && notificationPosition === "END" && (
          <NotificationBadge
            notification={notification}
            notificationPosition={notificationPosition}
            size={size}
          />
        )}

        {!notification &&
          (iconAlign === "START" || iconAlign === "END") &&
          !circular && <FlexHelper />}
      </ButtonContent>
    </ButtonComponent>
  );
});

const ButtonComponent = styled(Clickable)<{
  $variant: Variant;
  $size: Sizes;
  $circular: boolean;
  $backgroundColor: BackgroundColor;
}>`
  flex: 1;
  user-select: none;
  ${({ $variant, $backgroundColor, theme }) =>
    getVariantStyles($variant, $backgroundColor, theme)}
  ${({ $size, $circular, theme }) =>
    getSizeAndWidthStyles($size, $circular, theme)}

  &:not(:disabled):hover {
    ${({ $variant, $backgroundColor, theme }) =>
      getHoverStyles($variant, $backgroundColor, theme)}
  }

  &:not(:disabled):active {
    transform: scale(0.98);
    ${({ $variant, $backgroundColor, theme }) =>
      getActiveStyles($variant, $backgroundColor, theme)}
  }

  &:focus-visible {
    outline-offset: 2px;

    ${({ $backgroundColor, theme }) => {
      const backgroundColor = calculateBackgroundColor($backgroundColor, theme);

      return css`
        outline: 3px solid ${backgroundColor};
      `;
    }}
  }
`;

const ButtonContent = styled(Container)<{
  $iconAlign: IconAlign;
  $textAlign: TextAlign;
}>`
  ${({ $textAlign }) => getTextAlign($textAlign)};
  ${({ $iconAlign }) => {
    if ($iconAlign === "START" || $iconAlign === "END") {
      return getIconAlign($iconAlign);
    }
    return "";
  }};
`;
export const RelativeContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const FlexContainer = styled(Container)<{ $iconAlign: IconAlign }>`
  ${({ $iconAlign }) => getIconAlign($iconAlign)};
`;

const FlexHelper = styled.div``;
