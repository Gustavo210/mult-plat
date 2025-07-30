import React, { createContext, ReactNode, useContext } from "react";

export interface ScanConfig {
  match: RegExp;
  format: (data: string) => string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CameraConfigRegistry {}

export type CameraConfigs = {
  [K in keyof CameraConfigRegistry]: ScanConfig;
};

const CameraConfigContext = createContext<CameraConfigs | null>(null);

export function useCameraConfig(): CameraConfigs {
  const context = useContext(CameraConfigContext);
  if (!context) {
    throw new Error(
      "useCameraConfig deve ser usado dentro de um CameraProvider"
    );
  }

  return context;
}

interface CameraProviderProps {
  configs: CameraConfigs;
  children: ReactNode;
}

export function CameraProvider(props: CameraProviderProps) {
  const { configs, children } = props;
  return (
    <CameraConfigContext.Provider value={configs}>
      {children}
    </CameraConfigContext.Provider>
  );
}
