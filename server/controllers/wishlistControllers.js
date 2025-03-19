import {Wishlist} from "../models/wishlistModel.js";
import {Product} from "../models/productModel.js";

export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find or create wishlist
        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            wishlist = new Wishlist({ userId, products: [] });
        }

        // Check if product is already in wishlist
        const productExists = wishlist.products.some(item => item.productId.equals(productId));
        if (productExists) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        // Add product to wishlist
        wishlist.products.push({ productId });
        await wishlist.save();

        res.status(200).json({ message: "Product added to wishlist", data: wishlist });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        // Remove product from wishlist
        wishlist.products = wishlist.products.filter(item => !item.productId.equals(productId));

        await wishlist.save();
        res.status(200).json({ message: "Product removed from wishlist", data: wishlist });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
export const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await Wishlist.findOne({ userId }).populate("products.productId");

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        res.status(200).json({ data: wishlist });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

