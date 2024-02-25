import { Category } from '../services/category';
// import CurrentType from '../store/currentType';

export class AddEditCategories {
    constructor(mode) {
        this.mode = mode;
        this.idCategory = null;
        this.title = '';
        this.currentType = null;
        this.contentTitle = null;
        this.init();
    }

    init() {
        this.currentType = window.currentType.getType();
        this.contentTitle = document.querySelector('.content__title');

        if (this.contentTitle) {
            if (this.mode === 'edit') {
                this.idCategory = window.location.hash.split('/')[2];
                if (this.currentType === 'income') {
                    this.title = 'Редактирование категории доходов';
                } else if (this.currentType === 'expense') {
                    this.title = 'Редактирование категории расходов';
                }

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
            }

            this.contentTitle.textContent = this.title;
        }
    }

    async getCategoryFromApi() {
        const res = await Category.getCategory(this.currentType, this.idCategory)

        console.log(res.data);
    }
}