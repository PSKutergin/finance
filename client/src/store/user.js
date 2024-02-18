import { Auth } from "../services/auth";

export default class User {
    static userKey = 'user';

    static setUser(user) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    static getUser() {
        return localStorage.getItem(this.userKey) ? JSON.parse(localStorage.getItem(this.userKey)) : null;
    }

    static removeUser() {
        localStorage.removeItem(this.userKey);
    }

    static getFullName() {
        const user = this.getUser();
        return `${user.name} ${user.lastName}`
    }

    static showError(text) {
        this.errorElement = document.getElementById('error');
        this.errorElement.innerText = text;
        this.errorElement.classList.add('active');
        setTimeout(() => this.errorElement.classList.remove('active'), 3000);
    }

    static async login(email, password) {
        try {
            const response = await Auth.login({ email, password });
            const user = response.data.user;
            const tokens = response.data.tokens;

            Auth.setTokens(tokens.accessToken, tokens.refreshToken);
            this.setUser(user);
            window.location.hash = '#/main';
        } catch (error) {
            this.showError(error.response?.data?.message);
        }
    }

    static async registration(name, lastName, email, password, passwordRepeat) {
        try {
            await Auth.signup({ name, lastName, email, password, passwordRepeat });
            window.location.hash = '#/login';
        } catch (error) {
            this.showError(error.response?.data?.message);
        }
    }

    static async logout() {
        const refreshToken = Auth.getToken(Auth.refreshTokenKey);

        try {
            await Auth.logout(refreshToken);
            this.removeUser();
            Auth.removeTokens();
        } catch (error) {
            this.showError(error.response?.data?.message);
        }

    }

    // TODO: надо понять в какой момент вызывать данный метод
    static async checkAuth() {
        try {
            const refreshToken = Auth.getToken(Auth.refreshTokenKey);
            const response = await Auth.refresh(refreshToken);
            const tokens = response.data.tokens;

            Auth.setTokens(tokens.accessToken, tokens.refreshToken);
        } catch (error) {
            this.removeUser();
            Auth.removeTokens();
        }
    }
}