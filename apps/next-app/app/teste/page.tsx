"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface UploadedFileInformation {
  originalFileName: string;
  storedFileName: string;
  fileSizeInBytes: number;
  filePathOnServer: string;
}

interface UploadResponseData {
  success: boolean;
  message: string;
  files?: UploadedFileInformation[];
}

const FileUploadForm: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadResponseData, setUploadResponseData] =
    useState<UploadResponseData | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
      setUploadResponseData(null);
      setErrorMessage(null);
    }
  }

  async function handleFormSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!selectedFiles || selectedFiles.length === 0) {
      setErrorMessage("Selecione pelo menos um arquivo antes de enviar.");
      return;
    }
    console.log("selectedFiles", selectedFiles);
    const formData = new FormData();

    // O nome do campo "files" precisa bater com o que está no backend (multerUploadMiddleware.array("files"))
    for (let index = 0; index < selectedFiles.length; index += 1) {
      const singleFile = selectedFiles.item(index);
      if (singleFile) {
        formData.append("files", singleFile);
      }
    }

    try {
      setIsUploading(true);
      setErrorMessage(null);

      const serverResponse = await fetch(
        "http://192.168.0.115:3333/api/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const responseData = (await serverResponse.json()) as UploadResponseData;

      if (!serverResponse.ok || !responseData.success) {
        setErrorMessage(responseData.message || "Erro ao enviar arquivos.");
        setUploadResponseData(null);
        return;
      }

      setUploadResponseData(responseData);
    } catch (error) {
      console.error("Erro ao chamar API de upload:", error);
      setErrorMessage("Erro inesperado ao enviar arquivos.");
      setUploadResponseData(null);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "16px" }}>
      <h1>Upload de Arquivos</h1>

      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="fileInput">Selecione os arquivos:</label>
          <br />
          <input
            id="fileInput"
            type="file"
            multiple
            onChange={handleFileInputChange}
          />
        </div>

        <button type="submit" disabled={isUploading}>
          {isUploading ? "Enviando..." : "Enviar arquivos"}
        </button>
      </form>

      {errorMessage && (
        <div style={{ marginTop: "12px", color: "red" }}>
          <strong>Erro:</strong> {errorMessage}
        </div>
      )}

      {uploadResponseData && (
        <div style={{ marginTop: "16px" }}>
          <h2>Resultado do upload</h2>
          <p>{uploadResponseData.message}</p>

          {uploadResponseData.files && uploadResponseData.files.length > 0 && (
            <ul>
              {uploadResponseData.files.map((singleFileInformation, index) => (
                <li key={index}>
                  <p>
                    <strong>Nome original:</strong>{" "}
                    {singleFileInformation.originalFileName}
                  </p>
                  <p>
                    <strong>Nome salvo:</strong>{" "}
                    {singleFileInformation.storedFileName}
                  </p>
                  <p>
                    <strong>Tamanho (bytes):</strong>{" "}
                    {singleFileInformation.fileSizeInBytes}
                  </p>
                  <p>
                    <strong>Caminho no servidor:</strong>{" "}
                    {singleFileInformation.filePathOnServer}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploadForm;
