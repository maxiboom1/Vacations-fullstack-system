import UserModel from "../2-models/users-model";
import crypto from "crypto"
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../2-models/client-errors";
import { Request } from "express";
import RoleModel from "../2-models/role-model";

const secretKey = "My special secret key";

async function createToken(user: UserModel): Promise<string>{

    // Delete password for security reasons
    delete user.password;

    // Create container containing the user:
    const container = { user };

    // Create options:
    const options = { expiresIn: "3h" }; 

    // Create token: 
    const token = jwt.sign(container, secretKey, options);

    return token;

}

function decodeToken(token:string): UserModel {
    
    const wrappedUser = (jwt.verify(token, secretKey)) as any; // maybe we need to fix it...
    const {user} = wrappedUser;  
    return user;

}

function hashPassword(password:string): string{
    
    const salt = "We’re updating the cards and ranking all the time";
    
    const hashedPassword = crypto.createHmac("sha512",salt).update(password).digest("hex");
    
    return hashedPassword;
}


/** 
 * Checks Token validity using jsonwebtoken.verify() sync method.
 * @param request Function will take "authorization" header from the request object.
 * @param adminCheck Optional, if gets true checks also for admin role.
 * @return Return true if token is valid, else throws err.
 */ 

function verifyToken(request: Request, adminCheck?: boolean): boolean {

    const token = request.header("authorization")?.substring(7);
    
    if(!token) throw new UnauthorizedError('No token found');


    jwt.verify(token, secretKey, (err, container:{user: UserModel})=>{
        
        if (err) throw new UnauthorizedError('Invalid token'); // Check for token validity
    
        if (adminCheck && container.user.roleId !== RoleModel.Admin) throw new UnauthorizedError('Access denied');
    
    });

    return true;
}

function getRefreshedToken(token: string){
    console.log('getRefresheToken func start')
    const user = decodeToken(token);
    console.log('getRefresheToken func decoded')

    const refreshedToken = createToken(user);
    console.log('getRefresheToken func create new')

    return refreshedToken;

}

function tokenExpired(token: string){

    const decodedToken = jwt.decode(token) as any;
    const expirationTime = decodedToken.exp;
    //console.log(Date.now(), expirationTime * 1000);
    return (Date.now() >= expirationTime * 1000); // Return true if expired
}

export default {
    createToken,
    decodeToken,
    hashPassword,
    verifyToken,
    getRefreshedToken,
    tokenExpired
}



/* THE ORIGINAL FUNCTION

function verifyToken(request: Request, adminCheck?: boolean): boolean {

    const token = request.header("authorization")?.substring(7);
    
    if(!token) throw new UnauthorizedError('No token found');

    jwt.verify(token, secretKey, (err, container:{user: UserModel})=>{
        
        if (err) throw new UnauthorizedError('Invalid token'); // Check for token validity
    
        if (adminCheck && container.user.roleId !== RoleModel.Admin) throw new UnauthorizedError('Access denied');
    
    });

    return true;
}

*/