import { OkPacket } from "mysql";
import { ValidationError } from "../2-models/client-errors";
import userModel from "../2-models/users-model";
import dal from "../4-utils/dal";

async function register(user: userModel): Promise<string>{

    const isTaken = await isEmailTaken(user.email);
    
    if (isTaken) throw new ValidationError(`${user.email} is already in use. Choose other email.`);
    
    user.roleId = 2; // set role as "user" to any register event. 

    const sql = `INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, ?);`;

    const result:OkPacket = await dal.execute(sql, [user.firstName,user.lastName, user.hashedPassword, user.email, user.roleId]);

    return null;

}

async function isEmailTaken(email: string): Promise<boolean> {
    
    const sql = `SELECT EXISTS(SELECT * FROM users WHERE username = ?) AS isTaken`;
    
    const sqlResponseArr = await dal.execute(sql, [email]);

    const result = sqlResponseArr[0].isTaken;

    return result === 1;

}