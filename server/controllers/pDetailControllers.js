import {ProductDetail} from "../models/productDetail.js"
import { cloudinaryInstance } from "../config/cloudinary.js";

// Get all product details
export const getAllProductDetails = async (req, res) => {
  try {
    const productDetails = await ProductDetail.find().populate("seller", "name email");
    res.status(200).json(productDetails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product details", error });
  }
};

// Get product details by ID
export const getProductDetailById = async (req, res) => {
  try {
    const {id} =req.params;
    const productDetail = await ProductDetail.findById(id).populate("seller", "name email");
    if (!productDetail) {
      return res.status(404).json({ message: "Product details not found" });
    }
    res.status(200).json(productDetail);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product detail", error });
  }
};

// Create new product details
export const createProductDetail = async (req, res) => {
  try {
    const {
      name, description, price, category, brand, stock,images,  seller, ratings, specifications, returnPolicy
    } = req.body;
    const adminId = req.admin.id;

    const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);
            
    
            const newProduct = new ProductDetail({
                name,
                description,
                price,
                category,
                brand,
                stock,
                images:cloudinaryRes.url,
                ratings,
                seller: adminId,
                specifications,
                returnPolicy

            });
    await newProduct.save();
    res.json({ data: newProduct, message: "product details created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating product detail", error });
  }
};


// export const createProductDetail = async (req, res) => {
//   try {

//     const createData = req.file.path;

//     if(req.file){
//       const result=  await cloudinaryInstance.uploader.upload(req.file.path);
//       createData.images = result.secure_url;
//     }
    
//     if (!req.file) {
//       //console.log("No image file uploaded");
//       return res.status(400).json({ message: "Image is required" });
//     }

   
//     // Parse specifications if sent as JSON string
//     let specifications = {};
//     if (req.body.specifications) {
//       try {
//         specifications = JSON.parse(req.body.specifications);
//       } catch (error) {
//         console.log("Error parsing specifications:", error.message);
//         return res.status(400).json({ message: "Invalid specifications format" });
//       }
//     }

//     //console.log("Parsed specifications:", specifications);

//     // Create product detail
//     const productDetail = new ProductDetail({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       category: req.body.category,
//       brand: req.body.brand,
//       stock: req.body.stock,
//       images: createData, // Cloudinary URL
//       seller: req.body.seller,
//       ratings: req.body.ratings || 0,
//       specifications,
//       returnPolicy: req.body.returnPolicy,
//     });

//     console.log("Saving product detail:", productDetail);
    
//     await productDetail.save();

//     res.status(201).json(productDetail);
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({ message: "Error creating product detail", error: error.message });
//   }
// };

// Update product details


export const updateProductDetail = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product detail by ID
    let productDetail = await ProductDetail.findById(id);
    if (!productDetail) {
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
    productDetail = await ProductDetail.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

    res.status(200).json({
      message: "Product detail updated successfully",
      productDetail
    });
  } catch (error) {
    console.error("Error updating product detail:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Delete product details
export const deleteProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProductDetail = await ProductDetail.findByIdAndDelete(id);
    if (!deletedProductDetail) {
      return res.status(404).json({ message: "Product details not found" });
    }
    res.status(200).json({ message: "Product details deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product detail", error });
  }
};