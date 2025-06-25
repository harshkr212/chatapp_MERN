import { create } from 'zustand'
import axiosInstance from '../lib/axios.js'


 const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoginUp: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/checkAuth');
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in checkAuth", error);
            set({ authUser: null })

        }
        finally {
            set({ isCheckingAuth: false })
        }
    },
    signup:async ()=>{}

}))
export default useAuthStore