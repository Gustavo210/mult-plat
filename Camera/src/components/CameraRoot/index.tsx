import { BarcodeScanningResult } from "expo-camera";
import React, { createContext, ReactNode, useContext } from "react";

import { Container } from "@mobilestock-native/container";
import { Icon } from "@mobilestock-native/icons";
import { LoadingSpinner } from "@mobilestock-native/loading-spinner";
import { Typography } from "@mobilestock-native/typography";
import { CameraConfigs } from "../../contexts/CameraProvider";
import { useCamera, UseCameraResult } from "../../hooks/useCamera";
import { useLayout } from "../../hooks/useLayout";
import {
  ProcessedScanResult,
  useScanProcessor,
} from "../../hooks/useScanProcessor";
import {
  SoundFeedbackResult,
  useSoundFeedback,
} from "../../hooks/useSoundFeedback";
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
  onScan: (
    result: ProcessedScanResult,
    soundControls: SoundFeedbackResult
  ) => void;
  children?: ReactNode;
  isLoading?: boolean;
  blockScan?: boolean;
  acceptReads?: (keyof CameraConfigs)[];
  isAutomaticScan?: boolean;
  disableAutomaticBip?: boolean;
}

export function CameraRoot({
  children,
  onScan,
  isLoading = false,
  blockScan = false,
  acceptReads,
  isAutomaticScan = false,
  disableAutomaticBip = false,
}: CameraProps) {
  const cameraHandler = useCamera({ isManualActivation: !isAutomaticScan });
  const processScan = useScanProcessor();
  const { playShortBip, playLongBip } = useSoundFeedback();
  const { headerHeight, headerChildren, mainChildren } = useLayout(children);

  function handleCodeScanned(rawResult: BarcodeScanningResult): void {
    if (isLoading || blockScan || !cameraHandler.isScanningActive) {
      return;
    }

    cameraHandler.resetInactivityTimer();
    const processedResult = processScan(rawResult);

    if (
      acceptReads &&
      acceptReads.length > 0 &&
      !acceptReads.includes(processedResult.type as keyof CameraConfigs)
    ) {
      return;
    }

    if (processedResult.type !== "UNKNOWN" && !disableAutomaticBip) {
      playShortBip();
    }

    onScan(processedResult, { playShortBip, playLongBip });
  }

  if (isLoading) return <LoadingSpinner size="3XL" title="Carregando..." />;

  if (blockScan) {
    return (
      <Container.Vertical full align="CENTER">
        <Icon name="AlertTriangle" size="3XL" color="orange" />
        <Typography size="LG" weight="EXTRABOLD">
          Escaneamento bloqueado
        </Typography>
      </Container.Vertical>
    );
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
