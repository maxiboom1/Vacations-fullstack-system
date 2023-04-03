import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import cyber from "../4-utils/cyber";

const router = express.Router();

router.get("/vacations" ,async (request: Request, response: Response, next: NextFunction) => {
    
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


export default router;
