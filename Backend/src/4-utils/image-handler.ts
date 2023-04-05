import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import path from "path"

const imagesFolder = path.join(__dirname, "..", "1-assets", "images");

function getImagePath(imageName: string): string{
    return imagesFolder + "/" + imageName;
}

async function saveFile(image: UploadedFile) : Promise<string>{
    
    const fileExtension = image.name.slice(image.name.lastIndexOf("."));

    const uniqueImgName = uuid() + fileExtension;

    const absolutePath = getImagePath(uniqueImgName); 
    
    await image.mv(absolutePath);

    return uniqueImgName;
}

export default {
    getImagePath,
    saveFile
}
