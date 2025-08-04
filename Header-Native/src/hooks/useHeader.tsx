import { createContext, ReactNode, useContext } from "react";

interface HeaderContextState {
  appName: string;
  avatar?: string;
  pageTitle?: string;
  logoComponent: string;
  subHeader?: ReactNode;
}

interface HeaderContextActions {
  setPageTitle(title?: string): void;
  setSubHeader(subHeader?: ReactNode): void;
  pressOnAvatar?: () => void;
  pressOnTitle?: () => void;
}

export type HeaderContextType = HeaderContextState & HeaderContextActions;

export const HeaderContext = createContext<HeaderContextType | null>(null);

export function useHeader(): HeaderContextType {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }

  return context;
}
