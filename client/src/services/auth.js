export class Auth {
    static userList = 'userList';
    static userInfo = 'userInfo';

    static setUserInfo(info) {
        localStorage.setItem(this.userInfo, JSON.stringify(info));
    }

    static logout() {
        localStorage.removeItem(this.userInfo);
    }

    static getUserInfo() {
        const userInfo = localStorage.getItem(this.userInfo);
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    }
}