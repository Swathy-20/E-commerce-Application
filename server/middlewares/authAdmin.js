import jwt from 'jsonwebtoken'
export const authAdmin =(req,res,next)=>{
    try {

        const {token} = req.cookies
        console.log("Token from cookies:", token);
        // console.log("COOKIES RECEIVED:", req.cookies);
        // console.log("TOKEN RECEIVED:", req.cookies.token);

        if(!token){
             return res.status(401).json({message:"Admin not authorized"})
         }

        const decodedToken = jwt.verify(token,process.env.JWT_SECRETKEY)
        console.log("role:",decodedToken.role);
        
        
        if(!decodedToken){
            console.log("Decoded token is invalid");
            
            return res.status(401).json({message:" not authorized"})
        }
        

        if(decodedToken.role !== "admin" && decodedToken.role !== "seller" ){
            //console.log("Role not authorized");
           
        
            
            return res.status(401).json({message:"Admin not authorized"})
        }
        req.admin = decodedToken


        next();
        
    } catch (error) {
        //console.log("JWT error",error)
        res.status(error.statusCode || 500).json({message:error.message || "Internal server"})
        
    }
}