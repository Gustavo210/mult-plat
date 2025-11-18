import { DocumentPickerAsset } from "expo-document-picker";
import { ImagePickerAsset, launchImageLibraryAsync } from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";
import { TypeFiles } from "../enum/TypeFiles";

type FileContextType = {
  showDeviceImage(): Promise<void>;
  images: ImagePickerAsset[] | null;
  removeImage(uri: string): void;
  reorderImages(newImages: ImagePickerAsset[]): void;
  openImageCropModal: boolean;
  imageToCrop: ImagePickerAsset | null;
  handleImageCropSave(croppedImage: ImagePickerAsset): void;
  handleImageCropCancel(): void;
  files?: DocumentPickerAsset[] | null;
  handleSaveFiles(newFiles: DocumentPickerAsset[]): void;
  handleRemoveFile(hashToRemove: string): void;
  accept?: (keyof typeof TypeFiles)[];
  dragAndDrop?: boolean;
};

const FileContext = createContext<FileContextType>({} as FileContextType);

export type EventOnChangeRemoveImage = {
  value: ImagePickerAsset;
  event: "REMOVE_IMAGE";
};

export type EventOnChangeReorderImages = {
  value: ImagePickerAsset[];
  event: "REORDER_IMAGES";
};

export type EventOnChangeCropSave = {
  value: ImagePickerAsset;
  event: "CROP_SAVE";
};
export type EventOnChangeAddFiles = {
  value: DocumentPickerAsset[];
  event: "ADD_FILES";
};
export type EventOnChangeRemoveFile = {
  value: DocumentPickerAsset;
  event: "REMOVE_FILE";
};
export type TypeEventOnChange =
  | EventOnChangeRemoveImage
  | EventOnChangeReorderImages
  | EventOnChangeCropSave
  | EventOnChangeAddFiles
  | EventOnChangeRemoveFile;

export type FileInputProviderProps<
  TypeEventOnChangeGeneric extends TypeEventOnChange = TypeEventOnChange
> = {
  children: ReactNode;
  accept?: (keyof typeof TypeFiles)[];
  onChange: (event: TypeEventOnChangeGeneric) => void;
  multiple?: boolean;
  dragAndDrop?: boolean;
};

export function FileInputProvider({
  children,
  accept,
  onChange,
  multiple,
  dragAndDrop,
}: FileInputProviderProps) {
  const [images, setImagens] = useState<ImagePickerAsset[] | null>(null);
  const [files, setFiles] = useState<DocumentPickerAsset[] | null>(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions({
    granularPermissions: ["photo"],
  });
  const [openImageCropModal, setOpenImageCropModal] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<ImagePickerAsset | null>(null);

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, [permissionResponse, requestPermission]);

  useEffect(() => {
    setFiles(null);
    setImagens(null);
    setOpenImageCropModal(false);
    setImageToCrop(null);
  }, [accept]);

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

  function handleSaveFiles(newFiles: DocumentPickerAsset[]) {
    console.log("handleSaveFiles", newFiles);
    const newFilesList = newFiles.map((file) => ({
      file,
      hash: `${file.name}-${file.size}`,
    }));

    const filesList = (files || []).map((file) => ({
      file,
      hash: `${file.name}-${file.size}`,
    }));

    let permittedFiles = [...newFilesList, ...filesList];

    const uniqueFiles = Array.from(
      new Set(permittedFiles.map((file) => file.hash))
    ).map((hash) => permittedFiles.find((file) => file.hash === hash)!);

    const uniquePermittedFiles = uniqueFiles.filter((item) =>
      newFilesList.some((newItem) => newItem.hash === item.hash)
    );

    if (!uniquePermittedFiles.length) {
      return;
    }

    const uniqueFileObjects = uniqueFiles.map((item) => item.file);

    setFiles(uniqueFileObjects);

    onChange?.({
      value: uniquePermittedFiles.map((item) => item.file),
      event: "ADD_FILES",
    });
  }

  function handleRemoveFile(hashToRemove: string) {
    if (!files) return;

    const filteredFiles = files.filter(
      (file) => `${file.name}-${file.size}` !== hashToRemove
    );

    setFiles(filteredFiles);

    onChange?.({
      value: files.find(
        (file) => `${file.name}-${file.size}` === hashToRemove
      ) as DocumentPickerAsset,
      event: "REMOVE_FILE",
    });
  }

  function handleImageCropCancel() {
    setOpenImageCropModal(false);
    setImageToCrop(null);
  }

  return (
    <FileContext.Provider
      value={{
        showDeviceImage,
        images,
        removeImage,
        reorderImages,
        openImageCropModal,
        imageToCrop,
        handleImageCropCancel,
        handleImageCropSave,
        files,
        handleSaveFiles,
        accept,
        dragAndDrop,
        handleRemoveFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
}

export function useFileInput() {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
}
