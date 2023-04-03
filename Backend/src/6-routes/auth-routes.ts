import express, { Request, Response, NextFunction } from "express";
import UserModel from "../2-models/users-model";
import authService from "../5-services/auth-service";
import CredentialsModel from "../2-models/credentials-model";

const router = express.Router();

// POST http://localhost:4000/register

router.post("/register", async (request:Request, response:Response, next:NextFunction)=>{
    try{
        const user = new UserModel(request.body);
        const token = await authService.register(user);
        response.status(201).json(token);
    }catch(err:any){
        next(err);
    }
});

router.post("/login", async (request:Request, response:Response, next:NextFunction)=>{
    try{
        const credentials = new CredentialsModel(request.body);
        const token = await authService.login(credentials);
        response.status(201).json(token);
    }catch(err:any){
        next(err);
    }
});

export default router;