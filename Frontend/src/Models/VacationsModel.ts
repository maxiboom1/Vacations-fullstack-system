class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public image: File;
    
    // Extra data from backend - we don't need to send it on add/edit new vacation:
    public imageUrl:string; 
    public isFollowing: number;
    public followersCount: number;
  
}

export default VacationModel;