import { BarcodeScanningResult } from "expo-camera";
import { useCallback } from "react";
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

  const processScan = useCallback(
    function (scanResult: BarcodeScanningResult): ProcessedScanResult {
      const rawData = scanResult.data;

      for (const key in configs) {
        const config = configs[key as keyof CameraConfigs];
        config.match.lastIndex = 0;
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
    },
    [configs]
  );

  return processScan;
}
