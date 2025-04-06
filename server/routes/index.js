import e from "express";
import { productRouter } from "./productRoutes.js";
import { cartRouter } from "./cartRoutes.js";
import { reviewRouter } from "./reviewRoutes.js";
import { userRouter } from "./userRoutes.js";
import { adminRouter } from "./adminRoutes.js";
import { pDetailRouter } from "./pDetailRoutes.js";
import { wishlistRouter } from "./wishlistRoutes.js";
import { paymentRouter } from "./paymentRoutes.js";



const router = e.Router()


router.use("/user",userRouter)


router.use("/admin",adminRouter)

router.use("/product",productRouter)

router.use("/product-detail",pDetailRouter)

router.use("/wishlist",wishlistRouter)

router.use("/cart",cartRouter)

router.use("/review",reviewRouter)

router.use("/payment",paymentRouter)

export {router as apiRouter}