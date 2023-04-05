import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import VacationModel from "../2-models/vacations-model";
import imageHandler from "../4-utils/image-handler";
import appConfig from "../4-utils/app-config";

async function getAllVacations(userId:number): Promise<VacationModel[]> {
    
    // we return new field "imageURL" that is concat imageURL with imageFileName from DB. 
    const sql =  `SELECT DISTINCT
    V.*, CONCAT('${appConfig.imagesUrl}' , V.imageFileName) AS imageUrl, 
    EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
    COUNT(F.userId) AS followersCount
    FROM vacations as V LEFT JOIN followers as F
    ON V.vacationId = F.vacationId
    GROUP BY vacationId
    ORDER BY startDate
    `;
    
    const categories = await dal.execute(sql,[userId]);
    
    return categories;

}

async function addVacation(vacation: VacationModel): Promise<VacationModel>{
    
    // TODO: Validation...

    let imageName = "";
    
    if(vacation.image){
        imageName = await imageHandler.saveFile(vacation.image);
        vacation.imageURL = appConfig.imagesUrl + imageName;
        console.log(imageName);
    }
    
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;

    const result:OkPacket = await dal.execute(sql, [
        vacation.destination, 
        vacation.description, 
        vacation.startDate, 
        vacation.endDate,
        vacation.price,
        imageName
    ]);

    vacation.vacationId = result.insertId;

    delete vacation.image;

    return vacation;
}


export default {
    getAllVacations,
    addVacation
};
