import chroma from "chroma-js";
import { DefaultTheme, css } from "styled-components";

import tools, { BrightnessLevel } from "@mobilestockweb/tools";

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

export function getActiveStyles(
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
        background-color: ${chroma(backgroundColorWithLuminosity)
          .shade(0.5)
          .css()};
      `;
    case "OUTLINE":
      return css`
        border: 2px solid
          ${chroma(backgroundColorWithLuminosity).shade(0.5).css()};
      `;
    default:
      return "";
  }
}

export function getHoverStyles(
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
        background-color: ${chroma(backgroundColorWithLuminosity)
          .shade(0.25)
          .css()};
      `;
    case "OUTLINE":
      return css`
        border: 2px solid
          ${chroma(backgroundColorWithLuminosity).shade(0.25).css()};
      `;
    case "LINK":
      return css`
        * {
          color: ${backgroundColorWithLuminosity};
        }
      `;
    case "TRANSPARENT":
      return "";
  }
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
        * {
          color: ${tools.defineTextColor(backgroundColorWithLuminosity)};
        }
      `;
    case "OUTLINE":
      return css`
        border: 2px solid ${backgroundColorWithLuminosity};
        * {
          color: ${backgroundColorWithLuminosity};
        }
      `;
    case "LINK":
      return css`
        * {
          color: ${theme.colors.text.default};
        }
      `;
    case "TRANSPARENT":
      return css`
        * {
          color: ${backgroundColorWithLuminosity};
        }
      `;
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
      padding: "0.25rem 0.75rem",
      borderRadius: `${parseFloat(theme.borderRadius.default) + 1}px`,
    },
    SM: {
      padding: "0.5rem 1rem",
      borderRadius: `${parseFloat(theme.borderRadius.default) + 1}px`,
    },
    MD: {
      padding: "0.75rem 1.25rem",
      borderRadius: `${parseFloat(theme.borderRadius.default) + 3}px`,
    },
    LG: {
      padding: "1rem 1.75rem",
      borderRadius: `${parseFloat(theme.borderRadius.default) + 3}px`,
    },
    XL: {
      padding: "1.25rem 2.25rem",
      borderRadius: `${parseFloat(theme.borderRadius.default) + 5}px`,
    },
    "2XL": {
      padding: "1.5rem 2.75rem",
      borderRadius: `${parseFloat(theme.borderRadius.default) + 7}px`,
    },
    "3XL": {
      padding: "1.75rem 3.25rem",
      borderRadius: `${parseFloat(theme.borderRadius.default) + 9}px`,
    },
  };

  const config = sizeMap[size];
  const minHeight = `${
    baseMinHeight * parseFloat(theme.spacing[size.toLowerCase()])
  }rem`;

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
