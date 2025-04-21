import e from "express";
import { adminSignup, adminLogin, adminProfile ,adminProfileUpdate, adminLogout,checkAdmin, updatePassword,  deactivateAdmin} from "../controllers/adminControllers.js";
import { authAdmin } from "../middlewares/authAdmin.js";


const router = e.Router();


router.post("/signup",adminSignup)


router.post("/login",adminLogin)


router.get("/profile",authAdmin, adminProfile)


router.put("/update",authAdmin,adminProfileUpdate)


router.put("/deactivate",authAdmin,deactivateAdmin)

//router.post("/forgot-password",authAdmin,forgotPassword)

//router.post("/reset-password",resetPassword)

router.put("/update-password",authAdmin,updatePassword)


router.get("/logout",adminLogout)

router.get("/check-admin", authAdmin, checkAdmin);



export {router as adminRouter};