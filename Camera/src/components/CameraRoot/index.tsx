import { BarcodeScanningResult } from "expo-camera";
import React, { createContext, ReactNode, useContext } from "react";

import { Container } from "@mobilestock-native/container";
import { CameraConfigs } from "../../contexts/CameraProvider";
import {
  useCamera,
  UseCameraOptions,
  UseCameraResult,
} from "../../hooks/useCamera";
import { useLayout } from "../../hooks/useLayout";
import {
  ProcessedScanResult,
  useScanProcessor,
} from "../../hooks/useScanProcessor";
import { PausedScreen } from "../PausedScreen";
import { ViewLayer } from "./components/ViewLayer";

const CameraContext = createContext<UseCameraResult | null>(null);

export function useCameraContext(): UseCameraResult {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error(
      "useCameraContext deve ser usado como filho de um componente <Camera>"
    );
  }
  return context;
}

export interface CameraProps {
  onScan: (result: ProcessedScanResult) => void;
  children?: ReactNode;
  options?: UseCameraOptions;
  isLoading?: boolean;
  blockScan?: boolean;
  acceptReads?: (keyof CameraConfigs)[];
}

export function CameraRoot({
  children,
  onScan,
  options = {},
  isLoading = false,
  blockScan = false,
  acceptReads,
}: CameraProps) {
  const cameraHandler = useCamera(options);
  const processScan = useScanProcessor();
  const { headerHeight, headerChildren, mainChildren } = useLayout(children);

  function handleCodeScanned(rawResult: BarcodeScanningResult): void {
    if (isLoading || blockScan || !cameraHandler.isScanningActive) {
      return;
    }

    const processedResult = processScan(rawResult);

    if (
      acceptReads &&
      acceptReads.length > 0 &&
      !acceptReads.includes(processedResult.type as keyof CameraConfigs)
    ) {
      return;
    }

    onScan(processedResult);
  }

  return (
    <CameraContext.Provider value={cameraHandler}>
      <Container.Vertical full>
        {headerChildren}
        {cameraHandler.cameraState === "PAUSED" ? (
          <PausedScreen />
        ) : (
          <ViewLayer
            onBarcodeScanned={handleCodeScanned}
            headerHeight={headerHeight}
          >
            {mainChildren}
          </ViewLayer>
        )}
      </Container.Vertical>
    </CameraContext.Provider>
  );
}
