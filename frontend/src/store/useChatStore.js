import {create } from "zustand"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"
import useAuthStore from "./useAuthStore"

const ChatStore=create((set,get)=>({
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
    setSelectedUser:(selectedUser)=>{set({selectedUser:selectedUser})},
    sendMessage:async(newMessage)=>{
        const {selectedUser,messages}=get();
        try {
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,newMessage);
            set({messages:[...messages,res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }

    },
    subscribeToMessage:()=>{
        const { selectedUser } = get();
        if(!selectedUser) return;
        const socket = useAuthStore.getState().socket;
       
        socket.on('newMessage',(newMessage)=>{
            //checking if the selected user is sending message
            if(newMessage.senderId!==selectedUser._id) return;
            //adding the new message with the existing one 
            set((state)=>({
                messages:[...state.messages,newMessage]

            }));
            // set({messages:[...get().messages],newMessage});

        })

    },
    unsubscribeFromMessage:()=>{
         const socket = useAuthStore.getState().socket;
         socket.off("newMessage");

    }

}))
export default ChatStore;