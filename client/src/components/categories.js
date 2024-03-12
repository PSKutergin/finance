import { Category } from "../services/category";

export class Categories {
    constructor() {
        this.idCategory = null;
        this.type = null;
        this.titleCategory = null;
        this.contentCategories = null;
        this.popup = null;
        this.init();
    }
    init() {
        this.type = window.currentType.getType()
        this.titleCategory = document.querySelector('.content__title');
        this.contentCategories = document.querySelector('.content__categories');
        this.popup = document.querySelector('.content__popup');

        if (this.popup) {
            this.popup.addEventListener('click', (e) => {
                if (e.target.closest('.popup__btn-cancel')) this.popup.classList.remove('open');

                if (e.target.closest('.popup__btn-delete')) {
                    this.deleteCategory();
                    this.popup.classList.remove('open');
                }
            })
        }

        this.getCategoriesFromApi();
    }

    async getCategoriesFromApi() {
        try {
            if (this.titleCategory && this.contentCategories) {
                await Category.getCategories(this.type)
                    .then(res => this.renderCategories(res.data))
                    .catch(error => console.log(error))
            }
        } catch (error) {
            console.log(error);
        }
    }

    renderCategories(categories) {
        this.titleCategory.textContent = this.type === 'income' ? 'Доходы' : this.type === 'expense' ? 'Расходы' : '';
        this.contentCategories.innerHTML = '';

        categories.forEach(item => {
            this.contentCategories.insertAdjacentHTML('beforeend',
                `
                    <li class="content__categories-item" data-id=${item.id}>
                        <h3 class="content__categories-item-title">${item.title}</h3>
                        <section class="content__categories-item-btn-wrapper">
                            <button class="content__categories-item-btn edit">Редактировать</button>
                            <button class="content__categories-item-btn delete">Удалить</button>
                        </section>
                    </li>
                `
            )
        });

        this.contentCategories.insertAdjacentHTML('beforeend',
            `
                <li class="content__categories-item new-item">
                    <span>+</span>
                </li>
            `
        );

        this.initButtons();
    }

    initButtons() {
        this.createBtn = document.querySelector('.new-item');
        this.editBtns = document.querySelectorAll('.edit');
        this.deleteBtns = document.querySelectorAll('.delete');

        if (this.createBtn && this.editBtns && this.deleteBtns) {
            this.editBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.target.closest('.content__categories-item').dataset.id
                    window.location.hash = `#/edit-categories/${id}`
                })
            })

            this.deleteBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.idCategory = e.target.closest('.content__categories-item').dataset.id
                    this.popup.classList.add('open');

                    console.log(this.idCategory);
                })
            })

            this.createBtn.addEventListener('click', (e) => {
                window.location.hash = '#/new-categories'
            })
        }
    }

    async deleteCategory() {
        try {
            await Category.deleteCategory(this.type, this.idCategory)
            this.getCategoriesFromApi();
        } catch (error) {
            console.log(error);
        }
    }
}