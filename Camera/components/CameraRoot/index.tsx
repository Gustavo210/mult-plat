import { BarcodeScanningResult, CameraView } from "expo-camera";
import React, { createContext, ReactNode, useContext } from "react";
import { Vibration } from "react-native";
import { styled } from "styled-components/native";

import { Icon } from "@mobilestock-native/icons";
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

  function handlePressIn(): void {
    Vibration.vibrate(50);
    cameraHandler.activateManualScan();
  }

  function renderContentWrapper(): ReactNode {
    const overlayUI = (
      <ContentOverlay>
        {!cameraHandler.isScanningActive && (
          <>
            <TargetContainer>
              <TargetImage source={require("../../images/target.png")} />
              <Icon name="CameraOutline" />
            </TargetContainer>
          </>
        )}
        {children}
      </ContentOverlay>
    );

    if (cameraHandler.isManualActivation) {
      return (
        <ActivationArea
          underlayColor="transparent"
          onPressIn={handlePressIn}
          onPressOut={cameraHandler.deactivateManualScan}
        >
          {overlayUI}
        </ActivationArea>
      );
    }

    return overlayUI;
  }

  return (
    <CameraContext.Provider value={cameraHandler}>
      <CameraContainer>
        {cameraHandler.cameraState === "PAUSED" ? (
          <PausedScreen />
        ) : (
          <>
            <ExpoCameraView
              onBarcodeScanned={handleBarcodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr", "code128"],
              }}
            />
            {renderContentWrapper()}
          </>
        )}
      </CameraContainer>
    </CameraContext.Provider>
  );
}

const CameraContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.container.default};
  overflow: hidden;
`;

const ExpoCameraView = styled(CameraView)`
  flex: 1;
`;

const ContentOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ActivationArea = styled.TouchableHighlight`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const TargetContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 250px;
  height: 250px;

  margin-top: -125px;
  margin-left: -125px;
  justify-content: center;
  align-items: center;
`;

const TargetImage = styled.Image`
  width: 100%;
  height: 100%;
`;
