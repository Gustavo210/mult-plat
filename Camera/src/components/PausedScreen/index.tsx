import { Container } from "@mobilestock-native/container";
import { Icon } from "@mobilestock-native/icons";
import { Spacer } from "@mobilestock-native/spacer";
import { Typography } from "@mobilestock-native/typography";
import React from "react";
import { TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";

import { useCameraContext } from "../CameraRoot";

export function PausedScreen() {
  const camera = useCameraContext();

  if (!camera.isPaused) {
    return null;
  }

  return (
    <Container.Main>
      <InactiveCamera onPress={camera.reactivate}>
        <Icon name="CameraOff" size="3XL" />
        <Spacer />
        <Container.Vertical align="CENTER" gap="MD">
          <Typography>Câmera pausada para poupar bateria.</Typography>
          <Typography>Toque na tela para reativar a câmera.</Typography>
        </Container.Vertical>
      </InactiveCamera>
    </Container.Main>
  );
}

const InactiveCamera = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.container.shadow};
`;
