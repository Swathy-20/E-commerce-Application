import e from "express";
import { authAdmin } from "../middlewares/authAdmin.js";
import { authUser } from "../middlewares/authUser.js";
import { createProductDetail, deleteProductDetail, getAllProductDetails, getProductDetailById, updateProductDetail,  } from "../controllers/pDetailControllers.js";
import { upload } from "../middlewares/multer.js";


const router = e.Router();
 

router.get('/allproductDetails',getAllProductDetails)

router.get("/detailbyId/:id",getProductDetailById)


router.post("/create_details",authAdmin,upload.array("images", 3),createProductDetail)

router.put("/update/:id",authAdmin,upload.array("images",3),updateProductDetail)

router.delete("/delete/:id",deleteProductDetail)



export {router as pDetailRouter}