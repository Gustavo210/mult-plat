import { Camera } from "@/Camera/src";
import { ProcessedScanResult } from "@/Camera/src/hooks/useScanProcessor";
import { SoundFeedbackResult } from "@/Camera/src/hooks/useSoundFeedback";
import { Typography } from "@mobilestock-native/typography";
import React from "react";
import { Alert } from "react-native";
import { styled } from "styled-components/native";

export default function IndexAndroid() {
  function handleScan(
    result: ProcessedScanResult,
    soundControls: SoundFeedbackResult
  ): void {
    console.log("Resultado Processado:", result);

    if (result.type === "QRCODE_SKU") {
      Alert.alert("SKU!", `Código do produto: ${result.formattedData}`);
    } else if (result.type === "QRCODE_CNPJ") {
      Alert.alert("CNPJ!", `CNPJ: ${result.formattedData}`);
    } else if (result.type === "UNKNOWN") {
      Alert.alert("Código não reconhecido", "Tente novamente.");
      soundControls.playLongBip();
      return;
    }
  }

  return (
    <Container>
      <Camera onScan={handleScan} acceptReads={["QRCODE_SKU"]}>
        <Camera.Header.Vertical>
          <Typography>Os códigos validos são:</Typography>
          <Typography>SKU</Typography>
          <Typography>CNPJ</Typography>
        </Camera.Header.Vertical>
        <Camera.Overlay text="Aponte para o código" />
      </Camera>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f0f0f0;
`;
