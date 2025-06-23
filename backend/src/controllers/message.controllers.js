import User from "../model/user.model.js";
import Message from '../model/message.model.js'
import cloudnary from 'cloudinary'

export const getUserSideBar = async (req, res) => {
    try {
        const userId = req.user._id;
        const filterdUser = await User.findById({ _id: { $ne: userId } }).select("-password");
        res.status(200).json(filterdUser);
    } catch (error) {
        console.log("Error in getUserSideBar controller", error.message);
        res.status(500).send({ message: "Internal server error" });
    }
}
export const getMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        const messages = await Message.find({
            $or: [{ senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId }]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessage controller", error.message);
        res.status(500).send({ message: "Internal server error" });
    }
}
export const sendMessage=async (req,res)=>{
    try {
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        const {text,image}=req.body;
        let imageURL;
        if(image){
            const UploadResponse=await cloudnary.uploader.upload(image);
            imageURL=UploadResponse.secure_url;

        }
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageURL
        })
        await newMessage.save();
        //todo realtime message functionality goes here=> socket.io
        res.status(201).json(newMessage);
    } catch (error) {
         console.log("Error in sendMessage controller", error.message);
        res.status(500).send({ message: "Internal server error" });
        
    }
}