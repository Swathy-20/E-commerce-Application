import e from "express";
import { userLogin, userProfile, userSignup,userProfileUpdate, userLogout ,checkUser} from "../controllers/userControllers.js";
import { authUser } from "../middlewares/authUser.js";


const router = e.Router();


router.post("/signup",userSignup )


router.put("/login",userLogin)


router.get("/profile",authUser,userProfile)


router.put("/update",authUser,userProfileUpdate)


router.put("/deactivate")


router.get("/logout",userLogout)

router.get("/check-user", authUser, checkUser);



export  default router