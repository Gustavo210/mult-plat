import { ReactNode, useCallback, useState } from "react";

import { HeaderContext, HeaderContextType } from "../hooks/useHeader";

export interface HeaderProviderProps {
  children: ReactNode;
  appName: string;
  avatar?: string;
  logoComponent: string;
  pressOnAvatar?: () => void;
  pressOnTitle?: () => void;
}

export function HeaderProvider({
  children,
  appName,
  avatar,
  logoComponent,
  pressOnAvatar,
  pressOnTitle,
}: HeaderProviderProps) {
  const [pageTitle, setPageTitle] = useState<string | undefined>(undefined);
  const [subHeader, setSubHeader] = useState<ReactNode | undefined>(undefined);

  const handleSetPageTitle = useCallback((title?: string) => {
    setPageTitle(title);
  }, []);

  const contextValue: HeaderContextType = {
    appName,
    avatar,
    logoComponent,
    pageTitle,
    subHeader,
    setPageTitle: handleSetPageTitle,
    pressOnAvatar,
    pressOnTitle,
    setSubHeader,
  };

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  );
}
