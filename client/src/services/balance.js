import instance from "../api/interceptor";

export class Balance {
    static async getBalance() {
        return instance.get(`api/balance`)
    }

    static async editBalance(newBalance) {
        return instance.put(`api/balance/`, { newBalance })
    }
}