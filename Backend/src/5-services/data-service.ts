import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import VacationModel from "../2-models/vacations-model";
import imageHandler from "../4-utils/image-handler";
import appConfig from "../4-utils/app-config";
import { ResourceNotFoundError } from "../2-models/client-errors";
import socketIoService from "./socketIoService";

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
    
    const vacations = await dal.execute(sql,[userId]);
        
    return vacations;

}

async function getOneVacation(id: number): Promise<VacationModel> {
    const sql = `SELECT description, destination, startDate, CONCAT('${appConfig.imagesUrl}', imageFileName) AS imageUrl, endDate, price, vacationId
    FROM vacations
    WHERE vacationId = ?
    `;
    const vacations = await dal.execute(sql, [id]);
    const vacation = vacations[0];
    if(!vacation) throw new ResourceNotFoundError(id);
    return vacation;
  }

async function addVacation(vacation: VacationModel): Promise<VacationModel>{
    
    // TODO: Validation...

    let imageName = "";
    
    if(vacation.image){
        imageName = await imageHandler.saveFile(vacation.image);
        vacation.imageURL = appConfig.imagesUrl + imageName;
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

async function updateVacation(vacation: VacationModel): Promise<VacationModel>{

    // TODO validation...

    let imageName = await getImageName(vacation.vacationId);
    if (vacation.image) {
        imageName = await imageHandler.updateFile(vacation.image, imageName);
    } 
    vacation.imageURL = appConfig.imagesUrl + imageName;

    const sql = `UPDATE vacations SET
    destination = ?,
    description = ?,
    startDate = ?,
    endDate = ?,
    price = ?,
    imageFileName = ?
    WHERE vacationId = ?`;

    const result:OkPacket = await dal.execute(sql,[
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
        imageName,
        vacation.vacationId
    ]);

    // If vacation not found:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Remove image file from returned product:
    delete vacation.image;

    // Return:
    return vacation;

}

async function deleteVacation(id: number): Promise<void>{
    
    const imageName = await getImageName(id);
    
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;
    
    const result: OkPacket = await dal.execute(sql,[id]);
    
    if(result.affectedRows === 0) throw new ResourceNotFoundError(id);

    await imageHandler.deleteImage(imageName);
}   

async function getImageName(vacationId: number): Promise<string>{

    const sql = `SELECT imageFileName AS imageFileName FROM vacations WHERE vacationId = ?`;

    const result = await dal.execute(sql,[vacationId]);
    
    const imageName = result[0]?.imageFileName; // ? checks if imageFileName exists in result.

    return imageName;

}

async function updateFollowers(userId:number, vacationId: number, action: number): Promise<void>{
    
    // Will insert data only if this crosspoint doesn't exists in DB 
    const followQuery = `INSERT INTO followers (userId, vacationId) SELECT ?, ? 
    WHERE NOT EXISTS (SELECT 1 FROM followers WHERE userId = ? AND vacationId = ?)`;
    
    const unFollowQuery = "DELETE FROM followers WHERE userId=? AND vacationId=?";
    
    const sql = action === 1 ? followQuery : unFollowQuery;
    
    const response:OkPacket = await dal.execute(sql, [userId, vacationId, userId, vacationId]);

    // JIC - In case user that already follow vacation send to follow it again
    if(response.affectedRows !== 0){
        const socketServer = socketIoService.getSocketServer();
        socketServer.sockets.emit('update', {vacationId, userId, isFollowing: action});
    }
    

}



export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation,
    updateFollowers
};
