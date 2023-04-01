class VacationModel {
    
    vacationId: number;
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    imageFileName: string;


    public constructor(vacation: VacationModel) {
     
      this.vacationId = vacation.vacationId;
      this.destination = vacation.destination;
      this.description = vacation.description;
      this.startDate = vacation.startDate;
      this.endDate = vacation.endDate;
      this.price = vacation.price;
      this.imageFileName = vacation.imageFileName;

    }

}


export default VacationModel;