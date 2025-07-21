import { Button } from "@/COMPONENTE/Button/src";
import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import React from "react";

const TESTE = () => {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <Button
        // text="OPA"
        text={
          <Container>
            <Typography>Teste</Typography>
          </Container>
        }
        icon="Plus"
        variant="DEFAULT"
        fontWeight="BOLD"
        size="XS"
        onLongPress={() => alert("Long Pressed!")}
        onPress={() => setCount(count + 1)}
        // android_ripple={{
        //   color: "#FF0000", // Red ripple effect
        //   foreground: true, // Ensures the ripple effect is shown on top of the button
        //   radius: 24, // Optional: sets the radius of the ripple effect
        // }}
        // circular
      />

      <Typography align="CENTER" style={{ marginTop: 20 }}>
        Count: {count}
      </Typography>
    </>
  );
};

export default function IndexAndroid() {
  return (
    <Container.Vertical>
      <Container.Horizontal align="CENTER">
        <Typography align="CENTER">Rota Android para botao</Typography>
      </Container.Horizontal>
      <TESTE />
    </Container.Vertical>
  );
}
