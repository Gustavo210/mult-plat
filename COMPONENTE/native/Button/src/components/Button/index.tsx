import React, { ElementType, ReactElement, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import styled, { DefaultTheme, useTheme } from "styled-components/native";

import { Container, ViewBaseProps } from "@mobilestock-native/container";
import { IconName } from "@mobilestock-native/icons";
import tools, { ComponentWithTarget } from "@mobilestock-native/tools";
import { Typography, TypographyProps } from "@mobilestock-native/typography";
import { Clickable, ClickableProps } from "../../../../Clickable/src";

import {
  getIconAlign,
  getPressedStyles,
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
    name: "View",
    component: View,
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

export function Button({
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
  const Theme = useTheme();
  const [textColor, setTextColor] = useState<string>("");

  function changeTextColor(styleState: StyleProp<ViewStyle>) {
    if (
      typeof styleState === "object" &&
      !!styleState &&
      "color" in styleState &&
      typeof styleState.color === "string"
    ) {
      setTextColor(styleState.color);
    }
  }

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
      style={({ pressed }) => {
        let currentStyle = props.style;

        if (typeof currentStyle === "function") {
          currentStyle = currentStyle({ pressed });
        }

        if (Array.isArray(currentStyle)) {
          const findStyleData = currentStyle.findLast(
            (styleArray) => styleArray && "color" in styleArray
          );
          changeTextColor(findStyleData as StyleProp<ViewStyle>);
          return currentStyle;
        }

        changeTextColor(currentStyle);

        return getPressedStyles(pressed, variant, backgroundColor, Theme);
      }}
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
              variant={variant}
              backgroundColor={backgroundColor}
              icon={icon}
              size={size}
              color={textColor}
              notification={notification}
              notificationPosition={notificationPosition}
            />

            <TextContainer
              backgroundColor={backgroundColor}
              variant={variant}
              fontWeight={fontWeight}
              text={text}
              size={size}
              color={textColor}
              withUnderline={variant === "LINK"}
              notification={notification}
              notificationPosition={notificationPosition}
            />
          </FlexContainer>
        ) : (
          <>
            <IconContainer
              variant={variant}
              backgroundColor={backgroundColor}
              icon={icon}
              size={size}
              color={textColor}
              notification={notification}
              notificationPosition={notificationPosition}
            />

            <TextContainer
              backgroundColor={backgroundColor}
              variant={variant}
              fontWeight={fontWeight}
              text={text}
              size={size}
              color={textColor}
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
}

const ButtonComponent = styled(Clickable)<{
  $variant: Variant;
  $size: Sizes;
  $circular: boolean;
  $backgroundColor: BackgroundColor;
}>`
  justify-content: center;
  ${({ $variant, $backgroundColor, theme }) =>
    getVariantStyles($variant, $backgroundColor, theme)}
  ${({ $size, $circular, theme }) =>
    getSizeAndWidthStyles($size, $circular, theme)}
`;

const ButtonContent = styled(Container)<{
  $textAlign: TextAlign;
  $iconAlign: IconAlign;
}>`
  flex-direction: row;
  ${({ $textAlign }) => getTextAlign($textAlign)};
  ${({ $iconAlign }) => {
    if ($iconAlign === "START" || $iconAlign === "END") {
      return getIconAlign($iconAlign);
    }
    return "";
  }};
`;

export const RelativeContainer = styled.View`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const FlexContainer = styled(Container)<{ $iconAlign: IconAlign }>`
  flex-direction: row;
  ${({ $iconAlign }) => getIconAlign($iconAlign)};
`;

const FlexHelper = styled.View``;
