import jwt from "jsonwebtoken"
export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"None", //This is for production "Lax" is used for development
        secure:true // this is for production otherwise false
    })
    return token;

}