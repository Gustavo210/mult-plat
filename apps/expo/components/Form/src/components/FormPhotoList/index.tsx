import { TypeEventOnChange } from "./@types/event";
import { Viewer } from "./components/Viewer";
import {
  PhotoListProvider,
  PhotoListProviderProps,
} from "./hooks/usePhotoList";

interface PhotoInputProps<
  TypeEventOnChangeGeneric extends TypeEventOnChange = TypeEventOnChange
> {
  onChange?: (event: TypeEventOnChangeGeneric) => void;
  multiple?: boolean;
  dragAndDrop?: boolean;
  name: string;
}
export function FormPhotoList<
  TypeEventOnChangeGeneric extends TypeEventOnChange = TypeEventOnChange
>({
  onChange,
  multiple = true,
  dragAndDrop = true,
  name,
}: PhotoInputProps<TypeEventOnChangeGeneric>) {
  return (
    <PhotoListProvider
      name={name}
      onChange={onChange as PhotoListProviderProps["onChange"]}
      multiple={multiple}
      dragAndDrop={dragAndDrop}
    >
      <Viewer />
    </PhotoListProvider>
  );
}
