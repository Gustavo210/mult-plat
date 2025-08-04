import { navigationButtons } from "@/rotes";
import { Button } from "@mobilestock-native/button";
import { Container } from "@mobilestock-native/container";
import { Spacer } from "@mobilestock-native/spacer";
import { Typography } from "@mobilestock-native/typography";
import { router } from "expo-router";
import React, { Fragment } from "react";

export default function Screen() {
  return (
    <Container.Vertical
      style={{
        position: "relative",
        backgroundColor: "#fff",
      }}
      full
      padding="MD_NONE"
    >
      {navigationButtons.length === 0 && (
        <Fragment>
          <Typography size="MD" weight="MEDIUM" family="POPPINS" align="CENTER">
            Você ainda não tem rotas definidas.
          </Typography>
          <Spacer size="MD" />
        </Fragment>
      )}
      {navigationButtons.map((route) => (
        <Container key={route as string}>
          <Button
            icon="ChevronRight"
            iconAlign="END"
            text={route as string}
            onPress={() => router.push(route)}
          />
          <Spacer size="MD" />
        </Container>
      ))}
      <Container.Vertical
        padding="SM"
        align="CENTER"
        style={{
          backgroundColor: "#e5e5e5",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <Typography size="MD" weight="BOLD" family="POPPINS">
          Execute o comando abaixo para adicionar uma rota.
        </Typography>
        <Spacer size="MD" />
        <Container.Horizontal
          padding="SM"
          style={{
            borderColor: "#404040",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Typography family="MONOCRAFT">pnpm create-route</Typography>
        </Container.Horizontal>
      </Container.Vertical>
    </Container.Vertical>
  );
}
