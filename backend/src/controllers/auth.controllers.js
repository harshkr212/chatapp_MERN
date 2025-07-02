import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudnary.js";
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
export const login=async(req,res)=>{
   const {email,password}=req.body;
   try {
    const user= await User.findOne({email:email});
    if(!email || !password){
        return res.status(400).send({message:"All fields are required"});
    }
    if(!user){
        return res.status(400).send({message:"Invalid Credentials"});
    }
    const pass=await bcrypt.compare(password,user.password);
    if(!pass){
        return res.status(400).send({message:"Invalid Credentials"});
    }
    generateToken(user._id,res);
    res.status(200).send({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
    }
    )

    
   } catch (error) {
     console.log("Error in Login controller",error.message);
       res.status(500).send({message:"Internal server error"});
    
   }
}
export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).send({message:"Logged Out Successfully"});
    } catch (error) {
         console.log("Error in Logout controller",error.message);
       res.status(500).send({message:"Internal server error"});
        
    }
}
export const updateProfile=async(req,res)=>{
    const {profilePic}=req.body;
    try {
        const userID=req.user._id;
        if(!profilePic){
            return res.status(400).send({message:"Profile Pic is required"});
        }
        const uploadResponse=await cloudinary.uploader.upload(profilePic);
        const updateUser=await User.findByIdAndUpdate(userID,{profilePic:uploadResponse.secure_url},{new:true})
        res.status(200).json(updateUser);
    } catch (error) {
           console.log("Error in UpdateProfile controller",error);
       res.status(500).send({message:"Internal server error"});
        
    }
}
export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user);
        
    } catch (error) {
         console.log("Error in CheckUser controller",error.message);
       res.status(500).send({message:"Internal server error"});
    }
}