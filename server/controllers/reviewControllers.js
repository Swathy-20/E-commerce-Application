import { Product } from "../models/productModel.js";
import { Review } from "../models/reviewModel.js";

export const addReview = async (req, res, next) => {
    try {
        const { userId,productId, rating, comment } = req.body;
        //const userId = req.user._id;

        // Validate if the course exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        //const userOrder= Order.findOne({userId,courseId})
        // if(userOrder.paymentStatus !== "success" || userOrder.deliveryStatus !=="delivered" ){
        //      return res.status(404).json({ message: "user have no permission to add review" });
        //  }

        if (rating > 5 || rating < 1) {
            return res.status(400).json({ message: "Please provide a proper rating" });
        }

        // Create or update the review
        const review = await Review.findOneAndUpdate({ userId, productId }, { rating, comment }, { new: true, upsert: true });

        // Optionally, you can update the course's average rating here

        res.status(201).json({ data: review, message: "Review addedd" });
    } catch (error) {
        // next(error)

        res.status(500).json({ message: error.message || "Internal server error" });
    }
};


export const getProductReviews = async (req, res,next) => {
    try {
        const {productId} = req.params;
        console.log("Fetching all reviews")

        const reviews = await Review.find({productId}).populate("userId", "name");

        if (!reviews.length) {
            return res.status(404).json({ message:  "No reviews found for this product" });
        }

        res.status(200).json({ data: reviews, message: "product reviews fetched" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        //const userId = req.user.id;

        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found " });
        }

        await review.deleteOne();

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getAverageRating = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ productId });

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this product" });
        }

        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        res.status(200).json({ data: averageRating, message: "Average rating fetched" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

