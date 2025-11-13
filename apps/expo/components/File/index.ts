import { ImageAdd } from "./components/ImageAdd";
import { ImageViewer } from "./components/ImageViewer";
import { FileProvider } from "./hooks/useFile";

export const File = Object.assign(FileProvider, {
  ImageViewer,
  ImageAdd,
});
