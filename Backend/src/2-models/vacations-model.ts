import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel {

  public vacationId: number;
  public destination: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public price: number;
  public image: UploadedFile; // Image file
  public imageUrl:string


  public constructor(vacation: VacationModel) {
    
    this.vacationId = vacation.vacationId;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
    this.image = vacation.image;
    this.imageUrl = vacation.imageUrl
  
  }

  // Add vacation validate schema:
  private static postValidation = Joi.object({
    vacationId: Joi.optional(),
    destination: Joi.string().required().min(7).max(30),
    description: Joi.string().required().min(20).max(500),
    startDate: Joi.date().greater('now').required().messages({
      "date.greater": "Start date must be future date",
    }),
    endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({
      "date.greater": "End date must be greater than start date",
    }),
    price: Joi.number().positive().max(10000).required(),
    image: Joi.any().required(),
    imageUrl: Joi.optional()
    }).options({ abortEarly: true });

  // Edit vacation validate schema:
  private static putValidation = Joi.object({
    vacationId: Joi.number().integer().positive().required(),
    destination: Joi.string().required().min(7).max(30),
    description: Joi.string().required().min(20).max(500),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({
      "date.greater": "End date must be greater than start date",
    }),
    price: Joi.number().positive().max(10000).required(),
    image: Joi.any().optional(),
    imageUrl: Joi.optional()
    }).options({ abortEarly: true });

  // Add vacation validation method
  public validatePost(): void {
    const result = VacationModel.postValidation.validate(this);
    if(result.error) throw new ValidationError(result.error.message);
  }

  // Edit vacation validation method
  public validatePut(): void {
    const result = VacationModel.putValidation.validate(this);
    console.log(this)
    if(result.error) throw new ValidationError(result.error.message);
  }
}

export default VacationModel;