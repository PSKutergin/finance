import { Category } from '../services/category';

export class AddEditOperations {
    constructor(mode) {
        this.mode = mode;
        this.title = '';
        this.textBtn = '';
        this.currentType = null;
        this.contentTitle = null;
        this.contentBtn = null;
        this.init();
    }

    init() {
        this.currentType = window.currentType.getType();
        this.contentTitle = document.querySelector('.content__title');
        this.contentBtn = document.querySelector('.content__button');

        if (this.contentTitle && this.contentBtn) {
            if (this.mode === 'edit') {
                this.title = 'Редактирование дохода/расхода';
                this.textBtn = 'Сохранить';
            } else if (this.mode === 'new') {
                this.title = 'Создание дохода/расхода';
                this.textBtn = 'Создать';
            }

            this.contentTitle.textContent = this.title;
            this.contentBtn.textContent = this.textBtn;
        }
    }
}