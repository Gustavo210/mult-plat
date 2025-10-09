import { ReactNode } from "react";
import ClientLayout from "../lib/client-layout";
import StyledComponentsRegistry from "../lib/styled-components-registry";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <ClientLayout>{children}</ClientLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
