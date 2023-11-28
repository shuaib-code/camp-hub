import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000/',
    // baseURL: 'https://camp-hub.vercel.app/'
})

export default axiosPublic;