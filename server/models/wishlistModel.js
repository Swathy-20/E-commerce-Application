import mongoose, { Schema } from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            addedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);