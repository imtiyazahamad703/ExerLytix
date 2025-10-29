import axios from "axios"

const axiosInstance=axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://exerlytix-java-api.onrender.com/api",
    headers :{
        "Content-Type" : "application/json",
    },
});

export default axiosInstance;