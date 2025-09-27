import * as webTheme from "./utils/theme";
declare module "styled-components" {
  type ThemeType = typeof webTheme.theme;

  export interface DefaultTheme extends ThemeType {}
}
declare module "styled-components/native" {
  type ThemeType = typeof webTheme.theme;

  export interface DefaultTheme extends ThemeType {}
}
