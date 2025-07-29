import { CameraProvider } from "@/Camera/contexts/CameraProvider";
import { Slot } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <CameraProvider
      configs={{
        QRCODE_SKU: {
          match: new RegExp(`^SKU[0-9]+$`, "g"),
          format: (item: string) => item.split("SKU")[1] ?? "",
        },
        QRCODE_CNPJ: {
          match: new RegExp(`^CNPJ[0-9]+$`, "g"),
          format: (item: string) => item.split("CNPJ")[1] ?? "",
        },
      }}
    >
      <Slot />
    </CameraProvider>
  );
}
