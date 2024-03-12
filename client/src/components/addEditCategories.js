import { Category } from '../services/category';

export class AddEditCategories {
    constructor(mode) {
        this.mode = mode;
        this.idCategory = null;
        this.currentType = null;
        this.contentTitle = null;
        this.valueInput = null;
        this.contentBtn = null;
        this.contentBtnCnl = null;
        this.title = '';
        this.textBtn = '';
        this.init();
    }

    init() {
        this.currentType = window.currentType.getType();
        this.contentTitle = document.querySelector('.content__title');
        this.valueInput = document.querySelector('.content__input');
        this.contentBtn = document.querySelector('.content__button');
        this.contentBtnCnl = document.querySelector('.content__button-cancel');

        if (this.contentTitle) {
            if (this.mode === 'edit') {
                this.idCategory = window.location.hash.split('/')[2];
                if (this.currentType === 'income') {
                    this.title = 'Редактирование категории доходов';
                } else if (this.currentType === 'expense') {
                    this.title = 'Редактирование категории расходов';
                }
                this.textBtn = 'Сохранить';
                try {
                    this.getCategoryFromApi();
                } catch (error) {
                    console.log(error);
                }
            } else if (this.mode === 'new') {
                if (this.currentType === 'income') {
                    this.title = 'Создание категории доходов';
                } else if (this.currentType === 'expense') {
                    this.title = 'Создание категории расходов';
                }
                this.textBtn = 'Создать';
            }

            this.contentTitle.textContent = this.title;
            this.contentBtn.textContent = this.textBtn;
        }

        if (this.contentBtnCnl && this.contentBtn) {
            this.initButtons();
        }
    }

    initButtons() {
        this.contentBtn.addEventListener('click', () => {
            if (this.mode === 'edit') {
                this.editCategory();
            } else if (this.mode === 'new') {
                this.addCategory();
            }
        })

        this.contentBtnCnl.addEventListener('click', () => {
            window.location.hash = `#/categories-${this.currentType}`;
        })
    }

    async getCategoryFromApi() {
        const res = await Category.getCategory(this.currentType, this.idCategory)
        this.valueInput.value = res.data.title;
    }

    async editCategory() {
        const title = this.valueInput.value;
        try {
            await Category.editCategory(this.currentType, this.idCategory, title);
            window.location.hash = `#/categories-${this.currentType}`;
        } catch (error) {
            console.log(error);
        }
    }

    async addCategory() {
        const title = this.valueInput.value;
        try {
            await Category.setCategories(this.currentType, title);
            window.location.hash = `#/categories-${this.currentType}`;
        } catch (error) {
            console.log(error);
        }
    }
}