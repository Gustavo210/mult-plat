import { BarcodeScanningResult, CameraView } from "expo-camera";
import React, { ReactNode } from "react";
import { Vibration } from "react-native";
import { styled } from "styled-components/native";

import { Icon } from "@mobilestock-native/icons";
import { Spacer } from "@mobilestock-native/spacer";
import { Typography } from "@mobilestock-native/typography";
import { useCameraContext } from "../../";

interface CameraViewLayerProps {
  onBarcodeScanned: (result: BarcodeScanningResult) => void;
  headerHeight: number;
  children: ReactNode;
}

export function ViewLayer({
  onBarcodeScanned,
  headerHeight,
  children,
}: CameraViewLayerProps) {
  const {
    isScanningActive,
    isManualActivation,
    activateManualScan,
    deactivateManualScan,
  } = useCameraContext();

  function handlePressIn(): void {
    Vibration.vibrate(50);
    activateManualScan();
  }

  const overlayUI = (
    <ContentOverlay $headerHeight={headerHeight}>
      {!isScanningActive ? (
        <MessageContainer>
          <Typography align="CENTER" size="MD" weight="SEMIBOLD">
            Pressione e segure para escanear
          </Typography>
          <Spacer size="SM" />
          <Icon name="Fingerprint" size="3XL" color="blue" />
        </MessageContainer>
      ) : (
        <TargetContainer>
          <TargetImage
            source={require("../../../../assets/images/target.png")}
          />
        </TargetContainer>
      )}
      {children}
    </ContentOverlay>
  );

  return (
    <>
      <ExpoCameraView
        onBarcodeScanned={onBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code128"],
        }}
      />
      {isManualActivation ? (
        <ActivationArea
          underlayColor="transparent"
          onPressIn={handlePressIn}
          onPressOut={deactivateManualScan}
        >
          {overlayUI}
        </ActivationArea>
      ) : (
        overlayUI
      )}
    </>
  );
}

const ExpoCameraView = styled(CameraView)`
  flex: 1;
`;

const ContentOverlay = styled.View<{ $headerHeight: number }>`
  top: ${({ $headerHeight }) => ($headerHeight > 0 ? $headerHeight + 5 : 0)}px;
  position: absolute;
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

const MessageContainer = styled(TargetContainer)`
  background-color: ${({ theme }) => theme.colors.container.default};
  border-radius: 125px;
  opacity: 0.6;
`;

const TargetImage = styled.Image`
  width: 100%;
  height: 100%;
`;
