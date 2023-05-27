import Joi from "joi";
import { ValidationError } from "./client-errors";

class UserModel {
    
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;


  public constructor(user: UserModel) {
    
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId;
  }

  // Register validation schema
  public static registerValidation = Joi.object({
    userId: Joi.number().optional().integer().positive(),
    firstName: Joi.string().required().min(2).max(30),
    lastName: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(4).max(30),
    email: Joi.string().email().required().min(5).max(50),
    roleId: Joi.number().optional()
  });
  
  // Register validation method
  public validate(): void {
    const result = UserModel.registerValidation.validate(this);
    if(result.error) throw new ValidationError(result.error.message);
  }

}


export default UserModel;