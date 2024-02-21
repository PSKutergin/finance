import instance from "../api/interceptor";

export class Operation {
    static async getOperations() {
        return instance.get(`api/operations`)
    }

    static async setOperations({ type, amount, date, comment, category_id }) {
        return instance.post(`api/operations`, { type, amount, date, comment, category_id })
    }

    static async getOperation(id) {
        return instance.get(`api/operations/${id}`)
    }

    static async editOperation(id, { type, amount, date, comment, category_id }) {
        return instance.put(`api/operations/${id}`, { type, amount, date, comment, category_id })
    }

    static async deleteOperation(id) {
        return instance.delete(`api/operations/${id}`)
    }
}