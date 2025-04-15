import e from "express";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlistControllers.js";
//import authAdmin from "../middleware/authAdmin.js";
import { authUser } from "../middlewares/authUser.js";

const router = e.Router();

router.post("/add", authUser, addToWishlist);
router.delete("/remove/:productId", authUser, removeFromWishlist);
router.get("/get", authUser, getWishlist);

export {router as wishlistRouter}
