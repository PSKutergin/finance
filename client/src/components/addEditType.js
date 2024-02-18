import CurrentType from '../store/currentType';

export class AddEditType {
    constructor(mode) {
        this.mode = mode;
        this.contentTitle = null;
        this.init();
    }

    init() {
        this.currentType = CurrentType.getType();
        this.contentTitle = document.querySelector('.content__title');

        if (this.contentTitle) {
            if (this.currentType === 'income') {
                if (this.mode === 'edit') {
                    this.title = 'Редактирование категории доходов';
                } else if (this.mode === 'new') {
                    this.title = 'Создание категории доходов';
                }
            } else if (this.currentType === 'expense') {
                if (this.mode === 'edit') {
                    this.title = 'Редактирование категории расходов';
                } else if (this.mode === 'new') {
                    this.title = 'Создание категории расходов';
                }
            }

            this.contentTitle.textContent = this.title;
        }
    }
}