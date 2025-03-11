import e from "express";
import userRouter from "./userRoutes.js"
import adminRouter from "./adminRoutes.js"

const router = e.Router()


router.use("/user",userRouter)


router.use("/admin",adminRouter)



export {router as apiRouter}