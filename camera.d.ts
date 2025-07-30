import { cameraConfigs } from "@/cameraConfig";

declare module "@/Camera/src/contexts/CameraProvider" {
  type CameraConfigType = typeof cameraConfigs;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface CameraConfigRegistry extends CameraConfigType {}
}
