import express from "express";
import cors from "cors";
import dataRoutes from "./6-routes/data-routes";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import authRoutes from "./6-routes/auth-routes"
import expressFileUpload from "express-fileupload";
import socketIoService from "./5-services/socketIoService";
import { refreshToken } from "./3-middleware/token-refresh";

const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload()); //Get files into request.files
server.use(refreshToken);

server.use("/api", authRoutes);
server.use("/api", dataRoutes);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));

const httpServer = server.listen(appConfig.socketPort, () => console.log("Listening on http://localhost:" + appConfig.socketPort));

socketIoService.init(httpServer);