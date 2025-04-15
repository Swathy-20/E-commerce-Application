import e from "express";
const router = e.Router();
import {Product} from "../models/productModel"
import {ProductDetail} from "../models/productDetail";

router.get("/with-details", async (req, res) => {
  try {
    const details = await ProductDetail.find().populate("productId");

    const combinedData = details.map((detail) => {
      const product = detail.productId;
      return {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0], // pick main image
        category: detail.category,
      };
    });

    res.json(combinedData);
  } catch (err) {
    console.error("Error fetching product details:", err);
    res.status(500).json({ message: "Server error" });
  }
});

