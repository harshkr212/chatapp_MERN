import {create } from "zustand"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"
const ChatStore=create((set)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessageLoading:false,
    getUsers:async ()=>{
        set({isUserLoading:true});
        try {
            const res=await axiosInstance.get("/message/getUser");
            set({users:res.data});
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
        set({isUserLoading:false});
            
        }
    },
    getMessage:async (userId)=>{
        set({isMessageLoading:true});
        try {
            const res=await axiosInstance.get(`/message/${userId}`);
            set({messages:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
        set({isMessageLoading:false});

        }
    },
    setSelectedUser:(selectedUser)=>{set({selectedUser:selectedUser})}

}))
export default ChatStore;