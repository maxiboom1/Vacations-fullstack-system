import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import VacationModel from "../2-models/vacations-model";
import imageHandler from "../4-utils/image-handler";
import appConfig from "../4-utils/app-config";
import { ResourceNotFoundError } from "../2-models/client-errors";
import socketIoService from "./socketIoService";
import { Socket } from "socket.io";

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

async function updateFollowers(userId:number, vacationId: number, action: boolean): Promise<void>{
    
    const addQuery = `INSERT INTO followers (userId, vacationId) SELECT ?, ? 
    WHERE NOT EXISTS (SELECT 1 FROM followers WHERE userId = ? AND vacationId = ?)`;
    
    const deleteQuery = "DELETE FROM followers WHERE userId=? AND vacationId=?";
    
    const sql = action ? addQuery : deleteQuery;
    
    await dal.execute(sql, [userId, vacationId, userId, vacationId]);

    const socketServer = socketIoService.getSocketServer();

    socketServer.sockets.emit('update', {vacationId:vacationId, isFollowing: action ? 1 : 0});

}


export default {
    getAllVacations,
    addVacation,
    updateVacation,
    deleteVacation,
    updateFollowers
};
