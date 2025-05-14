import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    
    price: { 
        type: Number, 
        required: true 
    },
    
    images: { 
        type: String ,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLGtEd0MJro4X9wDmT2vrvLT-HjKkyyWVmg&s"
    }, 
    seller: { 
        type: mongoose.Types.ObjectId, 
        ref: "Admin", 
        required: true 
    }, 
    rating: {
      type: Number,
      default: 0,
    },
    // reviews: [
    //   {
    //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //     rating: { type: Number, required: true },
    //     comment: { type: String, required: true },
    //   },
    // ],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);