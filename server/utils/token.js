import jwt from 'jsonwebtoken'
export const generateToken = ( id,role)=>{
    try {

        const token = jwt.sign({id,role},process.env.JWT_SECRETKEY)
        //console.log("generating token with:",{id,role});
        return token 
      
    } catch (error) {
        
    }
}