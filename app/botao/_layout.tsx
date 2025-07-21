/* eslint-disable @typescript-eslint/no-require-imports */
import { Slot } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const ContainerMultPlat =
  Platform.OS === "web"
    ? require("@mobilestockweb/container").Container
    : require("@mobilestock-native/container").Container;

export default function Layout() {
  return (
    <ContainerMultPlat.Main>
      <Slot />
    </ContainerMultPlat.Main>
  );
}
