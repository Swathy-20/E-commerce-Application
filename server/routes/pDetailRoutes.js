import e from "express";
import { authAdmin } from "../middlewares/authAdmin.js";
import { authUser } from "../middlewares/authUser.js";
import { createProductDetail, deleteProductDetail, getAllProductDetails, getProductDetailById, updateProductDetail,  } from "../controllers/pDetailControllers.js";
import { upload } from "../middlewares/multer.js";


const router = e.Router();
 

router.get('/allproductDetails',getAllProductDetails)

router.get("/detailbyId/:id",getProductDetailById)


router.post("/create_details",authAdmin,upload.single("images"),createProductDetail)

router.put("/update/:id",authAdmin,upload.single("images"),updateProductDetail)

router.delete("/delete/:id",deleteProductDetail)



export {router as pDetailRouter}