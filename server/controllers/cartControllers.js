import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId }).populate("products.productId");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ data: cart, message: "cart fetched" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};



// export const addToCart = async (req, res) => {
//     try {
//         //console.log('Received request:', req.body); // Debugging log

//         const { userId, productId, quantity } = req.body;
//         if (!userId || !productId || !quantity) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         // Check if the product exists
//         const product = await Product.findById(productId);
//         if (!product) return res.status(404).json({ message: 'Product not found' });

//         // Check if the cart already has the product
//         let cartItem = await Cart.findOne({ user: userId, product: productId });

//         if (cartItem) {
//             cartItem.quantity += quantity;
//         } else {
//             cartItem = new Cart({
//                 user: userId,
//                 product: productId,
//                 quantity,
//                 price: product.price * quantity
//             });
//         }

//         await cartItem.save();
//         console.log('Cart updated:', cartItem); // Debugging log
//         res.status(201).json({ message: 'Product added to cart', cartItem });

//     } catch (error) {
//         console.error('Error adding to cart:', error.message);
//         res.status(500).json({ error: error.message });
//     }
// };

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId,quantity } = req.body;

        // Find the course to ensure it exists and fetch its price
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product  not found" });
        }

        // Find the user's cart or create a new one if it doesn't exist
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [],totalPrice:0 });
        }

        // Check if the course is already in the cart
        const productExists = cart.products.find((item) => item.productId.equals(productId));
        if (productExists) {
            productExists.quantity += quantity;
            return res.status(400).json({ message: "Product already in cart" });
        }

        // Add the course to the cart
        cart.products.push({
            productId,
            price: product.price,
            quantity,
        });

        // Recalculate the total price
        cart.totalPrice= cart.products.reduce((total,item)=>{
            return total + item.price * item.quantity

        },0)

        await cart.save();

        res.status(200).json({ data: cart, message: "product added to cart" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};


export const removeProductFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        // Find the user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove the course from the cart
        cart.products= cart.products.filter((item) => !item.productId.equals(productId));

        // Recalculate the total price
        cart.calculateTotalPrice();

        // Save the cart
        await cart.save();

        res.status(200).json({ data: cart, message: "product removed from cart" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products =[]
        cart.totalPrice=0;
        await cart.save();
        res.status(200).json({ data: cart, message: "Cart  cleared successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }



};
