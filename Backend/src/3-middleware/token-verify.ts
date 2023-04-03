import { Request, NextFunction, Response } from "express";
import cyber from "../4-utils/cyber";

function verifyLoggedIn(request: Request, response: Response, next: NextFunction){
    
    console.log('verify Token');

    try{
        cyber.verifyToken(request);
        next();
    }catch(err: any){
        next(err)
    }

}

function verifyAdmin(request: Request, response: Response, next: NextFunction){
    
    console.log('Verify Admin');
    
    try{
        cyber.verifyToken(request, true);
        next();
    }catch(err: any){
        next(err)
    }

}

export default {
    verifyLoggedIn,
    verifyAdmin
}

