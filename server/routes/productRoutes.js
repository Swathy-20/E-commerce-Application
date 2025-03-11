import e from "express";
//import { userLogin, userProfile, userSignup,userProfileUpdate, userLogout } from "../controllers/adminControllers.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { authUser } from "../middlewares/authUser.js";


const router = e.Router();

router.get("/productList",authUser)
router.get("/update-product",authAdmin)
