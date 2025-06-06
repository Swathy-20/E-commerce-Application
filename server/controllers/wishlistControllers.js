 import {Wishlist} from "../models/wishlistModel.js";
 import {Product} from "../models/productModel.js";

// export const addToWishlist = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const { productId } = req.body;

//         // Check if product existswish
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         // Find or create wishlist
//         let wishlist = await Wishlist.findOne({ userId });
//         if (!wishlist) {
//             wishlist = new Wishlist({ userId, products: [{productId}] });
//         }
//         else if(!wishlist.products.includes(productId)){
//             wishlist.products.push({productId});
//         }

//         // Check if product is already in wishlist
//         // const productExists = wishlist.products.some(item => item.productId.equals(productId));
//         // if (productExists) {
//         //     return res.status(400).json({ message: "Product already in wishlist" });
//         // }

//         // Add product to wishlist
        
//         await wishlist.save();

//         res.status(200).json({ message: "Product added to wishlist", data: wishlist });
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error", error });
//     }
// };

// export const removeFromWishlist = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const { productId } = req.params;

//         const wishlist = await Wishlist.findOne({ userId });
//         if (!wishlist) {
//             return res.status(404).json({ message: "Wishlist not found" });
//         }

//         // Remove product from wishlist
//         wishlist.products = wishlist.products.filter(id => !id.toString() !==productId);

//         await wishlist.save();
//         res.status(200).json({ message: "Product removed from wishlist", data: wishlist });
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error", error });
//     }
// };


export const getWishlist = async (req, res) => {
    try {
        
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products.product");
        // res.json(wishlist)
        

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        

        //res.status(200).json({ data: wishlist });
        res.json(wishlist.products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};



// Add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
     const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user._id,
        products: [{ product: productId }],
      });
    } else {
      // Check if product already exists in wishlist
      const existingProduct = wishlist.products.find(
        (item) => item.product.toString() === productId
      );

      if (existingProduct) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }

      wishlist.products.push({ product: productId });
    }

    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();
    res.json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
