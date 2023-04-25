import { Request, NextFunction, Response } from "express";
import cyber from "../4-utils/cyber";

export function verifyLoggedIn(request: Request, response: Response, next: NextFunction){
    try{
        cyber.verifyToken(request);
        next();
    }catch(err: any){
        next(err)
    }

}

export function verifyAdmin(request: Request, response: Response, next: NextFunction){
        
    try{
        cyber.verifyToken(request, true);
        next();
    }catch(err: any){
        next(err)
    }

}


