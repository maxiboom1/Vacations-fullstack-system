import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";

const router = express.Router();

router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    
    try {

        //const header = request.header("authorization"); // "Bearer the-token"
        //const token = header.substring(7);
        
        const vacations = await dataService.getAllVacations();
        response.json(vacations);
    }
    
    catch(err: any) {
        next(err);
    }

});


export default router;
