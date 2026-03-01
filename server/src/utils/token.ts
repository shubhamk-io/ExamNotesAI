import jwt from "jsonwebtoken"

export const getToken = async (userId:String) =>{
return jwt.sign({userId},process.env.JWT_SECRET as string, {expiresIn:"7d"})
}