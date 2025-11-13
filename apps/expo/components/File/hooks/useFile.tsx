import * as ImagePicker from "expo-image-picker";
import { createContext, ReactNode, useContext, useState } from "react";
import { ImageViewer } from "../components/ImageViewer";

type FileContextType = {
  showDeviceImage(): Promise<ImagePicker.ImagePickerResult>;
  images: ImagePicker.ImagePickerAsset[] | null;
  removeImage(uri: string): void;
  reorderImages(newImages: ImagePicker.ImagePickerAsset[]): void;
};
const FileContext = createContext<FileContextType>({} as FileContextType);

export function FileProvider({ children }: { children?: ReactNode }) {
  const [images, setImagens] = useState<ImagePicker.ImagePickerAsset[] | null>(
    null,
  );

  async function showDeviceImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: true,
    });
    setImagens(result.assets);
    return result;
  }

  function removeImage(uri: string) {
    if (!images) return;
    const filteredImages = images.filter((image) => image.uri !== uri);
    setImagens(filteredImages);
  }

  function reorderImages(newImages: ImagePicker.ImagePickerAsset[]) {
    setImagens(newImages);
  }

  return (
    <FileContext.Provider
      value={{
        showDeviceImage,
        images,
        removeImage,
        reorderImages,
      }}
    >
      {children}
      <ImageViewer />
    </FileContext.Provider>
  );
}

export function useFile() {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
}
