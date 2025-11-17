import * as ImagePicker from "expo-image-picker";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as MediaLibrary from "expo-media-library";
import { Platform } from "react-native";
import { ImageViewer } from "../components/PhotoInput/ImageViewer";

type FileContextType = {
  showDeviceImage(): Promise<void>;
  images: ImagePicker.ImagePickerAsset[] | null;
  removeImage(uri: string): void;
  reorderImages(newImages: ImagePicker.ImagePickerAsset[]): void;
  openImageCropModal: boolean;
  imageToCrop: ImagePicker.ImagePickerAsset | null;
  handleImageCropSave(croppedImage: ImagePicker.ImagePickerAsset): void;
  handleImageCropCancel(): void;
  files?: File[] | null;
  handleSaveFiles(newFiles: File[]): void;
  handleRemoveFile(hashToRemove: string): void;
};

const FileContext = createContext<FileContextType>({} as FileContextType);

export function FileInputProvider({ children }: { children?: ReactNode }) {
  const [images, setImagens] = useState<ImagePicker.ImagePickerAsset[] | null>(
    null,
  );
  const [files, setFiles] = useState<File[] | null>(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [openImageCropModal, setOpenImageCropModal] = useState(false);
  const [imageToCrop, setImageToCrop] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, [permissionResponse, requestPermission]);

  async function showDeviceImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (Platform.OS === "web" && result.assets && result.assets.length === 1) {
      setOpenImageCropModal(true);
      setImageToCrop(result.assets[0]);
      return;
    }
    setImagens((previewsImage) =>
      [...(previewsImage || []), ...(result.assets || [])].reverse(),
    );
  }

  function removeImage(uri: string) {
    if (!images) return;
    const filteredImages = images.filter((image) => image.uri !== uri);
    setImagens(filteredImages);
  }

  function reorderImages(newImages: ImagePicker.ImagePickerAsset[]) {
    setImagens(newImages);
  }

  function handleImageCropSave(croppedImage: ImagePicker.ImagePickerAsset) {
    setImagens((previewsImage) =>
      [...(previewsImage || []), croppedImage].reverse(),
    );
    setOpenImageCropModal(false);
    setImageToCrop(null);
  }
  function handleSaveFiles(newFiles: File[]) {
    const filesList = [...newFiles].map((file) => ({
      file,
      hash: `${file.name}-${file.size}`,
    }));
    const uniqueFiles = Array.from(new Set(filesList.map((file) => file.hash)))
      .map((hash) => filesList.find((file) => file.hash === hash)!)
      .map(({ hash, ...file }) => file);

    setFiles(uniqueFiles.map((item) => item.file));
  }
  function handleRemoveFile(hashToRemove: string) {
    if (!files) return;
    const filteredFiles = files.filter(
      (file) => `${file.name}-${file.size}` !== hashToRemove,
    );
    setFiles(filteredFiles);
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
