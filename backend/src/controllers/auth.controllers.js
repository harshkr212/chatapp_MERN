import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body;
    try {
        if(!fullName || !email || !password){
            res.status(400).send({message:"All fields are required"});

        }
        if(password.length<6){
            res.status(400).send({message:"Password must be atleast 6 characters"});
        }
        const user=await User.findOne({email});
        if(user){
            res.status(400).send({message:"User Already exists "});
        }
        const salt=await bcrypt.genSalt(10);
        const hashPass=await bcrypt.hash(password,salt);
        const newUser=new User({
            fullName:fullName,
            email:email,
            password:hashPass
        })
        if(newUser){
        //genetate the token here
        generateToken(newUser._id,res);
        await newUser.save();
        res.status(201).send({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic
        })
        }
        else{
            res.status(400).send({message:"Invalid user data "});

        }
        
    } 
    catch (error) {
       console.log("Error in signup controller",error.message);
       res.status(500).send({message:"Internal server error"});
        
    }
    
}
export const login=(req,res)=>{
    res.send("Login route");
}
export const logout=(req,res)=>{
    res.send("Logout route");
}