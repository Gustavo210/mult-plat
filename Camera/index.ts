import { CameraRoot } from "./components/CameraRoot";
import { OverlayPlaceholder } from "./components/OverlayPlaceholder";
import { ViewPlaceholder } from "./components/ViewPlaceholder";

export const Camera = Object.assign(CameraRoot, {
  View: ViewPlaceholder,
  Overlay: OverlayPlaceholder,
});
