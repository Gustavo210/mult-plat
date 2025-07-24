import chroma from "chroma-js";
import { StyleProp, ViewStyle } from "react-native";
import { DefaultTheme, css } from "styled-components/native";

import tools, { BrightnessLevel } from "@mobilestock-native/tools";

import {
  BackgroundColor,
  IconAlign,
  Shade,
  Sizes,
  TextAlign,
  Variant,
} from "../components/Button";

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

export function getIconAlign(iconAlign: IconAlign) {
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

export function getTextAlign(textAlign: TextAlign) {
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

export function getVariantStyles(
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

export function getSizeAndWidthStyles(
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
