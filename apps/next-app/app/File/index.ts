import { MultipleArchive } from "./components/MultipleArchive";
import { PhotoInput } from "./components/PhotoInput";
import { FileInputProvider } from "./hooks/useFile";

export const File = Object.assign(FileInputProvider, {
  MultipleArchive,
  PhotoInput,
});
