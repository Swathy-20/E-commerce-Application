import { User } from "../models/userModel.js"
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken'

import { generateToken } from "../utils/token.js"

export const userSignup = async(req,res,next)=>{
    try {
        
        console.log("signup")

        const {name,email,password,confirmPassword,mobile,profilePic} = req.body

        if(!name || !email || !password || !confirmPassword || !mobile){
            return res.status(400).json({message:"All fields required"})
        }
        //console.log(name,email,password,mobile)

        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({message:"User already exists"})
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"password not same"})
        }




        const hashedPassword = bcrypt.hashSync(password, 10)
        
        //save  to database
        const newUser = new User({name, email,password:hashedPassword,mobile,profilePic})
        await newUser.save()


        const token = generateToken(newUser._id,"user")
        res.cookie("token",token )

        const userResponse = newUser.toObject();
        delete userResponse.password;


        res.json({data:userResponse,message:"signup success"})


    } catch (error) {

        res.status(error.statusCode || 500).json({message:error.message || "Internal server error"})
        console.log(error);
        
    }
}


export const userLogin = async(req,res,next)=>{
    try {
        
        //collect data, user exist, password match, token 

        const {email,password,confirmPassword} = req.body

        if(!email || !password || !confirmPassword ){
            return res.status(400).json({message:"All fields required"})
        }
        //console.log(name,email,password,mobile)

        const userExist = await User.findOne({email})

        if(!userExist){
            return res.status(404).json({message:"User not found"})
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"password not same"})
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password)
        if(!passwordMatch){
            return res.status(401).json({message:"invalid password"})
        }
        if(!userExist.isActive){
            return res.status(401).json({message:"user account is not active"})
        }

        const token = generateToken(userExist._id, "user");
        res.cookie("token", token);

        delete userExist._doc.password;
        res.json({ data: userExist, message: "Login success" });


    } catch (error) {

        res.status(error.statusCode || 500).json({message:error.message || "Internal server error"})
        console.log(error);
        
    }
}

export const userProfile = async(req,res,next)=>{

    try {
        console.log('hitted')
        //id, 
        const userId = req.user.id
        const userData = await User.findById(userId).select("-password ")

        res.json({data:userData, message:"user  profile fetched"})

    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message || "Internal server"})
        
    }
}

export const userProfileUpdate = async(req,res,next)=>{

    try {
        // console.log('hitted')
        //id, 
        const {name,email,password,confirmPassword,mobile,profilePic} = req.body

        const userId = req.user.id
        const userData = await User.findByIdAndUpdate(
            userId,{name,email,password,confirmPassword,mobile,profilePic},{new:true}
        )

        res.json({data:userData, message:"user  profile updated"})

    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message || "Internal server"})
        
    }
}

export const userLogout = async(req,res,next)=>{

    try {
        
        res.clearCookie("token")
        res.json({message:"User logout successfully"})
        
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message || "Internal server"})
        
    }
}


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "No account found with this email." });
        }

        // Generate reset token using JWT (valid for 10 minutes)
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });

        // Store the token and expiry in the database
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now
        await user.save();

        // Reset URL to send via email
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Email Configuration
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Use an App Password
            }
        });

        // Email content
        const mailOptions = {
            from: `"Your App Name" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Password Reset Request",
            text: `Click the link below to reset your password:\n\n${resetUrl}\n\nThis link is valid for 10 minutes.`,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Password reset link sent to email.",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while processing your request."
        });
    }
};
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword, confirmPassword } = req.body;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID
        const user = await User.findById(decoded.id);
        if (!user || user.resetPasswordToken !== token || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ success: false, message: "Invalid or expired token." });
        }

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        // Hash new password
        user.password = bcrypt.hashSync(newPassword, 10);
        user.resetPasswordToken = null; // Clear reset token
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successful. You can now log in." });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.message
        });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { password, newPassword, confirmNewPassword } = req.body;

       
        if (!password || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ success: false, message: "New passwords do not match." });
        }

        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Old password is incorrect." });
        }

        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

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


export const changeAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.user.id; 

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.address = address;
        await user.save();

        res.status(200).json({ message: "Address updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};
export const checkUser = async (req, res, next) => {
    try {

        res.json({  message: "user autherized" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" });
    }
};

