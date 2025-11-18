"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TypeFiles } from "../enum/TypeFiles";

type FileContextType = {
  files?: File[] | null;
  handleSaveFiles(newFiles: FileList): void;
  handleRemoveFile(hashToRemove: string): void;
  accept?: (keyof typeof TypeFiles)[];
  multiple?: boolean;
  dragAndDrop?: boolean;
};

const FileContext = createContext<FileContextType>({} as FileContextType);

export type EventOnChangeAddFiles = {
  value: File[];
  event: "ADD_FILES";
};
export type EventOnChangeRemoveFile = {
  value: File;
  event: "REMOVE_FILE";
};
export type TypeEventOnChange = EventOnChangeAddFiles | EventOnChangeRemoveFile;

export type FileInputProviderProps<
  TypeEventOnChangeGeneric extends TypeEventOnChange = TypeEventOnChange,
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
  const [files, setFiles] = useState<File[] | null>(null);

  useEffect(() => {
    setFiles(null);
  }, [accept]);

  function handleSaveFiles(newFiles: FileList) {
    let newFilesList = [];

    for (const file of newFiles) {
      newFilesList.push({
        file,
        hash: `${file.name}-${file.size}`,
      });
    }

    const filesList = (files || []).map((file) => ({
      file,
      hash: `${file.name}-${file.size}`,
    }));

    let permittedFiles = [...newFilesList, ...filesList];

    const uniqueFiles = Array.from(
      new Set(permittedFiles.map((file) => file.hash)),
    ).map((hash) => permittedFiles.find((file) => file.hash === hash)!);

    const uniquePermittedFiles = uniqueFiles.filter((item) =>
      newFilesList.some((newItem) => newItem.hash === item.hash),
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
      (file) => `${file.name}-${file.size}` !== hashToRemove,
    );

    setFiles(filteredFiles);

    onChange?.({
      value: files.find(
        (file) => `${file.name}-${file.size}` === hashToRemove,
      ) as File,
      event: "REMOVE_FILE",
    });
  }

  return (
    <FileContext.Provider
      value={{
        files,
        handleSaveFiles,
        accept,
        multiple,
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
