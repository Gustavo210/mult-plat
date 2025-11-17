import { FileInputProvider } from "../../hooks/useFile";
import { ImageViewer } from "./ImageViewer";

export function PhotoInput() {
  return (
    <FileInputProvider>
      <ImageViewer />
    </FileInputProvider>
  );
}
