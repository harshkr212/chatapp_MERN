import { create } from 'zustand'
import axiosInstance from '../lib/axios.js'
import toast from "react-hot-toast"

 const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoginUp: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers:[],
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/checkUser');
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in checkAuth", error);
            set({ authUser: null })

        }
        finally {
            set({ isCheckingAuth: false })
        }
    },
    signup:async (data)=>{
        set({isSigninUp:true});
        try {
            const res=await axiosInstance.post("auth/signup",data);
            set({authUser:res.data});
            toast.success("Account Created Successfully");
        
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }finally{
            set({isSigninUp:false});
        }
    },
    login:async(data)=>{
        set({isLoginUp:true});

        try {
             const res=await axiosInstance.post("auth/login",data);
            set({authUser:res.data});
            toast.success("Logged in Successfully");

            
        } catch (error) {
             toast.error(error?.response?.data?.message || "Something went wrong");
            
        }
        finally{
            set({isLoginUp:false});
        }
    },
    logout:async()=>{
        try {
           
            await axiosInstance.get('auth/logout')
             set({authUser:null});
             toast.success("Logout Succesfully")
        } catch (error) {
            toast.error("Something went wrong")
        }
    },
    updateProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res=await axiosInstance.put("auth/update-profile",data);
            set({authUser:res.data});
            toast.success("Updated Profile Picture Successfully")
            
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
            
        }
        finally{
            set({isUpdatingProfile:false})
        }
    }

}))
export default useAuthStore