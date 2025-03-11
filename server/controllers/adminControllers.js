import { Admin } from "../models/adminModel.js"
import bcrypt from "bcrypt"
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
        res.cookie("token",token )


        res.json({data:newAdmin,message:"signup success"})


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

        res.json({data:adminData, message:"admin  profile fetched"})

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

        res.json({data:adminData, message:"admin  profile updated"})

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
export const checkAdmin = async (req, res, next) => {
    try {

        res.json({  message: "admin autherized" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" });
    }
};
