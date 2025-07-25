import defaultColors from "../defaultColors";
import { defaultSizes } from "../defaultSizes";

export const theme = {
  colors: {
    text: {
      default: defaultColors.secondary,
      contrast: defaultColors.primary,
      regular: defaultColors.primary,
      notice: defaultColors.orange50,
      loading: defaultColors.orange60,
      danger: defaultColors.tertiary,
    },
    container: {
      default: defaultColors.grey11,
      outline: {
        default: defaultColors.grey40,
        soft: defaultColors.secondary,
      },
      pure: defaultColors.secondary,
      shadow: defaultColors.shadow,
      purpleShadow: defaultColors.purpleShadow,
      success: defaultColors.green9,
      visibleArea: defaultColors.lightPink,
    },
    input: {
      default: defaultColors.secondary,
      contrast: defaultColors.primary,
      error: defaultColors.red38A20,
    },
    button: {
      default: defaultColors.blue41,
      anchor: defaultColors.blue50,
      shadow: defaultColors.shadow,
      selected: defaultColors.secondary,
      confirm: defaultColors.green50,
      cancel: defaultColors.orange58,
      darker: defaultColors.primary,
    },
    alert: {
      default: defaultColors.cyan48,
      urgent: defaultColors.tertiary,
      tip: defaultColors.yellow50,
      positiveDiff: defaultColors.green49,
      negativeDiff: defaultColors.orange63,
      success: defaultColors.green50,
      error: defaultColors.red53,
      info: defaultColors.grey40,
      warning: defaultColors.orange60,
    },
    header: {
      background: defaultColors.secondary,
      color: defaultColors.primary,
    },
    banner: {
      note: defaultColors.cyan54,
      tip: defaultColors.green50,
      important: defaultColors.purple42,
      warning: defaultColors.orange60,
      caution: defaultColors.orange58,
    },
    border: {
      visibleArea: defaultColors.pink,
    },
    footer: {
      background: {
        default: defaultColors.transparent,
        regular: defaultColors.secondary,
        contrast: defaultColors.primary,
        visible_area: defaultColors.lightPink,
      },
    },
  },
  font: {
    families: [
      "Arial",
      "Poppins",
      "Exile",
      "JetBrains Mono",
      "Monocraft",
      "sans-serif",
    ],
    lineHeight: 1.2,
    size: { ...defaultSizes.font },
    weight: {
      thin: 100,
      extraLight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
  },
  spacing: { ...defaultSizes.space },
  columns: { ...defaultSizes.columns },
  gaps: { ...defaultSizes.gaps },
  borderRadius: { ...defaultSizes.borderRadius },
  sizeIcons: { ...defaultSizes.icons },
  sizeImage: { ...defaultSizes.sizeImage },
  padding: { ...defaultSizes.padding },
} as const;
