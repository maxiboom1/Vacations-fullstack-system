import { UploadedFile } from "express-fileupload";

class ProductModel {
    
    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public imageUrl: string; // Image full url
    public image: UploadedFile; // Image file

    public constructor(product: ProductModel) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
        this.imageUrl = product.imageUrl;
        this.image = product.image;
    }

    // TODO: add validation...

}

export default ProductModel;
