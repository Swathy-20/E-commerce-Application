import { User } from "../models/userModel.js"
import bcrypt from "bcrypt"
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


        res.json({data:newUser,message:"signup success"})


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
        const userData = await User.findById(userId)

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

export const checkUser = async (req, res, next) => {
    try {

        res.json({  message: "user autherized" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" });
    }
};