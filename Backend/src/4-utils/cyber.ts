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
    
    const user = (jwt.verify(token, secretKey)) as any; // maybe we need to fix it...
        
    return user;

}

function hashPassword(password:string): string{
    
    const salt = "We’re updating the cards and ranking all the time";
    
    const hashedPassword = crypto.createHmac("sha512",salt).update(password).digest("hex");
    
    return hashedPassword;
}


// user - verify funcs

function verifyToken(request: Request, adminCheck?: boolean): boolean {

    const token = request.header("authorization")?.substring(7);
    
    if(!token) throw new UnauthorizedError('Some error occurred');

    jwt.verify(token, secretKey, (err, container:{user: UserModel})=>{
        
        if (err) throw new UnauthorizedError('Invalid token'); // Check for token validity
    
        if (adminCheck && container.user.roleId !== RoleModel.Admin) throw new UnauthorizedError('Access denied');
    
    });

    return true;
}


export default {
    createToken,
    decodeToken,
    hashPassword,
    verifyToken
}






/*
async function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

        // Extract header:
        const header = request.header("authorization"); // "Bearer the-token"

        // If no header:
        if (!header) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        // Extract token:
        const token = header.substring(7);

        // If no token:
        if (!token) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        // Verify:
        jwt.verify(token, secretKey, err => {

            if (err) {
                reject(new UnauthorizedError("Invalid token"));
                return;
            }

            // All is good:
            resolve(true);

        });

    });
}





async function verifyAdmin(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

        // Extract header:
        const header = request.header("authorization"); // "Bearer the-token"

        // If no header:
        if (!header) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        // Extract token:
        const token = header.substring(7);

        // If no token:
        if (!token) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        // Verify:
        jwt.verify(token, secretKey, (err, container: { user: UserModel }) => {

            if (err) {
                reject(new UnauthorizedError("Invalid token"));
                return;
            }

            // Extract user from token:
            const user = container.user;

            // If user is not admin:
            if (user.roleId !== RoleModel.Admin) {
                reject(new UnauthorizedError("Access denied"));
                return;
            }

            // All is good:
            resolve(true);

        });

    });
}


*/