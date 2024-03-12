import instance from "../api/interceptor";

export class Category {
    static async getCategories(type) {
        return instance.get(`api/categories/${type}`)
    }

    static async setCategories(type, title) {
        return instance.post(`api/categories/${type}`, { title })
    }

    static async getCategory(type, id) {
        return instance.get(`api/categories/${type}/${id}`)
    }

    static async editCategory(type, id, title) {
        return instance.put(`api/categories/${type}/${id}`, { title })
    }

    static async deleteCategory(type, id) {
        return instance.delete(`api/categories/${type}/${id}`)
    }
}