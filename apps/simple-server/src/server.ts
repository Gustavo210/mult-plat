import express, { Application } from "express";
import cors from "cors";
import path from "path";
import http from "http";
import { uploadRouter } from "./uploadRoutes";

const serverApplication: Application = express();
const serverPort = 3333;

serverApplication.use(cors());

// Opcional, mas útil para rotas JSON comuns (não interfere no multipart)
serverApplication.use(express.json({ limit: "50mb" }));
serverApplication.use(express.urlencoded({ extended: true, limit: "50mb" }));

serverApplication.use("/api", uploadRouter);

const uploadsFolderPath = path.resolve(__dirname, "..", "uploads");
serverApplication.use("/uploads", express.static(uploadsFolderPath));

const httpServer = http.createServer(serverApplication);

// Timeout 0 significa sem timeout de inatividade
httpServer.timeout = 0;

httpServer.listen(serverPort, () => {
  console.log(`Servidor iniciado em http://localhost:${serverPort}`);
});
