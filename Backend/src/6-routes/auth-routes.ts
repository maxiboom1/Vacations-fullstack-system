import express, { Request, Response, NextFunction } from "express";
import UserModel from "../2-models/users-model";
import authService from "../5-services/auth-service";

const router = express.Router();

// POST http://localhost:4000/api/register

router.post("/register", async (request:Request, response:Response, next:NextFunction)=>{
    try{
        const user = new UserModel(request.body);
        const token = await authService.register(user);
        response.status(201).json(token);
    }catch(err:any){
        next(err);
    }
});

export default router;