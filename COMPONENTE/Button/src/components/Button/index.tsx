import chroma from "chroma-js";
import React, { ElementType, ReactElement, ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import styled, { DefaultTheme, css, useTheme } from "styled-components/native";

import { Clickable, ClickableProps } from "@mobilestock-native/clickable";
import { Container } from "@mobilestock-native/container";
import { IconName } from "@mobilestock-native/icons";
import tools, {
  BrightnessLevel,
  ComponentWithTarget,
} from "@mobilestock-native/tools";
import { Typography, TypographyProps } from "@mobilestock-native/typography";

import { IconContainer } from "../IconContainer";
import { NotificationBadge } from "../NotificationBadge";
import { TextContainer } from "../TextContainer";

export type Sizes = Uppercase<keyof DefaultTheme["font"]["size"] & string>;

type Color = Uppercase<keyof DefaultTheme["colors"]["button"] & string>;

type Shade = "LIGHT" | "DARK";

type BackgroundColor = `${Color}_${Shade}` | Color;

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
  color?: string;
  size?: Sizes;
  icon?: IconName;
  fontWeight?: TypographyProps["weight"];
  variant?: Variant;
  iconAlign?: IconAlign;
  textAlign?: TextAlign;
  notificationPosition?: NotificationPosition;
  backgroundColor?: BackgroundColor;
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
  color,
  ...props
}: ButtonProps) {
  const Theme = useTheme();

  function validateJSXTree(element: ReactNode) {
    if (!React.isValidElement(element)) {
      return typeof element === "string" || typeof element === "number";
    }

    if (!tools.validateChildren(element, VALID_COMPONENTS_ARRAY)) {
      return false;
    }

    if (element.props && element.props.children) {
      const children = React.Children.toArray(element.props.children);

      for (const child of children) {
        if (!validateJSXTree(child)) {
          return false;
        }
      }
    }

    return true;
  }

  if (typeof text !== "string" && !!text) {
    const isValidJSX = validateJSXTree(text);
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
      style={({ pressed }) =>
        getPressedStyles(pressed, variant, backgroundColor, Theme)
      }
      isLoading={isLoading}
      disabled={disabled || isLoading}
      $backgroundColor={backgroundColor}
      $size={size}
      $variant={variant}
      $circular={circular}
    >
      <ButtonContent
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
              color={color}
              notification={notification}
              notificationPosition={notificationPosition}
            />

            <TextContainer
              backgroundColor={backgroundColor}
              variant={variant}
              fontWeight={fontWeight}
              text={text}
              size={size}
              color={color}
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
              color={color}
              notification={notification}
              notificationPosition={notificationPosition}
            />

            <TextContainer
              backgroundColor={backgroundColor}
              variant={variant}
              fontWeight={fontWeight}
              text={text}
              size={size}
              color={color}
              withUnderline={variant === "LINK"}
              notification={notification}
              notificationPosition={notificationPosition}
            />
          </>
        )}

        {notification && notificationPosition === "END" && (
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

export function calculateBackgroundColor(
  backgroundColor: BackgroundColor,
  theme: DefaultTheme
) {
  const splitArray = backgroundColor.split("_");

  let luminosity: BrightnessLevel = 500;

  if (splitArray.length > 1) {
    const shade = splitArray[1] as Shade;

    switch (shade) {
      case "LIGHT":
        luminosity = 400;
        break;
      case "DARK":
        luminosity = 600;
        break;
    }
  }

  const color = tools.getColorWithLuminosity(
    theme.colors.button[splitArray[0].toLowerCase()],
    luminosity
  );
  return color;
}

export function getPressedStyles(
  pressed: boolean,
  variant: Variant,
  backgroundColor: BackgroundColor,
  theme: DefaultTheme
) {
  if (pressed) {
    const backgroundColorWithLuminosity = calculateBackgroundColor(
      backgroundColor,
      theme
    );

    const style: StyleProp<ViewStyle> = {
      transform: "scale(0.98)",
    };

    switch (variant) {
      case "DEFAULT":
        style.backgroundColor = chroma(backgroundColorWithLuminosity)
          .shade(0.25)
          .css();
        break;
      case "OUTLINE":
        style.borderColor = chroma(backgroundColorWithLuminosity)
          .shade(0.25)
          .css();
        break;
    }

    return style;
  }
  return {};
}

function getIconAlign(iconAlign: IconAlign) {
  switch (iconAlign) {
    case "START":
      return css`
        justify-content: space-between;
      `;
    case "BEFORE-TEXT":
      return css`
        justify-content: center;
      `;
    case "AFTER-TEXT":
      return css`
        flex-direction: row-reverse;
        justify-content: center;
      `;
    case "ABOVE-TEXT":
      return css`
        flex-direction: column;
        gap: 0;
      `;
    case "END":
      return css`
        flex-direction: row-reverse;
        justify-content: space-between;
      `;
  }
}

function getTextAlign(textAlign: TextAlign) {
  switch (textAlign) {
    case "START":
      return css`
        justify-content: flex-start;
      `;
    case "CENTER":
      return css`
        justify-content: center;
      `;
    case "END":
      return css`
        justify-content: flex-end;
      `;
  }
}

function getVariantStyles(
  variant: Variant,
  backgroundColor: BackgroundColor,
  theme: DefaultTheme
) {
  const backgroundColorWithLuminosity = calculateBackgroundColor(
    backgroundColor,
    theme
  );

  switch (variant) {
    case "DEFAULT":
      return css`
        background-color: ${backgroundColorWithLuminosity};
      `;
    case "OUTLINE":
      return css`
        border: 3px solid ${backgroundColorWithLuminosity};
      `;
    case "LINK":
    case "TRANSPARENT":
      return "";
  }
}

function getSizeAndWidthStyles(
  size: Sizes,
  circular: boolean,
  theme: DefaultTheme
) {
  let baseMinHeight = 3;

  if (circular) {
    baseMinHeight = 4;
  }

  const sizeMap: Record<Sizes, Record<string, string>> = {
    XS: {
      padding: `${tools.calculateRemToPx("0.25rem")} ${tools.calculateRemToPx(
        "0.75rem"
      )}`,
      borderRadius: `${parseFloat(theme.borderRadius.default) + 1}px`,
    },
    SM: {
      padding: `${tools.calculateRemToPx("0.5rem")} ${tools.calculateRemToPx(
        "1rem"
      )}`,
      borderRadius: `${parseFloat(theme.borderRadius.default) + 1}px`,
    },
    MD: {
      padding: `${tools.calculateRemToPx("0.75rem")} ${tools.calculateRemToPx(
        "1.25rem"
      )}`,
      borderRadius: `${parseFloat(theme.borderRadius.default) + 3}px`,
    },
    LG: {
      padding: `${tools.calculateRemToPx("1rem")} ${tools.calculateRemToPx(
        "1.75rem"
      )}`,
      borderRadius: `${parseFloat(theme.borderRadius.default) + 3}px`,
    },
    XL: {
      padding: `${tools.calculateRemToPx("1.25rem")} ${tools.calculateRemToPx(
        "2.25rem"
      )}`,
      borderRadius: `${parseFloat(theme.borderRadius.default) + 5}px`,
    },
    "2XL": {
      padding: `${tools.calculateRemToPx("1.5rem")} ${tools.calculateRemToPx(
        "2.75rem"
      )}`,
      borderRadius: `${parseFloat(theme.borderRadius.default) + 7}px`,
    },
    "3XL": {
      padding: `${tools.calculateRemToPx("1.75rem")} ${tools.calculateRemToPx(
        "3.25rem"
      )}`,
      borderRadius: `${parseFloat(theme.borderRadius.default) + 9}px`,
    },
  };

  const config = sizeMap[size];
  const minHeight = `${
    baseMinHeight * parseFloat(theme.spacing[size.toLowerCase()])
  }px`;

  const baseStyle = css`
    padding: ${circular ? "0" : config.padding};
    border-radius: ${circular
      ? theme.borderRadius.rounded
      : config.borderRadius};
    min-height: ${minHeight};
  `;

  if (circular) {
    return css`
      ${baseStyle}
      width: ${minHeight};
      min-height: ${minHeight};
    `;
  }

  return baseStyle;
}

const ButtonComponent = styled(Clickable)<{
  $variant: Variant;
  $size: Sizes;
  $circular: boolean;
  $backgroundColor: BackgroundColor;
}>`
  flex: 1;
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
