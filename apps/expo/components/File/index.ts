import { ImageAdd } from "./components/PhotoInput/ImageAdd";
import { ImageViewer } from "./components/PhotoInput/ImageViewer";
import { FileInputProvider } from "./hooks/useFile";

export const File = Object.assign(FileInputProvider, {
  ImageViewer,
  ImageAdd,
});
