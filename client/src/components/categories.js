import CurrentType from "../store/currentType";

export class Categories {
    constructor() {
        this.init();
    }
    init() {
        this.createBtn = document.querySelector('.new-item');
        this.editBtns = document.querySelectorAll('.edit');
        this.deleteBtns = document.querySelectorAll('.delete');
        this.popup = document.querySelector('.content__popup');

        CurrentType.setType(window.location.hash.split('-')[1]);

        this.editBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                window.location.hash = `#/edit-categories`
            })
        })

        this.deleteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.popup.classList.add('open');
            })
        })

        if (this.createBtn) {
            this.createBtn.addEventListener('click', (e) => {
                window.location.hash = `#/new-categories`
            })
        }

        if (this.popup) {
            this.popup.addEventListener('click', (e) => {
                if (e.target.closest('.popup__btn-cancel')) {
                    this.popup.classList.remove('open');
                }
            })
        }

    }
}