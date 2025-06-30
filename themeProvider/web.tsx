import { ThemeProvider } from "styled-components";

import { theme } from "@/utils/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
