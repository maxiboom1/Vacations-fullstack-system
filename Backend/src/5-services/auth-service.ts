import { OkPacket } from "mysql";
import { ValidationError } from "../2-models/client-errors";
import UserModel from "../2-models/users-model";
import dal from "../4-utils/dal";
import RoleModel from "../2-models/role-model";
import cyber from "../4-utils/cyber";

async function register(user: UserModel): Promise<string>{

    const isTaken = await isEmailTaken(user.email);
    
    if (isTaken) throw new ValidationError(`${user.email} is already in use. Choose other email.`);
    
    const sql = `INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, ${RoleModel.User})`; // set role as "user" to any register event. 

    const result:OkPacket = await dal.execute(sql, [user.firstName,user.lastName, user.hashedPassword, user.email]);

    user.userId = result.insertId;

    const token = cyber.createToken(user);
    
    console.log(token);
    
    return token;

}

async function isEmailTaken(email: string): Promise<boolean> {
    
    const sql = `SELECT EXISTS(SELECT * FROM users WHERE email = ?) AS isTaken`;
    
    const sqlResponseArr = await dal.execute(sql, [email]);

    const result = sqlResponseArr[0].isTaken;

    return result === 1;

}

export default {
    register
}