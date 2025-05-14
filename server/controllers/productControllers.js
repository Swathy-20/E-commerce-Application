import { cloudinaryInstance } from "../config/cloudinary.js";
import {Product} from "../models/productModel.js"
import {ProductDetail} from "../models/productDetail.js"


export const getAllProducts = async (req, res, next) => {
    try {
      const { search } = req.query;

    let query = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      query = {
        $or: [
          { name: regex },
          { category: regex }
        ]
      };
    }

        const productList = await Product.find().select("-stock -category");
        res.json({ data:productList, message: "user autherized" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" });
    }
};


export const createProduct = async (req, res, next) => {
    try {
        const { name, price,images, seller,rating } = req.body;

        const adminId = req.admin.id;
        //console.log("REQ.FILE >>>", req.file);

        const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);
       const newProduct = new Product({
            name,
           
            price,
            
            images:cloudinaryRes.url,
            rating,
            seller: adminId,
        });
        res.status(201).json({ message: "Product added!", product: newProduct });
        

        await newProduct.save();

        
        

    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" });
    }
};

export const getProductById = async (req,res,next)=> {
    try {
        const { id } = req.params;
        
            
            let product = await Product.findById(id).populate("seller", "name price");;
            if (!product) {
              return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json({message: "Product fetched successfully",product });
        
    } catch (error) {
        
        res.status(500).json({ message: "Error fetching product detail", error });
    }
    
}

export const updateProduct = async(req,res,next)=>{
    try {
    const { id } = req.params;

        let product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
    
        // Update fields
        const updatedData = req.body;
    
        // Handle image update if a new image is uploaded (using Cloudinary)
        if (req.file) {
          const result = await cloudinaryInstance.uploader.upload(req.file.path);
          updatedData.images = result.secure_url;
        }
    
        // Update the product details in the database
        product = await Product.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    
        res.status(200).json({
          message: "Product updated successfully",
          product
        });
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
    }

    export const deleteProduct = async (req, res) => {
      try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
          return res.status(404).json({ message: "Product  not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
      }
    };
     
    export const categoryProduct = async(req,res)=>{
      try {
        const category = req.params.category;
        const details = await ProductDetail.find({ category });
        const productIds = details.map((detail) => detail.productId);
        const products = await Product.find({ _id: { $in: productIds } });
        res.json(products);
      } catch (error) {
        console.error("Error fetching by category:", error);
        res.status(500).json({ message: "Server error" });
      }
    }
    
    