import axios from "axios"
 const axiosInstance=axios.create({
    baseURL:"https://chatapp-mern-3-backend2-0.onrender.com/api",
    withCredentials:true
})
export default axiosInstance;