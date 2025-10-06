import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Container } from "@mobilestock-native/container";
import tools from "@mobilestock-native/tools";
import { Typography } from "@mobilestock-native/typography";
import { useEffect } from "react";
import { Platform } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { GlobalStyle } from "../styles/globals";
import { theme } from "../styles/theme";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded, error] = useFonts(
    tools.mapFamiliesToFonts([...theme.font.families])
  );

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container.Main>
        <Stack initialRouteName="index">
          <Stack.Screen
            name="index"
            options={{
              headerTitle: () => {
                return (
                  <Container.Horizontal align="CENTER" full>
                    <Typography size="3XL" weight="BOLD" family="POPPINS">
                      Repositório Mult-plat
                    </Typography>
                  </Container.Horizontal>
                );
              },
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="dark" />
      </Container.Main>
      {Platform.OS === "web" && <GlobalStyle />}
    </ThemeProvider>
  );
}
