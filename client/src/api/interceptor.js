import axios from "axios";
import { BASE_URL } from "../config/config";
import { Auth } from "../services/auth";

export const getContentType = () => ({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
})

const instance = axios.create({
    baseURL: BASE_URL,
    headers: getContentType()
})

instance.interceptors.request.use((config) => {
    const token = Auth.getToken(Auth.accessTokenKey);

    if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default instance