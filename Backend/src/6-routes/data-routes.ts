import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import cyber from "../4-utils/cyber";
import { verifyAdmin, verifyLoggedIn } from "../3-middleware/token-verify";
import imageHandler from "../4-utils/image-handler";
import VacationModel from "../2-models/vacations-model";

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

router.get("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await dataService.getOneVacation(id);
        response.json(vacation);
    } catch(err: any){
        next(err);
    }
})

router.get("/img/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    
    try {
        const imageName = request.params.imageName;
        response.sendFile(imageHandler.getImagePath(imageName));
    }
    
    catch(err: any) {
        next(err);
    }

});

router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    
    try {
        // Take image if exist:
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);
        
        const addedVacation = await dataService.addVacation(vacation);
        
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    
    try {
        request.body.vacationId = +request.params.id;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await dataService.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await dataService.deleteVacation(id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/follow/", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    
    try {
        
        const token = request.header("authorization").substring(7); 
        const userId = cyber.decodeToken(token).userId;
        const action = request.body?.action; // here action is 1 or 0 
        const vacationId = +request.body.vacationId;
        await dataService.updateFollowers(userId, vacationId, action); 
        response.sendStatus(204);
    }
    
    catch(err: any) {
        next(err);
    }

});


export default router;
