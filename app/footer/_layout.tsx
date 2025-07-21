import { Slot } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const Cont =
  Platform.OS === "web"
    ? require("@mobilestock-native/container").Container
    : require("@mobilestock-native/container").Container;

export default function Layout() {
  return (
    <Cont.Main>
      <Slot />
    </Cont.Main>
  );
}
