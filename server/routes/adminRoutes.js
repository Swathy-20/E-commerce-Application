import e from "express";
import { adminSignup, adminLogin, adminProfile ,adminProfileUpdate, adminLogout,checkAdmin} from "../controllers/adminControllers.js";
import { authAdmin } from "../middlewares/authAdmin.js";


const router = e.Router();


router.post("/signup",adminSignup)


router.put("/login",adminLogin)


router.get("/profile",authAdmin, adminProfile)


router.put("/update",authAdmin,adminProfileUpdate)


router.put("/deactivate")


router.get("/logout",adminLogout)

router.get("/check-admin", authAdmin, checkAdmin);



export  default router