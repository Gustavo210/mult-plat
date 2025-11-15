import { ImageAdd } from "./components/ImageAdd";
import { ImageViewer } from "./components/ImageViewer";
import { FileInputProvider } from "./hooks/useFile";

export const File = Object.assign(FileInputProvider, {
  ImageViewer,
  ImageAdd,
});
