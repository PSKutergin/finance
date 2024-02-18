import axios from "axios";
import { BASE_URL } from "../config/config";
import { Auth } from "../services/auth";
import User from "../store/user";

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

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Проверка на ошибку 401 (Unauthorized)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Попытка обновления токенов
                await User.checkAuth();
                // Повторный запрос с обновленными токенами
                const token = Auth.getToken(Auth.accessTokenKey);
                if (token) {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                // Обработка ошибки обновления токенов
                console.error('Ошибка обновления токенов:', refreshError);
                User.removeUser();
                Auth.removeTokens();
            }
        }
        // Если не удалось обновить токены или другая ошибка, возвращаем ошибку
        return Promise.reject(error);
    }
);

export default instance