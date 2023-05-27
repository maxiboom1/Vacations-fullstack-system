import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel {

    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

  // Login validation schema
  public static loginValidation = Joi.object({
    email: Joi.string().email().required().min(5).max(50),
    password: Joi.string().required().min(4).max(30),
  });
  
  // Login validation method
  public validate(): void {
    const result = CredentialsModel.loginValidation.validate(this);
    if(result.error) throw new ValidationError(result.error.message);
  }
  
}

export default CredentialsModel;