import { useField } from "@unform/core";
import { ImagePickerAsset, launchImageLibraryAsync } from "expo-image-picker";
import { usePermissions } from "expo-media-library";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";
import { TypeEventOnChange } from "../@types/event";

type FileContextType = {
  showDeviceImage(): Promise<void>;
  images: ImagePickerAsset[] | null;
  removeImage(uri: string): void;
  reorderImages(newImages: ImagePickerAsset[]): void;
  openImageCropModal: boolean;
  imageToCrop: ImagePickerAsset | null;
  handleImageCropSave(croppedImage: ImagePickerAsset): void;
  handleImageCropCancel(): void;
  dragAndDrop?: boolean;
};

const PhotoListContext = createContext<FileContextType>({} as FileContextType);

export type PhotoListProviderProps<
  TypeEventOnChangeGeneric extends TypeEventOnChange = TypeEventOnChange
> = {
  children: ReactNode;
  onChange: (event: TypeEventOnChangeGeneric) => void;
  multiple?: boolean;
  dragAndDrop?: boolean;
  name: string;
};

export function PhotoListProvider({
  children,
  onChange,
  multiple,
  dragAndDrop,
  name,
}: PhotoListProviderProps) {
  const { fieldName, registerField, error, defaultValue } = useField(name);
  const [permissionResponse, requestPermission] = usePermissions({
    granularPermissions: ["photo"],
  });
  const [images, setImagens] = useState<ImagePickerAsset[] | null>(null);
  const [openImageCropModal, setOpenImageCropModal] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<ImagePickerAsset | null>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => images?.map((image) => image.file),
      setValue: (_, value) => setImagens(value),
      clearValue: () => setImagens(null),
    });
  }, [fieldName, registerField, images]);

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, [permissionResponse, requestPermission]);

  async function showDeviceImage() {
    const result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: multiple,
    });

    if (Platform.OS === "web" && result.assets && !multiple) {
      setOpenImageCropModal(true);
      setImageToCrop(result.assets[0]);
      return;
    }
    setImagens((previewsImage) =>
      [...(previewsImage || []), ...(result.assets || [])].reverse()
    );
  }

  function removeImage(uri: string) {
    if (!images) return;
    const filteredImages = images.filter((image) => image.uri !== uri);
    setImagens(filteredImages);
    onChange?.({
      value: images.find((image) => image.uri === uri) as ImagePickerAsset,
      event: "REMOVE_IMAGE",
    });
  }

  function reorderImages(newImages: ImagePickerAsset[]) {
    setImagens(newImages);
    onChange?.({
      value: newImages,
      event: "REORDER_IMAGES",
    });
  }

  function handleImageCropSave(croppedImage: ImagePickerAsset) {
    setImagens((previewsImage) =>
      [...(previewsImage || []), croppedImage].reverse()
    );
    setOpenImageCropModal(false);
    setImageToCrop(null);
    onChange?.({
      value: croppedImage,
      event: "CROP_SAVE",
    });
  }

  function handleImageCropCancel() {
    setOpenImageCropModal(false);
    setImageToCrop(null);
  }

  return (
    <PhotoListContext.Provider
      value={{
        showDeviceImage,
        images,
        removeImage,
        reorderImages,
        openImageCropModal,
        imageToCrop,
        handleImageCropCancel,
        handleImageCropSave,
        dragAndDrop,
      }}
    >
      {children}
    </PhotoListContext.Provider>
  );
}

export function usePhotoList() {
  const context = useContext(PhotoListContext);
  if (!context) {
    throw new Error("usePhotoList must be used within a PhotoListProvider");
  }
  return context;
}
