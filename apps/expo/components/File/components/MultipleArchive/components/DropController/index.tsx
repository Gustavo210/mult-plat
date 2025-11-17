import type React from "react";
import { HTMLAttributes } from "react";
import { useFileInput } from "../../../../hooks/useFile";
import { Platform } from "react-native";
import { DocumentPickerAsset } from "expo-document-picker";

export function DropController(props: HTMLAttributes<HTMLDivElement>) {
  const FileInput = useFileInput();

  function captureFiles(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) return;

    const listaArquivosValidos: DocumentPickerAsset[] = [];

    if (dataTransfer.items && dataTransfer.items.length > 0) {
      for (
        let indiceItem = 0;
        indiceItem < dataTransfer.items.length;
        indiceItem++
      ) {
        const itemTransferencia = dataTransfer.items[indiceItem];

        if (itemTransferencia.kind !== "file") {
          continue;
        }

        const entradaSistemaArquivos =
          (itemTransferencia as any).webkitGetAsEntry?.() ||
          (itemTransferencia as any).getAsEntry?.();

        if (entradaSistemaArquivos && entradaSistemaArquivos.isDirectory) {
          continue;
        }

        const arquivo = itemTransferencia.getAsFile();
        if (!arquivo) {
          continue;
        }

        listaArquivosValidos.push({
          uri: URL.createObjectURL(arquivo),
          name: arquivo.name,
          size: arquivo.size,
          mimeType: arquivo.type,
          lastModified: arquivo.lastModified,
          file: arquivo,
        });
      }
    } else if (dataTransfer.files && dataTransfer.files.length > 0) {
      for (
        let indiceArquivo = 0;
        indiceArquivo < dataTransfer.files.length;
        indiceArquivo++
      ) {
        const arquivo = dataTransfer.files.item(indiceArquivo);
        if (arquivo) {
          listaArquivosValidos.push({
            uri: URL.createObjectURL(arquivo),
            name: arquivo.name,
            size: arquivo.size,
            mimeType: arquivo.type,
            lastModified: arquivo.lastModified,
            file: arquivo,
          });
        }
      }
    }

    if (listaArquivosValidos.length === 0) {
      return;
    }

    FileInput.handleSaveFiles(listaArquivosValidos);
  }

  if (Platform.OS !== "web") {
    return <>{props.children}</>;
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={captureFiles}
      onDragLeave={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
