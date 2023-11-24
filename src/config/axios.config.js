import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'http://localhost:5000/',
    // baseURL:'https://bloggy-pro.vercel.app/',
    // withCredentials:true,
})

export default axiosPublic;