import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { GlobalStyle } from "@/globals";
import { GqlApi } from "@/services/GqlApi";
import ThemeProvider from "@/themeProvider";
import { theme } from "@/utils/theme";
import tools from "@mobilestock-native/tools";
import { configureFetchInstance } from "@mobilestockweb/graphql-axios-fetcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, useEffect } from "react";
import { Platform, SafeAreaView } from "react-native";

const Button =
  Platform.OS === "web"
    ? lazy(() =>
        import("@mobilestockweb/button").then((mod) => ({
          default: mod.Button,
        }))
      )
    : lazy(() =>
        import("@mobilestock-native/button").then((mod) => ({
          default: mod.Button,
        }))
      );
const ContainerMain =
  Platform.OS === "web"
    ? lazy(() =>
        import("@mobilestockweb/container").then((mod) => ({
          default: mod.Container.Main,
        }))
      )
    : lazy(() =>
        import("@mobilestock-native/container").then((mod) => ({
          default: mod.Container.Main,
        }))
      );
const ContainerHorizontal =
  Platform.OS === "web"
    ? lazy(() =>
        import("@mobilestockweb/container").then((mod) => ({
          default: mod.Container.Horizontal,
        }))
      )
    : lazy(() =>
        import("@mobilestock-native/container").then((mod) => ({
          default: mod.Container.Horizontal,
        }))
      );
const Typography =
  Platform.OS === "web"
    ? lazy(() =>
        import("@mobilestockweb/typography").then((mod) => ({
          default: mod.Typography,
        }))
      )
    : lazy(() =>
        import("@mobilestock-native/typography").then((mod) => ({
          default: mod.Typography,
        }))
      );
configureFetchInstance(GqlApi);
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const router = useRouter();

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
    <QueryClientProvider client={new QueryClient()}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ThemeProvider>
          <ContainerMain>
            <Stack
              initialRouteName="index"
              screenOptions={{
                title: "Expo Router",
                headerTitle: "Expo Router",
              }}
            >
              <Stack.Screen
                name="index"
                options={{
                  headerLeft: () => null,
                  headerRight: () => null,
                  headerTitle: () => {
                    return (
                      <ContainerHorizontal align="CENTER" full>
                        <Typography size="3XL" weight="BOLD" family="POPPINS">
                          Repositório Mult-plat
                        </Typography>
                      </ContainerHorizontal>
                    );
                  },
                }}
              />
              <Stack.Screen name="+not-found" />
              <Stack.Screen
                name="configs"
                options={{
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: "transparent",
                  },
                  animation: "fade_from_bottom",
                  presentation: "transparentModal",
                }}
              />
            </Stack>
            <StatusBar style="dark" />
          </ContainerMain>
          {Platform.OS === "web" && <GlobalStyle />}
        </ThemeProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
