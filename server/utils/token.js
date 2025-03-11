import jwt from 'jsonwebtoken'
export const generateToken = ( id,role)=>{
    try {

        const token = jwt.sign({id,role},process.env.JWT_SECRETKEY,{
            expiresIn:"1d",
        })
        return token 
        
    } catch (error) {
        
    }
}