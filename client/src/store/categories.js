import { Category } from "../services/category";

export default class Categories {
    constructor() {
        this.categoriesIncome = [];
        this.categoriesExpense = [];
        this.init();
    }

    init() {
        this.getCategoriesIncomeFromApi();
        this.getCategoriesExpenseFromApi();
    }

    getCategories(type) {
        if (type === "income") {
            return this.categoriesIncome
        } else {
            return this.categoriesExpense
        }
    }

    getCategoriesIncomeFromApi() {
        Category.getCategories("income").then(res => {
            this.categoriesIncome = res.data
        })
    }

    getCategoriesExpenseFromApi() {
        Category.getCategories("expense").then(res => {
            this.categoriesExpense = res.data
        })
    }
}