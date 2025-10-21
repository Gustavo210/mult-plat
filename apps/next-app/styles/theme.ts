import { configureTheme } from "@mobilestockweb/theme";

export const theme = configureTheme({
  colors: (color) => ({
    container: {
      default: color.white95,
    },
    text: {
      default: color.black11,
    },
    badge: {
      default: color.black6,
    },
  }),
  font: {
    families: ["Roboto", "Arial", "sans-serif"],
  },
});
