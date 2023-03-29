import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import vacationModel from "../2-models/vacations-model";

async function getAllVacations(): Promise<vacationModel[]> {
    
    let userId = 1;
    
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
    
    return categories;

}


export default {
    getAllVacations
};
