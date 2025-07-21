import { Button } from "@mobilestockweb/button";
import { Container } from "@mobilestockweb/container";
import { Typography } from "@mobilestockweb/typography";
import React from "react";

export default function IndexWeb() {
  return (
    <Container.Vertical>
      <Container.Horizontal align="CENTER">
        <Typography align="CENTER">Rota Android para botao</Typography>
      </Container.Horizontal>
      <Button
        text="OPA"
        icon="AddPhoto"
        size="2XL"
        isLoading
        notification={10}
      />
    </Container.Vertical>
  );
}
