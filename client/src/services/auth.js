import instance from "../api/interceptor";

export class Auth {
    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static async login({ email, password, rememberMe }) {
        return instance.post('api/login', { email, password, rememberMe })
    }

    static async signup({ name, lastName, email, password, passwordRepeat }) {
        return instance.post('api/signup', { name, lastName, email, password, passwordRepeat })
    }

    static async refresh(refreshToken) {
        return instance.post('api/refresh', { refreshToken })
    }

    static async logout(refreshToken) {
        return instance.post('api/logout', { refreshToken })
    }

    static getToken = (nameToken) => {
        return localStorage.getItem(nameToken) ? localStorage.getItem(nameToken) : null
    }

    static setTokens = (accessToken, refreshToken) => {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    }

    static removeTokens = () => {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }
}