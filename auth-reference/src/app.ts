import express from "express";
import expressFileUpload from "express-fileupload";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/router-not-found";
import appConfig from "./4-utils/app-config";
import productsRoute from "./6-routes/product-routes";
import authRoute from "./6-routes/auth-routes";

// Create server: 
const server = express();

// Create request.body object if json was sent:
server.use(express.json());

// Get files sent by the front into request.files object: 
server.use(expressFileUpload());

// Route requests:
server.use("/api", productsRoute);
server.use("/api", authRoute);

// Handle route not found: 
server.use(routeNotFound);

// Handle catch-all: 
server.use(catchAll);

// Run server:
server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));

