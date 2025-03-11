import jwt from 'jsonwebtoken'
export const authAdmin =(req,res,next)=>{
    try {

        //collect token from cookies, decode token, check role
        
        //console.log(req.cookies)
        const {token} = req.cookies

        if(!token){
             return res.status(401).json({message:"Admin not authorized"})
         }

        const decodedToken = jwt.verify(token,process.env.JWT_SECRETKEY)

        console.log(decodedToken,"========Decoded token");
        
        if(!decodedToken){
            return res.status(401).json({message:"Admin not authorized"})
        }

        if(decodedToken.role !== "admin" && decodedToken.role !== "seller" ){
            return res.status(401).json({message:"Admin not authorized"})
        }
        req.admin = decodedToken


        next()
        
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message || "Internal server"})
        
    }
}