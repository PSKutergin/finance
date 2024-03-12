import { Category } from "../services/category";

export default class Categories {
    constructor() {
        this.categoriesIncome = [];
        this.categoriesExpense = [];
        this.init();
    }

    async init() {
        try {
            const [incomeRes, expenseRes] = await Promise.all([
                Category.getCategories("income"),
                Category.getCategories("expense")
            ]);
            this.categoriesIncome = incomeRes.data;
            this.categoriesExpense = expenseRes.data;
        } catch (error) {
            console.error("Ошибка при загрузке категорий:", error);
        }
    }

    getCategories(type) {
        if (type === "income") {
            return this.categoriesIncome
        } else {
            return this.categoriesExpense
        }
    }
}