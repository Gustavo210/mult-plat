import React, { createContext, ReactNode, useContext } from "react";

export interface ScanConfig {
  match: RegExp;
  format: (data: string) => string;
}

export interface CameraConfigs {
  [key: string]: ScanConfig;
}

const CameraConfigContext = createContext<CameraConfigs | null>(null);

export function useCameraConfig<T extends CameraConfigs>(): T {
  const context = useContext(CameraConfigContext);
  if (!context) {
    throw new Error(
      "useCameraConfig deve ser usado dentro de um CameraProvider"
    );
  }

  return context as T;
}

interface CameraProviderProps<T extends CameraConfigs> {
  configs: T;
  children: ReactNode;
}

export function CameraProvider<T extends CameraConfigs>(
  props: CameraProviderProps<T>
) {
  const { configs, children } = props;
  return (
    <CameraConfigContext.Provider value={configs}>
      {children}
    </CameraConfigContext.Provider>
  );
}
