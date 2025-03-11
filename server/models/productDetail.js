const mongoose = require("mongoose");

const productDetailSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    brand: { 
        type: String 
    },
    stock: { 
        type: Number, 
        required: true, 
        default: 0 },
    images: { 
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLGtEd0MJro4X9wDmT2vrvLT-HjKkyyWVmg&s"

    },
    seller: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Admin", 
        required: true },
    ratings: { 
        type: Number, 
        default: 0 },
   
    specifications: {
      color: { type: String },
      size: { type: String },
      weight: { type: String },
      material: { type: String },
    },
    
    returnPolicy: { type: String },
  },
  { timestamps: true }
);

export const ProductDetail = mongoose.model("Product_Detail", productDetailSchema);