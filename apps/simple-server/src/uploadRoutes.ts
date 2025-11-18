import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadRouter = Router();

const uploadDestinationFolder = path.resolve(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDestinationFolder)) {
  fs.mkdirSync(uploadDestinationFolder, { recursive: true });
}

const multerStorageConfiguration = multer.diskStorage({
  destination(
    request: Request,
    file: Express.Multer.File,
    callbackFunction: (error: Error | null, destinationPath: string) => void,
  ) {
    callbackFunction(null, uploadDestinationFolder);
  },
  filename(
    request: Request,
    file: Express.Multer.File,
    callbackFunction: (error: Error | null, fileName: string) => void,
  ) {
    const currentTimestamp = Date.now();
    const originalFileNameWithoutSpaces = file.originalname.replace(
      /\s+/g,
      "_",
    );
    const fileNameWithTimestamp = `${currentTimestamp}-${originalFileNameWithoutSpaces}`;
    callbackFunction(null, fileNameWithTimestamp);
  },
});

const maximumFileSizeInBytes = 1024 * 1024 * 1024; // 1GB por arquivo (ajuste se precisar maior)

const multerUploadMiddleware = multer({
  storage: multerStorageConfiguration,
  limits: {
    fileSize: maximumFileSizeInBytes,
  },
});

uploadRouter.post(
  "/upload",
  multerUploadMiddleware.array("files", 10),
  (request: Request, response: Response, nextFunction: NextFunction) => {
    try {
      const uploadedFiles = request.files as Express.Multer.File[];

      if (!uploadedFiles || uploadedFiles.length === 0) {
        return response.status(400).json({
          success: false,
          message: "Nenhum arquivo foi enviado.",
        });
      }

      const savedFilesInformation = uploadedFiles.map(
        (singleUploadedFile: Express.Multer.File) => {
          return {
            originalFileName: singleUploadedFile.originalname,
            storedFileName: singleUploadedFile.filename,
            fileSizeInBytes: singleUploadedFile.size,
            filePathOnServer: singleUploadedFile.path,
          };
        },
      );

      return response.json({
        success: true,
        message: "Arquivos enviados com sucesso.",
        files: savedFilesInformation,
      });
    } catch (error) {
      console.error("Erro ao processar upload de arquivos:", error);
      return response.status(500).json({
        success: false,
        message: "Erro interno ao processar upload de arquivos.",
      });
    }
  },
);

export { uploadRouter };
