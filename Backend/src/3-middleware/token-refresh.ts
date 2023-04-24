import { Request, NextFunction, Response } from "express";
import cyber from "../4-utils/cyber";


export function refreshToken(request: Request, response: Response, next: NextFunction){
    
    const token = request.header("authorization")?.substring(7);
    
    try{
        
        if(token){console.log('expired: ',cyber.tokenExpired(token))}

        // If token exists, but expired
        if(token && cyber.tokenExpired(token)){
            console.log('Token has been refreshed in refreshToken MV');
            const refreshedToken = (cyber.getRefreshedToken(token));
            response.setHeader('Authorization', 'Bearer ' + refreshedToken);
            request.headers['Authorization'] = `Bearer ${refreshedToken}`;
        }
        
        console.log('refreshToken MV is done and go to next()');
        next();

    }catch(err: any){
        
        next(err);

    }

}

