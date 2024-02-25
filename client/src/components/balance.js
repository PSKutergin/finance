// import CurrentType from '../store/currentType';

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
                window.currentType.setType('income');
                window.location.hash = `#/new-operation`
            })

            this.createExpenseBtn.addEventListener('click', () => {
                window.currentType.setType('expense');
                window.location.hash = `#/new-operation`
            })
        }

        this.deleteCategoriesBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.popup.classList.add('open');
            })
        })

        this.editCategoriesBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                window.location.hash = `#/edit-operation/1`
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