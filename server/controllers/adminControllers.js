import { Admin } from "../models/adminModel.js"
import bcrypt from "bcrypt"
//import nodemailer from "nodemailer";
//import jwt from 'jsonwebtoken'
import { generateToken } from "../utils/token.js"

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
        const newAdmin = new Admin({name, email,password:hashedPassword,mobile,role})
        await newAdmin.save()


        const token = generateToken(newAdmin._id,"admin")
        res.cookie("token", token, {
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });
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

        const {email,password,confirmPassword,role} = req.body

        if(!email || !password || !confirmPassword || !role ){
            return res.status(400).json({message:"All fields required"})
        }
        //console.log(name,email,password,mobile)

        const adminExist = await Admin.findOne({email})

        if(!adminExist){
            return res.status(404).json({message:"User not found"})
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"password not same"})
        }

        const passwordMatch = bcrypt.compareSync(password, adminExist.password)
        if(!passwordMatch){
            return res.status(401).json({message:"invalid password"})
        }
        if(!adminExist.isActive){
            return res.status(401).json({message:"user account is not active"})
        }

        const token = generateToken(adminExist._id, adminExist.role);
        res.cookie("token", token);

        delete adminExist._doc.password;
        res.json({ data: adminExist, message: "Login success" });


    } catch (error) {

        res.status(error.statusCode || 500).json({message:error.message || "Internal server error"})
        console.log(error);
        
    }
}

export const adminProfile = async(req,res,next)=>{

    try {
        
        console.log("hitted")
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
