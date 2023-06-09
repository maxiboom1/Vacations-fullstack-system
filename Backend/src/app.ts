import express from "express";
import cors from "cors";
import dataRoutes from "./6-routes/data-routes";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import authRoutes from "./6-routes/auth-routes"
import expressFileUpload from "express-fileupload";
import socketIoService from "./5-services/socketIoService";
import preventXss from "./3-middleware/prevent-xss";
import expressRateLimit from "express-rate-limit";

const server = express();

//Prevent Dos attack
server.use(expressRateLimit({
    windowMs: 1000, // Window time to count requests
    max: 50, // Max requests allowed in windowMs
    message: "Try other way to hack my site" // Message
}));

server.use(cors({origin: "http://localhost:3000"}));
server.use(express.json());
server.use(preventXss);
server.use(expressFileUpload()); //Get files into request.files
server.use("/api", authRoutes);
server.use("/api", dataRoutes);
server.use(routeNotFound);
server.use(catchAll);

// Run HTTP server on start:
server.listen(appConfig.port, () => console.log("HTTP server Listening on http://localhost:" + appConfig.port));

// Create server for socket service:
const httpServer = server.listen(appConfig.socketPort, () => console.log("Socket server listening on http://localhost:" + appConfig.socketPort));

// Start socket service with giver server:
socketIoService.init(httpServer);