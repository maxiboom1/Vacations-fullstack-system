import { OkPacket } from "mysql";
import { ResourceNotFoundError } from "../2-models/client-errors";
import ProductModel from "../2-models/product-model";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import imageHandler from "../4-utils/image-handler-assaf";

// Get all products from database: 
async function getAllProducts(): Promise<ProductModel[]> {

    // Create query: 
    const sql = `SELECT
                       ProductID AS id,
                       ProductName AS name,
                       UnitPrice AS price,
                       UnitsInStock AS stock,
                       CONCAT('${appConfig.imagesUrl}', ImageName) AS imageUrl
                FROM products`;

    // Get all products: 
    const products = await dal.execute(sql);

    // Return them:
    return products;
}

// Get one product
async function getOneProduct(id: number): Promise<ProductModel> {

    // Create query: 
    const sql = `SELECT
                       ProductID AS id,
                       ProductName AS name,
                       UnitPrice AS price,
                       UnitsInStock AS stock,
                       CONCAT('${appConfig.imagesUrl}', ImageName) AS imageUrl
                FROM products
                WHERE ProductID = ${id}`;

    // Get products:
    const products = await dal.execute(sql);

    // Take first product:
    const product = products[0];

    // If id not found:
    if (!product) throw new ResourceNotFoundError(id);

    // Return found product:
    return product;
}

// Add product
async function addProduct(product: ProductModel): Promise<ProductModel> {

    // TODO: Validation:
    // ...

    let imageName = null;

    // If we have image:
    if (product.image) {

        // Save image: 
        imageName = await imageHandler.saveImage(product.image);

        // Set back image url: 
        product.imageUrl = appConfig.imagesUrl + imageName;
    }

    // Create query: 
    const sql = `INSERT INTO products(ProductName, UnitPrice, UnitsInStock, ImageName)
        VALUES('${product.name}', ${product.price}, ${product.stock}, '${imageName}')`;

    // Execute: 
    const result: OkPacket = await dal.execute(sql);

    // Set back the created id: 
    product.id = result.insertId;

    // Remove image file from returned product:
    delete product.image;

    // Return: 
    return product;
}

// Update product
async function updateProduct(product: ProductModel): Promise<ProductModel> {

    // TODO: Validation:
    // ...

    // Take original image name: 
    let imageName = await getProductImageName(product.id);

    // If we have an image to update:
    if (product.image) {

        // Update image:
        imageName = await imageHandler.updateImage(product.image, imageName);
    }

    // Set back image url: 
    product.imageUrl = appConfig.imagesUrl + imageName;

    // Create query: 
    const sql = `UPDATE products SET
        ProductName = '${product.name}',
        UnitPrice = ${product.price},
        UnitsInStock = ${product.stock},
        ImageName = '${imageName}'
        WHERE ProductID = ${product.id}`

    // Execute:
    const result: OkPacket = await dal.execute(sql);

    // If product not found:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(product.id);

    // Remove image file from returned product:
    delete product.image;

    // Return:
    return product;
}

// Delete product
async function deleteProduct(id: number): Promise<void> {

    // Take original image name: 
    let imageName = await getProductImageName(id);

    // Create query: 
    const sql = `DELETE FROM products WHERE ProductID = ${id}`;

    // Execute: 
    const result: OkPacket = await dal.execute(sql);

    // If product not found:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(id);

    // Delete image from disk:
    await imageHandler.deleteImage(imageName);
}

// Get product image name from db:
async function getProductImageName(id: number): Promise<string> {

    // Create query: 
    const sql = `SELECT ImageName AS imageName FROM products WHERE ProductID = ${id}`;

    // Get products: 
    const products = await dal.execute(sql);

    // Extract first product: 
    const product = products[0];

    // If id not found: 
    if (!product) return "null";

    // Get image name: 
    const imageName = product.imageName;

    // Return: 
    return imageName;
}

// Handle Auth

// Security

// Frontend Integration

export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct
};
