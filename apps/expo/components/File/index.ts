import { PhotoInput } from "./components/PhotoInput";
import { MultipleArchive } from "./components/MultipleArchive";
import { FileInputProvider } from "./hooks/useFile";

export const File = Object.assign(FileInputProvider, {
  PhotoInput,
  MultipleArchive,
});
