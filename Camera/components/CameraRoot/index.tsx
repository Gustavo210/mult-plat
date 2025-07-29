import { BarcodeScanningResult, CameraView } from "expo-camera";
import React, {
  createContext,
  isValidElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { LayoutChangeEvent, Vibration } from "react-native";
import { styled } from "styled-components/native";

import { Container } from "@mobilestock-native/container";
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
import { Header } from "../Header";
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
  children?: ReactNode;
  options?: UseCameraOptions;
}

type ComponentWithDisplayName = React.ComponentType & { displayName?: string };

function isComponentWithDisplayName(
  component: unknown
): component is ComponentWithDisplayName {
  const componentObject = component as ComponentWithDisplayName;
  return componentObject && typeof componentObject.displayName === "string";
}

export function CameraRoot({ children, onScan, options = {} }: CameraProps) {
  const cameraHandler = useCamera(options);
  const processScan = useScanProcessor();
  const [headerHeight, setHeaderHeight] = useState(0);

  function handleHeaderLayout(event: LayoutChangeEvent): void {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  }

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

  const headerChildren: ReactNode[] = [];
  const mainChildren: ReactNode[] = [];

  let childrenToIterate = children;
  if (React.isValidElement(children) && children?.type === React.Fragment) {
    childrenToIterate = (
      children as React.ReactElement<{ children?: ReactNode }>
    ).props.children;
  }

  React.Children.toArray(childrenToIterate).forEach((child) => {
    if (isValidElement(child) && isComponentWithDisplayName(child.type)) {
      if (
        [Header.Vertical.displayName, Header.Horizontal.displayName].includes(
          child.type.displayName
        )
      ) {
        const clonedHeader = React.cloneElement(
          child as React.ReactElement<{
            onLayout?: (event: LayoutChangeEvent) => void;
          }>,
          {
            onLayout: handleHeaderLayout,
          }
        );
        headerChildren.push(clonedHeader);
      }
    } else {
      mainChildren.push(child);
    }
  });

  const overlayUI = (
    <ContentOverlay $headerHeight={headerHeight}>
      {!cameraHandler.isScanningActive && (
        <TargetContainer>
          <TargetImage source={require("../../images/target.png")} />
          <Icon name="CameraOutline" />
        </TargetContainer>
      )}
      {mainChildren}
    </ContentOverlay>
  );

  return (
    <CameraContext.Provider value={cameraHandler}>
      <Container.Vertical full>
        {headerChildren}
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
            {cameraHandler.isManualActivation ? (
              <ActivationArea
                underlayColor="transparent"
                onPressIn={handlePressIn}
                onPressOut={cameraHandler.deactivateManualScan}
              >
                {overlayUI}
              </ActivationArea>
            ) : (
              overlayUI
            )}
          </>
        )}
      </Container.Vertical>
    </CameraContext.Provider>
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

const TargetImage = styled.Image`
  width: 100%;
  height: 100%;
`;
