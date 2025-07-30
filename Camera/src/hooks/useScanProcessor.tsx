import { BarcodeScanningResult } from "expo-camera";
import { CameraConfigs, useCameraConfig } from "../contexts/CameraProvider";

export interface ProcessedScanResult {
  type: keyof CameraConfigs | "UNKNOWN";
  formattedData: string;
  rawData: string;
}

export function useScanProcessor(): (
  scanResult: BarcodeScanningResult
) => ProcessedScanResult {
  const configs = useCameraConfig();

  function processScan(scanResult: BarcodeScanningResult): ProcessedScanResult {
    const rawData = scanResult.data;

    for (const key in configs) {
      const config = configs[key as keyof CameraConfigs];
      if (config.match.test(rawData)) {
        return {
          type: key as keyof CameraConfigs,
          formattedData: config.format(rawData),
          rawData,
        };
      }
    }

    return {
      type: "UNKNOWN",
      formattedData: rawData,
      rawData,
    };
  }

  return processScan;
}
