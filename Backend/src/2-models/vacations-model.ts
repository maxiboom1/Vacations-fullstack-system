class vacationModel {
    
    vacationId: number;
    destination: number;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    imageFileName: string;


    public constructor(vacation: vacationModel) {
     
      this.vacationId = vacation.vacationId;
      this.destination = vacation.destination;
      this.description = vacation.description;
      this.startDate = vacation.startDate;
      this.endDate = vacation.endDate;
      this.price = vacation.price;
      this.imageFileName = vacation.imageFileName;

    }

}


export default vacationModel;