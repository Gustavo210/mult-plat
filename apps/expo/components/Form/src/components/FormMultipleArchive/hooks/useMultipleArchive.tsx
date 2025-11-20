import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useField } from "@unform/core";
import * as DocumentPicker from "expo-document-picker";
import { usePermissions } from "expo-media-library";
import { Platform } from "react-native";
import { TypeEventOnChange } from "../@types/event";
import { TypeFiles } from "../enum/TypeFiles";
import { utils } from "../utils";

type FileContextType = {
  openImageCropModal: boolean;
  files?: File[] | null;
  handleSaveFiles(newFiles: File[]): void;
  handleRemoveFile(hashToRemove: string): void;
  handleSelectFile(): void;
  accept?: (keyof typeof TypeFiles)[];
  dragAndDrop?: boolean;
  name: string;
};

const MultipleArchiveContext = createContext<FileContextType>(
  {} as FileContextType
);

export type MultipleArchiveProviderProps<
  TypeEventOnChangeGeneric extends TypeEventOnChange = TypeEventOnChange
> = {
  children: ReactNode;
  accept?: (keyof typeof TypeFiles)[];
  onChange(event: TypeEventOnChangeGeneric): void;
  name: string;
};

export function MultipleArchiveProvider({
  children,
  accept,
  onChange,
  name,
}: MultipleArchiveProviderProps) {
  const { fieldName, registerField, defaultValue } = useField(name);
  const [files, setFiles] = useState<File[] | null>(null);
  const [permissionResponse, requestPermission] = usePermissions({
    granularPermissions: ["photo"],
  });
  const [openImageCropModal, setOpenImageCropModal] = useState(false);

  const handleSaveFiles = useCallback(
    (newFiles: File[]) => {
      const newFilesList = newFiles.map((file) => ({
        file,
        hash: utils.getHashFile(file),
      }));

      const filesList = (files || []).map((file) => ({
        file,
        hash: utils.getHashFile(file),
      }));

      const permittedFiles = [...newFilesList, ...filesList];

      const uniqueFiles = Array.from(
        new Set(permittedFiles.map((file) => file.hash))
      ).map(
        (hash) =>
          permittedFiles.find((file) => file.hash === hash) as {
            file: File;
            hash: string;
          }
      );

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
    },
    [files, onChange]
  );

  const configureForm = useCallback(
    (filesList: File[] | null) => {
      if (!filesList) {
        setFiles(null);
        return;
      }
      const files = filesList.filter((file) => !!file);
      handleSaveFiles(files);
    },
    [handleSaveFiles, setFiles]
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => files,
      setValue: (_, value) => configureForm(value || defaultValue),
      clearValue: () => setFiles(null),
    });
  }, [fieldName, registerField, files, configureForm, defaultValue]);

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, [permissionResponse, requestPermission]);

  useEffect(() => {
    setFiles(null);
    setOpenImageCropModal(false);
  }, [accept]);

  function handleRemoveFile(hashToRemove: string) {
    if (!files) return;

    const filteredFiles = files.filter(
      (file) => utils.getHashFile(file) !== hashToRemove
    );

    setFiles(filteredFiles);

    onChange?.({
      value: files.find(
        (file) => utils.getHashFile(file) === hashToRemove
      ) as File,
      event: "REMOVE_FILE",
    });
  }

  async function handleSelectFile() {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: true,
      type: accept?.map((type) => TypeFiles[type]) as unknown as string,
    });

    if (!result.assets) {
      return;
    }

    if (Platform.OS === "android") {
      handleSaveFiles(
        result.assets.map(
          (asset) =>
            ({
              uri: asset.uri,
              name: asset.name,
              type: asset.mimeType,
            } as unknown as File)
        )
      );
      return;
    }

    const files = result.assets
      .map((asset) => asset.file)
      .filter((file) => !!file);

    if (!files) {
      return;
    }

    handleSaveFiles(files);
  }

  return (
    <MultipleArchiveContext.Provider
      value={{
        handleSelectFile,
        handleSaveFiles,
        handleRemoveFile,
        openImageCropModal,
        accept,
        files,
        name,
      }}
    >
      {children}
    </MultipleArchiveContext.Provider>
  );
}

export function useMultipleArchive() {
  const context = useContext(MultipleArchiveContext);
  if (!context) {
    throw new Error(
      "useMultipleArchive must be used within a MultipleArchiveProvider"
    );
  }
  return context;
}
