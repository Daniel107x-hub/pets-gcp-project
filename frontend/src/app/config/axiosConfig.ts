import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.API_URL || "http://localhost:3000/api",
    timeout: 10000, // Set a timeout of 10 seconds
});

export default axiosInstance;