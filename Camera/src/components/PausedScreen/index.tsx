import { Container } from "@mobilestock-native/container";
import { Icon } from "@mobilestock-native/icons";
import { Spacer } from "@mobilestock-native/spacer";
import { Typography } from "@mobilestock-native/typography";
import React from "react";
import { TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";

import { useCameraContext } from "../CameraRoot";

export function PausedScreen() {
  const { cameraState, reactivate } = useCameraContext();

  if (cameraState !== "PAUSED") {
    return null;
  }

  return (
    <Container.Main>
      <InativeCamera onPress={reactivate}>
        <Icon name="CameraOff" size="3XL" />
        <Spacer />
        <Container.Vertical align="CENTER" gap="MD">
          <Typography>Câmera pausada para poupar bateria.</Typography>
          <Typography>Toque na tela para reativar a câmera.</Typography>
        </Container.Vertical>
      </InativeCamera>
    </Container.Main>
  );
}

const InativeCamera = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.container.shadow};
`;
