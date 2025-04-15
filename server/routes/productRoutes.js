import e from "express";

import { authAdmin } from "../middlewares/authAdmin.js";
import { authUser } from "../middlewares/authUser.js";
import { categoryProduct, createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productControllers.js";
import { upload } from "../middlewares/multer.js";

const router = e.Router();

router.get("/productList",getAllProducts)

router.get("/productbyId/:id",getProductById)


router.post('/create-product',authAdmin,upload.single("image"),createProduct)


router.put("/update-product/:id",authAdmin,upload.single("images"),updateProduct)

router.delete("/delete/:id",deleteProduct)

router.get("/category/:category",categoryProduct)


export {router as productRouter}