import CurrentType from '../store/currentType';

export class Balance {
    constructor() {
        this.init();
    }

    init() {
        this.popup = document.querySelector('.content__popup');
        this.createIncomeBtn = document.querySelector('.content__button-income');
        this.createExpenseBtn = document.querySelector('.content__button-expense');
        this.deleteCategoriesBtns = document.querySelectorAll('.btn-delete');
        this.editCategoriesBtns = document.querySelectorAll('.btn-edit');

        if (this.createIncomeBtn && this.createExpenseBtn) {
            this.createIncomeBtn.addEventListener('click', () => {
                CurrentType.setType('income');
                window.location.hash = `#/new-type`
            })

            this.createExpenseBtn.addEventListener('click', () => {
                CurrentType.setType('expense');
                window.location.hash = `#/new-type`
            })
        }

        this.deleteCategoriesBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.popup.classList.add('open');
            })
        })

        this.editCategoriesBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                window.location.hash = `#/edit-categories`
            })
        })

        if (this.popup) {
            this.popup.addEventListener('click', (e) => {
                if (e.target.closest('.popup__btn-cancel')) {
                    this.popup.classList.remove('open');
                }
            })
        }
    }
}