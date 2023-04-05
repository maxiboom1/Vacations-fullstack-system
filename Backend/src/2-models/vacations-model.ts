import { UploadedFile } from "express-fileupload";

class VacationModel {
    
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public image: UploadedFile; // Image file
    public imageURL:string


    public constructor(vacation: VacationModel) {
     
      this.vacationId = vacation.vacationId;
      this.destination = vacation.destination;
      this.description = vacation.description;
      this.startDate = vacation.startDate;
      this.endDate = vacation.endDate;
      this.price = vacation.price;
      this.image = vacation.image;
      this.imageURL = vacation.imageURL
    }

}

export default VacationModel;