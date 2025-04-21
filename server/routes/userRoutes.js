import e from "express";
import { userLogin, userLogout,userProfile, userSignup,userProfileUpdate ,updatePassword, changeAddress, checkUser} from "../controllers/userControllers.js";
import { authUser } from "../middlewares/authUser.js";


const router = e.Router();


router.post("/signup",userSignup )


router.post("/login",userLogin)


router.get("/profile",authUser,userProfile)


router.put("/update",authUser,userProfileUpdate)


router.put("/deactivate")


router.get("/logout",userLogout)

router.get("/check-user", authUser, checkUser);

//password-forgot
//password-change
//address update
// router.post("/forgot-password",authUser, forgotPassword);

router.put("/update-password", authUser,updatePassword);

router.put("/change-address", authUser, changeAddress);

export { router as userRouter };