import {ProductDetail} from "../models/productDetail.js"
import { cloudinaryInstance } from "../config/cloudinary.js";
import {Product} from "../models/productModel.js"

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
    let productDetail = await ProductDetail.findById(id).populate("name,email");

    if(!productDetail){
      productDetail = await ProductDetail.findOne({ productId: id });
    }
    if (!productDetail) {
      return res.status(404).json({ message: "Product details not found" });
    }
    res.status(200).json(productDetail);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product detail", error });
  }
};

// Create new product details
// export const createProductDetail = async (req, res) => {
//   try {
//     const { productId,
//       name, description, price, category, brand, stock,images,  seller, ratings,sizes,colors, specifications, returnPolicy
//     } = req.body;
//     const adminId = req.admin.id;

//     const existingProduct = await Product.findById(productId);
//     if (!existingProduct) {
//       return res.status(404).json({ message: "Product not found. Create the product first." });
//     }


//     //const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.files.path);
//     const uploadedImages = [];

//     for (let file of req.files) {
//       const result = await cloudinaryInstance.uploader.upload(file.path);
//       uploadedImages.push(result.secure_url); // or result.url
//     }
            
    
//             const newProduct = new ProductDetail({
//               productId,
//                 name,
//                 description,
//                 price,
//                 category,
//                 brand,
//                 stock,
//                 images:uploadedImages,
//                 ratings,
//                 seller: adminId,
//                 sizes,colors,
//                 specifications,
//                 returnPolicy

//             });
//     await newProduct.save();
//     res.json({ data: newProduct, message: "product details created successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating product detail", error });
//   }
// };
export const createProductDetail = async (req, res) => {
  try {
    const {
      productId,
      name,
      description,
      price,
      category,
      brand,
      stock,
      ratings,
      returnPolicy
    } = req.body;

    const sizes = Array.isArray(req.body.sizes)
      ? req.body.sizes
      : JSON.parse(JSON.stringify(req.body.sizes || []));

    const colors = Array.isArray(req.body.colors)
      ? req.body.colors
      : JSON.parse(JSON.stringify(req.body.colors || []));

    const specifications = {
      material: req.body['specifications[material]'],
      weight: req.body['specifications[weight]']
    };

    const adminId = req.admin.id;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found. Create the product first." });
    }

    const uploadedImages = [];

    for (let file of req.files) {
      const result = await cloudinaryInstance.uploader.upload(file.path);
      uploadedImages.push(result.secure_url);
    }

    const newProduct = new ProductDetail({
      productId,
      name,
      description,
      price,
      category,
      brand,
      stock,
      images: uploadedImages,
      ratings,
      seller: adminId,
      sizes,
      colors,
      specifications,
      returnPolicy
    });

    await newProduct.save();
    res.json({ data: newProduct, message: "Product details created successfully" });
  } catch (error) {
    console.error("Error in createProductDetail:", error);
    res.status(500).json({ message: "Error creating product detail", error });
  }
};





export const updateProductDetail = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product detail by ID
    // let productDetail = await ProductDetail.findById(id);
    // if(!productDetail){
    //   productDetail = await ProductDetail.findOne({ productId: id });
    // }
    // if (!productDetail) {
    //   return res.status(404).json({ message: "Product not found" });
    // }
    let productDetail = await ProductDetail.findById(id);

if (!productDetail) {
  productDetail = await ProductDetail.findOneAndUpdate(
    { productId: id })
  }
    
    if (!productDetail) {
      return res.status(404).json({ message: "Product not found" });
    }  
    

    // Update fields
    const updatedData = {
      ...req.body,
      specifications: {
        material: req.body['specifications[material]'] || '',
        weight: req.body['specifications[weight]'] || '',
      },
      sizes: Array.isArray(req.body.sizes)
        ? req.body.sizes
        : [req.body.sizes],
    
      colors: Array.isArray(req.body.colors)
        ? req.body.colors
        : [req.body.colors],
    };
    

    // Handle image update if a new image is uploaded (using Cloudinary)
    if (req.files && req.files.length > 0) {
      const imageUrls = [];
      for (let file of req.files) {
        const result = await cloudinaryInstance.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
      updatedData.images = imageUrls;
    }


    // Update the product details in the database
    Object.assign(productDetail, updatedData);
    await productDetail.save();
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
    const { productId } = req.params;
    const deletedProductDetail = await ProductDetail.findByIdAndDelete(productId);
    if (!deletedProductDetail) {
      return res.status(404).json({ message: "Product details not found" });
    }
    res.status(200).json({ message: "Product details deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product detail", error });
  }
};
export const getAllCategories = async (req, res) => {
  try {
    const categories = await ProductDetail.distinct('category'); 
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

export const getCategorySummaries = async (req, res) => {
  try {
    const summaries = await ProductDetail.aggregate([
      {
        $group: {
          _id: "$category",
          productIds: { $addToSet: "$productId" },
          image: { $first: "$image" }  // get one image per category
        }
      },
      {
        $project: {
          category: "$_id",
          productCount: { $size: "$productIds" },
          image: 1,
          _id: 0
        }
      }
    ]);

    res.json(summaries);
  } catch (err) {
    console.error("Error fetching category summaries:", err);
    res.status(500).json({ message: "Server error" });
  }
};
