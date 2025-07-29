import { Camera } from "@/Camera";
import { ProcessedScanResult } from "@/Camera/hooks/useScanProcessor";
import { Typography } from "@mobilestock-native/typography";
import React from "react";
import { Alert } from "react-native";
import { styled } from "styled-components/native";

export default function IndexAndroid() {
  function handleScan(result: ProcessedScanResult): void {
    console.log("Resultado Processado:", result);

    if (result.type === "QRCODE_SKU") {
      Alert.alert("SKU!", `Código do produto: ${result.formattedData}`);
    } else if (result.type === "QRCODE_CNPJ") {
      Alert.alert("CNPJ!", `CNPJ: ${result.formattedData}`);
    }
  }

  return (
    <Container>
      <Camera onScan={handleScan} acceptReads={["QRCODE_SKU", "QRCODE_CNPJ"]}>
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
