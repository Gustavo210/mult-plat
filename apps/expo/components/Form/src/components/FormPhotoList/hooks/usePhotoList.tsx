import { useField } from "@unform/core";
import { launchImageLibraryAsync } from "expo-image-picker";
import { usePermissions } from "expo-media-library";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { TypeEventOnChange } from "../@types/event";

type FileContextType = {
  showDeviceImage(): Promise<void>;
  images: File[] | null;
  removeImage(uri: string): void;
  reorderImages(newImages: File[]): void;
  openImageCropModal: boolean;
  imageToCrop: File | null;
  handleImageCropSave(croppedImage: File): void;
  handleImageCropCancel(): void;
  sizeComponent: number;
  gapComponent: number;
  dragAndDrop?: boolean;
  name: string;
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
  const Theme = useTheme();
  const { fieldName, registerField, defaultValue } = useField(name);
  const [permissionResponse, requestPermission] = usePermissions({
    granularPermissions: ["photo"],
  });
  const [images, setImagens] = useState<File[] | null>(null);
  const [openImageCropModal, setOpenImageCropModal] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<File | null>(null);
  const sizeComponent = useMemo(() => parseInt(Theme.sizeImage.sm), [Theme]);
  const gapComponent = useMemo(() => parseInt(Theme.gaps["2xs"]), [Theme]);

  const handleSaveImages = useCallback(
    (imagesList: File[]) => {
      setImagens((previewsImage) =>
        [...(previewsImage || []), ...(imagesList || [])].reverse()
      );
    },
    [setImagens]
  );

  const configureForm = useCallback(
    (imageList: File[] | null) => {
      if (!imageList) {
        setImagens(null);
        return;
      }
      handleSaveImages(imageList);
    },
    [handleSaveImages]
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => images,
      setValue: (_, value) => configureForm(value || defaultValue),
      clearValue: () => setImagens(null),
    });
  }, [fieldName, registerField, images, configureForm, defaultValue]);

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
    console.log(Platform.OS, result.assets, multiple);

    if (Platform.OS === "web" && result.assets && !multiple) {
      setOpenImageCropModal(true);
      setImageToCrop(result.assets[0].file as File);
      return;
    }
    handleSaveImages(
      result.assets?.map((asset) =>
        Platform.OS === "web"
          ? (asset.file as File)
          : ({
              uri: asset.uri,
              name: asset.fileName,
              type: asset.mimeType,
            } as unknown as File)
      ) || []
    );
  }

  function removeImage(hash: string) {
    if (!images) return;
    console.log("REMOVER IMAGE", hash, JSON.stringify(images, null, 2));
    const filteredImages = images.filter(
      (file) => `${file.name}-${file.size}` !== hash
    );
    setImagens(filteredImages);
    onChange?.({
      value: images.find(
        (file) => `${file.name}-${file.size}` === hash
      ) as File,
      event: "REMOVE_IMAGE",
    });
  }

  function reorderImages(newImages: File[]) {
    setImagens(newImages);
    onChange?.({
      value: newImages,
      event: "REORDER_IMAGES",
    });
  }

  function handleImageCropSave(croppedImage: File) {
    handleSaveImages([croppedImage]);
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
        sizeComponent,
        gapComponent,
        dragAndDrop,
        name,
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
