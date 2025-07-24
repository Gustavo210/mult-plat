import { Slot } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const Con =
  Platform.OS === "web"
    ? require("@mobilestockweb/container").Container.Main
    : require("@mobilestock-native/container").Container.Main;

export default function Layout() {
  return (
    <Con>
      <Slot />
    </Con>
  );
}
