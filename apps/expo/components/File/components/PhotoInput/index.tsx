import {
  EventOnChangeCropSave,
  EventOnChangeRemoveImage,
  EventOnChangeReorderImages,
  FileInputProvider,
  FileInputProviderProps,
} from "../../hooks/useFile";
import { ImageViewer } from "./ImageViewer";

type TypeEventOnChange =
  | EventOnChangeRemoveImage
  | EventOnChangeReorderImages
  | EventOnChangeCropSave;

interface PhotoInputProps<
  TypeEventOnChangeGeneric extends TypeEventOnChange = TypeEventOnChange
> {
  onChange?: (event: TypeEventOnChangeGeneric) => void;
  multiple?: boolean;
}
export function PhotoInput<
  TypeEventOnChangeGeneric extends TypeEventOnChange = TypeEventOnChange
>({ onChange, multiple }: PhotoInputProps<TypeEventOnChangeGeneric>) {
  return (
    <FileInputProvider
      onChange={onChange as FileInputProviderProps["onChange"]}
      multiple={multiple}
    >
      <ImageViewer />
    </FileInputProvider>
  );
}
