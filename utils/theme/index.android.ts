import { Dimensions, PixelRatio, Platform, StatusBar } from "react-native";

import defaultColors from "../defaultColors";
import { defaultSizes } from "../defaultSizes";

export const theme = {
  colors: {
    text: {
      default: defaultColors.black,
      contrast: defaultColors.white,
    },

    container: {
      shadow: defaultColors.shadow,
      default: defaultColors.white,
      visibleArea: defaultColors.lightPink,
    },

    button: {
      default: defaultColors.primary,
    },
    border: {
      visibleArea: defaultColors.pink,
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
      background: defaultColors.black,
      sub: defaultColors.grey80,
    },
  },
  font: {
    families: [
      {
        name: "Poppins",
        require: require("../../assets/fonts/Poppins.ttf"),
        weight: "regular",
      },
      {
        name: "Arial",
        require: require("../../assets/fonts/Arial.ttf"),
        weight: "regular",
      },
      {
        name: "Exile",
        require: require("../../assets/fonts/Exile.ttf"),
        weight: "regular",
      },
      {
        name: "Poppins-Thin",
        require: require("../../assets/fonts/Poppins-Thin.ttf"),
        weight: "thin",
      },
      {
        name: "Poppins-ExtraLight",
        require: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        weight: "extraLight",
      },
      {
        name: "Poppins-Light",
        require: require("../../assets/fonts/Poppins-Light.ttf"),
        weight: "light",
      },
      {
        name: "Poppins-Medium",
        require: require("../../assets/fonts/Poppins-Medium.ttf"),
        weight: "medium",
      },
      {
        name: "Poppins-SemiBold",
        require: require("../../assets/fonts/Poppins-SemiBold.ttf"),
        weight: "semiBold",
      },
      {
        name: "Poppins-Bold",
        require: require("../../assets/fonts/Poppins-Bold.ttf"),
        weight: "bold",
      },
      {
        name: "Poppins-ExtraBold",
        require: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        weight: "extraBold",
      },
      {
        name: "Poppins-Black",
        require: require("../../assets/fonts/Poppins-Black.ttf"),
        weight: "black",
      },
      {
        name: "Monocraft-ExtraLight",
        require: require("../../assets/fonts/Monocraft-ExtraLight.ttf"),
        weight: "extraLight",
      },
      {
        name: "Monocraft-Light",
        require: require("../../assets/fonts/Monocraft-Light.ttf"),
        weight: "light",
      },
      {
        name: "Monocraft",
        require: require("../../assets/fonts/Monocraft.ttf"),
        weight: "regular",
      },
      {
        name: "Monocraft-SemiBold",
        require: require("../../assets/fonts/Monocraft-SemiBold.ttf"),
        weight: "semiBold",
      },
      {
        name: "Monocraft-Bold",
        require: require("../../assets/fonts/Monocraft-Bold.ttf"),
        weight: "bold",
      },
      {
        name: "Monocraft-Black",
        require: require("../../assets/fonts/Monocraft-Black.ttf"),
        weight: "black",
      },
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
  layout: {
    size: (size: number): number => {
      if (PixelRatio.get() < 2) {
        return PixelRatio.getPixelSizeForLayoutSize(size) * 1.3;
      }
      if (PixelRatio.get() >= 2 && PixelRatio.get() < 3) {
        return PixelRatio.getPixelSizeForLayoutSize(size) * 0.9;
      }
      if (PixelRatio.get() >= 3) {
        return PixelRatio.getPixelSizeForLayoutSize(size) * 0.7;
      }
      return 16;
    },
    width: (widthPercent: number): number => {
      const screenWidth = Dimensions.get("window").width;
      const elemWidth =
        typeof widthPercent === "number"
          ? widthPercent
          : parseFloat(widthPercent);
      return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
    },
    height: (heightPercent: number): number => {
      const screenHeight = Dimensions.get("window").height;
      const elemHeight =
        typeof heightPercent === "number"
          ? heightPercent
          : parseFloat(heightPercent);
      return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
    },
  },
  /** @deprecated */
  fonts: {
    size(fontSize: number, standardScreenHeight = 680): number {
      const { height, width } = Dimensions.get("window");
      const standardLength = width > height ? width : height;
      let offset = 0;
      let heightPercent = 0;

      if (width > height) {
        offset = 0;
      } else if (Platform.OS === "ios") {
        offset = 190;
      } else {
        offset = StatusBar.currentHeight || 0;
      }

      const deviceHeight =
        Platform.OS !== "android" ? standardLength - offset : standardLength;

      if (typeof fontSize === "number") {
        heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
      } else {
        heightPercent = (parseFloat(fontSize) * deviceHeight) / 100;
      }
      return Math.round(heightPercent);
    },
  },
  spacing: { ...defaultSizes.space },
  columns: { ...defaultSizes.columns },
  gaps: { ...defaultSizes.gaps },
  borderRadius: { ...defaultSizes.borderRadius },
  sizeIcons: { ...defaultSizes.icons },
  sizeImage: { ...defaultSizes.sizeImage },
} as const;
