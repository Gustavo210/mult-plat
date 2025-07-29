import { BarcodeScanningResult } from "expo-camera";
import { useCameraConfig } from "../contexts/CameraProvider";

export interface ProcessedScanResult {
  type: string;
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
      const config = configs[key];
      if (config.match.test(rawData)) {
        return {
          type: key,
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
