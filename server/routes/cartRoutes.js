import e from "express";
import { authUser } from "../middlewares/authUser.js";
import { addToCart, getCart, removeProductFromCart } from "../controllers/cartControllers.js";
import { clearCart } from "../controllers/cartControllers.js";

const router = e.Router();

//add to cart
router.post("/add-to-cart",authUser,addToCart)

//remove from cart
router.delete("/remove-from-cart",authUser,removeProductFromCart)

//clear cart
router.delete("/clear",authUser,clearCart)
//get cart details
router.get("/get-cart-details",authUser,getCart)


export { router as cartRouter };