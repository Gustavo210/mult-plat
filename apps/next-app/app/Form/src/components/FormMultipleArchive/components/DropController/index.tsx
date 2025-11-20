import type React from "react";
import { HTMLAttributes } from "react";
import { TypeFiles } from "../../enum/TypeFiles";
import { useMultipleArchive } from "../../hooks/useMultipleArchive";

export function DropController(props: HTMLAttributes<HTMLDivElement>) {
  const MultipleArchive = useMultipleArchive();

  function captureFiles(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) return;

    let validFileList: File[] = [];

    if (dataTransfer.items && dataTransfer.items.length > 0) {
      for (
        let itemIndex = 0;
        itemIndex < dataTransfer.items.length;
        itemIndex++
      ) {
        const transferItem = dataTransfer.items[itemIndex];

        if (transferItem.kind !== "file") {
          continue;
        }

        const systemFileEntry = transferItem.webkitGetAsEntry();

        if (systemFileEntry && systemFileEntry.isDirectory) {
          continue;
        }

        const file = transferItem.getAsFile();
        if (!file) {
          continue;
        }

        validFileList.push(file);
      }
    } else if (dataTransfer.files && dataTransfer.files.length > 0) {
      for (
        let fileIndex = 0;
        fileIndex < dataTransfer.files.length;
        fileIndex++
      ) {
        const file = dataTransfer.files.item(fileIndex);
        if (file) {
          validFileList.push(file);
        }
      }
    }

    if (validFileList.length === 0) {
      return;
    }
    if (MultipleArchive.accept?.some((type) => type !== "all")) {
      validFileList = validFileList.filter((item) => {
        const fileExtension = item.name.split(".").pop();
        return MultipleArchive.accept?.includes(
          fileExtension?.toLowerCase() as keyof typeof TypeFiles
        );
      });

      if (!validFileList.length) {
        return;
      }
    }
    MultipleArchive.handleSaveFiles(validFileList);
  }

  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDrop={captureFiles}
      onDragLeave={(event) => event.preventDefault()}
      onClick={MultipleArchive.handleSelectFile}
      {...props}
    />
  );
}
