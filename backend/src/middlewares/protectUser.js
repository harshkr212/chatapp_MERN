import jwt from "jsonwebtoken"
import User from "../model/user.model.js"
const protectUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "UnAuthorised Access-No Token is provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "UnAuthorised Access-Invalid Token" });
        }
        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }
        req.user=user;
        next();

    } catch (error) {
      console.log("Error in protectUser MiddleWare",error.message);
       res.status(500).send({message:"Internal server error"});
    }

}
export default protectUser;