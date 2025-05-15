import { Admin } from "../models/adminModel.js"
import bcrypt from "bcrypt"
//import nodemailer from "nodemailer";
//import jwt from 'jsonwebtoken'
import { generateToken } from "../utils/token.js"
import {Product} from "../models/productModel.js"


export const adminSignup = async(req,res,next)=>{
    try {
        
        console.log("signup")

        const {name,email,password,confirmPassword,mobile,role} = req.body

        if(!name || !email || !password || !confirmPassword || !mobile || !role){
            return res.status(400).json({message:"All fields required"})
        }
        //console.log(name,email,password,mobile)

        const adminExist = await Admin.findOne({email})

        if(adminExist){
            return res.status(400).json({message:"Admin already exists"})
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"password not same"})
        }




        const hashedPassword = bcrypt.hashSync(password, 10)
        
        //save  to database
        const newAdmin = new Admin({name, email,password:hashedPassword,mobile,role: "admin"})
        await newAdmin.save()


        // const token = generateToken(newAdmin._id,"admin")
        // res.cookie("token", token, {
        //     sameSite: NODE_ENV === "production" ? "None" : "Lax",
        //     secure: NODE_ENV === "production",
        //     httpOnly: NODE_ENV === "production",
        // });
        const adminResponse = newAdmin.toObject();
        delete adminResponse.password;


        res.json({data:adminResponse,message:"signup success"})


    } catch (error) {

        res.status(error.statusCode || 500).json({message:error.message || "Internal server error"})
        console.log(error);
        
    }
}


export const adminLogin = async(req,res,next)=>{
    try {
        
        //collect data, user exist, password match, token 

        const {email,password} = req.body

        if(!email || !password  ){
            return res.status(400).json({message:"All fields required"})
        }
        //console.log(name,email,password,mobile)

        const adminExist = await Admin.findOne({email})

        if(!adminExist){
            return res.status(404).json({message:"User not found"})
        }
       

        const passwordMatch = bcrypt.compareSync(password, adminExist.password)
        if(!passwordMatch){
            return res.status(401).json({message:"invalid password"})
        }
        if(!adminExist.isActive){
            return res.status(401).json({message:"user account is not active"})
        }
        const token = generateToken(adminExist._id, adminExist.role);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true for HTTPS
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            
          });

        delete adminExist._doc.password;
        res.json({ data: adminExist, message: "Login success" });


    } catch (error) {

        res.status(error.statusCode || 500).json({message:error.message || "Internal server error"})
        console.log(error);
        
    }
}

export const adminProfile = async(req,res,next)=>{

    try {
        
        //console.log("hitted")
        const adminId = req.admin.id
        const adminData = await Admin.findById(adminId)
        const adminResponse = adminData.toObject();
        delete adminResponse.password;

        res.json({data:adminResponse, message:"admin  profile fetched"})

    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message || "Internal server"})
        
    }
}

export const adminProfileUpdate = async(req,res,next)=>{

    try {
        // console.log('hitted')
        //id, 
        const {name,email,password,confirmPassword,mobile,role} = req.body

        const adminId = req.admin.id
        const adminData = await Admin.findByIdAndUpdate(
            adminId,{name,email,password,confirmPassword,mobile,role},{new:true}
        )
        const adminResponse = adminData.toObject();
        delete adminResponse.password;

        res.json({data:adminResponse, message:"admin  profile updated"})

    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message || "Internal server"})
        
    }
}

export const adminLogout = async(req,res,next)=>{

    try {
        
        res.clearCookie("token")
        res.json({message:"User logout successfully"})
        
        
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message || "Internal server"})
        
    }
}
// export const forgotPassword =async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: "User not found" });

//         // Create JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

//         // Send Email
//         const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
//         await transporter.sendMail({
//             to: email,
//             subject: "Password Reset Request",
//             html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
//         });

//         res.json({ message: "Password reset link sent to your email" });

//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error });
//     }
// };

// // 2. Reset Password
// export const resetPassword= async (req, res) => {
//     const { token } = req.params;
//     const { newPassword } = req.body;

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id);
//         if (!user) return res.status(400).json({ message: "Invalid token" });

//         // Hash new password
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(newPassword, salt);
//         await user.save();

//         res.json({ message: "Password reset successfully" });

//     } catch (error) {
//         res.status(400).json({ message: "Invalid or expired token" });
//     }
// };

export const updatePassword = async (req, res) => {
    try {
        const adminId = req.admin.id; 
        const { password, newPassword, confirmNewPassword } = req.body;

       
        if (!password || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ success: false, message: "New passwords do not match." });
        }

        
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect." });
        }

        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        await admin.save();

        res.status(200).json({
           
            message: "Password updated successfully.",
        });

    } catch (error) {
        res.status(500).json({
            
            message: "Something went wrong while updating the password.",
            error: error.message
        });
    }
};
export const checkAdmin = async (req, res, next) => {
    try {

        res.json({  message: "admin autherized" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" });
    }
};

export const deactivateAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id);
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        // Prevent self-deactivation
        if (admin._id.toString() === req.admin.id) {
            return res.status(400).json({ message: "You cannot deactivate yourself" });
        }

        admin.isActive = false;
        await admin.save();

        res.json({ message: "Admin deactivated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


// Dashboard Controller
export const getDashboardData = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find();
    //const orders = await Order.find();

    // Total products
    const totalProducts = products.length;

    // Total stock (sum of stock of all products)
    // const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

    // // Total orders
    // const totalOrders = orders.length;

    // // Total revenue (sum of all order totals)
    // const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    // // Out of stock products
    // const outOfStockProducts = products.filter(product => product.stock === 0)
    //   .map(product => ({
    //     name: product.name,
    //     category: product.category
    //   }));

    // // Low stock products (stock less than 3)
    // const lowStockProducts = products.filter(product => product.stock > 0 && product.stock <= 3)
    //   .map(product => ({
    //     name: product.name,
    //     stock: product.stock
    //   }));

    // // Highest sale product
    // const productSales = {}; // { productId: unitsSold }
    // orders.forEach(order => {
    //   order.orderItems.forEach(item => {
    //     productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity;
    //   });
    // });

    // let highestSaleProductId = null;
    // let maxSoldUnits = 0;
    // for (const [productId, unitsSold] of Object.entries(productSales)) {
    //   if (unitsSold > maxSoldUnits) {
    //     highestSaleProductId = productId;
    //     maxSoldUnits = unitsSold;
    //   }
    // }

    // let highestSaleProduct = null;
    // if (highestSaleProductId) {
    //   const product = await Product.findById(highestSaleProductId);
    //   highestSaleProduct = {
    //     name: product.name,
    //     category: product.category,
    //     unitsSold: maxSoldUnits,
    //   };
    // }

    // // Best seller category
    // const categorySales = {}; // { category: totalUnitsSold }
    // products.forEach(product => {
    //   if (product.category) {
    //     categorySales[product.category] = (categorySales[product.category] || 0) + (productSales[product._id] || 0);
    //   }
    // });

    // let bestSellerCategory = '';
    // let maxCategorySales = 0;
    // for (const [category, unitsSold] of Object.entries(categorySales)) {
    //   if (unitsSold > maxCategorySales) {
    //     bestSellerCategory = category;
    //     maxCategorySales = unitsSold;
    //   }
    // }

    // Send the response
    res.status(200).json({
      totalProducts,
    //   totalStock,
    //   totalOrders,
    //   totalRevenue,
    //   highestSaleProduct,
    //   outOfStockProducts,
    //   lowStockProducts,
    //   bestSellerCategory,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



