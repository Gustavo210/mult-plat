"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useField } from "@unform/core";
import { utils } from "../../../utils";
import { TypeEventOnChange } from "../@types/event";
import { TypeFiles } from "../enum/TypeFiles";

type FileContextType = {
  handleSaveFiles(newFiles: File[]): void;
  handleRemoveFile(hashToRemove: string): void;
  handleSelectFile(): void;
  dragAndDrop?: boolean;
  accept?: (keyof typeof TypeFiles)[];
  files?: File[] | null;
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
  onChange?(event: TypeEventOnChangeGeneric): void;
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
    setFiles(null);
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
    const input = document.createElement("input");
    input.style.display = "none";
    input.setAttribute("type", "file");
    input.setAttribute("accept", "*/*");
    input.setAttribute("id", String(Math.random()));
    input.setAttribute("multiple", "multiple");
    document.body.appendChild(input);
    input.addEventListener("change", async () => {
      if (input.files) {
        handleSaveFiles(Array.from(input.files));
      }
      document.body.removeChild(input);
    });
    const event = new MouseEvent("click");
    input.dispatchEvent(event);
  }

  return (
    <MultipleArchiveContext.Provider
      value={{
        handleSelectFile,
        handleSaveFiles,
        handleRemoveFile,
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
