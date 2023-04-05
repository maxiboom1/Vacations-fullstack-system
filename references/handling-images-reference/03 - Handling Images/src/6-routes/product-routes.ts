import express, { Request, Response, NextFunction } from "express";
import ProductModel from "../2-models/product-model";
import imageHandler from "../4-utils/image-handler";
import productsService from "../5-services/products-service";

const router = express.Router(); // Capital R

// GET http://localhost:4000/api/products
router.get("/api/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsService.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/products/:id
router.get("/api/products/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const product = await productsService.getOneProduct(id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4000/api/products
router.post("/api/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Take image if exist:
        request.body.image = request.files?.image;

        const product = new ProductModel(request.body);
        const addedProduct = await productsService.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:4000/api/products/:id
router.put("/api/products/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id;

        // Take image if exist:
        request.body.image = request.files?.image;
        
        const product = new ProductModel(request.body);
        const updatedProduct = await productsService.updateProduct(product);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:4000/api/products/:id
router.delete("/api/products/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await productsService.deleteProduct(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/products/images/:imageName
router.get("/api/products/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const imagePath = imageHandler.getImagePath(imageName);
        response.sendFile(imagePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
