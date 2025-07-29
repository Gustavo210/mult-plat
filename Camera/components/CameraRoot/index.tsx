import { BarcodeScanningResult, CameraView } from "expo-camera";
import React, { createContext, ReactNode, useContext } from "react";
import { styled } from "styled-components/native";

import { Container } from "@mobilestock-native/container";
import {
  useCamera,
  UseCameraOptions,
  UseCameraResult,
} from "../../hooks/useCamera";
import {
  ProcessedScanResult,
  useScanProcessor,
} from "../../hooks/useScanProcessor";
import { PausedScreen } from "../PausedScreen";

// interface CameraContextType extends UseCameraResult {}
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
  children: ReactNode;
  options?: UseCameraOptions;
}

export function CameraRoot({ children, onScan, options = {} }: CameraProps) {
  const cameraHandler = useCamera(options);
  const processScan = useScanProcessor();

  function handleBarcodeScanned(rawResult: BarcodeScanningResult): void {
    if (cameraHandler.isScanningActive) {
      const processedResult = processScan(rawResult);
      onScan(processedResult);
    }
  }

  return (
    <CameraContext.Provider value={cameraHandler}>
      <Container.Main>
        {cameraHandler.cameraState === "PAUSED" ? (
          <PausedScreen />
        ) : (
          <ExpoCameraView
            onBarcodeScanned={handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "code128"],
            }}
          />
        )}
        {children}
      </Container.Main>
    </CameraContext.Provider>
  );
}

const ExpoCameraView = styled(CameraView)`
  flex: 1;
`;
