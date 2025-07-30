export const cameraConfigs = {
  QRCODE_SKU: {
    match: new RegExp(`^SKU[0-9]+$`, "g"),
    format: (item: string) => item.split("SKU")[1] ?? "",
  },
  QRCODE_CNPJ: {
    match: new RegExp(`^CNPJ[0-9]+$`, "g"),
    format: (item: string) => item.split("CNPJ")[1] ?? "",
  },
};
