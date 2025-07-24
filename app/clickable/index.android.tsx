import { Clickable } from "@/COMPONENTE/native/Clickable/src";
import { LoadingSpinner } from "@/COMPONENTE/native/LoadingSpinner/src";
import { Container } from "@mobilestock-native/container";
import { Icon } from "@mobilestock-native/icons";
import { Typography } from "@mobilestock-native/typography";
import React, { useState } from "react";

export default function IndexAndroid() {
  const [loading, setLoading] = useState(false);
  return (
    <Container.Vertical>
      <Typography>Rota Android para clickable</Typography>
      <Clickable
        // disabled

        isLoading={loading}
        onPress={() => {
          console.log("OPA");
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        }}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          minHeight: 50,
        }}
      >
        <Icon name="AlertCircle" />
        <Typography>Teste</Typography>
        <Icon name="AlertCircle" />
        <Typography>Teste</Typography>
        <Icon name="AlertCircle" />
        <Typography>Teste</Typography>
        <Icon name="AlertCircle" />
        <Typography>Teste</Typography>
      </Clickable>
      <LoadingSpinner size="2XL" />
    </Container.Vertical>
  );
}
