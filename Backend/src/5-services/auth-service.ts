import { OkPacket } from "mysql";
import { UnauthorizedError, ValidationError } from "../2-models/client-errors";
import UserModel from "../2-models/users-model";
import dal from "../4-utils/dal";
import RoleModel from "../2-models/role-model";
import cyber from "../4-utils/cyber";
import CredentialsModel from "../2-models/credentials-model";

async function register(user: UserModel): Promise<string>{

    const isTaken = await isEmailTaken(user.email);
    
    if (isTaken) throw new ValidationError(`${user.email} is already in use. Choose other email.`);
    
    const sql = `INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, ${RoleModel.User})`; // set role as "user" to any register event. 

    user.password = cyber.hashPassword(user.password);

    const result:OkPacket = await dal.execute(sql, [user.firstName,user.lastName, user.email, user.password]);

    user.userId = result.insertId;

    const token = cyber.createToken(user);
        
    return token;

}

async function login(cred: CredentialsModel): Promise<string>{

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    
    cred.password = cyber.hashPassword(cred.password);

    const result = await dal.execute(sql, [cred.email, cred.password]);
    
    const user = result[0];

    if(!user) throw new UnauthorizedError(`Wrong username or password`) 
    
    const token = cyber.createToken(user);

    return token;

}

async function isEmailTaken(email: string): Promise<boolean> {
    
    const sql = `SELECT EXISTS(SELECT * FROM users WHERE email = ?) AS isTaken`;
    
    const sqlResponseArr = await dal.execute(sql, [email]);

    const result = sqlResponseArr[0].isTaken;

    return result === 1;

}

export default {
    register,
    login
}