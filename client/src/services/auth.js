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
        const userList = this.getUserList();
        if (!userList) {
            return 'No user list';
        } else {
            if (!userList.some(item => item.email === email && item.password === password)) {
                return 'Wrong email or password';
            }
        }
        this.setUserInfo(user);
        return true;
    }

    static signup({ email, password, fullName }) {
        const userList = this.getUserList();

        if (!userList) {
            this.setUserList([{ email, password, fullName }]);
        } else {
            if (userList.some(item => item.email === email)) {
                return false;
            }
            userList.push({ email, password, fullName });
            this.setUserList(userList);
        }
        return true;
    }

    static logout() {
        localStorage.removeItem(this.userInfo);
    }
}