import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import cyber from "../4-utils/cyber";
import { verifyAdmin, verifyLoggedIn } from "../3-middleware/token-verify";
import imageHandler from "../4-utils/image-handler";

const router = express.Router();

router.get("/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    
    try {
        
        const token = request.header("authorization").substring(7); // "Bearer the-token"
        
        const user = cyber.decodeToken(token);
        
        const userId = user.userId;
        
        const vacations = await dataService.getAllVacations(userId);
        
        response.json(vacations);
    }
    
    catch(err: any) {
        next(err);
    }

});

router.get("/img/:imageName", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    
    try {
        const imageName = request.params.imageName;
        response.sendFile(imageHandler.getImagePath(imageName));
    }
    
    catch(err: any) {
        next(err);
    }

});


export default router;
