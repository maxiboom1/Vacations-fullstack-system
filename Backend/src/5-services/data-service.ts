import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import VacationModel from "../2-models/vacations-model";
import imageHandler from "../4-utils/image-handler";

async function getAllVacations(userId:number): Promise<VacationModel[]> {
    
    const sql =  `SELECT DISTINCT
    V.*,
    EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
    COUNT(F.userId) AS followersCount
    FROM vacations as V LEFT JOIN followers as F
    ON V.vacationId = F.vacationId
    GROUP BY vacationId
    ORDER BY startDate
    `;
    
    const categories = await dal.execute(sql,[userId]);
    
    categories.imageURL = imageHandler.getImagePath(categories.imageName);

    return categories;

}


export default {
    getAllVacations
};
