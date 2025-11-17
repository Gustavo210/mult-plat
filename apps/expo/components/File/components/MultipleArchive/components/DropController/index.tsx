import type React from "react";
import { HTMLAttributes } from "react";
import { useFileInput } from "../../../../hooks/useFile";

export function DropController(props: HTMLAttributes<HTMLDivElement>) {
  const FileInput = useFileInput();
  function captureFiles(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) return;

    const listaArquivosValidos: File[] = [];

    // Preferimos usar dataTransfer.items para diferenciar arquivos e pastas
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

        // Se detectarmos diretório, ignoramos
        if (entradaSistemaArquivos && entradaSistemaArquivos.isDirectory) {
          continue;
        }

        const arquivo = itemTransferencia.getAsFile();
        if (!arquivo) {
          continue;
        }

        listaArquivosValidos.push(arquivo);
      }
    } else if (dataTransfer.files && dataTransfer.files.length > 0) {
      // Fallback para navegadores mais antigos
      for (
        let indiceArquivo = 0;
        indiceArquivo < dataTransfer.files.length;
        indiceArquivo++
      ) {
        const arquivo = dataTransfer.files.item(indiceArquivo);
        if (arquivo) {
          listaArquivosValidos.push(arquivo);
        }
      }
    }

    if (listaArquivosValidos.length === 0) {
      return;
    }

    FileInput.handleSaveFiles(listaArquivosValidos);
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
