import { Camera } from "@/Camera";
import { ProcessedScanResult } from "@/Camera/hooks/useScanProcessor";
import { Typography } from "@mobilestock-native/typography";
import React from "react";
import { Alert } from "react-native";
import { styled } from "styled-components/native";

export default function IndexAndroid() {
  /**
   * Função que será chamada quando um código for lido.
   * Para testes, vamos apenas exibir um alerta.
   */
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
      <Camera onScan={handleScan}>
        <OverlayContent>
          <InfoText>Aponte para o código</InfoText>
        </OverlayContent>

        <Camera.View />
      </Camera>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f0f0f0;
`;

const OverlayContent = styled.View`
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
`;

const InfoText = styled(Typography)`
  color: white;
  font-size: 20px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
