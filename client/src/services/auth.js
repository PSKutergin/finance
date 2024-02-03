export class Auth {
    static userList = 'userList';
    static userInfo = 'userInfo';

    static setUserInfo(info) {
        localStorage.setItem(this.userInfo, JSON.stringify(info));
    }

    static getUserInfo() {
        const userInfo = localStorage.getItem(this.userInfo);
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    }

    static getUserList() {
        const userList = localStorage.getItem(this.userList);
        if (userList) {
            return JSON.parse(userList);
        }
        return null;
    }

    static setUserList(userList) {
        localStorage.setItem(this.userList, JSON.stringify(userList));
    }

    static login({ email, password }) {
        this.rememberElement = document.getElementById('remember');

        const userList = this.getUserList();
        if (!userList) {
            return { success: false, error: 'Указаный пользователь не зарегистрирован' };
        } else {
            if (!userList.some(item => item.email === email && item.password === password)) {
                return { success: false, error: 'Неверный логин или пароль' };
            }
        }
        this.rememberElement.checked ?
            this.setUserInfo({ email, password, remember: true }) :
            this.setUserInfo({ email, password });
        return { success: true };
    }

    static signup({ email, password, fullName }) {
        const userList = this.getUserList();

        if (!userList) {
            this.setUserList([{ email, password, fullName }]);
        } else {
            if (userList.some(item => item.email === email)) {
                return { success: false, error: 'Пользователь с таким email уже зарегистрирован' };
            }
            userList.push({ email, password, fullName });
            this.setUserList(userList);
        }
        return { success: true };
    }

    static logout() {
        localStorage.removeItem(this.userInfo);
    }
}