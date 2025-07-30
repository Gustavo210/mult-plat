import { CameraProvider } from "@/Camera/src/contexts/CameraProvider";
import { cameraConfigs } from "@/cameraConfig";
import { Slot } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <CameraProvider configs={cameraConfigs}>
      <Slot />
    </CameraProvider>
  );
}
