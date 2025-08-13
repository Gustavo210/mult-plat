import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { GlobalStyle } from "@/globals";
import { GqlApi } from "@/services/GqlApi";
import ThemeProvider from "@/themeProvider";
import { theme } from "@/utils/theme/index.android";
import tools from "@mobilestock-native/tools";
import { configureFetchInstance } from "@mobilestockweb/graphql-axios-fetcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, useEffect } from "react";
import { Platform, SafeAreaView } from "react-native";

const HeaderProvider =
  Platform.OS === "web"
    ? lazy(() =>
        import("@mobilestockweb/header").then((mod) => ({
          default: mod.HeaderProvider,
        }))
      )
    : lazy(() =>
        import("@mobilestock-native/header").then((mod) => ({
          default: mod.HeaderProvider,
        }))
      );

const Header =
  Platform.OS === "web"
    ? lazy(() =>
        import("@mobilestockweb/header").then((mod) => ({
          default: mod.Header,
        }))
      )
    : lazy(() =>
        import("@mobilestock-native/header").then((mod) => ({
          default: mod.Header,
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
          <HeaderProvider
            appName="Multi-plat"
            avatar={
              "https://tse1.mm.bing.net/th/id/OIP.dUF3ioAUQ7maZCgH2eaMYAHaGW?rs=1&pid=ImgDetMain&o=7&rm=3"
            }
            logo="https://tse1.mm.bing.net/th/id/OIP.vPvdOr_bEgF1bknqMhM5TQHaFf?rs=1&pid=ImgDetMain&o=7&rm=3"
            pressOnAvatar={() => router.replace("/configs")}
          >
            <Stack
              initialRouteName="index"
              screenOptions={{
                header: () => (
                  <Header
                    pageTitle={Platform.OS === "web" ? "Web" : "Mobile"}
                  />
                ),
                contentStyle: {
                  paddingTop: 40,
                  paddingHorizontal: 4,
                  paddingBottom: 12,
                },
                title: "Expo Router",
              }}
            >
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
              <Stack.Screen
                name="header"
                options={{
                  header: () => (
                    <Header
                      pageTitle="Header"
                      pressOnTitle={() => router.replace("/")}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="test-page"
                options={{
                  header: () => (
                    <Header
                      pageTitle="Header Test Page"
                      pressOnTitle={() => router.replace("/")}
                    />
                  ),
                }}
              />
            </Stack>
            <StatusBar style="dark" />
            {Platform.OS === "web" && <GlobalStyle />}
          </HeaderProvider>
        </ThemeProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
