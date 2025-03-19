import e from "express";
import { authUser } from "../middlewares/authUser.js";
import { addReview, deleteReview, getAverageRating, getProductReviews } from "../controllers/reviewControllers.js";

const router = e.Router();

//update review
//add review
router.post("/add-review",authUser,addReview)


//delete review
router.delete("/delete-review/:reviewId",authUser,deleteReview)

// get product reviews
router.get('/product-reviews/:productId',getProductReviews)


// product avg rating
router.get("/avg-rating/:productId",getAverageRating)






export { router as reviewRouter }; 