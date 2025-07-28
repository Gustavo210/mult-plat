import { Clickable } from "@mobilestockweb/clickable";
import { Container } from "@mobilestockweb/container";
import { Icon } from "@mobilestockweb/icons";
import { LoadingSpinner } from "@mobilestockweb/loading-spinner";
import { Typography } from "@mobilestockweb/typography";
import React, { useState } from "react";

export default function IndexWeb() {
  const [loading, setLoading] = useState(false);
  return (
    <Container.Vertical>
      <Typography>Rota Android para clickable</Typography>
      <Clickable
        // disabled

        isLoading={loading}
        onClick={() => {
          console.log("OPA");
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        }}
        style={{
          flex: 1,
          backgroundColor: "black",
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
