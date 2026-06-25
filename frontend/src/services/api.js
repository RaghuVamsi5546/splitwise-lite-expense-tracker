import axios from "axios";

// Axios instance for all backend API calls
const api = axios.create({
    baseURL: "http://localhost:5000"
});

export default api;