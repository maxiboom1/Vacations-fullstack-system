import UserModel from "../2-models/users-model";

import jwt from "jsonwebtoken";

const secretKey = "My special secret key";

async function createToken(user: UserModel): Promise<string>{

    // Create container containing the user:
    const container = { user };

    // Create options:
    const options = { expiresIn: "3h" };

    // Create token: 
    const token = jwt.sign(container, secretKey, options);

    return token;

}
async function decodeToken(token:string): Promise<UserModel>{
    
    const user = jwt.verify(token, secretKey).user;
    
    return user;

}
export default {
    createToken,
    decodeToken
}
