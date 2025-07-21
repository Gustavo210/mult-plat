import { Footer } from "@/COMPONENTE/web/Footer/index";
import { Button } from "@mobilestockweb/button";
import { Container } from "@mobilestockweb/container";
import { Typography } from "@mobilestockweb/typography";
import React from "react";

export default function IndexWeb() {
  return (
    <Container>
      <Typography>Rota Web para footer</Typography>
      <Footer>
        <Footer.ContentArea gap="XS" padding="SM_2XL">
          <Container.Horizontal align="CENTER">
            <Typography weight="BOLD">Total: R$ 100,10</Typography>
          </Container.Horizontal>
          <Button icon="Home" />
          <Container.Horizontal gap="XS">
            <Button icon="Home" />
            <Button icon="Home" />
            <Button icon="Home" />
          </Container.Horizontal>
        </Footer.ContentArea>
        <Footer.FloatArea align="LEFT" gap="XS">
          <Button icon="Adjustments" circular />
          <Button icon="Adjustments" circular />
          <Button icon="Adjustments" circular />
          <Button icon="Adjustments" circular />
          <Button icon="Adjustments" circular />
        </Footer.FloatArea>
        <Footer.FloatArea align="RIGHT" gap="XS">
          <Button icon="AddPhoto" circular />
          <Button icon="AddPhoto" circular />
          <Button icon="AddPhoto" circular />
          <Button icon="AddPhoto" circular />
          <Button icon="AddPhoto" circular />
        </Footer.FloatArea>
      </Footer>
    </Container>
  );
}
